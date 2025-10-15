# 🧪 Testing Guide - 15% Advance Payment Feature

## Quick Test Checklist

### 1. Basic Flow Test

#### **Test COD (Should work as before)**
- [ ] Add products to cart
- [ ] Go to checkout
- [ ] Fill all shipping information
- [ ] Select "Cash on Delivery"
- [ ] Click "Place Order - ৳XXX"
- [ ] Order should be placed immediately
- [ ] Redirected to order summary

#### **Test Advance Payment (New Feature)**
- [ ] Add products to cart (e.g., ৳1,000 total)
- [ ] Go to checkout
- [ ] Fill all shipping information
- [ ] Select "15% Advance Payment"
- [ ] Button should show: "Pay 15% (৳150.00) & Place Order"
- [ ] Click the button

### 2. Payment Instructions Modal Test

- [ ] Modal opens with blue gradient header
- [ ] Shows correct 15% amount (৳150.00 for ৳1,000 order)
- [ ] Shows remaining 85% amount (৳850.00)
- [ ] Displays 3 numbered steps
- [ ] Shows bKash and Nagad cards
- [ ] Has "Cancel" and "I've Made the Payment" buttons
- [ ] Cancel button closes modal
- [ ] Close (X) button works

### 3. Payment Proof Form Test

#### **Open Form**
- [ ] Click "I've Made the Payment" in instructions
- [ ] Payment proof modal opens
- [ ] Shows green header with wallet icon

#### **Payment Method Selection**
- [ ] bKash button works (pink highlight)
- [ ] Nagad button works (orange highlight)
- [ ] Only one can be selected at a time

#### **Phone Number Input**
- [ ] Can type 11-digit number
- [ ] Placeholder shows: "01XXXXXXXXX"
- [ ] Label changes based on selected method

#### **Transaction ID Input**
- [ ] Can type transaction ID
- [ ] Helper text shows below input

#### **Screenshot Upload**
- [ ] Click "Choose File" opens file picker
- [ ] Select image file (PNG/JPG)
- [ ] Preview appears immediately
- [ ] "Remove Image" button appears
- [ ] Can remove and re-upload

#### **File Validation**
- [ ] Try uploading >5MB file - should show alert
- [ ] Try uploading non-image file - should show alert
- [ ] Valid image should work

### 4. Form Validation Test

#### **Submit with Missing Data**
- [ ] Empty form → "Submit" button disabled (gray)
- [ ] Fill payment method only → still disabled
- [ ] Fill phone number only → still disabled
- [ ] Fill transaction ID only → still disabled
- [ ] Upload screenshot only → still disabled
- [ ] Fill ALL fields → button enabled (green)

### 5. Order Submission Test

#### **Complete Order**
- [ ] Fill all payment proof fields
- [ ] Click "Submit & Place Order"
- [ ] Button shows loading spinner
- [ ] Shows "Processing..." text
- [ ] Screenshot uploads to ImageBB
- [ ] Order saves to database
- [ ] Redirects to order summary
- [ ] Cart is cleared

### 6. Database Verification

Check that order contains:
```javascript
{
  paymentMethod: {
    type: "advance",
    advancePayment: {
      amount: "150.00",
      remainingAmount: "850.00",
      method: "bkash" // or "nagad",
      phoneNumber: "01712345678",
      transactionId: "ABC123XYZ",
      screenshot: "https://i.ibb.co/...",
      paidAt: "2025-10-15T..."
    }
  },
  status: "payment_verified",
  paymentStatus: "partial"
}
```

### 7. Order Summary Page Test

- [ ] Shows order details
- [ ] Displays payment method: "15% Advance Payment"
- [ ] Shows advance amount paid
- [ ] Shows remaining amount
- [ ] Transaction ID visible (if applicable)

### 8. Edge Cases Test

#### **Modal Interactions**
- [ ] Click outside modal → modal closes
- [ ] Press Escape → modal closes (browser default)
- [ ] Open → Close → Open again → form is reset

#### **Multiple Attempts**
- [ ] Cancel payment proof → can try again
- [ ] Upload wrong image → can remove and re-upload
- [ ] Fill wrong details → can edit before submit

#### **Network Issues**
- [ ] Slow connection → shows loading state
- [ ] Upload fails → shows error message
- [ ] Order save fails → shows error, doesn't clear cart

### 9. Responsive Design Test

#### **Mobile View**
- [ ] Modals fit screen properly
- [ ] Buttons are touch-friendly
- [ ] Text is readable
- [ ] Images resize properly
- [ ] Scrolling works in modals

#### **Tablet View**
- [ ] Layout looks good
- [ ] All interactive elements accessible

#### **Desktop View**
- [ ] Modals centered
- [ ] Proper spacing
- [ ] Hover effects work

### 10. Performance Test

- [ ] Page loads quickly
- [ ] Modals animate smoothly
- [ ] Image upload is responsive
- [ ] No console errors
- [ ] No layout shifts

---

## 🐛 Common Issues to Check

### Issue: Screenshot won't upload
**Check**:
- File size under 5MB?
- File is image type?
- ImageBB API key set in .env.local?
- Internet connection working?

### Issue: Button stays disabled
**Check**:
- All 4 fields filled?
- Screenshot uploaded?
- Phone number has 11 digits?

### Issue: Modal won't open
**Check**:
- Console for JavaScript errors?
- Framer Motion installed?
- No conflicting z-index?

### Issue: Order not saving
**Check**:
- MongoDB connection working?
- API route functioning?
- Console for error messages?

---

## ✅ Expected Results

### Successful Test Flow:
1. ✅ Select advance payment
2. ✅ See correct 15% calculation
3. ✅ Instructions modal opens
4. ✅ Payment proof form opens
5. ✅ Can upload screenshot
6. ✅ Form validates correctly
7. ✅ Order submits successfully
8. ✅ Data saved with proof
9. ✅ Redirects to summary
10. ✅ Cart cleared

---

## 📸 Screenshots to Take (for Documentation)

1. Payment method selection (COD vs Advance)
2. Payment instructions modal
3. Payment proof form - empty
4. Payment proof form - filled
5. Screenshot upload preview
6. Processing state
7. Order summary with advance payment

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Test with real bKash account
- [ ] Test with real Nagad account
- [ ] Verify ImageBB uploads work
- [ ] Check MongoDB saves correctly
- [ ] Test on multiple devices
- [ ] Update payment numbers in instructions
- [ ] Set up payment verification workflow
- [ ] Train staff on verifying payments
- [ ] Create admin panel for payment review
- [ ] Set up notifications for new orders

---

**Note**: Replace placeholder numbers (01XXXXXXXXX) with actual bKash/Nagad numbers before going live!
