#!/bin/bash
# Deployment Validation Script for Cloudways Production
# This script validates the environment before deployment

set -e  # Exit on error

echo "🔍 TechPulse Daily - Deployment Validation"
echo "=========================================="

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0

# 1. Check Node.js version
echo -e "\n📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
  echo -e "${GREEN}✓${NC} Node.js version: $(node -v)"
else
  echo -e "${RED}✗${NC} Node.js version too old. Requires v18+, found: $(node -v)"
  ERRORS=$((ERRORS + 1))
fi

# 2. Check npm
echo -e "\n📦 Checking npm..."
if command -v npm &> /dev/null; then
  echo -e "${GREEN}✓${NC} npm version: $(npm -v)"
else
  echo -e "${RED}✗${NC} npm not found"
  ERRORS=$((ERRORS + 1))
fi

# 3. Check required directories
echo -e "\n📁 Checking directory structure..."
REQUIRED_DIRS=("data/queue" "content/posts" "config" "logs" "public")
for dir in "${REQUIRED_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo -e "${GREEN}✓${NC} Directory exists: $dir"
  else
    echo -e "${YELLOW}⚠${NC} Creating missing directory: $dir"
    mkdir -p "$dir"
  fi
done

# 4. Check environment file
echo -e "\n🔐 Checking environment configuration..."
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✓${NC} .env.local file exists"

  # Check required env vars
  if grep -q "CLAUDE_API_KEY" .env.local && ! grep -q "your-claude-api-key-here" .env.local; then
    echo -e "${GREEN}✓${NC} CLAUDE_API_KEY is configured"
  else
    echo -e "${RED}✗${NC} CLAUDE_API_KEY not properly configured in .env.local"
    ERRORS=$((ERRORS + 1))
  fi

  if grep -q "ADMIN_PASSWORD" .env.local; then
    echo -e "${GREEN}✓${NC} ADMIN_PASSWORD is configured"
  else
    echo -e "${YELLOW}⚠${NC} ADMIN_PASSWORD not found in .env.local"
  fi
else
  echo -e "${RED}✗${NC} .env.local file not found"
  ERRORS=$((ERRORS + 1))
fi

# 5. Check Apache modules (if on Linux)
if command -v apachectl &> /dev/null; then
  echo -e "\n🌐 Checking Apache configuration..."

  REQUIRED_MODULES=("proxy_module" "proxy_http_module" "headers_module" "rewrite_module")
  for mod in "${REQUIRED_MODULES[@]}"; do
    if apachectl -M 2>/dev/null | grep -q "$mod"; then
      echo -e "${GREEN}✓${NC} Apache module enabled: $mod"
    else
      echo -e "${RED}✗${NC} Apache module NOT enabled: $mod"
      echo -e "   Run: sudo a2enmod ${mod/_module/}"
      ERRORS=$((ERRORS + 1))
    fi
  done
else
  echo -e "\n${YELLOW}⚠${NC} Apache not found (skipping module check)"
fi

# 6. Check PM2
echo -e "\n🔄 Checking PM2..."
if command -v pm2 &> /dev/null || [ -f "node_modules/.bin/pm2" ]; then
  echo -e "${GREEN}✓${NC} PM2 is available"
else
  echo -e "${YELLOW}⚠${NC} PM2 not found globally or locally"
  echo -e "   Will use: npx pm2"
fi

# 7. Check ecosystem.config.js
echo -e "\n⚙️  Checking PM2 configuration..."
if [ -f "ecosystem.config.js" ]; then
  echo -e "${GREEN}✓${NC} ecosystem.config.js exists"
else
  echo -e "${RED}✗${NC} ecosystem.config.js not found"
  ERRORS=$((ERRORS + 1))
fi

# 8. Check dependencies
echo -e "\n📚 Checking dependencies..."
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules directory exists"
else
  echo -e "${YELLOW}⚠${NC} node_modules not found - run 'npm install'"
  ERRORS=$((ERRORS + 1))
fi

# 9. Check .htaccess
echo -e "\n🔧 Checking Apache configuration..."
if [ -f ".htaccess" ]; then
  echo -e "${GREEN}✓${NC} .htaccess file exists"
else
  echo -e "${RED}✗${NC} .htaccess file not found"
  ERRORS=$((ERRORS + 1))
fi

# 10. Validate build capability
echo -e "\n🏗️  Testing build process..."
if npm run build -- --no-lint > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Build test passed"
else
  echo -e "${RED}✗${NC} Build test failed"
  echo -e "   Run: npm run build -- --no-lint"
  ERRORS=$((ERRORS + 1))
fi

# Summary
echo -e "\n=========================================="
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ All validation checks passed!${NC}"
  echo -e "\n🚀 Ready for deployment to Cloudways"
  echo -e "\nNext steps:"
  echo -e "  1. git add ."
  echo -e "  2. git commit -m 'Production ready'"
  echo -e "  3. git push origin main"
  echo -e "  4. SSH to Cloudways and pull changes"
  echo -e "  5. Run: npm install && npm run build -- --no-lint"
  echo -e "  6. Run: npx pm2 start ecosystem.config.js"
  exit 0
else
  echo -e "${RED}❌ Validation failed with $ERRORS error(s)${NC}"
  echo -e "\nPlease fix the errors above before deploying"
  exit 1
fi
