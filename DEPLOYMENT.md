# Deployment Guide

This document provides instructions for deploying the Jupiter Finance Launch site to various platforms.

## GitHub Pages

### Prerequisites
- GitHub repository with settings configured

### Steps

1. Update `vite.config.ts` if deploying to a subdirectory:
```typescript
export default defineConfig({
  base: '/repository-name/', // If deploying to github.com/user/repo
  // ... rest of config
});
```

2. Create a GitHub Actions workflow at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Set source to "GitHub Actions"

## Vercel

### Steps

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Deploy with one click or automatic on push

### Environment Variables
Set in Vercel dashboard if needed:
```
VITE_API_URL=https://api.example.com
```

## Netlify

### Steps

1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. Deploy

### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## AWS Amplify

### Steps

1. Connect GitHub repository to AWS Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy and configure custom domain

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and Run

```bash
docker build -t jupiter-finance-launch .
docker run -p 3000:3000 jupiter-finance-launch
```

## Environment Variables

Create `.env.local` for development (not committed):
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Jupiter Finance
```

For production, set these in your deployment platform's environment settings.

## Performance Checklist

Before deploying to production:

- [ ] Run `npm run build` and check for warnings
- [ ] Run `npm run lint` and fix any issues
- [ ] Test the production build locally: `npm run preview`
- [ ] Check bundle size in build output
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Verify all links and forms work
- [ ] Check SSL certificate (HTTPS)

## Monitoring

### Tools

- **Sentry** - Error tracking
- **LogRocket** - Session replay and debugging
- **Google Analytics** - Traffic analytics
- **Lighthouse** - Performance monitoring

### Setup Example (Sentry)

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
  });
}
```

## Rollback Procedure

### GitHub Pages
- Revert the commit and push

### Vercel/Netlify
- Use the deployment history to rollback to previous version

### Manual Rollback
```bash
git revert <commit-hash>
git push origin main
```

## Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Support

For deployment issues:
1. Check deployment platform logs
2. Run local production build: `npm run build && npm run preview`
3. Check environment variables
4. Verify all dependencies are installed

