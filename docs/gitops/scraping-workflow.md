# Article Scraping & Publishing Workflow - GitOps Documentation

## Overview
Automated content pipeline for scraping, processing, approving, and publishing AI/tech articles to TechPulse Daily.

**Version:** 1.0.0
**Last Updated:** October 5, 2025
**Maintained By:** [Flow], [Gordon], [Syntax]

---

## Architecture Diagram

```
┌─────────────────┐
│  Content Sources │
│  - Reddit APIs   │
│  - RSS Feeds     │
│  - Hacker News   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────┐
│   MasterScraper             │
│   (src/lib/scrapers/)       │
│   - reddit.ts               │
│   - rss.ts                  │
│   - hackernews.ts           │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│   Claude AI Processing      │
│   (src/lib/claude/client.ts)│
│   - Quality scoring (0-10)  │
│   - Summary generation      │
│   - FAQ extraction          │
│   - Tag assignment          │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│   Content Filtering         │
│   (src/lib/processor.ts)    │
│   - Quality threshold: 6+   │
│   - Keyword matching        │
│   - Duplicate detection     │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│   Queue Management          │
│   (src/lib/storage/queue.ts)│
│   data/queue/               │
│   ├── pending/              │
│   ├── approved/             │
│   ├── rejected/             │
│   └── published/            │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│   Admin Review              │
│   (src/app/admin/page.tsx)  │
│   - Manual approval/reject  │
│   - Bulk operations         │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│   Publisher                 │
│   (src/lib/publisher.ts)    │
│   - Generate MDX files      │
│   - Update sitemap.xml      │
│   - Update index.mdx        │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│   Live Blog                 │
│   content/posts/*.mdx       │
│   Home Page Display         │
└─────────────────────────────┘
```

---

## Workflow Steps

### 1. **Scraping Trigger**

**Manual Trigger:**
```bash
# Via Admin Dashboard
http://localhost:3000/admin → Click "Scrape New Articles"

# Via API
curl -X POST http://localhost:3000/api/scrape \
  -H "x-api-key: admin-session-key"
```

**Automated Trigger (TODO):**
```yaml
# GitHub Actions (future)
# .github/workflows/scrape-articles.yml
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
```

### 2. **Content Sources Configuration**

Located in: `config/sources.json`

**Subreddits (Score Threshold: 10-50)**
```json
{
  "subreddits": [
    "LocalLLaMA",
    "ChatGPT",
    "ClaudeAI",
    "Replit",
    "ArtificialInteligence",
    "artificial",
    "PromptEngineering",
    "ChatGPTPro",
    "OpenAI"
  ]
}
```

**RSS Feeds**
```json
{
  "rssSources": [
    "https://www.anthropic.com/rss.xml",
    "https://blog.replit.com/rss.xml",
    "https://simonwillison.net/atom/everything/",
    "https://huggingface.co/blog/feed.xml",
    "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    "https://deepmind.google/blog/rss.xml"
  ]
}
```

### 3. **Processing Pipeline**

**File:** `src/lib/processor.ts`

```typescript
// Scraping Cycle Flow
async runScrapingCycle() {
  // 1. Scrape from all sources
  const articles = await this.scraper.scrapeAll();

  // 2. Process with Claude AI (batches of 3)
  const processed = await this.claude.processArticle(articles);

  // 3. Filter by quality (>= 6/10) and keywords
  const quality = processed.filter(a => a.qualityScore >= 6);

  // 4. Add to pending queue
  await this.queue.addToPending(quality);

  return { scraped, processed, queued };
}
```

**Claude Processing:**
- Quality scoring (0-10)
- Summary generation (Key Takeaway, Why It Matters, Brief Context)
- FAQ extraction
- Tag assignment

### 4. **Queue Management**

**Directory Structure:**
```
data/queue/
├── pending/       # Articles awaiting approval
├── approved/      # Articles ready to publish
├── rejected/      # Rejected articles
└── published/     # Archive of published articles
```

**File Format:** JSON
```json
{
  "id": "unique-id-timestamp",
  "title": "Article Title",
  "summary": "Generated summary...",
  "publishedAt": "2025-10-05T12:00:00.000Z",
  "source": "Reddit",
  "qualityScore": 8.5,
  "tags": ["AI", "Claude", "Automation"],
  "url": "https://original-url.com"
}
```

### 5. **Admin Review & Approval**

**Dashboard:** `http://localhost:3000/admin`

**Actions:**
- **Approve**: Moves from `pending/` → `approved/`
- **Reject**: Moves from `pending/` → `rejected/`
- **Publish**: Processes all `approved/` → creates MDX files

