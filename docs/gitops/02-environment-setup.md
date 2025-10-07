# Environment Setup

> **Local development and configuration guide**

**Version:** 2.0.0
**Last Updated:** January 2025
**Maintained By:** [Flow], [Syntax]

---

## Prerequisites

### Required Software

| Tool | Version | Purpose | Installation |
|------|---------|---------|--------------|
| **Node.js** | 18+ | JavaScript runtime | https://nodejs.org |
| **npm** | 9+ | Package manager | Included with Node.js |
| **Git** | 2.x | Version control | https://git-scm.com |
| **Docker** | 20.10+ | Containerization (optional) | https://docker.com |

### Verify Installation

```bash
node --version    # Should show v18.x or higher
npm --version     # Should show 9.x or higher
git --version     # Should show 2.x
docker --version  # Should show 20.10 or higher (if using Docker)
```

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/travissutphin/techpulsedaily.app.git
cd techpulsedaily.app
```

### 2. Install Dependencies

```bash
npm install
```

**Expected output:**
```
added 250 packages in 30s
```

### 3. Create Environment File

```bash
cp .env.example .env.local
```

**Edit `.env.local`:**
```bash
# Required
CLAUDE_API_KEY=sk-ant-api03-your-key-here

# Site Configuration
SITE_URL=http://localhost:3000
NODE_ENV=development

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yourpassword

# Optional - Reddit API
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-secret
```

### 4. Create Data Directories

```bash
mkdir -p data/queue/{pending,approved,rejected,published}
mkdir -p data/content/posts
```

### 5. Start Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 15.5.3
- Local:        http://localhost:3000
- Ready in 2.3s
```

### 6. Verify Installation

Visit these URLs:
- **Homepage:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **Health Check:** http://localhost:3000/api/health

---

## Environment Variables Reference

### Required Variables

#### `CLAUDE_API_KEY`
**Purpose:** Anthropic API key for AI processing
**Format:** `sk-ant-api03-...`
**Get it:** https://console.anthropic.com/account/keys

```bash
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

#### `SITE_URL`
**Purpose:** Base URL for the application
**Development:** `http://localhost:3000`
**Production:** `https://your-domain.com`

```bash
# Local
SITE_URL=http://localhost:3000

# Production
SITE_URL=https://techpulsedaily.app
```

### Optional Variables

#### `NODE_ENV`
**Purpose:** Environment mode
**Values:** `development`, `production`, `test`
**Default:** `development`

```bash
NODE_ENV=development
```

#### Admin Credentials

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password-here
```

**⚠️ Security:** Use strong passwords in production (12+ characters, mixed case, symbols)

#### Reddit API (Optional)

```bash
REDDIT_CLIENT_ID=your-client-id
REDDIT_CLIENT_SECRET=your-client-secret
```

**Get credentials:**
1. Go to https://www.reddit.com/prefs/apps
2. Create a new app (script type)
3. Copy client ID and secret

#### Path Overrides (Advanced)

```bash
# Override default paths
CONTENT_DIR=/custom/path/to/content
DATA_DIR=/custom/path/to/data
```

**When to use:**
- Docker deployments with volume mounts
- Custom directory structures
- Multi-tenant setups

**Default values (if not set):**
- `CONTENT_DIR` → `./content`
- `DATA_DIR` → `./data`

---

## Configuration Files

### `config/sources.json`

**Purpose:** Configure content sources for scraping

```json
{
  "subreddits": [
    {
      "name": "LocalLLaMA",
      "scoreThreshold": 10,
      "maxPosts": 25
    },
    {
      "name": "ChatGPT",
      "scoreThreshold": 15,
      "maxPosts": 20
    }
  ],
  "rssSources": [
    {
      "name": "Anthropic Blog",
      "url": "https://www.anthropic.com/rss.xml"
    },
    {
      "name": "The Verge AI",
      "url": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml"
    }
  ],
  "hackerNews": {
    "enabled": true,
    "scoreThreshold": 50,
    "maxStories": 30
  }
}
```

**Key Settings:**
- `scoreThreshold` - Minimum upvotes/points required
- `maxPosts` - How many to fetch per source
- `enabled` - Turn sources on/off

### `config/site.json`

**Purpose:** Site metadata and configuration

```json
{
  "site": {
    "name": "TechPulse Daily",
    "description": "AI-curated tech news",
    "url": "https://techpulsedaily.app",
    "author": "TechPulse Team"
  },
  "seo": {
    "defaultTitle": "TechPulse Daily - AI-Curated Tech News",
    "defaultDescription": "Stay ahead of the tech curve",
    "keywords": ["AI", "tech news", "machine learning"]
  }
}
```

---

## Local Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

**Hot Reload:** Changes to files automatically refresh the page

### 2. Test Scraping

1. Visit http://localhost:3000/admin
2. Login with `ADMIN_USERNAME` / `ADMIN_PASSWORD`
3. Click "Scrape New Articles"
4. Review articles in Pending queue

### 3. Approve & Publish

1. Click "Approve" on articles you want
2. Click "Publish Articles"
3. View homepage to see published articles

### 4. Make Code Changes

```bash
# Edit files in src/
# Browser auto-refreshes

