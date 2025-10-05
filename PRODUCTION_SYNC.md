# Production Articles Sync Instructions

## Current Situation

**Problem:** Production has 5 published articles, but only 1 appears on home page

**Root Cause:**
- 5 articles published via `/admin` → stored in Railway volume: `/app/data/content/posts/`
- Home page reads from: `/app/content/posts/` (only has 1 git-committed article)
- Volume and git are out of sync

## Solution: Copy Production MDX Files to Git

### Option 1: Use Railway CLI (Recommended)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and link project
railway login
railway link

# 3. List published MDX files on production
railway run ls -la /app/data/content/posts/

# 4. Download each file
# Replace FILENAME with actual filenames from step 3
railway run cat /app/data/content/posts/FILENAME.mdx > content/posts/FILENAME.mdx

# 5. Repeat for all 5 files, then commit
git add content/posts/*.mdx
git commit -m "sync: Add production articles to git"
git push origin main
```

### Option 2: Manual Copy from Admin Panel

**You can see the published articles in `/admin`. For each article:**

1. **View source** of the admin published tab
2. **Copy article data** (title, description, content, etc.)
3. **Create MDX file locally** in `content/posts/`
4. **Format using this template:**

```mdx
---
title: "Article Title Here"
description: "Article description here"
publishedAt: "2025-10-05T12:00:00.000Z"
scrapedAt: "2025-10-05T12:00:00.000Z"
source: "Source Name"
sourceType: "reddit"
author: "Author Name"
url: "https://original-article-url.com"
score: 100
qualityScore: 8.5
tags: ["Tag1", "Tag2", "Tag3"]
slug: "article-slug-here"
---

# Article Title

## Summary
Article summary content...

## Key Takeaways
- Point 1
- Point 2

## Tags
<span className="tag">#Tag1</span> <span className="tag">#Tag2</span>
```

5. Save file as: `content/posts/2025-10-05-article-slug.mdx`
6. Repeat for all 5 articles
7. Commit to git:
   ```bash
   git add content/posts/
   git commit -m "sync: Add production articles"
   git push origin main
   ```

### Option 3: Use Production API to Fetch (If Auth Works)

If you have the admin API key:

```bash
# Get list of published articles
curl -H "x-api-key: YOUR_API_KEY" \
  https://techpulsedailyapp-production.up.railway.app/api/admin/articles?type=published

# This will show you the article data to recreate MDX files
```

## After Syncing

Once all 5 MDX files are in `content/posts/` and committed to git:

1. **Railway auto-deploys** (30-60s)
2. **Home page will show all 5 articles**
3. **Production and local will be in sync**

## Going Forward

**Always commit published articles to git:**

```bash
# After publishing via /admin
git add content/posts/*.mdx content/index.mdx
git commit -m "feat: Add new articles"
git push origin main
```

This keeps production and git in sync.

## Quick Fix: Republish on Production

**Alternative:** If Railway CLI doesn't work:

1. **Delete the 5 published articles** in `/admin`
2. **Clear the queue** (approved/rejected)
3. **Scrape fresh articles**
4. **Approve 5 articles**
5. **Publish them**
6. **Immediately download/copy the generated MDX files**
7. **Commit to git**
8. **Push to deploy**

This ensures git has the source of truth.
