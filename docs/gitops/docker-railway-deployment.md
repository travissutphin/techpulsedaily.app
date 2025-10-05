# Docker & Railway Deployment - GitOps Documentation

## Overview
Complete guide for containerizing TechPulse Daily Next.js app and deploying to Railway.app with persistent storage and auto-deployment from GitHub.

**Version:** 1.0.0
**Last Updated:** October 5, 2025
**Maintained By:** [Flow], [Gordon]

---

## Architecture Overview

```
┌─────────────────────────────────┐
│  GitHub Repository              │
│  github.com/travissutphin/      │
│  techpulsedaily.app             │
└────────────┬────────────────────┘
             │ git push
             ▼
┌─────────────────────────────────┐
│  Railway.app                    │
│  ┌───────────────────────────┐  │
│  │  Auto-Build Trigger       │  │
│  │  (GitHub Webhook)         │  │
│  └─────────────┬─────────────┘  │
│                ▼                │
│  ┌───────────────────────────┐  │
│  │  Docker Build             │  │
│  │  (Multi-stage)            │  │
│  │  - Base: node:18-alpine   │  │
│  │  - Dependencies layer     │  │
│  │  - Build layer            │  │
│  │  - Production layer       │  │
│  └─────────────┬─────────────┘  │
│                ▼                │
│  ┌───────────────────────────┐  │
│  │  Container Runtime        │  │
│  │  Port: 3000               │  │
│  │  Volume: /app/data        │  │
│  │  Env: Production          │  │
│  └─────────────┬─────────────┘  │
│                ▼                │
│  ┌───────────────────────────┐  │
│  │  Public URL               │  │
│  │  techpulsedailyapp-       │  │
│  │  production.up.railway.app│  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## Docker Setup

### Multi-Stage Dockerfile

**Location:** `Dockerfile` (project root)

```dockerfile
# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# ============================================
# Stage 2: Build
# ============================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN npm run build

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:18-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy config and content directories
COPY --from=builder /app/config ./config
COPY --from=builder /app/content ./content

# Create data directory for persistent storage
RUN mkdir -p /app/data/queue/{pending,approved,rejected} && \
    chown -R nextjs:nodejs /app/data

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "server.js"]
```

### Entrypoint Script (Railway-specific)

**Location:** `entrypoint.sh`

```bash
#!/bin/sh
set -e

echo "🚀 Starting TechPulse Daily..."

# Ensure data directory exists with correct permissions
mkdir -p /app/data/queue/{pending,approved,rejected,published}
chown -R nextjs:nodejs /app/data || true

# Log environment info
echo "NODE_ENV: $NODE_ENV"
echo "Data directory: /app/data"
echo "Config files: $(ls -la /app/config 2>/dev/null | wc -l) files"

# Start Next.js server
exec node server.js
```

### Local Docker Build & Test

```bash
# 1. Build Docker image
docker build -t techpulse-daily:latest .

# 2. Run container locally
docker run -d \
  --name techpulse \
  -p 3000:3000 \
  -e CLAUDE_API_KEY="sk-ant-your-key" \
  -e NODE_ENV=production \
  -v $(pwd)/data:/app/data \
  techpulse-daily:latest

# 3. View logs
docker logs -f techpulse

# 4. Test endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/

# 5. Stop and remove
docker stop techpulse
docker rm techpulse
```

### Docker Compose (Optional Local Development)

**Location:** `docker-compose.yml`

```yaml
version: '3.8'

services:
  techpulse:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - SITE_URL=http://localhost:3000
    volumes:
      - ./data:/app/data
      - ./config:/app/config:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  data:
    driver: local
```

```bash
# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Railway.app Deployment

### Initial Setup

**1. Create Railway Account**
- Visit https://railway.app
- Sign up with GitHub
- Link repository: `travissutphin/techpulsedaily.app`

**2. Create New Project**
```bash
# Via Railway CLI (alternative)
npm install -g @railway/cli
railway login
railway init
railway up
```

### Environment Variables Configuration

**Railway Dashboard → Settings → Variables**

```bash
# Required Variables
CLAUDE_API_KEY=sk-ant-api03-xxx        # Anthropic API key
NODE_ENV=production                     # Production mode
SITE_URL=https://your-domain.com        # Production URL

# Optional Variables
ADMIN_USERNAME=admin                    # Admin login
ADMIN_PASSWORD=strong-password-here     # Secure password
REDDIT_CLIENT_ID=xxx                    # Reddit API (if used)
REDDIT_CLIENT_SECRET=xxx
PORT=3000                               # Server port (Railway auto-assigns)
```

