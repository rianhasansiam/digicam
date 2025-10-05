# Product Schema Quick Reference

## 📦 Required Fields Checklist

When creating/updating products, ensure these fields are present:

```javascript
✅ name              // String - Product name
✅ category          // String - Category name
✅ style             // String - Camera type
✅ price             // Number - Current price
✅ stock             // Number - Quantity
✅ shortDescription  // String - Brief summary
✅ description       // String - Full details
✅ images            // Array - Image URLs (min 1)
✅ colors            // Array - Body colors (min 1)
✅ sizes             // Array - Sensor types (min 1)
```

---

## 🎨 Valid Options

### Camera Types (style)
```
DSLR | Mirrorless | Point & Shoot | Action Camera | Film Camera | Instant Camera
```

### Sensor Types (sizes)
```
Full Frame | APS-C | Micro Four Thirds | Medium Format | 1-inch | 1/2.3-inch
```

### Body Colors (colors)
```
Black | Silver | Gray | White | Gold | Blue | Red | Bronze
```

---

## 🚀 Quick API Usage

### Create Product
```javascript
POST /api/products
{
  "name": "Camera Name",
  "category": "Category",
  "style": "Mirrorless",
  "price": 100000,
  "originalPrice": 120000,
  "stock": 10,
  "shortDescription": "Brief desc",
  "description": "Full description",
  "images": ["url1", "url2"],
  "colors": ["Black"],
  "sizes": ["Full Frame"]
}
```

### Update Product
```javascript
PUT /api/products/[id]
{
  "price": 95000,
  "stock": 5
}
```

### Fetch Products
```javascript
const { data } = useGetData({
  name: 'products',
  api: '/api/products',
  cacheType: 'STATIC'
});
```

---

## ⚠️ Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Missing required fields | Field not provided | Include all required fields |
| Images array empty | No images | Add at least 1 image URL |
| Colors array empty | No colors | Add at least 1 color |
| Sizes array empty | No sizes | Add at least 1 sensor type |
| originalPrice < price | Invalid pricing | Ensure originalPrice ≥ price |
| Negative stock | Invalid quantity | Stock must be ≥ 0 |

---

## 📄 Files to Know

| File | Purpose |
|------|---------|
| `lib/validation/productValidation.js` | Validation utilities |
| `lib/data/dataSchemas.js` | Data normalization |
| `app/api/products/route.js` | GET, POST APIs |
| `app/api/products/[id]/route.js` | GET, PUT, DELETE by ID |
| `PRODUCT_SCHEMA_DOCUMENTATION.md` | Full documentation |

---

## 🔍 Validation Function

```javascript
import { validateProduct } from '@/lib/validation/productValidation';

const { valid, errors } = validateProduct(productData);

if (!valid) {
  console.error('Validation failed:', errors);
  // Handle errors
}
```

---

## 💡 Tips

1. **Always validate before API calls**
2. **Use `prepareProductForDB()` for sanitization**
3. **Check `images[0]` is set as primary image**
4. **Convert prices to numbers: `Number(price)`**
5. **Trim strings: `name.trim()`**
6. **Handle null for `originalPrice`**

---

## 🎯 Example Valid Product

```javascript
{
  "name": "Canon EOS R5",
  "category": "Mirrorless Cameras",
  "style": "Mirrorless",
  "price": 389900,
  "originalPrice": 450000,
  "stock": 15,
  "shortDescription": "Professional full-frame mirrorless camera",
  "description": "Advanced features for professionals...",
  "images": [
    "https://i.ibb.co/img1.jpg",
    "https://i.ibb.co/img2.jpg"
  ],
  "colors": ["Black", "Silver"],
  "sizes": ["Full Frame"]
}
```

---

**Need more details?** See `PRODUCT_SCHEMA_DOCUMENTATION.md`
