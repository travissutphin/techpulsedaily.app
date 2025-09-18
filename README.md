# <img src="/public/images/techpulsedaily.png" alt="TechPulse Daily" width="200" />

## AI-Powered Tech News Aggregator - No Database Required

Automatically collect, filter, and publish tech news from Reddit, Hacker News, and RSS feeds. Uses Claude AI to evaluate quality and create summaries. **100% file-based** - no complex database setup needed.

## 🚀 Get Started in 2 Minutes

### 1. Clone & Install
```bash
git clone https://github.com/travissutphin/techpulsedaily.app.git [my-project]
cd [my-project]
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

### 2.5. Set Up Admin Security
Edit `config/auth.json`:
- **username**: Keep as "admin" (or change if desired)
- **passwordHash**: Use https://bcrypt-generator.com/ to hash your password
- **apiKey**: Use https://randomkeygen.com/ (copy any 32+ char string)

### 3. Run
```bash
npm run dev
```

- **View site**: http://localhost:3000
- **Admin panel**: http://localhost:3000/admin (login with username: "admin" and your password from config/auth.json)

## 📋 What This Does

1. **Collects** tech news from Reddit, Hacker News, and RSS feeds
2. **Filters** using AI to find quality content worth reading
3. **Queues** articles for your review in the admin panel
4. **Publishes** approved articles as static pages
5. **No database** - everything runs on JSON and MDX filesNo database - uses JSON files for queue/config and MDX for published articles

## ⚙️ Essential Configuration

### Set Your News Sources (`config/sources.json`)

```json
{
  "reddit": {
    "subreddits": [
      {"name": "technology", "minScore": 100, "enabled": true},
      {"name": "programming", "minScore": 50, "enabled": true},
      {"name": "webdev", "minScore": 75, "enabled": false}  // Disabled for now
    ]
  },
  "rssFeeds": [
    {"name": "TechCrunch", "url": "https://techcrunch.com/feed/", "enabled": true},
    {"name": "ArsTechnica", "url": "https://arstechnica.com/feed/", "enabled": true}
  ]
}
```

### Control Quality (`config/filters.json`)

```json
{
  "qualityThresholds": {
    "minimumEngagement": {
      "reddit": 50,      // Min Reddit upvotes
      "hackernews": 25   // Min HN points
    },
    "maximumAge": 48     // Hours old
  },
  "contentFilters": {
    "excludeKeywords": ["clickbait", "politics", "crypto"],  // Block these words
    "requireKeywords": ["AI", "software", "startup", "tech"]  // Must contain at least one
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

1. **Manual Scraping**: Click "Trigger Scraping" button in admin panel
2. **Review Queue**: Check `/admin` to see pending articles
3. **One-Click Actions**: Approve ✅ or Reject ❌ each article
4. **Auto-Publish**: Approved articles immediately become live pages
5. **Track Status**: Articles move between folders:
   - `data/queue/pending/` → New articles awaiting review
   - `data/queue/approved/` → Ready to publish
   - `data/queue/rejected/` → Declined articles (can be deleted)

## 📁 Where Everything Lives

```
.env.local        → Your API keys and passwords (never commit this!)
config/           → Your settings (JSON files - sources, filters, site)
content/posts/    → Published articles (MDX files)
data/queue/       → Article workflow folders:
  ├── pending/    → New articles waiting for review
  ├── approved/   → Approved articles ready to publish
  └── rejected/   → Declined articles (safe to delete)
public/           → Images, logos, and markdown files for legal pages
scripts/          → Setup and utility scripts
src/              → App code (you probably won't need to touch)

# Auto-generated (don't edit):
.next/            → Build output files
node_modules/     → Installed dependencies
```

## 🔧 Common Tasks

### Add a New RSS Feed
Edit `config/sources.json` (test the URL in your browser first):
```json
"rssFeeds": [
  {"name": "Verge", "url": "https://www.theverge.com/rss/index.xml", "enabled": true}
]
```

### Block Unwanted Content
Edit `config/filters.json` to add blocked keywords:
```json
"excludeKeywords": ["crypto", "nft", "blockchain", "web3"]
```

### Raise Quality Standards
Edit `config/filters.json` to increase minimum scores:
```json
"qualityThresholds": {
  "minimumEngagement": {"reddit": 100, "hackernews": 50},  // Was 50/25
  "minimumQualityScore": 7  // Was 6
}
```

### Customize AI Evaluation
Edit `config/claude.json` to modify how articles are evaluated:
```json
{
  "prompts": {
    "evaluation": "Focus on technical depth and practical applications",
    "summary": "Write concise 2-sentence summaries, emphasize key innovations"
  }
}
```

### Add Legal Pages
Create markdown files in `public/` (automatically linked in footer):
```
public/privacy_policy.md     → yoursite.com/privacy_policy
public/terms_of_service.md   → yoursite.com/terms_of_service
public/cookie_policy.md      → yoursite.com/cookie_policy
```

### Clear Queue and Start Fresh
Delete all JSON files in these folders:
```bash
data/queue/pending/*.json    # Remove pending articles
data/queue/rejected/*.json   # Remove rejected articles
data/queue/approved/*.json   # Remove approved (unpublished) articles
```

### Change Admin Password
Edit `config/auth.json`:
1. Use an online bcrypt generator: https://bcrypt-generator.com/
2. Enter your new password, generate hash
3. Copy the hash to `passwordHash` in config/auth.json
4. Restart the server

### Backup Your Content
Before updates, backup these folders:
```
config/           # Your settings (including auth.json with your password)
content/posts/    # Published articles
data/queue/       # Pending articles
.env.local        # Your credentials
```

## 🚀 Deploy to Production

### Simple SFTP/Server Deploy
1. Run build locally:
   ```bash
   npm run build
   ```

2. Upload these folders to your server:
   ```
   .next/          → Build files
   public/         → Images and assets
   config/         → Your settings
   content/        → Published articles
   data/           → Article queue
   node_modules/   → Dependencies
   package.json    → App configuration
   .env.local      → Your API keys (create on server)
   ```

3. On your server, create `.env.local`:
   ```
   CLAUDE_API_KEY=your-key
   ADMIN_PASSWORD=strong-password
   SITE_URL=https://your-domain.com
   ```

4. Start the app:
   ```bash
   npm start  # Runs on port 3000
   ```

**Note:** Use a process manager like PM2 to keep it running:
```bash
pm2 start npm --name "techpulse" -- start
```

## 🛡️ Security Checklist

**Critical (do immediately):**
- [ ] Updated config/auth.json with your own password hash and API key
- [ ] Set strong admin password (min 12 chars, mixed case, numbers, symbols)
- [ ] Using HTTPS in production (required for secure admin access)
- [ ] Generated your own Claude API key from https://console.anthropic.com/

**Built-in Protections:**
- [✓] Rate limiting on login (5 attempts, then 15-minute lockout)

**File Security:**
- [ ] Added `.env.local` to `.gitignore` (never commit passwords)
- [ ] Set file permissions on server: `chmod 600 .env.local`
- [ ] Backup `data/` and `content/` folders regularly

**Maintenance:**
- [ ] Regularly update dependencies: `npm update`
- [ ] Monitor `data/queue/rejected/` folder size (clean periodically)
- [ ] Review admin access logs if suspicious activity

## 📝 Requirements

**System:**
- Node.js 18+ and npm (Node.js 20+ recommended)
- 1GB+ free disk space (for dependencies and content)
- Windows, Mac, or Linux
- Internet connection for scraping and AI processing

**API Access:**
- Claude API key from [Anthropic Console](https://console.anthropic.com/)
- Note: Requires paid Anthropic account (~$0.01-0.03 per article processed)

**That's it - no database needed!**

## 🤝 Need Help?

- **Documentation**: Check `/docs` folder
- **Issues**: File on GitHub
- **Email**: travis.sutphin@gmail.com

---

**Built for simplicity** - No database, no complexity, just quality tech news. Ready to customize? Start editing the JSON files in `/config`!