**Environment Variable Best Practices:**
- ✅ Use Railway's built-in secret management
- ✅ Never commit `.env` files to git
- ✅ Rotate API keys monthly
- ✅ Use different keys for dev/prod

### Persistent Volume Setup

**Railway Dashboard → Service → Settings → Volumes**

**Configuration:**
```yaml
Volume Name: techpulse-data
Mount Path: /app/data
Size: 5 GB (starts at 1GB, auto-scales)
```

**Purpose:**
- Stores article queue (pending/approved/rejected)
- Persists across deployments
- Survives container restarts

**Permissions Fix (entrypoint.sh):**
```bash
#!/bin/sh
# Fix volume permissions on Railway
chown -R nextjs:nodejs /app/data || true
```

### GitHub Auto-Deployment

**Railway Configuration:**

1. **Connect Repository:**
   - Railway Dashboard → New Project
   - Select "Deploy from GitHub repo"
   - Choose: `travissutphin/techpulsedaily.app`
   - Branch: `main`

2. **Build Settings:**
   ```yaml
   Build Command: (Auto-detected from Dockerfile)
   Start Command: node server.js
   Root Directory: /
   ```

3. **Deploy Triggers:**
   - ✅ Auto-deploy on `git push origin main`
   - ✅ Webhook integration (automatic)
   - Build time: ~30-60 seconds

**Deployment Flow:**
```bash
# Local development
git add .
git commit -m "feat: Add new feature"
git push origin main

# Railway auto-detects push
# → Triggers build
# → Runs Docker build
# → Deploys new container
# → Routes traffic to new version
# → Health check passes
# → Old container removed
```

### Railway CLI Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs (live)
railway logs

# Run command in Railway environment
railway run npm run build

# Set environment variable
railway variables set CLAUDE_API_KEY="sk-ant-xxx"

# Open dashboard
railway open

# Deploy manually (if needed)
railway up

# Restart service
railway restart
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Update `package.json` version
- [ ] Test Docker build locally
- [ ] Verify environment variables in `.env.local`
- [ ] Run `npm run build` successfully
- [ ] Check for TypeScript errors
- [ ] Review security audit: `npm audit`

### Deployment

- [ ] Commit all changes to git
- [ ] Push to GitHub `main` branch
- [ ] Monitor Railway build logs
- [ ] Wait for deployment (30-60s)
- [ ] Verify health check passes

### Post-Deployment

- [ ] Test production URL
- [ ] Verify scraping works: `/api/scrape`
- [ ] Check admin dashboard: `/admin`
- [ ] Test article publishing flow
- [ ] Monitor Railway metrics
- [ ] Check error logs

---

## Monitoring & Debugging

### Railway Dashboard Metrics

**Metrics Available:**
- CPU usage %
- Memory usage (MB)
- Network I/O
- Request count
- Response times
- Error rates

**Alerts Configuration:**
```yaml
# Railway Dashboard → Observability
Alerts:
  - CPU > 80% for 5 minutes
  - Memory > 90% for 5 minutes
  - Error rate > 5% for 10 minutes
  - Deployment fails
```

### Log Viewing

**Railway Dashboard Logs:**
```bash
# Real-time logs
railway logs --tail 100

# Filter by severity
railway logs --filter error

# Search logs
railway logs --search "API error"
```

**Application Logs:**
```bash
# Inside container
docker exec -it techpulse sh
tail -f /app/logs/app.log
```

### Health Check Endpoint

**File:** `src/app/api/health/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  };

  return NextResponse.json(health);
}
```

**Test Health:**
```bash
curl https://techpulsedailyapp-production.up.railway.app/api/health
```

---

## Troubleshooting

### Issue: Build Fails on Railway

**Symptoms:**
- Railway build errors
- "Module not found" errors
- TypeScript compilation errors

**Solutions:**
```bash
# 1. Check build logs
railway logs --filter "error"

# 2. Test build locally
npm run build

# 3. Verify package.json scripts
npm run build -- --no-lint

# 4. Check Dockerfile COPY commands
# Ensure all required files are copied
```

### Issue: Environment Variables Not Loading

**Symptoms:**
- API errors: "Missing CLAUDE_API_KEY"
- 500 errors on API routes

