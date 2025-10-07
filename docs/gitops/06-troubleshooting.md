# Troubleshooting Guide

> **Common issues, root causes, and battle-tested solutions**

**Version:** 2.0.0
**Last Updated:** January 2025
**Maintained By:** [Team]

---

## Table of Contents

1. [Homepage Issues](#homepage-issues)
2. [Docker Build Issues](#docker-build-issues)
3. [Volume & Path Issues](#volume--path-issues)
4. [API & Authentication Errors](#api--authentication-errors)
5. [Scraping Problems](#scraping-problems)
6. [Publishing Failures](#publishing-failures)
7. [Performance Issues](#performance-issues)
8. [Debugging Tools](#debugging-tools)

---

## Homepage Issues

### ❌ Homepage shows "No articles published yet" despite published articles existing

**Symptoms:**
- Admin dashboard shows N published articles
- Homepage displays "No articles published yet"
- `/api/admin/debug` shows MDX files exist

**Root Cause:**
ISR (Incremental Static Regeneration) cache built during Docker image creation (before volume mount) persists and serves stale empty state.

**Timeline of Bug:**
```
1. Docker build runs `npm run build`
2. Homepage pre-renders with getPosts() = []
   (volume not mounted yet → no MDX files)
3. Container starts, volume mounts with MDX files
4. ISR serves cached empty state from step 2
5. User sees "No articles" even though files exist
```

**Solution:**
```typescript
// src/app/page.tsx
export const revalidate = 0; // Forces fresh data every request
```

**Why This Works:**
- `revalidate = 0` bypasses Docker build cache
- Forces server-side rendering on every page load
- Always reads current MDX files from mounted volume

**Alternatives Tested:**
- ❌ `dynamic = 'force-dynamic'` → 500 errors (incompatible with `fs` module)
- ❌ `revalidate = 60` → Stale cache for 60 seconds
- ✅ `revalidate = 0` → Works perfectly

**Verification Steps:**
```bash
# 1. Check MDX files exist
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/debug"

# Expected output:
{
  "paths": {
    "postsDir": "/app/data/content/posts",
    "files": {
      "postsDir": ["2025-01-15-article.mdx", ...]
    }
  }
}

# 2. Verify homepage code
grep "revalidate" src/app/page.tsx
# Should show: export const revalidate = 0;

# 3. Test homepage
curl https://your-domain.com/
# Should show article HTML, not "No articles published yet"
```

**Commit Reference:** `fix: Use revalidate=0 to bypass ISR cache from Docker build`

---

### ❌ Homepage shows 500 Internal Server Error

**Symptoms:**
- Homepage crashes with 500 error
- Admin dashboard works fine (`/admin`)
- API endpoints respond normally

**Common Root Causes:**

#### 1. **Missing `CONTENT_DIR` Environment Variable**

**Check:**
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/debug-env"
```

**Expected:**
```json
{
  "env": {
    "CONTENT_DIR": "/app/data/content",  # Must be set
    "DATA_DIR": "/app/data"
  }
}
```

**Fix:**
Set environment variable in your container platform:
```bash
CONTENT_DIR=/app/data/content
DATA_DIR=/app/data
```

#### 2. **`config.getConfig()` Errors**

**Symptom:**
```
Error: Cannot find module 'config/site.json'
```

**Problem:**
Code tries to load config file that doesn't exist or has wrong path.

**Solution:**
Replace `config.getConfig()` calls with hardcoded values:

```typescript
// ❌ Before (causes crashes)
const siteConfig = config.getConfig('site');

// ✅ After (works reliably)
const siteConfig = {
  site: {
    name: 'TechPulse Daily',
    url: process.env.SITE_URL || 'https://techpulsedaily.app'
  }
};
```

**Files to check:**
- `src/app/page.tsx`
- `src/lib/publisher.ts`

**Commit Reference:** `fix: Remove config.getConfig calls to prevent crashes`

#### 3. **`force-dynamic` with fs module**

**Symptom:**
```
Error: fs module not available in dynamic routes
```

**Solution:**
Use `revalidate = 0` instead of `dynamic = 'force-dynamic'`:

```typescript
// ❌ Don't use with fs module
export const dynamic = 'force-dynamic';

// ✅ Use this
export const revalidate = 0;
```

---

## Docker Build Issues

### ❌ Build fails with "Module not found"

**Symptoms:**
```
Error: Cannot find module '@/lib/...'
Module not found: Can't resolve 'fs'
```

**Solutions:**

#### Check tsconfig paths
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Verify Dockerfile COPY commands
```dockerfile
# Ensure all required directories copied
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/config ./config
COPY --from=builder /app/content ./content  # ← Must copy
```

#### Test build locally
```bash
# Build Docker image
docker build -t techpulse-test .

# Check for errors in build output
# Look for "ERROR" or "Failed"
```

---

### ❌ Build succeeds but container crashes on startup

**Check logs:**
```bash
# View container logs
docker logs <container-id>

# Common errors:
# - "ENOENT: no such file or directory"
# - "Permission denied"
# - "Port 3000 already in use"
```

**Solutions:**

#### 1. **Missing data directories**
```bash
# In docker-entrypoint.sh
mkdir -p /app/data/queue/{pending,approved,rejected,published}
mkdir -p /app/data/content/posts
```

#### 2. **Permission issues**
```bash
# Fix ownership
chown -R nextjs:nodejs /app/data
```

#### 3. **Port conflicts**
```bash
# Use different port
docker run -p 3001:3000 techpulse
```

---

## Volume & Path Issues

### ❌ "Permission denied" writing to `/app/data`

**Symptom:**
```
Error: EACCES: permission denied, mkdir '/app/data/queue/pending'
```

**Root Cause:**
Docker volume mounted with root ownership, but app runs as `nextjs` user.

**Solution:**
```bash
# In docker-entrypoint.sh
#!/bin/sh
set -e

# Fix volume permissions (use || true to ignore errors if already correct)
chown -R nextjs:nodejs /app/data || true

# Start application
exec su-exec nextjs node server.js
```

**Verify:**
```bash
# Check directory ownership
docker exec <container-id> ls -la /app/data

# Should show:
drwxr-xr-x nextjs nodejs /app/data
```

---

### ❌ Path mismatch: Publisher writes to different directory than homepage reads

**Symptoms:**
- Admin shows "3 published articles"
- MDX files visible in debug endpoint
- Homepage still shows "No articles"

**Root Cause:**
`CONTENT_DIR` environment variable not set → paths resolve differently.

**Check paths:**
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/debug"
```

**Expected (CORRECT):**
```json
{
  "paths": {
    "postsDir": "/app/data/content/posts",
    "contentDir": "/app/data/content"
  }
}
```

**If you see this (WRONG):**
```json
{
  "paths": {
    "postsDir": "/app/content/posts",  # ← Missing /data/!
    "contentDir": "/app/content"
  }
}
```

**Solution:**
Set environment variable:
```bash
CONTENT_DIR=/app/data/content
```

**Why this happens:**
```typescript
// src/lib/shared/paths.ts
static get contentDir(): string {
  // Without CONTENT_DIR env var, defaults to process.cwd()/content
  return process.env.CONTENT_DIR || path.join(process.cwd(), 'content');
}
```

---

## API & Authentication Errors

### ❌ "Unauthorized" on all `/api/admin/*` endpoints

**Symptom:**
```json
{"error":"Unauthorized"}
```

**Root Cause:**
Missing or incorrect `x-api-key` header.

**Solution:**
```bash
# ✅ Correct request
curl -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/articles?type=pending"

# ❌ Wrong (missing header)
curl "https://your-domain.com/api/admin/articles?type=pending"
```

**Change API key:**
```typescript
// src/lib/auth/authMiddleware.ts
const VALID_API_KEY = process.env.ADMIN_API_KEY || 'admin-session-key';
```

Then set environment variable:
```bash
ADMIN_API_KEY=your-secure-key-here
```

---

### ❌ Admin dashboard login fails

**Symptoms:**
- Username/password correct but login fails
- "Invalid credentials" error

**Check:**
```bash
# Verify environment variables set
echo $ADMIN_USERNAME
echo $ADMIN_PASSWORD

# Should output configured values
```

**Solution:**
```bash
# Set in environment
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

**Test password hash:**
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

---

## Scraping Problems

### ❌ Scraping returns 0 articles

**Symptoms:**
- Click "Scrape Articles" in admin
- Returns `{"scraped":0,"processed":0,"queued":0}`

**Root Causes:**

#### 1. **API Credentials Missing**
```bash
# Check environment variables
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/debug-env"

# Must have:
CLAUDE_API_KEY=sk-ant-...
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
```

#### 2. **Score Threshold Too High**
```json
// config/sources.json
{
  "subreddits": [
    {
      "name": "LocalLLaMA",
      "scoreThreshold": 10  // ← Lower this if no results
    }
  ]
}
```

**Test scraping:**
```bash
# Manual scrape
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/scrape"

# Check logs for errors
docker logs <container-id> | grep "ERROR"
```

#### 3. **Quality Threshold Too High**
```typescript
// src/lib/processor.ts
const quality = processedArticles.filter(a => a.qualityScore >= 6);
//                                                              ^^
// Lower this threshold if Claude scores articles lower
```

---

### ❌ Claude API errors during scraping

**Symptoms:**
```
Error: Anthropic API error: 401 Unauthorized
Error: Rate limit exceeded
```

**Solutions:**

#### 401 Unauthorized
```bash
# Verify API key
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $CLAUDE_API_KEY" \
  -H "anthropic-version: 2023-06-01"

# Should return 400 (missing body), not 401
```

#### Rate Limiting
```typescript
// Add delays between API calls
await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
```

---

## Publishing Failures

### ❌ "Publish Articles" button does nothing

**Symptoms:**
- Click "Publish Articles"
- No error shown
- Articles remain in "Approved" queue

**Debug:**
```bash
# 1. Check approved queue
curl -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/articles?type=approved"

# 2. Manually trigger publish
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/publish"

# 3. Check response
# Should show: {"published":3,"errors":[]}
```

**Common Errors:**

#### Permission denied writing MDX files
```bash
# Fix permissions
chown -R nextjs:nodejs /app/data/content
```

#### Directory doesn't exist
```bash
# Create directory
mkdir -p /app/data/content/posts
```

---

### ❌ MDX files created but homepage doesn't update

**See:** [Homepage Issues → "No articles published yet"](#-homepage-shows-no-articles-published-yet-despite-published-articles-existing)

**Quick fix:**
```typescript
// src/app/page.tsx
export const revalidate = 0;
```

---

## Performance Issues

### ❌ Slow homepage loading

**Causes:**
1. **No caching** - `revalidate = 0` means fresh render every request
2. **Large MDX files** - Many posts with long content
3. **Filesystem reads** - Reading all `.mdx` files on every request

**Solutions:**

#### 1. Implement Redis caching
```typescript
// Future enhancement
const cached = await redis.get('homepage-posts');
if (cached) return JSON.parse(cached);
```

#### 2. Limit posts displayed
```typescript
// src/app/page.tsx
const recentPosts = allPosts.slice(0, 10); // Only show 10 latest
```

#### 3. Use ISR with longer revalidation
```typescript
// Balance freshness vs. performance
export const revalidate = 60; // Cache for 60 seconds
```

**Trade-off:** Longer cache = better performance, but articles appear slower after publish.

---

### ❌ High memory usage

**Symptoms:**
- Container crashes with OOM (Out Of Memory)
- "JavaScript heap out of memory" errors

**Solutions:**

#### Increase Node.js memory limit
```bash
# In Dockerfile CMD or start command
NODE_OPTIONS="--max-old-space-size=2048" node server.js
```

#### Optimize article processing
```typescript
// Process in smaller batches
const batches = chunk(articles, 10); // 10 at a time instead of all
for (const batch of batches) {
  await processBatch(batch);
}
```

---

## Debugging Tools

### Built-in Debug Endpoints

#### 1. **Health Check**
```bash
curl https://your-domain.com/api/health

# Returns:
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

#### 2. **Path Inspection**
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/debug"

# Returns:
{
  "paths": {
    "postsDir": "/app/data/content/posts",
    "contentDir": "/app/data/content",
    "exists": {
      "postsDir": true,
      "contentDir": true
    },
    "files": {
      "postsDir": ["2025-01-15-article.mdx"],
      "contentDir": ["index.mdx", "posts"]
    }
  }
}
```

#### 3. **Environment Variables**
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/debug-env"

# Returns:
{
  "env": {
    "CONTENT_DIR": "/app/data/content",
    "DATA_DIR": "/app/data",
    "NODE_ENV": "production",
    "cwd": "/app"
  },
  "resolved": {
    "contentDir": "/app/data/content",
    "postsDir": "/app/data/content/posts",
    "dataDir": "/app/data"
  }
}
```

---

### Container Debugging

#### Access running container
```bash
# Get container ID
docker ps

# Enter container shell
docker exec -it <container-id> sh

# Check files
ls -la /app/data/content/posts
cat /app/data/queue/pending/*.json

# Check processes
ps aux

# Check environment
env | grep CONTENT_DIR
```

#### View logs
```bash
# Real-time logs
docker logs -f <container-id>

# Last 100 lines
docker logs --tail 100 <container-id>

# Filter errors only
docker logs <container-id> 2>&1 | grep ERROR
```

---

### Local Development Debugging

#### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

#### Check file system
```bash
# List pending articles
ls -la data/queue/pending/

# List published articles
ls -la data/content/posts/

# Count files
find data/queue -name "*.json" | wc -l
```

#### Test API endpoints locally
```bash
# Start dev server
npm run dev

# Test scraping
curl -X POST -H "x-api-key: admin-session-key" \
  "http://localhost:3000/api/scrape"

# Test publishing
curl -X POST -H "x-api-key: admin-session-key" \
  "http://localhost:3000/api/admin/publish"
```

---

## Common Error Messages Decoded

| Error | Meaning | Solution |
|-------|---------|----------|
| `ENOENT: no such file or directory` | File/directory doesn't exist | Create missing directory |
| `EACCES: permission denied` | Insufficient permissions | Fix ownership: `chown nextjs:nodejs` |
| `EADDRINUSE: address already in use` | Port 3000 taken | Use different port or stop conflicting process |
| `Cannot find module '@/lib/...'` | TypeScript path alias issue | Check `tsconfig.json` paths |
| `fs module not available` | Using `fs` in dynamic route | Use `revalidate = 0` instead of `dynamic = 'force-dynamic'` |
| `Unauthorized` | Missing/wrong API key | Add `x-api-key` header |
| `500 Internal Server Error` | Multiple possible causes | Check logs, verify env vars, test locally |

---

## Preventive Measures

### Before Deploying

✅ Test Docker build locally:
```bash
docker build -t techpulse-test .
docker run -p 3000:3000 -e CLAUDE_API_KEY="..." techpulse-test
```

✅ Verify environment variables set

✅ Check TypeScript compiles:
```bash
npm run build
```

✅ Test on localhost first

✅ Review logs for warnings

---

## Getting Help

1. **Check this guide** - Most common issues documented
2. **Review recent commits** - Bug fixes often have detailed explanations
3. **Check debug endpoints** - Built-in tools reveal many issues
4. **Read Docker logs** - Errors usually visible in logs
5. **Test locally** - Reproduce issue in dev environment

---

**Maintained By:** [Team]
**Version:** 2.0.0
**Last Updated:** January 2025
