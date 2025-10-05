# Product Schema Documentation

**Last Updated:** October 5, 2025  
**Collection:** `allProducts`

---

## ✅ Complete Product Schema Structure

### Database Schema (MongoDB)

```javascript
{
  "_id": ObjectId,                    // MongoDB ObjectId (auto-generated)
  "name": String,                     // Product name (required)
  "category": String,                 // Category name (required)
  "style": String,                    // Camera type (required)
  "price": Number,                    // Current price (required)
  "originalPrice": Number | null,     // Original price (optional)
  "stock": Number,                    // Stock quantity (required)
  "shortDescription": String,         // Brief description (required)
  "description": String,              // Full description (required)
  "images": Array<String>,            // Image URLs array (required)
  "colors": Array<String>,            // Body colors array (required)
  "sizes": Array<String>,             // Sensor types array (required)
  "image": String,                    // Primary image (auto-set from images[0])
  "color": String,                    // Primary color (auto-set from colors[0])
  "createdAt": Date,                  // Creation timestamp
  "updatedAt": Date                   // Update timestamp (optional)
}
```

---

## 📋 Field Definitions

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | String | Product name | "Canon EOS R5" |
| `category` | String | Product category | "Mirrorless Cameras" |
| `style` | String | Camera type | "Mirrorless" |
| `price` | Number | Current selling price | 389900 |
| `stock` | Number | Available quantity | 15 |
| `shortDescription` | String | Brief product summary (max 200 chars) | "Professional full-frame mirrorless camera..." |
| `description` | String | Detailed product information | "The Canon EOS R5 sets a new standard..." |
| `images` | Array | Product image URLs (min 1) | ["https://i.ibb.co/img1.jpg", "..."] |
| `colors` | Array | Available body colors (min 1) | ["Black", "Silver"] |
| `sizes` | Array | Sensor types (min 1) | ["Full Frame"] |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `originalPrice` | Number\|null | Price before discount | 450000 |
| `updatedAt` | Date | Last modification date | "2025-10-05T18:00:00.000Z" |

### Auto-Generated Fields

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `_id` | ObjectId | Unique identifier | MongoDB |
| `image` | String | Primary image URL | `images[0]` |
| `color` | String | Primary color | `colors[0]` |
| `createdAt` | Date | Creation timestamp | Server |

---

## 🎨 Valid Values

### Camera Types (style field)
```javascript
[
  'DSLR',
  'Mirrorless',
  'Point & Shoot',
  'Action Camera',
  'Film Camera',
  'Instant Camera'
]
```

### Sensor Types (sizes field)
```javascript
[
  'Full Frame',
  'APS-C',
  'Micro Four Thirds',
  'Medium Format',
  '1-inch',
  '1/2.3-inch'
]
```

### Body Colors (colors field)
```javascript
[
  'Black',
  'Silver',
  'Gray',
  'White',
  'Gold',
  'Blue',
  'Red',
  'Bronze'
]
```

---

## 📝 Example Product (Your Schema)

```json
{
  "_id": "68e2ab6cb43f7f5c1b6425d9",
  "name": "Canon EOS R5",
  "category": "DSLR Cameras",
  "style": "Action Camera",
  "price": 12332,
  "originalPrice": 20000,
  "stock": 100,
  "shortDescription": "Professional mirrorless camera with advanced features",
  "description": "The Canon EOS R5 is a professional full-frame mirrorless camera featuring a 45MP sensor, 8K video recording, advanced autofocus system, and weather-sealed body perfect for professional photographers.",
  "images": [
    "https://i.ibb.co/WWhc7hQz/Screenshot-2025-10-05-194852.png",
    "https://i.ibb.co/sdyyTn4V/Screenshot-2025-09-14-014129.png",
    "https://i.ibb.co/hFHVhgWj/Screenshot-2025-09-24-210114.png"
  ],
  "colors": [
    "White",
    "Bronze",
    "Blue"
  ],
  "sizes": [
    "Full Frame",
    "APS-C"
  ],
  "image": "https://i.ibb.co/WWhc7hQz/Screenshot-2025-10-05-194852.png",
  "color": "White",
  "createdAt": "2025-10-05T17:31:24.704Z"
}
```

---

## 🔧 API Endpoints

### GET `/api/products`
Fetch all products

**Response:**
```javascript
[
  {
    _id: "...",
    name: "...",
    // ... full product object
  }
]
```

### POST `/api/products`
Create new product (Admin only)

**Request Body:**
```javascript
{
  "name": "Canon EOS R5",
  "category": "Mirrorless Cameras",
  "style": "Mirrorless",
  "price": 389900,
  "originalPrice": 450000,
  "stock": 15,
  "shortDescription": "Brief description...",
  "description": "Full description...",
  "images": ["url1", "url2"],
  "colors": ["Black", "Silver"],
  "sizes": ["Full Frame"]
}
```

**Response:**
```javascript
{
  "success": true,
  "productId": "...",
  "message": "Product created successfully"
}
```

### GET `/api/products/[id]`
Fetch single product by ID

**Response:**
```javascript
{
  _id: "...",
  name: "...",
  // ... full product object
}
```

### PUT `/api/products/[id]`
Update product (Admin only)

**Request Body:** (Only include fields to update)
```javascript
{
  "price": 350000,
  "stock": 10
}
```

### DELETE `/api/products/[id]`
Delete product (Admin only)

