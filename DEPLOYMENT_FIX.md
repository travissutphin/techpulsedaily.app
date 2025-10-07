# 🚨 Production Deployment Fix - Apache 403 Forbidden Error

## Issue
**Error**: 403 Forbidden - Apache/2.4.65 (Debian)
**Site**: techpulsedaily.app
**Cause**: Apache server misconfiguration or missing deployment files

## Quick Fix Solutions

### Solution 1: Apache Configuration Fix

1. **Check Apache Document Root**
   ```bash
   # SSH into your server
   ssh your-server

   # Check Apache config
   sudo nano /etc/apache2/sites-available/techpulsedaily.app.conf
   ```

2. **Correct Apache Virtual Host Configuration**
   ```apache
   <VirtualHost *:80>
       ServerName techpulsedaily.app
       ServerAlias www.techpulsedaily.app

       # Point to Next.js build output
       DocumentRoot /var/www/techpulsedaily.app/out

       # OR for Node.js server
       ProxyPass / http://localhost:3000/
       ProxyPassReverse / http://localhost:3000/

       <Directory /var/www/techpulsedaily.app>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/techpulsedaily-error.log
       CustomLog ${APACHE_LOG_DIR}/techpulsedaily-access.log combined
   </VirtualHost>
   ```

3. **Enable site and restart Apache**
   ```bash
   sudo a2ensite techpulsedaily.app.conf
   sudo systemctl reload apache2
   ```

### Solution 2: Deploy as Node.js App with PM2

Since this is a Next.js app, it should run as a Node.js server, not static Apache files:

1. **Install Node.js and PM2**
   ```bash
   # Install Node.js (if not installed)
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2
   ```

2. **Deploy the Application**
   ```bash
   # Clone repository
   cd /var/www
   git clone https://github.com/travissutphin/techpulsedaily.app.git
   cd techpulsedaily.app

   # Install dependencies
   npm install

   # Create production .env.local
   cat > .env.local << EOF
   CLAUDE_API_KEY=your-production-key
   ADMIN_PASSWORD=your-secure-password
   SITE_URL=https://techpulsedaily.app
   NODE_ENV=production
   EOF

   # Build the application
   npm run build

   # Start with PM2
   pm2 start npm --name "techpulse" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Apache as Reverse Proxy**
   ```bash
   # Enable proxy modules
   sudo a2enmod proxy
   sudo a2enmod proxy_http

   # Update Apache config (from Solution 1) with ProxyPass
   sudo systemctl restart apache2
   ```

### Solution 3: Quick Static Export (Alternative)

If you want to run as static files:

1. **Export as Static Site**
   ```bash
   # On your local machine
   npm run build
   npx next export

   # This creates an 'out' directory with static files
   ```

2. **Upload to Server**
   ```bash
   # Upload the 'out' directory contents to server
   scp -r out/* user@techpulsedaily.app:/var/www/techpulsedaily.app/
   ```

3. **Fix Permissions**
   ```bash
   # On the server
   sudo chown -R www-data:www-data /var/www/techpulsedaily.app
   sudo chmod -R 755 /var/www/techpulsedaily.app
   ```

## Recommended Approach: Node.js + PM2

**Why**: TechPulse Daily needs server-side features for:
- API routes (`/api/admin/*`, `/api/scrape`)
- Dynamic content generation
- Admin authentication
- Real-time scraping

## Verification Steps

1. **Check if app is running**
   ```bash
   pm2 status
   curl http://localhost:3000
   ```

2. **Check Apache proxy**
   ```bash
   sudo apache2ctl -S
   curl -I https://techpulsedaily.app
   ```

3. **Check logs**
   ```bash
   # PM2 logs
   pm2 logs techpulse

   # Apache logs
   sudo tail -f /var/log/apache2/techpulsedaily-error.log
   ```

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| 403 Forbidden | Check Directory permissions, Apache config |
| 502 Bad Gateway | Ensure Node.js app is running on port 3000 |
| Blank page | Check if build completed successfully |
| API routes 404 | Must run as Node.js app, not static files |

## Emergency Quick Deploy

```bash
# One-liner to get site running
cd /var/www && \
git clone https://github.com/travissutphin/techpulsedaily.app.git && \
cd techpulsedaily.app && \
npm install && \
npm run build && \
pm2 start npm --name techpulse -- start
```

## Next Steps

1. **Immediate**: Fix Apache config or deploy with PM2
2. **Verify**: Site loads at https://techpulsedaily.app
3. **Test**: Admin panel at /admin
4. **Monitor**: Set up PM2 monitoring

---

**Need help?** The 403 error is typically a simple Apache config issue. The site will work once properly deployed as a Node.js application.