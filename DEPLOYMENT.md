# Deployment Guide

## Prerequisites

- Node.js 18+ (or use the version specified in `.nvmrc`)
- npm or yarn
- GitHub account (for version control)
- Vercel account (for deployment)

## Step-by-Step Deployment

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Axiom Trade token table replica"
```

### 2. Push to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/eterna.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### 4. Verify Deployment

After deployment, Vercel will provide you with:
- Production URL: `https://your-project.vercel.app`
- Preview URLs for each commit

## Environment Variables

No environment variables are required for this project as it uses mock data.

If you need to add real API endpoints later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

## Performance Optimization

The application is already optimized for:
- ✅ Code splitting (Next.js automatic)
- ✅ Image optimization (Next.js Image component)
- ✅ Memoized components
- ✅ Efficient state management
- ✅ Minimal bundle size

## Monitoring

After deployment, monitor:
- **Performance**: Vercel Analytics (if enabled)
- **Errors**: Vercel Logs
- **Lighthouse Score**: Use Chrome DevTools or PageSpeed Insights

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Run `npm install` locally to verify dependencies
- Check build logs in Vercel dashboard

### Runtime Errors
- Check Vercel function logs
- Verify all environment variables are set
- Ensure API endpoints are accessible

## Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Every push to other branches → Preview deployment

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 24 hours)

