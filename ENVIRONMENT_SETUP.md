# Environment Configuration Guide

## Overview
TechPulse Daily is designed to work seamlessly in both development (localhost) and production (techpulsedaily.app) environments. The application uses environment variables to manage configuration differences.

## Configuration Priority
The app loads configuration in this order:
1. **Environment Variables** (highest priority - from `.env.local`)
2. **Config Files** (`config/*.json`)
3. **Default Values** (fallback)

## Development Setup (localhost)

### 1. Create `.env.local` file:
```bash
# Development environment
CLAUDE_API_KEY=your-claude-api-key-here
ADMIN_PASSWORD=admin
SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Run locally:
```bash
npm run dev
# Site available at http://localhost:3000
```

## Production Setup (techpulsedaily.app)

### 1. Create `.env.local` file:
```bash
# Production environment
CLAUDE_API_KEY=your-production-claude-api-key
ADMIN_PASSWORD=strong-production-password
SITE_URL=https://techpulsedaily.app
NODE_ENV=production
```

### 2. Deploy to production:
```bash
npm run build
npm start
# Or deploy to Vercel/similar platform
```

## Key Configuration Points

### URLs are Dynamic
- **Site URL**: Set via `SITE_URL` environment variable
- **API Routes**: Relative paths (work in any environment)
- **Assets**: Relative paths from public folder
- **Social Sharing**: Uses `siteConfig.site.url` (environment-aware)

### Environment-Specific Features

| Feature | Development | Production |
|---------|------------|------------|
| Site URL | http://localhost:3000 | https://techpulsedaily.app |
| Admin Password | Simple (for testing) | Strong & secure |
| Claude API Key | Dev key | Production key |
| Error Display | Verbose | User-friendly |
| Scheduler | Manual only | Can be automated |

### Files That Adapt Automatically

1. **Sitemap Generation** (`src/lib/publisher.ts`)
   - Uses `siteConfig.site.url` for all URLs

2. **SEO/Meta Tags** (`src/app/layout.tsx`, `src/app/posts/[slug]/page.tsx`)
   - Uses `siteConfig.site.url` for canonical URLs
   - Open Graph URLs automatically correct

3. **Social Sharing** (`src/app/posts/[slug]/page.tsx`)
   - Share URLs use `siteConfig.site.url`
   - Works correctly in both environments

4. **API Calls** (all `/api/*` routes)
   - Use relative paths
   - No hardcoded domains

## Testing Environment Configuration

### Verify Development:
```bash
# Should show http://localhost:3000
echo $SITE_URL
npm run dev
# Check: Admin panel, article pages, social share buttons
```

### Verify Production:
```bash
# Should show https://techpulsedaily.app
echo $SITE_URL
npm run build
npm start
# Check: All URLs point to techpulsedaily.app
```

## Common Issues & Solutions

### Issue: Wrong URL in social shares
**Solution**: Check `SITE_URL` in `.env.local`

### Issue: Admin login fails
**Solution**: Verify `ADMIN_PASSWORD` matches `config/auth.json` hash

### Issue: Sitemap has wrong domain
**Solution**: Restart server after changing `SITE_URL`

### Issue: Images not loading
**Solution**: Use relative paths (`/images/...`) not absolute

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use different API keys** for dev/production
3. **Strong passwords** in production
4. **HTTPS only** in production (`https://techpulsedaily.app`)
5. **Rotate keys** regularly

## Deployment Checklist

- [ ] Set `SITE_URL=https://techpulsedaily.app`
- [ ] Set strong `ADMIN_PASSWORD`
- [ ] Use production `CLAUDE_API_KEY`
- [ ] Set `NODE_ENV=production`
- [ ] Test all pages after deployment
- [ ] Verify sitemap.xml has correct URLs
- [ ] Test social sharing buttons
- [ ] Confirm admin panel works

## Environment Variable Reference

| Variable | Required | Development Example | Production Example |
|----------|----------|-------------------|-------------------|
| `CLAUDE_API_KEY` | Yes | sk-ant-api-dev-xxx | sk-ant-api-prod-xxx |
| `ADMIN_PASSWORD` | Yes | admin | $tr0ng&P@ssw0rd! |
| `SITE_URL` | Yes | http://localhost:3000 | https://techpulsedaily.app |
| `NODE_ENV` | Yes | development | production |
| `SESSION_SECRET` | No | (optional) | random-32-chars |

---

✅ **The codebase is fully environment-aware and will work correctly in both localhost and production!**