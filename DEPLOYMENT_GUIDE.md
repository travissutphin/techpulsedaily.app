# 🚀 TechPulse Daily - Complete Deployment Guide

## Core Principle Review ✅
**Keep it simple, efficient, robust, scalable - no overengineering**

### App Architecture Assessment:
- ✅ **Simple**: File-based storage (no database complexity)
- ✅ **Efficient**: Static generation where possible, API routes only when needed
- ✅ **Robust**: Environment-based config, error handling in place
- ✅ **Scalable**: Can handle growth with PM2/clustering
- ✅ **No Overengineering**: Direct file operations, minimal dependencies

---

## 📋 Pre-Deployment Checklist

### Required Files:
- ✅ `.env.local` (environment variables)
- ✅ `.htaccess` (for Apache servers)
- ✅ All config files in `/config` directory
- ✅ Empty directories: `/content/posts`, `/data/queue`, `/data/published`

### Required Services:
- ✅ Claude API key from Anthropic
- ✅ Node.js 20.x or higher
- ✅ npm 9.x or higher

---

## 💻 LOCAL DEPLOYMENT (Windows 10 Laptop)

### Step 1: Clean Setup
```cmd
# Open Command Prompt or PowerShell
cd C:\xampp\htdocs\myTechBlog

# Clean install
rmdir /s /q node_modules .next
npm cache clean --force
npm install
```

### Step 2: Configure Environment
Create `.env.local` file:
```env
CLAUDE_API_KEY=your-claude-api-key-here
ADMIN_PASSWORD=admin
SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3: Build & Run
```cmd
# Build the application
npm run build

# Start development server
npm run dev

# OR start production server locally
npm start
```

### Step 4: Access Local Site
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- Login: username `admin`, password `admin`

### Step 5: Test Core Functions
1. ✅ Homepage loads
2. ✅ Admin login works
3. ✅ Scraping triggers (click button in admin)
4. ✅ Article approval/rejection works
5. ✅ Publishing works

---

## ☁️ CLOUDWAYS DEPLOYMENT (Production)

### Step 1: Run Pre-Deployment Validation

**Before deploying, validate your environment locally:**

```bash
# Run the deployment validation script
bash scripts/validate-deploy.sh
```

This script checks:
- ✅ Node.js version (requires v18+)
- ✅ Required directories (data/queue, content/posts, config, logs, public)
- ✅ Environment variables (.env.local with CLAUDE_API_KEY, ADMIN_PASSWORD)
- ✅ Apache modules (proxy, proxy_http, headers, rewrite)
- ✅ PM2 availability
- ✅ ecosystem.config.js exists
- ✅ Dependencies installed (node_modules)
- ✅ .htaccess configuration
- ✅ Build test passes

**Fix any errors before proceeding to production deployment.**

---

### Step 2: Prepare Cloudways Application

1. **Create New Application:**
   - Log into Cloudways
   - Create Custom Application (not WordPress/PHP)
   - Choose Node.js as application type
   - Select server size (1GB RAM minimum)

2. **Configure Application Settings:**
   ```
   Application Name: techpulsedaily
   Domain: techpulsedaily.app
   Web Root: public_html
   ```

### Step 3: SSH Setup & Clone Repository

```bash
# SSH into Cloudways server
ssh master_wfdtscuzfm@174.138.60.9888

# Navigate to application directory
cd /home/master/applications/zzzzzzzzzzzz

# Clone repository
git clone https://github.com/travissutphin/techpulsedaily.app.git .

# Install dependencies
npm install
```

### Step 4: Production Environment Setup

```bash
# Create production .env.local
nano .env.local
```

Add:
```env
CLAUDE_API_KEY=your-production-claude-api-key
ADMIN_PASSWORD=strong-production-password-here
SITE_URL=https://techpulsedaily.app
NODE_ENV=production

# Optional: Override paths if needed
# APP_ROOT=/home/master/applications/zzzzzzzzzzzz
# DATA_DIR=/home/master/applications/zzzzzzzzzzzz/data
# CONTENT_DIR=/home/master/applications/zzzzzzzzzzzz/content
# CONFIG_DIR=/home/master/applications/zzzzzzzzzzzz/config
# LOGS_DIR=/home/master/applications/zzzzzzzzzzzz/logs
```

**Note:** The app now uses `PathResolver` for environment-aware path handling. By default, it uses `process.cwd()`, but you can override with environment variables if the server structure requires it.

### Step 5: Build Application

```bash
# Build for production
npm run build

# If ESLint errors occur, use:
npm run build -- --no-lint
```

### Step 6: Setup PM2 Process Manager

**The ecosystem.config.js file is already included in the repository.**

```bash
# Start application with PM2 using existing config
npx pm2 start ecosystem.config.js

# Save PM2 config
npx pm2 save

# Setup startup script (to auto-start on server reboot)
npx pm2 startup

