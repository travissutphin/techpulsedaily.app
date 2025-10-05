#!/bin/bash
# Railway Production Cleanup Script
# Run after: railway login && railway link

echo "🧹 Cleaning Railway Production Data..."

# Clear volume data
echo "1. Clearing volume content..."
railway run rm -rf /app/data/content/posts/*

echo "2. Clearing queue data..."
railway run rm -rf /app/data/queue/pending/*
railway run rm -rf /app/data/queue/approved/*
railway run rm -rf /app/data/queue/rejected/*
railway run rm -rf /app/data/published/*

echo "3. Verifying clean state..."
railway run ls -la /app/data/content/posts/
railway run ls -la /app/data/queue/

echo "✅ Railway production volume cleared!"
echo ""
echo "Next steps:"
echo "1. Remove CONTENT_DIR environment variable from Railway dashboard"
echo "2. Remove DATA_DIR environment variable (if set)"
echo "3. Click 'Deploy' to restart with clean state"
echo "4. Production will now use git-committed articles only"