**API Endpoints:**
```bash
# Get pending articles
GET /api/admin/articles?type=pending

# Approve article
POST /api/admin/articles
{
  "articleId": "article-123",
  "action": "approve"
}

# Publish approved articles
POST /api/admin/publish
```

### 6. **Publishing Process**

**File:** `src/lib/publisher.ts`

```typescript
async publishApprovedArticles() {
  const approved = await queue.getApprovedArticles();

  for (const article of approved) {
    // 1. Generate MDX content
    const mdx = this.generatePostContent(article);

    // 2. Write to content/posts/
    fs.writeFileSync(`content/posts/${slug}.mdx`, mdx);

    // 3. Move to published archive
    await queue.markAsPublished(article.id);
  }

  // 4. Update index and sitemap
  await this.generateIndex();
  await this.generateSitemap();
}
```

**Generated MDX Structure:**
```markdown
---
title: "Article Title"
description: "Summary"
publishedAt: "2025-10-05T12:00:00.000Z"
source: "Reddit"
qualityScore: 8.5
tags: ["AI", "Claude"]
slug: "article-slug"
---

<script type="application/ld+json">
{/* Schema.org Article markup */}
</script>

# Article Title

## Summary
[Generated summary]

## Key Takeaways
- Point 1
- Point 2

## Tags
#AI #Claude #Automation
```

### 7. **Auto-Generation**

**Index Page** (`content/index.mdx`)
- Latest 10 articles
- Sorted by publish date
- Full frontmatter

**Sitemap** (`public/sitemap.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://techpulsedaily.app/posts/article-slug</loc>
    <lastmod>2025-10-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Environment Variables

```bash
# Required
CLAUDE_API_KEY=sk-ant-xxx           # Anthropic API key
ADMIN_USERNAME=admin                # Admin dashboard login
ADMIN_PASSWORD=secure-password      # Strong password

# Optional
REDDIT_CLIENT_ID=xxx                # Reddit API credentials
REDDIT_CLIENT_SECRET=xxx
SITE_URL=https://techpulsedaily.app # Production URL
NODE_ENV=production                 # Environment
```

---

## Troubleshooting

### Issue: Articles Not Appearing on Home Page

**Symptom:** Published articles don't display on homepage

**Root Causes:**
1. **Empty approved queue** - No articles to publish
2. **Corrupted .next cache** - Build errors during publish
3. **Missing MDX files** - Publisher failed to write files

**Solution:**
```bash
# 1. Clean .next cache
rm -rf .next

# 2. Restart dev server
npm run dev

# 3. Check approved queue
ls data/queue/approved/

# 4. Manually publish
curl -X POST http://localhost:3000/api/admin/publish \
  -H "x-api-key: admin-session-key"

# 5. Verify MDX files created
ls content/posts/
```

### Issue: Low Quality Articles

**Solution:** Adjust quality threshold in `processor.ts`
```typescript
// Increase quality threshold
const quality = processedArticles.filter(a => a.qualityScore >= 7);
```

### Issue: No Articles Scraped

**Check:**
1. Reddit API credentials valid
2. RSS feeds accessible
3. Score thresholds not too high (check `sources.json`)

---

## Monitoring & Metrics

**Admin Dashboard Stats:**
- Total articles in queue
- Pending count
- Approved count
- Published count
- Sprint health %

**Logs Location:**
```
logs/scraping.log
logs/publishing.log
```

---

## Git Workflow

```bash
# 1. Make changes locally
npm run dev

# 2. Test scraping pipeline
# Visit http://localhost:3000/admin
# Scrape → Approve → Publish

# 3. Commit changes
git add .
git commit -m "feat: Update scraping sources"

# 4. Push to GitHub
git push origin main

# 5. Auto-deploy to Railway
# GitHub webhook triggers build
# Railway deploys in 30-60 seconds
```

---

## Security Best Practices

1. **Never commit API keys** - Use `.env.local`
2. **Strong admin passwords** - Minimum 12 characters
3. **API key rotation** - Monthly rotation recommended
4. **Rate limiting** - 1-2s delays between API calls
5. **Input validation** - Sanitize all external data

---

## Future Enhancements

- [ ] Automated scheduling (GitHub Actions)
- [ ] AI-powered auto-approval (confidence threshold)
- [ ] Multi-user admin roles
- [ ] Advanced analytics dashboard
- [ ] Webhook notifications (Slack/Discord)
- [ ] A/B testing for article titles

---

**Maintained by DevOps Team**
[Flow] - Infrastructure & Deployment
[Gordon] - Docker & Container Orchestration
[Syntax] - Core Architecture & API Development
