# Railway Environment Variables Configuration

## ⚠️ CRITICAL: Set These on Railway Dashboard

**Railway Dashboard → Your Project → Variables**

### Required Variables

```bash
# Anthropic API Key (REQUIRED)
CLAUDE_API_KEY=sk-ant-api03-xxx

# Content Directory - Points to volume storage (REQUIRED FOR PERSISTENCE)
CONTENT_DIR=/app/data/content

# Data Directory - Already defaults to /app/data but explicit is better
DATA_DIR=/app/data

# Site Configuration
NODE_ENV=production
SITE_URL=https://techpulsedailyapp-production.up.railway.app
PORT=3000

# Admin Credentials (use strong password!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password-here
```

### Optional Variables

```bash
# Reddit API (if using Reddit scraping)
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-secret

# Debug/Logging
DEBUG=false
LOG_LEVEL=info
```

## Why CONTENT_DIR=/app/data/content?

**Problem:** `content/posts/*.mdx` files are gitignored by design (CMS pattern)

**Solution:**
- Railway volume mounted at: `/app/data`
- Set `CONTENT_DIR=/app/data/content` to write published articles to volume
- PathResolver reads from `CONTENT_DIR` environment variable (paths.ts:21-22)
- Articles persist across deployments on Railway's persistent volume

## Volume Configuration

**Railway Dashboard → Service → Settings → Volumes**

```yaml
Volume Name: techpulse-data
Mount Path: /app/data
Size: Start at 1GB (auto-scales to 5GB)
```

## Verification Steps

After setting environment variables and deploying:

1. **Check Logs** (Railway Dashboard → Deployments → Logs):
   ```
   🚀 TechPulse Daily - Starting...
   📁 Directory Structure:
     Data Dir: /app/data (volume)
     Content Dir: /app/data/content (env controlled)
     Queue Dir: /app/data/queue
   ```

2. **Verify Paths in Production**:
   ```bash
   railway run ls -la /app/data/content/posts
   ```

3. **Test Publishing**:
   - Visit `/admin` on production
   - Scrape articles
   - Approve → Publish
   - Check home page for articles

## Troubleshooting

### Issue: "No articles published yet" after publishing

**Check:**
```bash
# 1. Verify CONTENT_DIR is set
railway variables | grep CONTENT_DIR

# 2. Check if files exist on volume
railway run ls -la /app/data/content/posts

# 3. Check app logs for path resolution
railway logs --search "Content Dir"
```

**Fix:**
- Ensure `CONTENT_DIR=/app/data/content` is set
- Restart Railway service
- Re-publish articles via `/admin`

### Issue: Permission denied errors

**Check ownership:**
```bash
railway run ls -la /app/data
```

**Should show:**
```
drwxr-xr-x nextjs nodejs /app/data/content
```

If not, entrypoint script failed. Check deploy logs.

## Current Values (Reference Only - DO NOT COMMIT)

**Production (Railway):**
- CLAUDE_API_KEY: sk-ant-api03-[REDACTED]
- CONTENT_DIR: /app/data/content ✅
- DATA_DIR: /app/data ✅
- SITE_URL: https://techpulsedailyapp-production.up.railway.app

**Local (.env.local):**
- CLAUDE_API_KEY: sk-ant-api03-[REDACTED]
- CONTENT_DIR: (not set - defaults to ./content)
- DATA_DIR: (not set - defaults to ./data)
- SITE_URL: http://localhost:3000