**Response:**
```javascript
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## ✅ Validation Rules

### Product Creation Validation

1. **Required Fields Check:**
   - All required fields must be present
   - Strings must not be empty after trimming

2. **Type Validation:**
   - `name`: non-empty string
   - `category`: non-empty string
   - `style`: non-empty string
   - `price`: positive number
   - `originalPrice`: positive number or null
   - `stock`: non-negative number
   - `shortDescription`: string (max 200 chars)
   - `description`: non-empty string
   - `images`: non-empty array of valid URLs
   - `colors`: non-empty array of strings
   - `sizes`: non-empty array of strings

3. **Business Logic Validation:**
   - `originalPrice` must be ≥ `price` (if provided)
   - `images` array must contain at least 1 image
   - `colors` array must contain at least 1 color
   - `sizes` array must contain at least 1 sensor type
   - `stock` cannot be negative

### Error Responses

**400 Bad Request:**
```javascript
{
  "success": false,
  "error": "Missing required fields: name, category"
}
```

**404 Not Found:**
```javascript
{
  "success": false,
  "error": "Product not found"
}
```

**500 Internal Server Error:**
```javascript
{
  "success": false,
  "error": "Failed to create product"
}
```

---

## 🔄 Data Normalization

Products are automatically normalized when fetched via `useGetData` hook:

```javascript
// lib/data/dataSchemas.js - normalizeProduct()

{
  // Original fields
  _id: product._id,
  id: product._id,
  name: product.name,
  category: product.category,
  style: product.style,
  price: Number(product.price),
  originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
  stock: Number(product.stock),
  shortDescription: product.shortDescription,
  description: product.description,
  images: product.images,
  colors: product.colors,
  sizes: product.sizes,
  image: product.image,
  color: product.color,
  createdAt: product.createdAt,
  
  // Computed fields (for UI)
  primaryImage: product.image || product.images[0],
  discount: calculatedDiscount,
  isInStock: stock > 0,
  isLowStock: stock > 0 && stock < 10,
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock'
}
```

---

## 🚨 Common Issues & Fixes

### Issue 1: Missing Images
**Problem:** Product images not displaying

**Fix:**
```javascript
// Ensure images array has at least one URL
if (!product.images || product.images.length === 0) {
  product.images = [DEFAULT_IMAGE_URL];
  product.image = DEFAULT_IMAGE_URL;
}
```

### Issue 2: Price Mismatch
**Problem:** originalPrice less than price

**Fix:**
```javascript
// Validate before saving
if (originalPrice && originalPrice < price) {
  throw new Error('originalPrice must be greater than price');
}
```

### Issue 3: Empty Arrays
**Problem:** colors or sizes array is empty

**Fix:**
```javascript
// Ensure arrays have at least one item
if (colors.length === 0) {
  throw new Error('At least one color is required');
}
if (sizes.length === 0) {
  throw new Error('At least one sensor type is required');
}
```

### Issue 4: Invalid Data Types
**Problem:** price saved as string instead of number

**Fix:**
```javascript
// Always convert to numbers
price: Number(product.price) || 0,
stock: Number(product.stock) || 0
```

---

## 📊 Database Indexes (Recommended)

For better performance, create these indexes:

```javascript
db.allProducts.createIndex({ "name": "text", "description": "text" });
db.allProducts.createIndex({ "category": 1 });
db.allProducts.createIndex({ "style": 1 });
db.allProducts.createIndex({ "price": 1 });
db.allProducts.createIndex({ "createdAt": -1 });
```

---

## 🧪 Testing

### Valid Product Test Data

```javascript
const validProduct = {
  name: "Sony A7 IV",
  category: "Mirrorless Cameras",
  style: "Mirrorless",
  price: 249900,
  originalPrice: 269900,
  stock: 8,
  shortDescription: "Versatile full-frame camera for content creators",
  description: "The Sony A7 IV combines outstanding image quality with advanced video features...",
  images: [
    "https://i.ibb.co/sony-a7iv-1.jpg",
    "https://i.ibb.co/sony-a7iv-2.jpg"
  ],
  colors: ["Black"],
  sizes: ["Full Frame"]
};
```

### Invalid Product Test Data

```javascript
// Missing required fields
const invalid1 = {
  name: "Test Camera"
  // Missing category, style, price, etc.
};

// Empty arrays
const invalid2 = {
  name: "Test Camera",
  // ... other fields
  images: [],  // ❌ Must have at least 1 image
  colors: [],  // ❌ Must have at least 1 color
  sizes: []    // ❌ Must have at least 1 size
};

// Invalid price
const invalid3 = {
  // ... other fields
  price: -100,  // ❌ Cannot be negative
  originalPrice: 50  // ❌ Must be >= price
};
```

---

## 📚 Related Files

- **Schema Normalization:** `lib/data/dataSchemas.js`
- **Validation:** `lib/validation/productValidation.js`
- **API Routes:** `app/api/products/route.js`, `app/api/products/[id]/route.js`
- **Admin Components:** `app/(pages)/admin/adminComponents/allProducts/`
- **Product Display:** `app/componets/shared/ProductCard.js`

---

## 🎯 Summary

Your product schema is well-structured and follows best practices:

✅ **All fields properly defined**  
✅ **Validation in place**  
✅ **API endpoints handle all CRUD operations**  
✅ **Data normalization for consistency**  
✅ **Error handling implemented**  
✅ **Backward compatibility maintained**

The schema is production-ready for your camera marketplace!