# Check TypeScript errors
npm run build

# Lint code
npm run lint
```

### 5. Clear Cache (if needed)

```bash
# Delete Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## Common Development Tasks

### Reset Queue System

```bash
# Delete all queue files
rm -rf data/queue/{pending,approved,rejected,published}/*.json

# Recreate directories
mkdir -p data/queue/{pending,approved,rejected,published}
```

### Clear Published Articles

```bash
# Delete all MDX files
rm -rf data/content/posts/*.mdx

# Keep directory
mkdir -p data/content/posts
```

### Test API Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Scrape articles
curl -X POST -H "x-api-key: admin-session-key" \
  http://localhost:3000/api/scrape

# Get pending articles
curl -H "x-api-key: admin-session-key" \
  "http://localhost:3000/api/admin/articles?type=pending"

# Publish approved articles
curl -X POST -H "x-api-key: admin-session-key" \
  http://localhost:3000/api/admin/publish
```

---

## Docker Development (Optional)

### Build & Run Locally

```bash
# Build Docker image
docker build -t techpulse-local .

# Run container
docker run -d \
  --name techpulse \
  -p 3000:3000 \
  -e CLAUDE_API_KEY="sk-ant-xxx" \
  -e SITE_URL="http://localhost:3000" \
  -v $(pwd)/data:/app/data \
  techpulse-local

# View logs
docker logs -f techpulse

# Stop container
docker stop techpulse
docker rm techpulse
```

### Docker Compose

**Create `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  techpulse:
    build: .
    ports:
      - "3000:3000"
    environment:
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - SITE_URL=http://localhost:3000
      - NODE_ENV=development
    volumes:
      - ./data:/app/data
      - ./config:/app/config:ro
    restart: unless-stopped
```

**Usage:**
```bash
# Start
docker-compose up -d

# Logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Troubleshooting Setup Issues

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lockfile
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Find process using port 3000
# On Mac/Linux:
lsof -i :3000

# On Windows:
netstat -ano | findstr :3000

# Kill the process or use different port
npm run dev -- -p 3001
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Rebuild project
rm -rf .next
npm run build
npm run dev
```

### Issue: API calls return 401 Unauthorized

**Check:**
1. API key header is correct: `x-api-key: admin-session-key`
2. `.env.local` is in root directory
3. Dev server restarted after changing `.env.local`

---

## IDE Setup

### VS Code (Recommended)

**Recommended Extensions:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**Settings (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### TypeScript IntelliSense

Verify `tsconfig.json` has correct paths:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Next Steps

After environment setup:
1. Read [Docker Deployment](./03-docker-deployment.md) for production
2. Review [Content Pipeline](./07-content-pipeline.md) to understand workflows
3. Check [API Reference](./05-api-reference.md) for endpoint details

---

**Maintained By:** [Flow], [Syntax]
**Version:** 2.0.0
**Last Updated:** January 2025
