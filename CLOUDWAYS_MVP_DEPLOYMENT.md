# Cloudways MVP Deployment - GitOps Documentation

**Document Version**: 1.0.0
**Created**: 2025-10-03
**Author**: [DeploymentTeam] ([Flow], [Syntax], [Sentinal])
**Status**: Ready for Deployment
**Environment**: Production (Cloudways)

---

## 📋 Deployment Overview

### Objective
Deploy TechPulse Daily application from working localhost environment to Cloudways production server with **zero overengineering** - simple, efficient, robust deployment following core principles.

### Core Principle
> **Keep it simple, efficient, robust, best practice and scalable. No overengineering!**

---

## 🎯 Pre-Deployment State

### Local Environment (Verified Working)
- **Status**: ✅ Fully operational
- **URL**: http://localhost:3000
- **Node.js**: v22.14.0
- **Framework**: Next.js 15.5.3
- **Build**: Successful (`npm run build -- --no-lint`)
- **Features**: All tested and working
  - Homepage loads
  - Admin panel functional
  - Article queue operational
  - Publishing workflow verified

### Production Target
- **Server**: Cloudways (174.138.60.98)
- **SFTP Username**: ehrling
- **SFTP Password**: 3#Keisha3#
- **SSH User**: master_wfdtscuzfm
- **Application Path**: `/home/master/applications/smvczypsvx`
- **Domain**: https://techpulsedaily.app
- **Server Stack**: Apache 2.4, PHP 8.3 (unused), Node.js (required)

---

## ✅ Deployment Checklist

### Phase 1: Server Prerequisites (5 minutes)

**Owner**: [Flow]

```bash
# SSH into server
ssh master_wfdtscuzfm@174.138.60.98

# Verify Node.js v18+
node --version

# Verify npm
npm --version

# Verify Apache modules
apachectl -M | grep -E "proxy_module|proxy_http_module|headers_module|rewrite_module"
```

**Expected Results**:
- ✅ Node.js v18+ installed
- ✅ npm available
- ✅ All 4 Apache modules loaded

**If modules missing**:
```bash
a2enmod proxy proxy_http headers rewrite
service apache2 restart
```

---

### Phase 2: Code Deployment (5 minutes)

**Owner**: [Flow]

```bash
# Navigate to application directory
cd /home/master/applications/smvczypsvx

# Clone repository
git clone https://github.com/travissutphin/techpulsedaily.app.git .

# Install dependencies
npm install
```

**Expected Results**:
- ✅ Repository cloned successfully
- ✅ All dependencies installed (11 production packages)
- ✅ No npm errors

---

### Phase 3: Environment Configuration (3 minutes)

**Owner**: [Sentinal]

```bash
# Create production environment file
nano .env.local
```

**Add the following**:
```env
CLAUDE_API_KEY=<production-anthropic-api-key>
ADMIN_PASSWORD=<strong-password-20plus-chars>
SITE_URL=https://techpulsedaily.app
NODE_ENV=production
```

**Save and secure**:
```bash
chmod 600 .env.local
```

**Expected Results**:
- ✅ .env.local created
- ✅ All variables set
- ✅ Permissions locked to 600 (owner read/write only)

---

### Phase 4: Build Application (2 minutes)

**Owner**: [Syntax]

```bash
# Build for production
npm run build -- --no-lint
```

**Expected Results**:
- ✅ Build completes successfully
- ✅ `.next/` directory created
- ✅ Static pages generated
- ⚠️ ESLint warnings OK (not blocking)

---

### Phase 5: Start with PM2 (3 minutes)

**Owner**: [Flow]

```bash
# Start application using ecosystem config
npx pm2 start ecosystem.config.js

# Verify status
npx pm2 list

# Test local connection
curl http://localhost:3000

# Check logs
npx pm2 logs techpulse --lines 20
```

**Expected Results**:
- ✅ PM2 status shows "online"
- ✅ curl returns HTML content
- ✅ No errors in logs
- ✅ Scheduler auto-starts (if enabled in config)

