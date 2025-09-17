# <img src="/public/images/techpulsedaily.png" alt="TechPulse Daily" width="200" />

## AI-Powered Tech News Aggregator - No Database Required

Automatically collect, filter, and publish tech news from Reddit, Hacker News, and RSS feeds. Uses Claude AI to evaluate quality and create summaries. **100% file-based** - no complex database setup needed.

## 🚀 Get Started in 2 Minutes

### 1. Clone & Install
```bash
git clone [your-repo-url]
cd tech-news-aggregator
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add:
# - Your Claude API key from https://console.anthropic.com/
# - A strong admin password
# - Your site URL
```

### 3. Run
```bash
npm run dev
```

- **View site**: http://localhost:3000
- **Admin panel**: http://localhost:3000/admin (password in .env.local)

## 📋 What This Does

1. **Collects** tech news from Reddit, Hacker News, and RSS feeds
2. **Filters** using AI to find quality content worth reading
3. **Queues** articles for your review in the admin panel
4. **Publishes** approved articles as static pages
5. **No database** - everything runs on JSON and MDX files

## ⚙️ Essential Configuration

### Set Your News Sources (`config/sources.json`)

```json
{
  "reddit": {
    "subreddits": [
      {"name": "technology", "minScore": 100}  // Add your favorite subreddits
    ]
  },
  "rssFeeds": [
    {"name": "TechCrunch", "url": "https://techcrunch.com/feed/"}  // Add RSS feeds
  ]
}
```

### Control Quality (`config/filters.json`)

```json
{
  "qualityThresholds": {
    "minimumEngagement": {"reddit": 50},  // Min upvotes
    "maximumAge": 48  // Hours
  },
  "contentFilters": {
    "excludeKeywords": ["clickbait", "politics"],  // Block these
    "requireKeywords": {"tech": ["AI", "software", "startup"]}  // Must have one
  }
}
```

### Customize Your Site (`config/site.json`)

```json
{
  "site": {
    "name": "Your Site Name",
    "logo": "/images/your-logo.png"
  }
}
```

## 👨‍💼 Admin Workflow

1. **Automatic Scraping**: Runs 3x daily (or manually via admin panel)
2. **Review Queue**: Check `/admin` to see pending articles
3. **One-Click Actions**: Approve ✅ or Reject ❌
4. **Auto-Publish**: Approved articles become live pages

### Admin Commands
```bash
npm run scrape    # Manually fetch new articles
npm run publish   # Force-publish approved queue
```

## 📁 Where Everything Lives

```
config/           → Your settings (JSON files)
content/posts/    → Published articles (MDX files)
data/queue/       → Articles waiting for review
public/           → Images, logos, legal docs
src/              → App code (you probably won't need to touch)
```

## 🔧 Common Tasks

### Add a New RSS Feed
Edit `config/sources.json`:
```json
"rssFeeds": [
  {"name": "New Blog", "url": "https://example.com/feed", "enabled": true}
]
```

### Change Filtering Rules
Edit `config/filters.json` to adjust quality thresholds or blocked keywords.

### Customize AI Prompts
Edit `config/claude.json` to change how AI evaluates and summarizes content.

### Add Legal Pages
Drop markdown files in `public/`:
- privacy_policy.md
- terms_of_service.md
- cookie_policy.md

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Option 2: Any Node.js Host
```bash
npm run build
npm start
```

### Set Environment Variables
```
CLAUDE_API_KEY=your-key
ADMIN_PASSWORD=strong-password
SITE_URL=https://your-domain.com
NODE_ENV=production
```

## 🛡️ Security Checklist

- [ ] Changed admin password from default
- [ ] Created new Claude API key
- [ ] Added `.env.local` to `.gitignore`
- [ ] Using HTTPS in production
- [ ] Regularly update dependencies (`npm update`)

## 📊 How It Works

```
Reddit/HN/RSS → Scraper → AI Filter → Admin Queue → Your Review → Published
```

1. **Scrapers** fetch from configured sources
2. **AI** evaluates quality (1-10 score)
3. **Filters** remove duplicates and junk
4. **Queue** holds articles for review
5. **Admin** approves best content
6. **Publisher** creates static pages

## 🆘 Troubleshooting

**No articles appearing?**
- Check Claude API key in `.env.local`
- Verify sources are enabled in `config/sources.json`
- Lower quality thresholds in `config/filters.json`

**Can't access admin?**
- Check password in `.env.local`
- Clear browser cookies
- Restart dev server

**Scraping fails?**
- Check internet connection
- Verify RSS feed URLs are valid
- Reddit/HN might be rate limiting (wait 1 hour)

## 💡 Pro Tips

- **Start small**: Enable just 1-2 sources initially
- **Adjust filters**: Too much content? Raise thresholds. Too little? Lower them.
- **Peak times**: Scrape at 6am, noon, 6pm for best content
- **RSS quality**: Official blogs (OpenAI, Google) have best signal/noise ratio
- **Manual control**: Use admin panel's "Trigger Scraping" during breaking news

## 📝 Requirements

- Node.js 18+
- Claude API key (get from [Anthropic Console](https://console.anthropic.com/))
- 500MB free disk space
- That's it - no database needed!

## 🤝 Need Help?

- **Documentation**: Check `/docs` folder
- **Issues**: File on GitHub
- **Email**: travis.sutphin@gmail.com

---

**Built for simplicity** - No database, no complexity, just quality tech news. Ready to customize? Start editing the JSON files in `/config`!