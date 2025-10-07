# API Reference

> **Complete endpoint documentation with examples**

**Version:** 2.0.0
**Last Updated:** January 2025
**Maintained By:** [Syntax]

---

## Authentication

All `/api/admin/*` endpoints require authentication via `x-api-key` header.

```bash
x-api-key: admin-session-key
```

**Default API Key:** `admin-session-key`
**Change in:** `src/lib/auth/authMiddleware.ts`

---

## Public Endpoints

### Health Check

**GET** `/api/health`

**Purpose:** Health check for monitoring and load balancers

**Authentication:** None required

**Request:**
```bash
curl https://your-domain.com/api/health
```

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2025-01-15T10:00:00.000Z",
  "environment": "production",
  "version": "0.1.0"
}
```

**Use Cases:**
- Docker health checks
- Load balancer health probes
- Monitoring systems (Datadog, New Relic)
- Uptime monitoring (UptimeRobot)

---

## Scraping Endpoints

### Trigger Scraping Cycle

**POST** `/api/scrape`

**Purpose:** Start scraping cycle across all configured sources

**Authentication:** Required (`x-api-key`)

**Request:**
```bash
curl -X POST \
  -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/scrape
```

**Response:** `200 OK`
```json
{
  "success": true,
  "scraped": 45,
  "processed": 42,
  "queued": 15,
  "filtered": 27,
  "message": "Successfully scraped and processed articles"
}
```

**Fields:**
- `scraped` - Total articles fetched from sources
- `processed` - Articles sent to Claude AI
- `queued` - Articles added to pending queue (quality >= 6)
- `filtered` - Articles rejected (low quality or duplicates)

**Error Response:** `500 Internal Server Error`
```json
{
  "error": "Scraping failed",
  "details": "Anthropic API error: 401 Unauthorized"
}
```

**Process:**
1. Scrape from Reddit, RSS, HackerNews
2. Process with Claude AI (quality scoring, summaries)
3. Filter (quality >= 6, keyword matching)
4. Deduplicate by URL/title
5. Add to pending queue

**Typical Duration:** 30-120 seconds (depends on source count)

---

## Admin Endpoints

### Get Articles by State

**GET** `/api/admin/articles?type={state}`

**Purpose:** Retrieve articles from a specific queue

**Authentication:** Required (`x-api-key`)

**Parameters:**
- `type` (required) - Queue state: `pending`, `approved`, `rejected`, `published`

**Request:**
```bash
curl -H "x-api-key: admin-session-key" \
  "https://your-domain.com/api/admin/articles?type=pending"
```

**Response:** `200 OK`
```json
{
  "articles": [
    {
      "id": "openai-gpt-4-5-release",
      "title": "OpenAI Releases GPT-4.5 with Vision",
      "summary": "Key Takeaway: OpenAI has released...",
      "url": "https://openai.com/blog/gpt-4-5",
      "source": "OpenAI Blog",
      "sourceType": "rss",
      "author": "OpenAI Team",
      "publishedAt": "2025-01-15T10:00:00.000Z",
      "scrapedAt": "2025-01-15T10:05:23.468Z",
      "qualityScore": 9.2,
      "score": 150,
      "tags": ["AI", "GPT", "OpenAI", "Vision"],
      "engagement": {
        "upvotes": 150,
        "shares": 45,
        "comments": 67
      }
    }
  ]
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Invalid type parameter",
  "valid": ["pending", "approved", "rejected", "published"]
}
```

---

### Approve/Reject Article

**POST** `/api/admin/articles`

**Purpose:** Move article between queue states

**Authentication:** Required (`x-api-key`)

**Request Body:**
```json
{
  "articleId": "openai-gpt-4-5-release",
  "action": "approve"
}
```

**Actions:**
- `approve` - Move from pending → approved
- `reject` - Move from pending → rejected

**Request:**
```bash
curl -X POST \
  -H "x-api-key: admin-session-key" \
  -H "Content-Type: application/json" \
  -d '{"articleId":"article-id","action":"approve"}' \
  https://your-domain.com/api/admin/articles
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Article approved successfully"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Article not found in pending queue"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Invalid action",
  "valid": ["approve", "reject"]
}
```

---

### Publish Approved Articles

**POST** `/api/admin/publish`

**Purpose:** Generate MDX files from approved queue and publish to site

**Authentication:** Required (`x-api-key`)

**Request:**
```bash
curl -X POST \
  -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/publish
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Publishing completed",
  "result": {
    "published": 5,
    "errors": []
  }
}
```

**Response with Errors:** `200 OK`
```json
{
  "success": true,
  "message": "Publishing completed with errors",
  "result": {
    "published": 3,
    "errors": [
      "Failed to publish 'Article Title': EACCES: permission denied"
    ]
  }
}
```

**Process:**
1. Read all files from `queue/approved/`
2. For each article:
   - Generate MDX content with frontmatter
   - Write to `content/posts/YYYY-MM-DD-slug.mdx`
   - Move JSON to `queue/published/`
3. Regenerate `index.mdx`
4. Regenerate `sitemap.xml`

**Typical Duration:** 1-5 seconds

**Side Effects:**
- Creates MDX files in `content/posts/`
- Moves queue files from `approved/` to `published/`
- Updates `index.mdx` and `sitemap.xml`

---

### Admin Login

**POST** `/api/admin/login`

**Purpose:** Authenticate admin user for dashboard access

**Authentication:** None (this IS the auth endpoint)

**Request Body:**
```json
{
  "username": "admin",
  "password": "your-password"
}
```

**Request:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}' \
  https://your-domain.com/api/admin/login
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "redirect": "/admin"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "error": "Invalid credentials"
}
```