---

### Phase 6: Apache Proxy Verification (5 minutes)

**Owner**: [Flow]

```bash
# Verify .htaccess exists
cat .htaccess

# Test public URL
curl -I https://techpulsedaily.app
```

**Expected .htaccess Content**:
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

**Expected Results**:
- ✅ .htaccess exists and configured
- ✅ curl returns HTTP 200 OK
- ✅ SSL active

---

### Phase 7: Application Testing (10 minutes)

**Owner**: [Verity] (QA)

**Browser Tests**:
1. Navigate to https://techpulsedaily.app
   - ✅ Homepage loads
   - ✅ SSL certificate valid (🔒 in address bar)
   - ✅ No console errors (F12)

2. Navigate to https://techpulsedaily.app/admin
   - ✅ Admin panel loads
   - ✅ Login form displays

3. Login with production credentials
   - ✅ Authentication succeeds
   - ✅ Dashboard displays

4. Test core features
   - ✅ Queue visible
   - ✅ Articles display
   - ✅ Stats load

**Expected Results**:
- ✅ All 4 test phases pass
- ✅ Application behaves identical to localhost

---

### Phase 8: Post-Deployment Monitoring (30 minutes passive)

**Owner**: [Flow]

```bash
# Monitor PM2 process
npx pm2 monit

# Watch logs for errors
npx pm2 logs techpulse --err --lines 50

# Check memory usage
npx pm2 status
```

**Expected Results**:
- ✅ Process remains "online" for 30+ minutes
- ✅ Memory usage < 500MB
- ✅ No crashes or restarts
- ✅ No errors in logs

---

## 🚨 Rollback Procedure

**If deployment fails or issues arise**:

```bash
# Stop PM2 process
npx pm2 stop techpulse
npx pm2 delete techpulse

# Optionally revert code
git log --oneline -n 5
git checkout <previous-commit-hash>

# Rebuild and restart
npm install
npm run build -- --no-lint
npx pm2 start ecosystem.config.js
```

**Rollback Time**: ~5 minutes

---

## 📊 Deployment Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Total Deployment Time | 15-20 min | ___ min |
| Build Time | <3 min | ___ min |
| Startup Time | <10 sec | ___ sec |
| Memory Usage | <500 MB | ___ MB |
| Downtime | 0 min | ___ min |
| Failed Steps | 0 | ___ |

---

## 🔐 Security Configuration

### File Permissions
```bash
chmod 600 .env.local                    # Secrets
chmod 750 data/ content/ logs/          # Application data
chmod 755 public/                       # Public assets
```

### Environment Variables
- ✅ CLAUDE_API_KEY: Production key (keep secure)
- ✅ ADMIN_PASSWORD: Strong password (20+ chars, mixed case, symbols)
- ✅ NODE_ENV: Set to "production"

### Network
- ✅ Apache proxy: Localhost only (127.0.0.1:3000)
- ✅ SSL certificate: Active and valid
- ✅ Security headers: Configured in .htaccess

---

## 📝 Configuration Files

### Critical Files Deployed
- ✅ `ecosystem.config.js` - PM2 process configuration
- ✅ `.htaccess` - Apache reverse proxy
- ✅ `.env.local` - Environment variables
- ✅ `package.json` - Dependencies
- ✅ `next.config.ts` - Next.js configuration

### Created During Deployment
- ✅ `.next/` - Production build output
- ✅ `logs/pm2-error.log` - PM2 error logs
- ✅ `logs/pm2-out.log` - PM2 output logs
- ✅ `data/queue/` - Article queue directories
- ✅ `content/posts/` - Published articles

---

## 🎯 Success Criteria

