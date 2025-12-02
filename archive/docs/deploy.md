# Vercel Deployment Guide

## Environment Variables to Set in Vercel Dashboard

When deploying to Vercel, add these environment variables in your project settings:

### Required Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   ```
   https://qyipzxwadmmhitvuiade.supabase.co
   ```

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5aXB6eHdhZG1taGl0dnVpYWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5OTIxNDUsImV4cCI6MjA3MzU2ODE0NX0.t-rlufbLcXcCoduqThuSE6YQ04vO68tVwmVZLlGFzqw
   ```

3. **SUPABASE_SERVICE_ROLE_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5aXB6eHdhZG1taGl0dnVpYWRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzk5MjE0NSwiZXhwIjoyMDczNTY4MTQ1fQ.QYXqq2Mh2YmAJ1XOdREhLyhrfy3R4_DZ5lgrUp3s_mY
   ```

## Deployment Steps:

### Option 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "New Project"
4. Import your Git repository
5. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (current directory)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
6. Add environment variables (see above)
7. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

## Configuration Files:

- `vercel.json` - Vercel configuration with security headers and region settings
- `.vercelignore` - Files to exclude from deployment
- `deploy.md` - This deployment guide

## Post-Deployment:

1. **Test the deployment** - Visit your Vercel URL
2. **Check environment variables** - Ensure all are set correctly
3. **Verify Supabase connection** - Test flight data loading
4. **Test admin functions** - User management, margin settings

## Important Notes:

- The app is configured for Seoul region (`icn1`) for optimal performance
- Security headers are enabled for production
- Service role key is used for admin operations
- All environment variables must be set for the app to function

## Troubleshooting:

- If build fails: Check TypeScript errors with `npm run build`
- If data doesn't load: Verify Supabase environment variables
- If 401 errors: Run the RLS policy fixes in Supabase SQL Editor