**Process:**
1. Verify username matches `ADMIN_USERNAME` env var
2. Compare password hash with `ADMIN_PASSWORD` (bcrypt)
3. Set session cookie
4. Return success

**Cookie Set:** `admin-session` (HttpOnly, Secure in production)

---

### Admin Logout

**POST** `/api/admin/logout`

**Purpose:** Clear admin session

**Authentication:** None

**Request:**
```bash
curl -X POST https://your-domain.com/api/admin/logout
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Process:**
1. Clear `admin-session` cookie
2. Redirect to login page

---

### Get Admin Stats

**GET** `/api/admin/stats`

**Purpose:** Dashboard statistics

**Authentication:** Required (`x-api-key`)

**Request:**
```bash
curl -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/stats
```

**Response:** `200 OK`
```json
{
  "pending": 12,
  "approved": 5,
  "rejected": 8,
  "published": 43,
  "total": 68,
  "lastScraped": "2025-01-15T10:05:23.468Z"
}
```

**Calculation:**
- `pending` - Count of files in `queue/pending/`
- `approved` - Count of files in `queue/approved/`
- `rejected` - Count of files in `queue/rejected/`
- `published` - Count of MDX files in `content/posts/`
- `total` - Sum of all states
- `lastScraped` - Most recent `scrapedAt` timestamp

---

## Debug Endpoints

### Path Inspection

**POST** `/api/admin/debug`

**Purpose:** Inspect filesystem paths and contents

**Authentication:** Required (`x-api-key`)

**Request:**
```bash
curl -X POST \
  -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/debug
```

**Response:** `200 OK`
```json
{
  "paths": {
    "postsDir": "/app/data/content/posts",
    "contentDir": "/app/data/content",
    "exists": {
      "postsDir": true,
      "contentDir": true
    },
    "files": {
      "postsDir": [
        "2025-01-15-openai-gpt-4-5.mdx",
        "2025-01-14-anthropic-claude-3-5.mdx"
      ],
      "contentDir": ["index.mdx", "posts"]
    }
  }
}
```

**Use Cases:**
- Verify volume mounted correctly
- Check if MDX files were created
- Debug path resolution issues
- Confirm directory structure

---

### Environment Variables

**POST** `/api/admin/debug-env`

**Purpose:** Inspect environment configuration

**Authentication:** Required (`x-api-key`)

**Request:**
```bash
curl -X POST \
  -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/debug-env
