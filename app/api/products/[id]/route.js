import { NextResponse } from 'next/server';
import { getCollection } from '../../../../lib/mongodb';
import { checkOrigin, isAdmin, forbiddenResponse } from '../../../../lib/security';
import apiCache, { getCacheHeaders, CACHE_DURATION } from '../../../../lib/cache/apiCache';

// PUT - Update product by ID (Admin only)
export async function PUT(request, { params }) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    // Check if user is admin
    const admin = await isAdmin();
    if (!admin) {
      return forbiddenResponse('Only admins can update products');
    }

    const { id } = params;
    const products = await getCollection('allProducts');
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product ID is required for update' 
      }, { status: 400 });
    }
    
    // Prepare update data with schema structure
    const updateData = {
      updatedAt: new Date()
    };
    
    // Update only provided fields
    if (body.name) updateData.name = body.name.trim();
    if (body.category) updateData.category = body.category.trim();
    if (body.style) updateData.style = body.style.trim();
    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.originalPrice !== undefined) updateData.originalPrice = body.originalPrice ? Number(body.originalPrice) : null;
    if (body.stock !== undefined) updateData.stock = Number(body.stock);
    if (body.shortDescription) updateData.shortDescription = body.shortDescription.trim();
    if (body.description) updateData.description = body.description.trim();
    
    // Handle arrays
    if (Array.isArray(body.images) && body.images.length > 0) {
      updateData.images = body.images;
      updateData.image = body.images[0]; // Update primary image
    }
    
    if (Array.isArray(body.colors) && body.colors.length > 0) {
      updateData.colors = body.colors;
      updateData.color = body.colors[0]; // Update primary color
    }
    
    if (Array.isArray(body.sizes)) {
      updateData.sizes = body.sizes;
    }

    const { ObjectId } = (await import('mongodb'));
    const result = await products.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product not found' 
      }, { status: 404 });
    }

    // Invalidate cache for this product and all products
    apiCache.invalidate(`product:${id}`);
    apiCache.invalidateByPattern('products');

    return NextResponse.json({ 
      success: true, 
      data: result, 
      message: 'Product updated successfully' 
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to update product' 
    }, { status: 500 });
  }
}

// DELETE - Delete product by ID (Admin only)
export async function DELETE(request, { params }) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    // Check if user is admin
    const admin = await isAdmin();
    if (!admin) {
      return forbiddenResponse('Only admins can delete products');
    }

    const { id } = params;
    const products = await getCollection('allProducts');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product ID is required for delete' 
      }, { status: 400 });
    }

    const { ObjectId } = (await import('mongodb'));
    const result = await products.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product not found' 
      }, { status: 404 });
    }

    // Invalidate cache for this product and all products
    apiCache.invalidate(`product:${id}`);
    apiCache.invalidateByPattern('products');

    return NextResponse.json({ 
      success: true, 
      Data: result, 
      message: 'Product deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete product' 
    }, { status: 500 });
  }
}

// GET - Get single product by ID (Public - Anyone can view)
export async function GET(request, { params }) {
  try {
    // Check origin for security
    const originCheck = checkOrigin(request);
    if (originCheck) return originCheck;

    const { id } = params;
    const products = await getCollection('allProducts');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product ID is required' 
      }, { status: 400 });
    }

    // Check cache first
    const cacheKey = `product:${id}`;
    const cachedProduct = apiCache.get(cacheKey, CACHE_DURATION.STATIC);
    
    if (cachedProduct) {
      return NextResponse.json(cachedProduct, {
        headers: {
          ...getCacheHeaders(1800), // 30 minutes
          'X-Cache': 'HIT'
        }
      });
    }

    const { ObjectId } = (await import('mongodb'));
    const product = await products.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product not found' 
      }, { status: 404 });
    }

    // Cache the product
    apiCache.set(cacheKey, product);

    return NextResponse.json(product, {
      headers: {
        ...getCacheHeaders(1800), // 30 minutes
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch product' 
    }, { status: 500 });
  }
}