**Solutions:**
```bash
# 1. Verify variables in Railway dashboard
railway variables

# 2. Check for typos in variable names
# Railway Dashboard → Variables → Review

# 3. Restart service
railway restart

# 4. Redeploy
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### Issue: Volume Permissions Error

**Symptoms:**
- "EACCES: permission denied" errors
- Cannot write to `/app/data`

**Solutions:**
```bash
# 1. Update entrypoint.sh
chown -R nextjs:nodejs /app/data || true

# 2. Rebuild with updated entrypoint
git add entrypoint.sh Dockerfile
git commit -m "fix: Volume permissions"
git push origin main

# 3. Verify volume mounted correctly
railway logs --search "data directory"
```

### Issue: Out of Memory (OOM)

**Symptoms:**
- Container crashes
- "JavaScript heap out of memory" errors

**Solutions:**
```bash
# 1. Increase Node.js memory limit
# In Dockerfile or Railway start command:
NODE_OPTIONS="--max-old-space-size=4096" node server.js

# 2. Optimize build
# Remove unused dependencies
npm prune --production

# 3. Upgrade Railway plan (if needed)
# Free: 512MB → Hobby: 8GB
```

---

## Rollback Procedures

### Railway Instant Rollback

```bash
# Via Railway Dashboard
1. Navigate to Deployments
2. Find last working deployment
3. Click "Redeploy"
4. Confirm rollback
```

### Git-Based Rollback

```bash
# 1. Find last working commit
git log --oneline

# 2. Revert to specific commit
git revert <commit-hash>

# 3. Push (triggers auto-deploy)
git push origin main

# Alternative: Force rollback
git reset --hard <commit-hash>
git push --force origin main
```

---

## Performance Optimization

### Docker Image Size Reduction

**Current:** ~292MB
**Optimized:** ~150MB (target)

```dockerfile
# 1. Use alpine base images
FROM node:18-alpine

# 2. Multi-stage builds (already implemented)

# 3. Remove dev dependencies
RUN npm ci --only=production

# 4. Clean npm cache
RUN npm cache clean --force

# 5. Remove unnecessary files
RUN rm -rf .git .github docs tests
```

### Railway Performance Tips

1. **Enable HTTP/2**
   - Auto-enabled on Railway
   - No configuration needed

2. **Use CDN for static assets**
   - Configure Cloudflare/Vercel CDN
   - Cache `public/` directory

3. **Database Connection Pooling**
   - If using database, enable pooling
   - Railway Postgres: Built-in

4. **Horizontal Scaling**
   - Railway Pro: Auto-scaling
   - Configure replicas: 2-5 instances

---

## CI/CD Pipeline (GitHub Actions - Future)

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway up --service techpulse-production
```

---

## Security Hardening

### Dockerfile Security

```dockerfile
# 1. Use non-root user
USER nextjs

# 2. Read-only filesystem
RUN chmod -R 555 /app

# 3. Drop capabilities
SECURITY-OPT: no-new-privileges:true

# 4. Scan for vulnerabilities
RUN npm audit fix
```

### Railway Security

1. **Enable 2FA** - Account → Security
2. **IP Whitelist** (Pro) - Restrict admin routes
3. **Secret Rotation** - Monthly API key updates
4. **SSL/TLS** - Auto-enabled on Railway
5. **DDoS Protection** - Cloudflare integration

---

## Cost Optimization

**Railway Pricing Tiers:**

| Tier | Price | Resources | Best For |
|------|-------|-----------|----------|
| **Hobby** | $5/month | 512MB RAM, 1GB storage | Development, testing |
| **Pro** | $20/month | 8GB RAM, 100GB storage | Production, low traffic |
| **Team** | $Custom | Custom resources | High traffic, multiple services |

**Cost Reduction Tips:**
1. Use Hobby tier for staging
2. Optimize Docker image size
3. Implement caching (Redis)
4. Use serverless for cron jobs
5. Archive old queue files

---

## Quick Reference

### Common Commands

```bash
# Local Docker
docker build -t techpulse .
docker run -p 3000:3000 techpulse

# Railway CLI
railway login
railway logs
railway restart

# Git Deployment
git push origin main

# Health Check
curl https://your-domain.com/api/health

# View Queue
railway run ls /app/data/queue/pending
```

### Important URLs

- **Production:** https://techpulsedailyapp-production.up.railway.app
- **Railway Dashboard:** https://railway.app/dashboard
- **GitHub Repo:** https://github.com/travissutphin/techpulsedaily.app
- **Admin Panel:** https://your-domain.com/admin

---

**Maintained by DevOps Team**
[Flow] - Railway Deployment & CI/CD
[Gordon] - Docker & Container Architecture