```

**Response:** `200 OK`
```json
{
  "env": {
    "CONTENT_DIR": "/app/data/content",
    "DATA_DIR": "/app/data",
    "APP_ROOT": "/app",
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

**Use Cases:**
- Verify environment variables set correctly
- Debug path resolution
- Check Docker environment

---

### Reset Queues

**POST** `/api/admin/reset`

**Purpose:** Clear all queue directories (⚠️ DESTRUCTIVE)

**Authentication:** Required (`x-api-key`)

**Request:**
```bash
curl -X POST \
  -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/reset
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Successfully cleared all queues",
  "filesDeleted": 25
}
```

**Process:**
1. Delete all files in `queue/pending/`
2. Delete all files in `queue/approved/`
3. Delete all files in `queue/rejected/`
4. Delete all files in `queue/published/`

**⚠️ Warning:** This is destructive and cannot be undone!

**Use Cases:**
- Testing clean slate
- Remove test data
- Fresh start after config changes

---

## Error Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| `200` | Success | Request completed successfully |
| `400` | Bad Request | Invalid parameters or body |
| `401` | Unauthorized | Missing or invalid `x-api-key` |
| `404` | Not Found | Article or resource doesn't exist |
| `500` | Internal Server Error | Application error, check logs |

---

## Rate Limiting

**Current:** No rate limiting implemented

**Recommended (Future):**
- 10 requests/minute for `/api/scrape`
- 100 requests/minute for other endpoints
- Implement with middleware: `src/lib/security/rateLimiter.ts`

---

## Postman Collection

**Example Collection:**

```json
{
  "info": {
    "name": "TechPulse Daily API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": "{{base_url}}/api/health"
      }
    },
    {
      "name": "Scrape Articles",
      "request": {
        "method": "POST",
        "header": [
          {"key": "x-api-key", "value": "{{api_key}}"}
        ],
        "url": "{{base_url}}/api/scrape"
      }
    },
    {
      "name": "Get Pending Articles",
      "request": {
        "method": "GET",
        "header": [
          {"key": "x-api-key", "value": "{{api_key}}"}
        ],
        "url": "{{base_url}}/api/admin/articles?type=pending"
      }
    },
    {
      "name": "Approve Article",
      "request": {
        "method": "POST",
        "header": [
          {"key": "x-api-key", "value": "{{api_key}}"},
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"articleId\":\"article-id\",\"action\":\"approve\"}"
        },
        "url": "{{base_url}}/api/admin/articles"
      }
    },
    {
      "name": "Publish Articles",
      "request": {
        "method": "POST",
        "header": [
          {"key": "x-api-key", "value": "{{api_key}}"}
        ],
        "url": "{{base_url}}/api/admin/publish"
      }
    }
  ],
  "variable": [
    {"key": "base_url", "value": "https://your-domain.com"},
    {"key": "api_key", "value": "admin-session-key"}
  ]
}
```

---

## Testing Endpoints

### Local Testing

```bash
# Set base URL
BASE_URL="http://localhost:3000"
API_KEY="admin-session-key"

# Health check
curl $BASE_URL/api/health

# Scrape (with timing)
time curl -X POST -H "x-api-key: $API_KEY" $BASE_URL/api/scrape

# Get pending
curl -H "x-api-key: $API_KEY" "$BASE_URL/api/admin/articles?type=pending" | jq

# Approve first article
ARTICLE_ID=$(curl -H "x-api-key: $API_KEY" "$BASE_URL/api/admin/articles?type=pending" | jq -r '.articles[0].id')
curl -X POST -H "x-api-key: $API_KEY" -H "Content-Type: application/json" \
  -d "{\"articleId\":\"$ARTICLE_ID\",\"action\":\"approve\"}" \
  $BASE_URL/api/admin/articles

# Publish
curl -X POST -H "x-api-key: $API_KEY" $BASE_URL/api/admin/publish

# Check stats
curl -H "x-api-key: $API_KEY" $BASE_URL/api/admin/stats | jq
```

---

## Future API Endpoints

**Planned:**
- `GET /api/articles` - Public article listing (pagination, filtering)
- `GET /api/articles/:slug` - Single article by slug
- `GET /api/search?q=query` - Search articles
- `GET /api/tags` - List all tags
- `GET /api/tags/:tag` - Articles by tag
- `POST /api/admin/schedule` - Schedule scraping
- `GET /api/admin/logs` - View application logs
- `POST /api/webhook/github` - GitHub webhook for auto-deploy

---

**Maintained By:** [Syntax]
**Version:** 2.0.0
**Last Updated:** January 2025
