# Cloudways Node.js Application Deployment Reference
**Version**: 1.0  
**Updated**: October 2025  
**Purpose**: Reference guide for building and deploying Node.js applications optimized for Cloudways servers

---

## Table of Contents
1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Prerequisites](#prerequisites)
4. [Server Setup](#server-setup)
5. [Application Deployment](#application-deployment)
6. [Configuration](#configuration)
7. [Process Management with PM2](#process-management-with-pm2)
8. [Testing & Verification](#testing--verification)
9. [Common Issues & Solutions](#common-issues--solutions)
10. [Best Practices](#best-practices)

---

## Overview

### What is Cloudways?
Cloudways is a managed cloud hosting platform that simplifies server management while providing full control via SSH. It offers:
- Managed infrastructure (server setup, OS maintenance, security patches)
- Support for multiple cloud providers (DigitalOcean, AWS, GCP, Vultr, Linode)
- User-friendly dashboard
- Automatic backups
- 24/7 support

### Node.js on Cloudways
While Cloudways is primarily PHP-focused, it fully supports Node.js applications through custom PHP app configuration and proxy routing.

**Key Advantage**: You get the simplicity of managed hosting without sacrificing SSH access and deployment flexibility.

---

## Core Concepts

### Port Routing Challenge
**The Problem**: 
- Node.js apps typically run on custom ports (3000, 4000, 8080, etc.)
- Cloudways firewall blocks all ports except 80 (HTTP) and 443 (HTTPS) for security
- Direct access like `https://yourdomain.com:3000` won't work

**The Solution**: 
Use Apache's `mod_proxy` module to route traffic from port 80/443 to your Node.js app's port internally.

```
External Request (Port 80/443) 
    ↓
Apache mod_proxy 
    ↓
Internal Routing (Port 3000)
    ↓
Node.js Application
```

### User Types
- **Master User**: Full server access, used for global npm packages and server configuration
- **Application User**: Limited privileges, can cause permission issues

**Always use Master User credentials for Node.js deployment**

---

## Prerequisites

### Cloudways Account Setup
1. Create Cloudways account
2. Provision a VPS (smallest server works for testing)
3. Choose cloud provider (DigitalOcean recommended for beginners)
4. Server provisioning takes ~7-10 minutes

### Verify Node.js & NPM Installation
SSH into server and verify:
```bash
node -v
npm -v
```

Cloudways servers come with Node.js pre-installed. If you need a different version, use NVM (Node Version Manager).

### Enable SSH Access
1. Go to: **Servers → Manage Services → Settings & Packages**
2. Ensure SSH access is enabled
3. Get credentials from: **Application Management → Access Details**

---

## Server Setup

### Step 1: Create PHP Application
Even though we're running Node.js, we start with a PHP app for proper server configuration:

1. In Cloudways dashboard: **Applications → Add Application**
2. Select **Custom PHP** application type
3. Name your application (e.g., `my-node-app`)
4. Wait for provisioning to complete

### Step 2: Access Server via SSH
```bash
ssh master@your-server-ip -p your-ssh-port
```

Enter the master password from Cloudways dashboard when prompted.

### Step 3: Navigate to Application Directory
```bash
cd /home/master/applications/{dbname}/public_html
```

Replace `{dbname}` with your actual database name (found in Cloudways dashboard under application details).

---

## Application Deployment

### Method 1: Git Deployment (Recommended)
```bash
# Navigate to public_html
cd /home/master/applications/{dbname}/public_html

# Clone your repository
git clone https://github.com/yourusername/your-node-app.git .

# Or initialize Git for existing project
git init
git remote add origin https://github.com/yourusername/your-node-app.git
git pull origin main
```

**Note**: Cloudways supports Git deployment integration. Enable it in **Application Management → Deployment via Git** for automatic pulls on push.

### Method 2: SSH/SFTP Upload
- Use FileZilla or similar SFTP client
- Connect using Master credentials
- Upload project files to `/home/master/applications/{dbname}/public_html`

### Step 4: Install Dependencies
```bash
# Ensure you're in the project directory
cd /home/master/applications/{dbname}/public_html

# Install all npm packages
npm install
```

**Permission Issues?** 
If you encounter permission errors, reset permissions from Cloudways dashboard:
**Application Management → Fix Permissions**

---

## Configuration

### Enable mod_proxy (Required)
Contact Cloudways support to verify `mod_proxy` and `proxy_http` modules are enabled. This is usually enabled by default, but always confirm.

**Support Request Template**:
```
Subject: Enable mod_proxy for Node.js Application

Hello,
Please verify that mod_proxy and proxy_http modules are 
enabled for my server [Server Name/ID]. I'm deploying a 
Node.js application that requires proxy routing.

Thank you!
```

### Create/Edit .htaccess File

Navigate to public_html root directory:
```bash
cd /home/master/applications/{dbname}/public_html
nano .htaccess
```

**Basic Configuration (Port 3000)**:
```apache
# Disable directory listing
DirectoryIndex disabled

# Enable rewrite engine
RewriteEngine On
RewriteBase /

# Proxy all requests to Node.js app on port 3000
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

**Alternative Configuration (Better for SPAs)**:
```apache
RewriteEngine On

# Handle root path
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]

# Don't proxy static files if they exist
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Proxy everything else
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

**For Different Ports**:
Simply change `3000` to your desired port (e.g., 8080, 4000):
```apache
RewriteRule ^(.*)$ http://127.0.0.1:8080/$1 [P,L]
```

### Remove Default PHP Files
```bash
# Remove default index.php if it exists
rm -f /home/master/applications/{dbname}/public_html/index.php
```

---

## Process Management with PM2

### Why PM2?
Without PM2, your Node.js app stops when you close the SSH terminal. PM2 keeps apps running in the background and automatically restarts them on crashes or server reboots.

### Install PM2 Globally

#### Step 1: Configure Shell Environment
```bash
# Add npm path to bash aliases
cd && echo "export PATH='$PATH:/home/master/bin/npm'" >> .bash_aliases

# Add Node module path
cd ~ && echo "export NODE_PATH='$NODE_PATH:/home/master/bin/npm/lib/node_modules'" >> .bash_aliases

# Set npm prefix
npm config set prefix "/home/master/bin/npm/lib/node_modules"
```

#### Step 2: Install PM2
```bash
# Create PM2 alias
cd && echo "alias pm2='/home/master/bin/npm/lib/node_modules/bin/pm2'" >> .bash_aliases

# Install PM2 globally
npm install pm2@latest -g
```

#### Step 3: Activate Changes
```bash
# Reload bash configuration
source ~/.bash_aliases

# Or logout and login again
exit
# Then SSH back in
```

#### Step 4: Verify PM2 Installation
```bash
pm2 -v
```

### Start Your Application with PM2

```bash
# Navigate to your project
cd /home/master/applications/{dbname}/public_html

# Start your app (replace index.js with your entry point)
pm2 start index.js --name "my-node-app"

# Or for npm scripts
pm2 start npm --name "my-node-app" -- start

# Or for Express apps
pm2 start app.js --name "my-node-app"
```

### PM2 Essential Commands

```bash
# List all running apps
pm2 list

# View logs
pm2 logs

# View logs for specific app
pm2 logs my-node-app

# Monitor resources
pm2 monit

# Restart app
pm2 restart my-node-app

# Stop app
pm2 stop my-node-app

# Delete app from PM2
pm2 delete my-node-app

# Save current PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it outputs
```

### PM2 Configuration File (Recommended)

Create `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'my-node-app',
    script: './index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Start with config:
```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## Testing & Verification

### Basic "Hello World" Test

Create a test file:
```bash
cd /home/master/applications/{dbname}/public_html
nano test-server.js
```

Add this code:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from Cloudways Node.js!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

Test without PM2:
```bash
node test-server.js
```

Visit your domain:
- `https://yourdomain.com`
- Or Cloudways URL: `https://phpstack-XXXXXX-XXXXXX.cloudwaysapps.com/`

You should see: "Hello from Cloudways Node.js!"

**Clean up after testing**:
```bash
# Stop the running process (Ctrl+C)
rm test-server.js
```

### Express.js Test Application

```javascript
// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Express app running on Cloudways!');
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API endpoint working',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
```

Start with PM2:
```bash
pm2 start app.js --name "express-app"
pm2 save
```

### Verification Checklist

- [ ] Can access application at `https://yourdomain.com`
- [ ] No port number required in URL
- [ ] Application continues running after closing SSH
- [ ] PM2 shows app status as "online"
- [ ] Logs show no errors: `pm2 logs`
- [ ] Application restarts automatically on crash

---

## Common Issues & Solutions

### 1. 500 Internal Server Error

**Causes**:
- `mod_proxy` not enabled
- Incorrect .htaccess syntax
- Wrong port number

**Solutions**:
```bash
# Check Apache error logs
tail -f /var/log/apache2/error.log

# Verify mod_proxy is enabled (contact support)
# Test with minimal .htaccess first
```

### 2. 503 Service Unavailable

**Cause**: Node.js app not running

**Solutions**:
```bash
# Check if app is running
pm2 list

# Check logs for errors
pm2 logs

# Restart app
pm2 restart my-node-app

# If using node directly, use PM2 instead
```

### 3. "Cannot GET /route" 404 Errors

**Cause**: .htaccess not properly routing requests

**Solution**: Use the alternative .htaccess configuration:
```apache
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

### 4. Permission Denied Errors

**Solutions**:
```bash
# Option 1: Fix from Cloudways dashboard
# Go to: Application Management → Fix Permissions

# Option 2: Manual fix (use with caution)
chown -R master:www-data /home/master/applications/{dbname}/public_html
chmod -R 755 /home/master/applications/{dbname}/public_html
```

### 5. Module Not Found Errors

**Cause**: Dependencies not installed

**Solutions**:
```bash
# Ensure you're in the right directory
cd /home/master/applications/{dbname}/public_html

# Clear npm cache and reinstall
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

### 6. Port Already in Use

**Solution**:
```bash
# Find process using the port
lsof -i :3000

# Kill the process
kill -9 [PID]

# Or use PM2 to restart
pm2 restart my-node-app
```

### 7. Git Pull Not Working

**Cause**: Cloudways Git integration requires using the dashboard button

**Solution**: 
- Don't run `git pull` manually in public_html
- Use the "Pull" button in Cloudways dashboard under **Git Deployment**
- Or set up webhooks for automatic deployment

### 8. Node Version Compatibility Issues

**Solution**: Install and use NVM (Node Version Manager)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload bash
source ~/.bashrc

# Install specific Node version
nvm install 18.17.0

# Use specific version
nvm use 18.17.0

# Set default
nvm alias default 18.17.0
```

---

## Best Practices

### 1. Environment Variables
Never hardcode sensitive data. Use environment variables:

```javascript
// Load from .env file
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
```

Create `.env` file:
```bash
PORT=3000
DATABASE_URL=mongodb://username:password@host:port/database
NODE_ENV=production
```

**Security**: Add `.env` to `.gitignore`

### 2. Use PM2 Ecosystem File
Always use `ecosystem.config.js` for production:

```javascript
module.exports = {
  apps: [{
    name: 'production-app',
    script: './server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

### 3. Logging
Implement proper logging:

```javascript
// Using winston
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('Server started');
logger.error('Database connection failed', { error });
```

### 4. Health Check Endpoint
Always include a health check route:

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
```

### 5. Graceful Shutdown
Handle shutdown signals properly:

```javascript
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

### 6. Static File Serving
Serve static files efficiently:

```javascript
// Express
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true
}));
```

### 7. Security Headers
Implement security best practices:

```javascript
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
```

### 8. Error Handling Middleware
Implement centralized error handling:

```javascript
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});
```

### 9. Database Connection Management
Use connection pooling and proper error handling:

```javascript
// MongoDB example
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10
})
.then(() => console.log('Database connected'))
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});
```

### 10. Monitoring and Alerts
Set up monitoring:

```bash
# PM2 monitoring
pm2 install pm2-logrotate

# View resource usage
pm2 monit

# Set up alerts (requires PM2 Plus)
pm2 link [secret-key] [public-key]
```

---

## Quick Reference Commands

### SSH & Navigation
```bash
# SSH into server
ssh master@your-ip -p port

# Navigate to app
cd /home/master/applications/{dbname}/public_html

# Check current directory
pwd
```

### Git Operations
```bash
# Clone repo
git clone [repo-url] .

# Pull changes (use Cloudways dashboard instead)
# git pull origin main

# Check status
git status

# View remotes
git remote -v
```

### NPM Commands
```bash
# Install dependencies
npm install

# Install specific package
npm install express

# Install dev dependency
npm install --save-dev nodemon

# Run scripts
npm start
npm run dev

# Check outdated packages
npm outdated

# Update packages
npm update
```

### PM2 Commands
```bash
# Start app
pm2 start app.js --name myapp

# Start with ecosystem file
pm2 start ecosystem.config.js

# List apps
pm2 list

# Logs
pm2 logs
pm2 logs myapp --lines 100

# Restart
pm2 restart myapp
pm2 restart all

# Stop
pm2 stop myapp
pm2 stop all

# Delete
pm2 delete myapp
pm2 delete all

# Save configuration
pm2 save

# Monitor
pm2 monit

# Startup script
pm2 startup
pm2 save

# Update PM2
pm2 update
```

### File Management
```bash
# Create file
nano filename.js
touch filename.js

# Edit file
nano filename.js
vi filename.js

# View file
cat filename.js
less filename.js

# Remove file
rm filename.js
rm -rf folder/

# Copy file
cp source.js destination.js

# Move/rename
mv oldname.js newname.js

# Change permissions
chmod 755 file.js
chown master:www-data file.js
```

### Process Management
```bash
# Find process by port
lsof -i :3000
netstat -tuln | grep 3000

# Kill process
kill -9 [PID]
pkill -f node

# Check running processes
ps aux | grep node
```

### Server Information
```bash
# Check Node version
node -v

# Check NPM version
npm -v

# Check system info
uname -a

# Check disk space
df -h

# Check memory
free -m

# Check CPU info
lscpu
```

---

## Deployment Workflow Template

### Initial Setup
```bash
# 1. SSH into server
ssh master@your-ip -p port

# 2. Navigate to public_html
cd /home/master/applications/{dbname}/public_html

# 3. Clone repository or upload files
git clone [repo-url] .

# 4. Install dependencies
npm install

# 5. Create .htaccess
nano .htaccess
# Add proxy rules

# 6. Remove default PHP index
rm -f index.php

# 7. Test application
node app.js
# Visit domain to verify

# 8. Setup PM2
pm2 start app.js --name myapp
pm2 save
pm2 startup
# Run the command it outputs

# 9. Verify
pm2 list
pm2 logs
```

### Update/Deploy Workflow
```bash
# 1. SSH into server
ssh master@your-ip -p port

# 2. Navigate to app
cd /home/master/applications/{dbname}/public_html

# 3. Pull changes (via Cloudways dashboard)
# Or manually:
git pull origin main

# 4. Install new dependencies if any
npm install

# 5. Restart app
pm2 restart myapp

# 6. Check logs
pm2 logs myapp

# 7. Monitor
pm2 monit
```

---

## Additional Resources

### Official Documentation
- Cloudways Support: https://support.cloudways.com
- PM2 Documentation: https://pm2.keymetrics.io/docs
- Node.js Documentation: https://nodejs.org/docs

### Useful Guides
- How to Add Application: https://support.cloudways.com/how-to-add-an-application-to-an-existing-server/
- SSH Connection Guide: https://support.cloudways.com/en/articles/5119485-guide-to-connecting-to-your-application-using-ssh-sftp
- Git Deployment: https://support.cloudways.com/en/articles/5124087-deploy-code-to-your-application-using-git
- File Permissions: https://support.cloudways.com/en/articles/5126387-how-can-i-reset-file-and-folder-permissions

### Community Resources
- Cloudways Community Forum
- Stack Overflow (tag: cloudways)
- PM2 GitHub Issues

---

## Version History

### v1.0 (October 2025)
- Initial comprehensive guide
- Combined multiple source references
- Added troubleshooting section
- Included best practices
- Added quick reference commands

---

## Support

For issues specific to:
- **Cloudways Platform**: Contact Cloudways support via dashboard
- **Node.js/NPM**: Check Node.js documentation or Stack Overflow
- **PM2**: Check PM2 documentation or GitHub issues
- **Application Code**: Review application logs and error messages

---

## Notes for ClaudeCode

When building applications for Cloudways deployment:

1. **Always design for port 3000 by default** (easiest to configure)
2. **Include ecosystem.config.js** in every Node.js project
3. **Use environment variables** for all configuration
4. **Include .htaccess template** in project root
5. **Add health check endpoint** to all applications
6. **Implement proper error handling** and logging
7. **Use PM2-friendly entry points** (avoid complex startup scripts)
8. **Test locally** before deployment
9. **Document any non-standard ports** or configurations
10. **Include deployment instructions** in project README

### Recommended Project Structure
```
your-node-app/
├── .env.example
├── .gitignore
├── .htaccess
├── ecosystem.config.js
├── package.json
├── README.md
├── server.js (or index.js/app.js)
├── /routes
├── /controllers
├── /models
├── /middleware
├── /config
├── /public (static files)
└── /logs
```

---

**End of Reference Document**