**Deployment is considered successful when**:
- ✅ All 8 deployment phases complete without errors
- ✅ Production URL loads (https://techpulsedaily.app)
- ✅ Admin panel accessible and functional
- ✅ PM2 process stable for 30+ minutes
- ✅ Memory usage within limits (<500MB)
- ✅ No errors in PM2 logs
- ✅ Application behavior matches localhost

---

## 🔄 GitOps Workflow

### Version Control
- **Repository**: https://github.com/travissutphin/techpulsedaily.app
- **Branch**: main
- **Commit**: Latest on main branch
- **Deployment Method**: git clone (initial), git pull (updates)

### Update Procedure
```bash
# SSH to server
ssh master_wfdtscuzfm@174.138.60.98
cd /home/master/applications/smvczypsvx

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build -- --no-lint

# Restart PM2
npx pm2 restart techpulse

# Verify
npx pm2 status
npx pm2 logs techpulse --lines 20
```

---

## 🧪 Verification Commands

**Quick health check**:
```bash
# Single command to verify deployment
npx pm2 status && curl -I https://techpulsedaily.app && echo "✅ DEPLOYMENT HEALTHY"
```

**Detailed check**:
```bash
# Node.js running
npx pm2 list | grep techpulse

# Application responding
curl -s http://localhost:3000 | head -n 1

# Public access working
curl -I https://techpulsedaily.app | grep "HTTP"

# Memory usage
npx pm2 status | grep techpulse | awk '{print $10}'

# Error count
npx pm2 logs techpulse --err --lines 100 | wc -l
```

---

## 📞 Support & Escalation

### If Issues Arise

**Level 1 - [Flow] (DevOps)**:
- Server access issues
- PM2 process problems
- Apache configuration

**Level 2 - [Syntax] (Principal Engineer)**:
- Build failures
- Code errors
- Integration issues

**Level 3 - [Sentinal] (Security)**:
- Authentication failures
- API key issues
- Permission problems

**Level 4 - [Travis] (Product Owner)**:
- Go/No-Go decisions
- Rollback authorization
- Business impact assessment

---

## 📅 Deployment Record

### Deployment Details
- **Date**: _______________
- **Start Time**: _______________
- **End Time**: _______________
- **Duration**: _______________ minutes
- **Deployed By**: _______________
- **Status**: [ ] Success [ ] Failed [ ] Rolled Back

### Checklist Sign-off
- [ ] Phase 1: Server Prerequisites - [Flow]
- [ ] Phase 2: Code Deployment - [Flow]
- [ ] Phase 3: Environment Config - [Sentinal]
- [ ] Phase 4: Build Application - [Syntax]
- [ ] Phase 5: Start PM2 - [Flow]
- [ ] Phase 6: Apache Proxy - [Flow]
- [ ] Phase 7: Application Testing - [Verity]
- [ ] Phase 8: Monitoring - [Flow]

### Notes
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 🎉 Post-Deployment Tasks

**Immediate** (within 24 hours):
- [ ] Monitor PM2 logs for patterns
- [ ] Review memory usage trends
- [ ] Verify SSL certificate expiration date
- [ ] Test from multiple geographic locations
- [ ] Document any issues encountered

**Short-term** (within 1 week):
- [ ] Set up basic uptime monitoring
- [ ] Review API usage in Anthropic dashboard
- [ ] Create manual backup of content directory
- [ ] Update documentation with any learnings

**Future Enhancements** (nice-to-have, not required):
- [ ] Automated backups via cron
- [ ] Health check endpoint
- [ ] Monitoring dashboard
- [ ] API rate limit alerts
- [ ] Performance optimization

---

## 📖 Related Documentation

- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment guide
- `ecosystem.config.js` - PM2 configuration
- `.htaccess` - Apache proxy configuration
- `CLAUDE.md` - Project instructions and team structure
- `scripts/validate-deploy.sh` - Pre-deployment validation script

---

**Document Status**: ✅ Ready for Execution
**Next Step**: Begin Phase 1 - Server Prerequisites Verification

---

*This deployment follows GitOps principles: version-controlled, declarative, auditable, and reproducible. All configuration is tracked in git, deployment is scripted, and rollback is straightforward.*
