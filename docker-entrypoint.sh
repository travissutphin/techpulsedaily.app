#!/bin/sh
set -e

echo "🚀 TechPulse Daily - Starting..."

# Create data directories if they don't exist
mkdir -p /app/data/queue/pending
mkdir -p /app/data/queue/approved
mkdir -p /app/data/queue/rejected
mkdir -p /app/data/queue/published

# Create content directories on volume (for published articles)
# When CONTENT_DIR env var is set to /app/data/content, app writes here
mkdir -p /app/data/content/posts

# Change ownership to nextjs user
chown -R nextjs:nodejs /app/data

# Log path configuration for debugging
echo "📁 Directory Structure:"
echo "  Data Dir: /app/data (volume)"
echo "  Content Dir: ${CONTENT_DIR:-/app/content} (env controlled)"
echo "  Queue Dir: /app/data/queue"

# Switch to nextjs user and start the application
exec su-exec nextjs node server.js
