#!/bin/bash
# Cloudways Server Assessment Script
# Purpose: Gather server info BEFORE deployment to determine best deployment strategy
# Usage: Run this via SSH on new Cloudways application
# Version: 1.0.0

echo "======================================"
echo "CLOUDWAYS SERVER ASSESSMENT"
echo "======================================"
echo ""
echo "Run Date: $(date)"
echo "Server: $(hostname)"
echo ""

# 1. Check Application Type
echo "1️⃣ APPLICATION TYPE"
echo "-----------------------------------"
if [ -f "/etc/nginx/sites-enabled/$(basename $PWD)" ]; then
    echo "✓ Nginx-based application"
    WEBSERVER="nginx"
elif [ -f "/etc/apache2/sites-enabled/$(basename $PWD)" ]; then
    echo "✓ Apache-based application"
    WEBSERVER="apache"
else
    echo "⚠ Unable to determine web server"
    WEBSERVER="unknown"
fi

# Check if hybrid (both running)
if pgrep nginx >/dev/null && pgrep apache2 >/dev/null; then
    echo "✓ Hybrid setup detected: Nginx → Apache"
    SETUP="hybrid"
elif pgrep nginx >/dev/null; then
    echo "✓ Nginx only"
    SETUP="nginx-only"
elif pgrep apache2 >/dev/null; then
    echo "✓ Apache only"
    SETUP="apache-only"
else
    echo "⚠ No web server detected"
    SETUP="none"
fi

echo "Web Server: $WEBSERVER | Setup: $SETUP"
echo ""

# 2. Check Node.js availability
echo "2️⃣ NODE.JS RUNTIME"
echo "-----------------------------------"
if command -v node >/dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js installed: $NODE_VERSION"
else
    echo "✗ Node.js NOT installed"
    NODE_VERSION="none"
fi

if command -v npm >/dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm installed: $NPM_VERSION"
else
    echo "✗ npm NOT installed"
    NPM_VERSION="none"
fi
echo ""

# 3. Check directory structure
echo "3️⃣ DIRECTORY STRUCTURE"
echo "-----------------------------------"
pwd
ls -la | grep -E "public_html|www|htdocs|conf|logs"
echo ""

# 4. Check web root
echo "4️⃣ WEB ROOT CONTENTS"
echo "-----------------------------------"
if [ -d "public_html" ]; then
    echo "Web root: public_html/"
    ls -la public_html/ | head -10
elif [ -d "www" ]; then
    echo "Web root: www/"
    ls -la www/ | head -10
elif [ -d "htdocs" ]; then
    echo "Web root: htdocs/"
    ls -la htdocs/ | head -10
else
    echo "⚠ Standard web root not found"
fi
echo ""

# 5. Check Apache modules (if Apache exists)
echo "5️⃣ APACHE MODULES (if applicable)"
echo "-----------------------------------"
if command -v apachectl >/dev/null; then
    echo "Checking for proxy modules:"
    apachectl -M 2>/dev/null | grep -E "proxy|headers|rewrite" || echo "⚠ No proxy modules found (may need Nginx config instead)"
else
    echo "N/A - Apache not available or not accessible"
fi
echo ""

# 6. Check PHP version (to determine if PHP stack)
echo "6️⃣ PHP AVAILABILITY"
echo "-----------------------------------"
if command -v php >/dev/null; then
    PHP_VERSION=$(php -v | head -1)
    echo "✓ PHP installed: $PHP_VERSION"
    echo "Stack type: PHP-optimized (may need Node.js deployment adjustments)"
else
    echo "✗ PHP not installed"
    echo "Stack type: Likely Node.js-ready"
fi
echo ""

# 7. Check PM2 availability
echo "7️⃣ PROCESS MANAGER"
echo "-----------------------------------"
if command -v pm2 >/dev/null; then
    PM2_VERSION=$(pm2 -v)
    echo "✓ PM2 installed globally: $PM2_VERSION"
else
    echo "⚠ PM2 not installed globally (can use npx pm2)"
fi
echo ""

# 8. Check available ports
echo "8️⃣ PORT AVAILABILITY"
echo "-----------------------------------"
echo "Checking common Node.js ports (3000, 3001, 8080):"
for port in 3000 3001 8080; do
    if netstat -tuln 2>/dev/null | grep -q ":$port "; then
        echo "✗ Port $port is in use"
    else
        echo "✓ Port $port available"
    fi
done
echo ""

# 9. Summary and Recommendation
echo "======================================"
echo "DEPLOYMENT RECOMMENDATION"
echo "======================================"
echo ""

if [ "$SETUP" = "hybrid" ]; then
    echo "📋 HYBRID SETUP (Nginx → Apache)"
    echo "-----------------------------------"
    echo "✓ Deploy to: public_html/"
    echo "✓ Use: .htaccess for Apache proxy config"
    echo "✓ Node.js runs on: port 3000"
    echo "✓ Traffic flow: Nginx → Apache (reads .htaccess) → Node.js"
    echo ""
    echo "Deployment files needed:"
    echo "  - .htaccess (Apache proxy to localhost:3000)"
    echo "  - ecosystem.config.js (PM2 config)"
    echo "  - .env.local (environment variables)"

elif [ "$SETUP" = "nginx-only" ]; then
    echo "📋 NGINX-ONLY SETUP"
    echo "-----------------------------------"
    echo "✓ Deploy to: public_html/ or custom directory"
    echo "⚠ CANNOT use .htaccess (Nginx doesn't support it)"
    echo "✓ Node.js runs on: port 3000"
    echo "✓ Traffic flow: Nginx → Node.js (direct)"
    echo ""
    echo "Deployment files needed:"
    echo "  - Nginx config modification (in /etc/nginx/...)"
    echo "  - ecosystem.config.js (PM2 config)"
    echo "  - .env.local (environment variables)"
    echo ""
    echo "⚠ NOTE: May need Cloudways support to modify Nginx config"

elif [ "$SETUP" = "apache-only" ]; then
    echo "📋 APACHE-ONLY SETUP"
    echo "-----------------------------------"
    echo "✓ Deploy to: public_html/"
    echo "✓ Use: .htaccess for proxy config"
    echo "✓ Node.js runs on: port 3000"
    echo "✓ Traffic flow: Apache → Node.js"
    echo ""
    echo "Deployment files needed:"
    echo "  - .htaccess (Apache proxy to localhost:3000)"
    echo "  - ecosystem.config.js (PM2 config)"
    echo "  - .env.local (environment variables)"
fi

echo ""
echo "======================================"
echo "ASSESSMENT COMPLETE"
echo "======================================"
echo ""
echo "Save this output for deployment planning."
echo "Recommended: Run 'cloudways-deployment-plan.md' generator next."
