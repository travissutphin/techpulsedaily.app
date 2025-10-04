# TechPulse Daily - Production Deployment Guide

**Version**: 2.0
**Stack**: Cloudways Node.js/Nginx Stack (Port 80 - No Proxy)
**Last Updated**: 2025-10-04
**Principle**: Self-contained, no server admin dependencies

---

## Prerequisites

### Cloudways Setup
1. **Create Application**: Node.js Stack or Custom App (Nginx-only)
2. **Get SSH Credentials**: From Cloudways dashboard
3. **Note Details**:
   - SSH Username: `master_[appid]`
   - Server IP: `xxx.xxx.xxx.xxx`
   - Application Path: `/home/master/applications/[appid]/public_html`

---

## Deployment Steps

### 1. SSH into Server
```bash
ssh master_[appid]@[server-ip]
```

### 2. Navigate to Application Directory
```bash
cd /home/master/applications/[appid]/public_html
```

### 3. Clone Repository
```bash
git clone https://github.com/yourusername/myTechBlog.git .
```

Or use Git deployment from Cloudways dashboard.

### 4. Install Dependencies
```bash
npm install
```

### 5. Create Environment File
```bash
nano .env.local
```

Add:
```env
NODE_ENV=production
PORT=80
CLAUDE_API_KEY=your-actual-api-key-here
```

Save and exit (Ctrl+X, Y, Enter)

### 6. Build Application
```bash
npm run build
```

### 7. Start with PM2
```bash
# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup auto-restart on server reboot
pm2 startup
# Run the command it outputs
```

### 8. Verify Deployment
```bash
# Check PM2 status
pm2 list

# Check logs
pm2 logs techpulse

# Test endpoint
curl http://localhost/api/health
```

---

## Architecture

### Traffic Flow
```
User Request (https://techpulsedaily.app)
    ↓
Cloudways Nginx (Port 443/80)
    ↓
Next.js App via PM2 (Port 80)
    ↓
Response
```

**No Apache, No .htaccess, No Proxy - Direct Nginx → Node.js**

---

## Configuration Files

### `ecosystem.config.js` (PM2 Configuration)
- **Port**: 80 (direct, no proxy needed)
- **Instances**: 1 (single process)
- **Auto-restart**: Enabled
- **Memory limit**: 500MB

### `.env.local` (Environment Variables)
- `NODE_ENV=production`
- `PORT=80`
- `CLAUDE_API_KEY=[your-key]`

### No `.htaccess` Required
- Nginx stack doesn't use Apache
- Application runs directly on port 80

---

## Updates & Redeployment

### Deploy Code Changes
```bash
# SSH into server
ssh master_[appid]@[server-ip]

# Navigate to app
cd /home/master/applications/[appid]/public_html

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Rebuild application
npm run build

# Restart PM2
pm2 restart techpulse

# Verify
pm2 logs techpulse
```

### Environment Variable Changes
```bash
# Edit .env.local
nano .env.local

# Restart app to load new variables
pm2 restart techpulse
```

---

## Monitoring & Maintenance

### Check Application Status
```bash
pm2 list
pm2 monit
```

### View Logs
```bash
# Real-time logs
pm2 logs techpulse

# Last 100 lines
pm2 logs techpulse --lines 100

# Error logs only
pm2 logs techpulse --err
```

### Restart Application
```bash
pm2 restart techpulse
```

### Stop Application
```bash
pm2 stop techpulse
```

### Clear Logs
```bash
pm2 flush techpulse
```

---

## Troubleshooting

### Application Not Accessible
```bash
# Check if PM2 is running
pm2 list

# Check if port 80 is in use
lsof -i :80

# Restart PM2
pm2 restart techpulse

# Check logs for errors
pm2 logs techpulse --err
```

### Permission Errors
```bash
# Fix permissions via Cloudways dashboard
# Application Management → Fix Permissions

# Or manually (from Cloudways support)
chown -R master:www-data /home/master/applications/[appid]/public_html
chmod -R 755 /home/master/applications/[appid]/public_html
```

### Build Errors
```bash
# Clear build cache
rm -rf .next

# Clear npm cache
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Rebuild
npm run build
```

### PM2 Not Starting
```bash
# Verify PM2 installation
pm2 -v

# Reinstall PM2 if needed (see cloudways-nodejs-reference.md)

# Start with explicit config
pm2 start ecosystem.config.js
pm2 save
```

---

## Stack Comparison

### Why We Chose Node.js Stack (Nginx-only)

| Feature | PHP Stack (Previous) | Node.js Stack (Current) |
|---------|---------------------|-------------------------|
| Proxy Setup | .htaccess required | None (direct port 80) |
| Performance | Apache → Node.js | Direct Nginx → Node.js |
| Configuration | Cloudways support needed | Self-contained |
| Deployment | Blocked by AllowOverride | ✅ Works out of box |

**Previous Issue**: PHP Stack required `AllowOverride All` which Cloudways couldn't enable.

**Current Solution**: Node.js Stack runs directly on port 80, no Apache configuration needed.

---

## Security Notes

### Environment Variables
- Never commit `.env.local` to git
- Already in `.gitignore`
- Rotate `CLAUDE_API_KEY` periodically

### API Authentication
- Hardcoded credentials in `src/app/api/admin/login/route.ts`
- Username: `admin`
- Password: `password`
- **Production TODO**: Consider stronger authentication

### Port 80 Access
- PM2 runs as `master` user
- Cloudways allows port 80 binding on Node.js stack
- No `sudo` required

---

## GitOps Workflow

### Repository Structure
```
myTechBlog/
├── ecosystem.config.js    # PM2 config (PORT=80)
├── .env.example           # Environment template
├── .gitignore             # Excludes .env.local
├── docs/
│   ├── DEPLOYMENT.md      # This file
│   └── cloudways-nodejs-reference.md
└── src/                   # Application code
```

### Deployment via Git
1. **Push to GitHub**: `git push origin main`
2. **Pull on Server**: `git pull origin main`
3. **Rebuild**: `npm run build`
4. **Restart**: `pm2 restart techpulse`

**Future Enhancement**: Setup Cloudways Git deployment for automatic pulls.

---

## Related Documentation

- **Stack Decision**: `docs/CLOUDWAYS_STACK_DECISION_MATRIX.md`
- **Cloudways Reference**: `docs/cloudways-nodejs-reference.md`
- **Project Instructions**: `CLAUDE.md`

---

## Quick Reference Commands

```bash
# SSH
ssh master_[appid]@[server-ip]

# Navigate
cd /home/master/applications/[appid]/public_html

# Deploy
git pull && npm install && npm run build && pm2 restart techpulse

# Logs
pm2 logs techpulse

# Status
pm2 list

# Restart
pm2 restart techpulse
```

---

**Deployment Owner**: [Flow] (DevOps)
**Stack Decision**: Node.js Stack (Nginx-only, Port 80)
**Status**: Production-ready, self-contained
