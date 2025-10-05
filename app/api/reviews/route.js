import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { checkOrigin, isAdmin, isAuthenticated, forbiddenResponse, unauthorizedResponse } from '../../../lib/security';
import { apiCache } from '../../../lib/cache/apiCache';

// 🚀 PERFORMANCE: Create indexes for faster queries
async function ensureIndexes(collection) {
  try {
    await collection.createIndex({ productId: 1 }); // For filtering by product
    await collection.createIndex({ isApproved: 1 }); // For filtering approved reviews
    await collection.createIndex({ rating: -1 }); // For sorting by rating
    await collection.createIndex({ createdAt: -1 }); // For sorting by date
    await collection.createIndex({ productId: 1, isApproved: 1 }); // Compound index for common queries
    console.log('Reviews indexes created successfully');
  } catch (error) {
    console.log('Reviews indexes might already exist:', error.message);
  }
}

// GET - Get all reviews (Public - Anyone can view)
export async function GET(request) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const isApprovedOnly = searchParams.get('approved') === 'true';

    // 🚀 PERFORMANCE: Build cache key based on query parameters
    const cacheKey = `reviews:${productId || 'all'}:${isApprovedOnly ? 'approved' : 'all'}`;
    
    // 🚀 PERFORMANCE: Check server-side cache (5 minutes for reviews - DYNAMIC data)
    const cached = apiCache.get(cacheKey, 5 * 60 * 1000);
    if (cached) {
      console.log(`Cache HIT for reviews: ${cacheKey}`);
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT' }
      });
    }

    // Get the reviews collection
    const reviews = await getCollection('allReviews');
    
    // 🚀 PERFORMANCE: Create indexes on first request
    await ensureIndexes(reviews);
    
    // Build query based on parameters
    const query = {};
    if (productId) {
      query.productId = productId;
    }
    if (isApprovedOnly) {
      query.isApproved = true;
    }
    
    // Find reviews with query and sort by date (newest first)
    const allReviews = await reviews.find(query).sort({ createdAt: -1 }).toArray();

    // 🚀 PERFORMANCE: Cache the results
    apiCache.set(cacheKey, allReviews);
    console.log(`Cache MISS for reviews: ${cacheKey} - Cached ${allReviews.length} reviews`);

    return NextResponse.json(allReviews, {
      headers: { 
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error("Error fetching reviews:", error); 
    return NextResponse.json({ 
      success: false,
      error: "Failed to fetch reviews" 
    }, { status: 500 });
  }
} // End of GET function

// POST - Create new review (Authenticated users only)
export async function POST(request) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    // Check if user is authenticated
    const user = await isAuthenticated();
    if (!user) {
      return unauthorizedResponse('You must be logged in to create a review');
    }

    // Get the reviews collection
    const reviews = await getCollection('allReviews');
    
    // Get the request body
    const body = await request.json();
    
    // Add metadata
    const reviewData = {
      ...body,
      userId: user.id || user._id || user.email,
      userName: user.name || user.email,
      userEmail: user.email,
      isApproved: false, // Reviews need admin approval by default
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Insert the new review
    const result = await reviews.insertOne(reviewData);

    // 🚀 PERFORMANCE: Invalidate all review caches when new review is added
    apiCache.invalidateByPattern('reviews:');
    console.log('Review caches invalidated after POST');

    return NextResponse.json({
      success: true,
      Data: result,
      message: "Review submitted successfully and is pending approval"
    });

  } catch (error) {
    console.error("Error creating review:", error); 
    return NextResponse.json({ 
      success: false,
      error: "Failed to create review" 
    }, { status: 500 });
  }
} // End of POST function

// PUT - Update review by _id (Admin only)
export async function PUT(request) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    // Check if user is admin
    const admin = await isAdmin();
    if (!admin) {
      return forbiddenResponse('Only admins can update reviews');
    }

    const reviews = await getCollection('allReviews');
    const body = await request.json();
    const { _id, ...updateData } = body;
    if (!_id) {
      return NextResponse.json({ success: false, error: 'Review _id is required for update' }, { status: 400 });
    }
    
    // Add updated timestamp
    updateData.updatedAt = new Date().toISOString();
    
    const { ObjectId } = (await import('mongodb'));
    const result = await reviews.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }
    
    // 🚀 PERFORMANCE: Invalidate all review caches when review is updated
    apiCache.invalidateByPattern('reviews:');
    console.log('Review caches invalidated after PUT');
    
    return NextResponse.json({ success: true, Data: result, message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ success: false, error: 'Failed to update review' }, { status: 500 });
  }
} // End of PUT function

// DELETE - Delete review by _id (Admin only)
export async function DELETE(request) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    // Check if user is admin
    const admin = await isAdmin();
    if (!admin) {
      return forbiddenResponse('Only admins can delete reviews');
    }

    const reviews = await getCollection('allReviews');
    const body = await request.json();
    const { _id } = body;
    if (!_id) {
      return NextResponse.json({ success: false, error: 'Review _id is required for delete' }, { status: 400 });
    }
    const { ObjectId } = (await import('mongodb'));
    const result = await reviews.deleteOne({ _id: new ObjectId(_id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }
    
    // 🚀 PERFORMANCE: Invalidate all review caches when review is deleted
    apiCache.invalidateByPattern('reviews:');
    console.log('Review caches invalidated after DELETE');
    
    return NextResponse.json({ success: true, Data: result, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete review' }, { status: 500 });
  }
} // End of DELETE function