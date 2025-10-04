# Cloudways Stack Decision Matrix

**Version**: 1.0.0
**Purpose**: Determine optimal Cloudways server stack BEFORE starting a project
**Principle**: DRY - Don't repeat fact-finding for every deployment

---

## 🎯 Decision Flow

```
START → What's the application runtime?
  ├─ PHP/Laravel/WordPress → Use PHP Stack (Apache/Nginx Hybrid)
  ├─ Node.js/Next.js/Express → Decision Point ↓
  └─ Static Site → Use Static Stack (Nginx only)

IF Node.js:
  ├─ Need .htaccess support? → PHP Stack (Hybrid: Nginx→Apache)
  ├─ Pure Node.js performance? → Node.js Stack (Nginx only)
  └─ Unsure? → See comparison below ↓
```

---

## 📊 Stack Comparison for Node.js Applications

| Feature | PHP Stack (Hybrid) | Node.js Stack (Nginx Only) |
|---------|-------------------|---------------------------|
| **Web Servers** | Nginx → Apache | Nginx only |
| **.htaccess Support** | ✅ Yes | ❌ No (Nginx config required) |
| **Proxy Config** | `.htaccess` in code | Manual Nginx config |
| **Performance** | Good (extra hop) | Excellent (direct) |
| **Deployment Complexity** | Simple (drop .htaccess) | Medium (config server) |
| **Localhost Parity** | High (XAMPP uses Apache) | Medium (different config) |
| **Future PHP Needs** | ✅ Can add PHP | ❌ Stack change required |
| **Cloudways Support** | Standard | Standard |
| **Best For** | Teams familiar with Apache, .htaccess-based apps | Performance-critical, Nginx-native apps |

---

## ✅ Recommendation by Project Type

### **Next.js / React / Node.js Apps**

**Recommended**: **PHP Stack (Hybrid)**

**Why**:
- ✅ Can use `.htaccess` for proxy (keep config in codebase, not server)
- ✅ Localhost (XAMPP/MAMP) matches production (Apache)
- ✅ Easier for teams not familiar with Nginx config
- ✅ Version-controlled deployment (`.htaccess` in git)
- ⚠️ Slight performance overhead (negligible for most apps)

**When to use Node.js Stack instead**:
- High-traffic application (10k+ concurrent users)
- Team is Nginx-native
- No need for .htaccess convenience

---

### **Express / Fastify / Pure Node.js APIs**

**Recommended**: **Node.js Stack (Nginx only)**

**Why**:
- ✅ Best performance (no Apache middle layer)
- ✅ Simpler stack (one web server)
- ✅ Industry standard for Node.js production
- ⚠️ Requires Nginx config knowledge
- ⚠️ Config changes need server access (not in codebase)

**When to use PHP Stack instead**:
- Team unfamiliar with Nginx
- Want config version-controlled (.htaccess)
- May add PHP components later

---

## 🔧 Pre-Project Checklist

**Before creating Cloudways application, decide:**

1. **Primary Runtime**:
   - [ ] PHP (WordPress, Laravel, etc.) → PHP Stack
   - [ ] Node.js (Next.js, Express, etc.) → See decision flow
   - [ ] Static (HTML/CSS/JS) → Static Stack

2. **If Node.js, consider**:
   - [ ] Do you use XAMPP/Apache locally? → PHP Stack (parity)
   - [ ] Do you prefer .htaccess over Nginx config? → PHP Stack
   - [ ] Is performance critical (high traffic)? → Node.js Stack
   - [ ] Team comfortable with Nginx? → Node.js Stack

3. **Future needs**:
   - [ ] Might add PHP later? → PHP Stack (easier)
   - [ ] Definitely Node.js only? → Node.js Stack (cleaner)

---

## 📋 Assessment Script Usage

**For existing Cloudways applications** (to understand current setup):

```bash
# SSH into Cloudways application
ssh master_wfdtscuzfm@your-server-ip

# Navigate to application directory
cd /home/master/applications/your-app-id

# Run assessment script
bash /path/to/cloudways-server-assessment.sh > server-assessment.txt

# Review output
cat server-assessment.txt
```

**Output tells you**:
- Current web server setup (Hybrid, Nginx-only, Apache-only)
- Node.js availability and version
- Directory structure
- Deployment recommendations

---

## 🎯 DRY Process - Standardized Deployment

### **Template Project Structure**

Create starter templates for each stack type:

```
cloudways-templates/
├── nextjs-php-stack/          # Next.js on PHP Stack (Hybrid)
│   ├── .htaccess              # Apache proxy config
│   ├── ecosystem.config.js    # PM2 config
│   ├── .env.example           # Environment template
│   └── DEPLOYMENT.md          # Stack-specific deployment guide
│
├── nextjs-nodejs-stack/       # Next.js on Node.js Stack (Nginx only)
│   ├── nginx.conf.template    # Nginx config template
│   ├── ecosystem.config.js    # PM2 config
│   ├── .env.example           # Environment template
│   └── DEPLOYMENT.md          # Stack-specific deployment guide
│
└── express-nodejs-stack/      # Express API on Node.js Stack
    ├── nginx.conf.template    # Nginx config template
    ├── ecosystem.config.js    # PM2 config
    ├── .env.example           # Environment template
    └── DEPLOYMENT.md          # Stack-specific deployment guide
```

---

## 🚀 Current Project Decision Record

**Project**: TechPulse Daily
**Date**: 2025-10-04
**Stack Chosen**: PHP Stack (Nginx → Apache Hybrid)

**Reasoning**:
1. ✅ Local development uses XAMPP (Apache)
2. ✅ Already have `.htaccess` configured
3. ✅ Team familiar with Apache
4. ✅ Keeps proxy config in codebase (git-versioned)
5. ✅ Traffic requirements don't need pure Nginx performance

**Assessment Results**:
- Web Server: Hybrid (Nginx → Apache)
- Node.js: v20.5.1 ✅
- npm: v9.8.0 ✅
- Web Root: `public_html/` (empty, ready for deployment)
- Apache Modules: Not checked (will rely on .htaccess)

**Deployment Strategy**:
- Deploy code to `/home/master/applications/smvczypsvx/public_html/`
- `.htaccess` proxies Apache → Node.js (port 3000)
- PM2 runs Node.js application
- Traffic: User → Nginx → Apache (reads .htaccess) → Node.js

---

## 📖 Related Documentation

- `scripts/cloudways-server-assessment.sh` - Server assessment script
- `CLOUDWAYS_MVP_DEPLOYMENT.md` - Deployment guide (this project)
- `.htaccess` - Apache proxy configuration
- `ecosystem.config.js` - PM2 process configuration

---

## 🔄 Process Improvement

**For Future Projects**:

1. **Before creating Cloudways app**: Review this decision matrix
2. **Choose stack type** in Cloudways dashboard during app creation
3. **After app created**: Run assessment script to verify
4. **Use template**: Copy appropriate starter template to project
5. **Deploy**: Follow stack-specific deployment guide

**Benefits**:
- ✅ No more "figure out server on deployment day"
- ✅ Consistent deployment process
- ✅ Faster onboarding for new projects
- ✅ Team knows what to expect

---

**Last Updated**: 2025-10-04
**Owner**: [Flow] (DevOps)
**Status**: Active - use for all future Cloudways deployments