# Follow the instructions provided by the startup command
```

**Existing ecosystem.config.js configuration:**
```javascript
module.exports = {
  apps: [{
    name: 'techpulse',
    script: './node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    time: true
  }]
}
```

**Features:**
- Automatic restart on crashes
- Memory limit: 500MB
- Logs saved to `./logs/pm2-error.log` and `./logs/pm2-out.log`
- Timestamped log entries

### Step 7: Configure Cloudways/Apache

**Option A: Via Cloudways Panel**
1. Go to Application Settings → Application Settings
2. Add Web Root: `public_html`
3. Enable Varnish: OFF (conflicts with Node.js)

**Option B: Manual Apache Config**
```bash
# Create/edit .htaccess in public_html
nano .htaccess
```

Ensure it contains:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

<IfModule mod_headers.c>
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Host "techpulsedaily.app"
</IfModule>
```

### Step 8: SSL Configuration
1. In Cloudways panel → SSL Certificate
2. Install Let's Encrypt certificate
3. Force HTTPS redirect: ON

### Step 9: Final Verification

```bash
# Check PM2 status
npx pm2 status

# View logs
npx pm2 logs techpulse

# Test local connection
curl http://localhost:3000

# Check if site is live
curl https://techpulsedaily.app
```

---

## 🔧 Troubleshooting Guide

### Issue: Pre-Deployment Validation Fails

**Run the validation script to identify issues:**
```bash
bash scripts/validate-deploy.sh
```

Common fixes:
- **Node.js too old**: Upgrade to v18+ (`nvm install 18` or download from nodejs.org)
- **Missing directories**: Script auto-creates them, but verify permissions
- **CLAUDE_API_KEY not set**: Add to .env.local file
- **Apache modules disabled**: Run `a2enmod proxy proxy_http headers rewrite && service apache2 restart`
- **Build fails**: Use `npm run build -- --no-lint` to bypass ESLint warnings

---

### Issue: 403 Forbidden
```bash
# Fix: Ensure .htaccess is present and Apache modules enabled
a2enmod proxy proxy_http headers rewrite
service apache2 restart
```

### Issue: 502 Bad Gateway
```bash
# Fix: Check if Node.js app is running
npx pm2 list
npx pm2 restart techpulse

# Check logs for errors
npx pm2 logs techpulse --lines 50
```

### Issue: Build Fails
```bash
# Fix: Skip linting errors (ESLint warnings don't prevent compilation)
npm run build -- --no-lint
```

### Issue: PM2 Not Starting
```bash
# Fix: Check logs and restart with ecosystem config
npx pm2 logs techpulse --lines 50
npx pm2 delete techpulse
npx pm2 start ecosystem.config.js
```

### Issue: File Paths Not Resolving

**The app now uses PathResolver for cross-platform paths.**

If files aren't found, check:
```bash
# Verify environment variables
cat .env.local | grep -E "APP_ROOT|DATA_DIR|CONTENT_DIR|CONFIG_DIR"

# If paths need override, add to .env.local:
APP_ROOT=/full/path/to/application
DATA_DIR=/full/path/to/application/data
CONTENT_DIR=/full/path/to/application/content
CONFIG_DIR=/full/path/to/application/config
LOGS_DIR=/full/path/to/application/logs
```

**Default behavior** (if not set):
- Uses `process.cwd()` as base directory
- All paths relative to application root

---

## ✅ Post-Deployment Checklist

### Local (Windows):
- [ ] Site loads at http://localhost:3000
- [ ] Admin panel accessible
- [ ] Can trigger scraping
- [ ] Can approve/reject articles
- [ ] Can publish articles

### Production (Cloudways):
- [ ] Site loads at https://techpulsedaily.app
- [ ] SSL certificate active
- [ ] Admin panel works with production password
- [ ] PM2 process running
- [ ] Logs show no errors
- [ ] Test scraping functionality
- [ ] Test article publishing

---

## 📝 Maintenance Commands

### Local Development:
```cmd
npm run dev          # Start development
npm run build        # Build production
npm run lint         # Check code quality
```

### Production Server:
```bash
npx pm2 restart techpulse     # Restart app
npx pm2 logs techpulse        # View logs
npx pm2 monit                 # Monitor resources
git pull origin main          # Update code
npm install                   # Update dependencies
npm run build                 # Rebuild
npx pm2 restart techpulse     # Apply changes
```

---

## 🎯 Core Principle Compliance

The deployment maintains simplicity by:
1. **No complex infrastructure** - Just Node.js and file storage
2. **Single configuration file** - .env.local handles all environments
3. **Standard tools** - npm, PM2, Apache (no exotic dependencies)
4. **Clear separation** - Development vs Production clearly defined
5. **Easy rollback** - Git-based deployment allows quick reverts
6. **Environment-aware paths** - PathResolver handles cross-platform compatibility
7. **Pre-deployment validation** - Catch issues before they reach production
8. **Standardized process management** - ecosystem.config.js for consistent PM2 setup

---

## 🚨 Important Security Notes

1. **Never commit .env.local** to git
2. **Use strong passwords** in production
3. **Keep Claude API key secret**
4. **Regular backups** of /content and /data directories
5. **Monitor PM2 logs** for suspicious activity

---

**Ready to Deploy!** Follow these steps exactly and your site will be running on both local and Cloudways. 🚀