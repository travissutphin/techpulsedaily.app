# Railway Setup Instructions - Volume-Based CMS

## 🎯 Goal
Enable production admin panel to manage articles (scrape→approve→publish) with persistent storage on Railway volume.

## 📋 Step-by-Step Setup

### Step 1: Add Environment Variables

**Railway Dashboard → Your Project → Variables → Add Variable**

Add these two critical variables:

```
Variable Name: CONTENT_DIR
Value: /app/data/content
```

```
Variable Name: DATA_DIR
Value: /app/data
```

**Why these are needed:**
- `CONTENT_DIR=/app/data/content` - Publisher writes MDX files here (on volume)
- `DATA_DIR=/app/data` - Queue system stores articles here (on volume)
- PathResolver reads these env vars and uses volume paths instead of git paths
- Articles persist across Railway redeployments

### Step 2: Deploy

After adding environment variables:

1. Click **"Deploy"** button in Railway dashboard
2. Wait for deployment to complete (~60-90 seconds)
3. Check deployment logs for confirmation

**Look for in logs:**
```
📁 Directory Structure:
  Data Dir: /app/data (volume)
  Content Dir: /app/data/content (env controlled)
  Queue Dir: /app/data/queue
```

### Step 3: Verify Production Admin Workflow

Visit: `https://techpulsedailyapp-production.up.railway.app/admin`

**Test complete workflow:**

1. **Scrape articles**
   - Click "Scrape Articles" button
   - Wait for processing to complete
   - Verify articles appear in "Pending Review" tab

2. **Approve articles**
   - Review pending articles
   - Click "Approve" on desired articles
   - Verify they move to "Approved" tab

3. **Publish articles**
   - Go to "Approved" tab
   - Click "Publish Approved Articles" button
   - Wait for publishing to complete

4. **Verify on home page**
   - Visit: `https://techpulsedailyapp-production.up.railway.app/`
   - Articles should appear on home page
   - No git commit required!

### Step 4: Verify Persistence

**Test that articles survive redeployment:**

1. Publish some articles via admin panel
2. Trigger a redeploy (Railway Dashboard → Deploy)
3. After deployment completes, visit home page
4. Articles should still be visible

## 🔧 Troubleshooting

### Issue: "No articles published yet" on home page

**Check:**
```bash
# Via Railway Dashboard → Service → Shell (if available)
ls -la /app/data/content/posts
```

**Should show:**
```
-rw-r--r-- 1 nextjs nodejs 2025-10-05-article-slug.mdx
```

**If directory is empty:**
- Environment variables not set correctly
- Re-check CONTENT_DIR and DATA_DIR values
- Redeploy after fixing

### Issue: Permission denied errors

**Check logs for:**
```
Error: EACCES: permission denied, mkdir '/app/data/content'
```

**Fix:**
- Entrypoint script should handle this automatically
- Check docker-entrypoint.sh is executable
- Verify volume is mounted at `/app/data`

### Issue: Articles disappear after redeploy

**Root cause:**
- CONTENT_DIR not set (using git path `/app/content` instead of volume `/app/data/content`)
- Volume not properly mounted

**Fix:**
- Verify environment variables are set
- Check Railway volume configuration (Service → Settings → Volumes)

## 📊 Expected Behavior

**After this setup:**

✅ Admin panel on production scrapes articles
✅ Articles can be approved/rejected directly on production
✅ Published articles appear on production home page
✅ Articles persist across Railway redeployments
✅ No git commits needed for article management
❌ Localhost and production have separate article databases

**Localhost workflow (unchanged):**
- Use for development/testing
- Scrape, approve, publish locally
- Local articles stored in `./data/` directory (not synced to production)

**Production workflow (new CMS approach):**
- Manage articles entirely through production admin panel
- Articles stored on Railway volume `/app/data/`
- Persist across deployments
- Independent from git repository

## 🎉 Success Checklist

- [ ] CONTENT_DIR environment variable set to `/app/data/content`
- [ ] DATA_DIR environment variable set to `/app/data`
- [ ] Railway deployment successful with correct logs
- [ ] Can scrape articles on production admin
- [ ] Can approve articles on production admin
- [ ] Can publish articles on production admin
- [ ] Published articles visible on production home page
- [ ] Articles persist after triggering new deployment
- [ ] No git commits required for article publishing

## 📝 Notes

- This approach treats production as a true CMS
- Localhost remains for development/testing
- Article content managed separately on each environment
- Railway volume provides persistent storage
- PathResolver uses environment variables for path resolution
