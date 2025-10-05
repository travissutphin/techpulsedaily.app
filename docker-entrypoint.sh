#!/bin/sh
set -e

# Create data directories if they don't exist
mkdir -p /app/data/queue/pending
mkdir -p /app/data/queue/approved
mkdir -p /app/data/queue/rejected
mkdir -p /app/data/published

# Create content directories on volume (for published articles)
mkdir -p /app/data/content/posts

# Create symlink from /app/content to /app/data/content (volume-backed)
# This ensures published MDX files persist on Railway volume
if [ ! -L /app/content ]; then
  rm -rf /app/content
  ln -sf /app/data/content /app/content
fi

# Change ownership to nextjs user
chown -R nextjs:nodejs /app/data

# Switch to nextjs user and start the application
exec su-exec nextjs node server.js
