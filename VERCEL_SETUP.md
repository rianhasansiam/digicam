# Vercel Deployment Setup Guide

## 🚀 Deployment Fix Applied

**Problem Solved**: The `ECONNREFUSED 127.0.0.1:3000` error has been fixed!

**What Changed**: Modified `lib/data/serverDataFetchers.js` to fetch directly from MongoDB during build time instead of making HTTP requests to localhost.

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Configure Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

#### Required Environment Variables

**⚠️ IMPORTANT**: Copy these values from your local `.env.local` file!

```env
# MongoDB Connection
MONGODB_URI=<copy from your .env.local>
MONGODB_DB=digicam

# NextAuth Configuration
AUTH_SECRET=<copy from your .env.local>
NEXTAUTH_URL=https://your-vercel-app.vercel.app
# ☝️ Update this with your actual Vercel deployment URL!

# Google OAuth Credentials
AUTH_GOOGLE_ID=<copy from your .env.local>
AUTH_GOOGLE_SECRET=<copy from your .env.local>

# ImageBB API Key
NEXT_PUBLIC_IMAGEBB_API_KEY=<copy from your .env.local>

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=<copy from your .env.local>
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<copy from your .env.local>
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<copy from your .env.local>

# Environment Mode
NODE_ENV=production
```

### Step 2: Update Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add your Vercel domain:

**Authorized JavaScript origins:**
```
https://your-vercel-app.vercel.app
```

**Authorized redirect URIs:**
```
https://your-vercel-app.vercel.app/api/auth/callback/google
```

6. Click **Save**

### Step 3: Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster
3. Go to **Network Access**
4. Ensure connections are allowed from anywhere:
   - Add `0.0.0.0/0` (allows all IPs)
   - Or add Vercel's specific IP ranges

### Step 4: Deploy

Your app should now deploy successfully! Vercel will automatically detect the push from GitHub.

#### Manual Deploy (if needed):
1. Go to Vercel Dashboard
2. Click **Deployments**
3. Click **Redeploy** on the latest deployment

---

## ✅ Post-Deployment Checklist

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] Products display properly
- [ ] Categories work
- [ ] Search functionality works
- [ ] Google OAuth login works
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Admin panel access
- [ ] Images load correctly

---

## 🐛 Troubleshooting

### Build fails with MongoDB connection error
**Solution:**
- Verify `MONGODB_URI` is correctly set in Vercel
- Check MongoDB Atlas network access settings
- Ensure database name is correct

### Google OAuth doesn't work
**Solution:**
- Update `NEXTAUTH_URL` to match your exact Vercel URL
- Verify authorized domains in Google Cloud Console
- Clear browser cookies and try again

### Images not loading
**Solution:**
- Check `NEXT_PUBLIC_IMAGEBB_API_KEY` is set in Vercel
- Verify `next.config.mjs` includes image domains

### API routes return 500 errors
**Solution:**
- Check Vercel function logs for detailed errors
- Verify all environment variables are set correctly
- Test MongoDB connection

---

## 📊 Performance Features

Your app now includes:

- ✅ **Direct Database Queries**: Faster builds
- ✅ **React Cache**: Automatic deduplication
- ✅ **ISR (Incremental Static Regeneration)**:
  - Products cache: 30 minutes
  - Categories cache: 30 minutes
  - Reviews cache: 5 minutes

---

## 🔒 Security Best Practices

- ✅ Never commit `.env.local` to GitHub
- ✅ All secrets stored in Vercel environment variables
- ✅ GitHub push protection enabled
- ⚠️ Rotate secrets if accidentally exposed

---

## 📚 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Network Access](https://docs.atlas.mongodb.com/security/ip-access-list/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

## 🎉 Success!

Once deployed, your app will be live at:
```
https://your-vercel-app.vercel.app
```

Congratulations on fixing the deployment error! 🚀
