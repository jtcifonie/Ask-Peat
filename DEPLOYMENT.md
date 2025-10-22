# Deployment Guide for Ask Dr. Peat

## Option 1: Render (Recommended) 🚀

### Steps:
1. **Push to GitHub**: Commit and push your code to a GitHub repository
2. **Sign up at Render**: Go to [render.com](https://render.com) and sign up with GitHub
3. **Create Web Service**: 
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Build Command**: `npm run install:all`
     - **Start Command**: `npm start`
     - **Environment**: Node
     - **Plan**: Free

4. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: Your Gemini API key
   - `PORT`: `10000` (Render will override this)

5. **Deploy**: Click "Create Web Service" and wait for deployment

### Frontend Deployment:
1. **Create Static Site**: 
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - **Build Command**: `npm run frontend:build`
   - **Publish Directory**: `build`
   - **Environment Variable**: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`

## Option 2: Railway 🚂

### Steps:
1. **Sign up at Railway**: Go to [railway.app](https://railway.app)
2. **Connect GitHub**: Link your repository
3. **Deploy**: Railway auto-detects Node.js and deploys
4. **Environment Variables**: Add `GEMINI_API_KEY` in dashboard

## Option 3: Vercel + Railway (Split) 🔄

### Frontend (Vercel):
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Deploy React app
4. Set `REACT_APP_API_URL` to your backend URL

### Backend (Railway):
1. Deploy backend separately on Railway
2. Use Railway URL in frontend environment variable

## Environment Variables Needed:

### Backend:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `NODE_ENV`: `production`
- `PORT`: Will be set by hosting service

### Frontend:
- `REACT_APP_API_URL`: Your backend URL (e.g., `https://ask-peat-backend.onrender.com`)

## Quick Start Commands:

```bash
# Install dependencies
npm run install:all

# Test locally
npm run dev

# Build for production
npm run build
```

## Notes:
- Render free tier: 750 hours/month, 100GB bandwidth
- Railway free tier: $5 credit monthly
- Both support custom domains
- SSL certificates included
- Auto-deploys on git push

Choose Render for the easiest full-stack deployment! 🎉
