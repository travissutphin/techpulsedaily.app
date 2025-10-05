#!/bin/sh
set -e

# Create data directories if they don't exist
mkdir -p /app/data/queue/pending
mkdir -p /app/data/queue/approved
mkdir -p /app/data/queue/rejected
mkdir -p /app/data/published

# Change ownership to nextjs user
chown -R nextjs:nodejs /app/data

# Switch to nextjs user and start the application
exec su-exec nextjs node server.js
