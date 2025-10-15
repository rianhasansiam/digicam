# 🔧 Quick Configuration Guide

## ⚠️ IMPORTANT: Update Before Going Live!

### 1. Update Payment Numbers

**File**: `app/(pages)/checkout/CheckoutPageClient.js`

**Find this section** (around line 835-845):

```javascript
<div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
  <Phone className="w-5 h-5 text-pink-600" />
  <div>
    <p className="font-medium text-gray-900">bKash</p>
    <p className="text-sm text-gray-600">Personal: 01XXXXXXXXX</p>  ← CHANGE THIS
  </div>
</div>
<div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
  <Phone className="w-5 h-5 text-orange-600" />
  <div>
    <p className="font-medium text-gray-900">Nagad</p>
    <p className="text-sm text-gray-600">Personal: 01XXXXXXXXX</p>  ← CHANGE THIS
  </div>
</div>
```

**Replace with your actual numbers**:

```javascript
<div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
  <Phone className="w-5 h-5 text-pink-600" />
  <div>
    <p className="font-medium text-gray-900">bKash</p>
    <p className="text-sm text-gray-600">Personal: 01712345678</p>  ← Your bKash
  </div>
</div>
<div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
  <Phone className="w-5 h-5 text-orange-600" />
  <div>
    <p className="font-medium text-gray-900">Nagad</p>
    <p className="text-sm text-gray-600">Personal: 01812345678</p>  ← Your Nagad
  </div>
</div>
```

---

### 2. Verify ImageBB API Key

**File**: `.env.local`

Check this line exists:
```env
NEXT_PUBLIC_IMAGEBB_API_KEY=b219dd4fbf1e533427eb7a7af6c552c1
```

✅ If it exists, you're good!
❌ If missing, add it with your ImageBB API key

---

### 3. Test the Feature

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Open: `http://localhost:3001/checkout`

3. Test flow:
   - Select "15% Advance Payment"
   - Check if your numbers appear in instructions
   - Try submitting payment proof
   - Verify screenshot uploads

---

### 4. Optional: Change Advance Percentage

**Current**: 15% advance payment
**To change**: Find these lines and update `0.15` and `0.85`

**Location 1** - Button text:
```javascript
selectedPayment === 'advance' 
  ? `Pay 15% (৳${(parseFloat(totals.total) * 0.15).toFixed(2)}) & Place Order`
  //                                          ^^^^
```

**Location 2** - Calculation:
```javascript
const advanceAmount = selectedPayment === 'advance' 
  ? (parseFloat(totals.total) * 0.15).toFixed(2)  // Change 0.15
  : 0;

const remainingAmount = selectedPayment === 'advance'
  ? (parseFloat(totals.total) * 0.85).toFixed(2)  // Change 0.85
  : parseFloat(totals.total);
```

**Example**: For 20% advance
- Change `0.15` to `0.20`
- Change `0.85` to `0.80`
- Update text "15%" to "20%"

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Updated bKash number
- [ ] Updated Nagad number  
- [ ] Verified ImageBB API key works
- [ ] Tested complete payment flow
- [ ] Tested screenshot upload
- [ ] Verified order saves correctly
- [ ] Checked on mobile devices
- [ ] Tested with real transaction
- [ ] Admin panel ready to view proofs
- [ ] Team trained on verification

---

## 🚀 Ready to Deploy!

Once checklist is complete:

```bash
git add .
git commit -m "feat: Add 15% advance payment with proof submission"
git push origin main
```

Vercel will automatically deploy! 🎉

---

**Note**: Keep your payment numbers secure and update them only in the code, not in public documentation!
