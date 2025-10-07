# Docker Deployment

> **Platform-agnostic containerized deployment guide**

**Version:** 2.0.0
**Last Updated:** January 2025
**Maintained By:** [Gordon], [Flow]

---

## Overview

TechPulse Daily uses a **multi-stage Docker build** for optimized production deployments. This guide is platform-agnostic and works with any Docker-compatible hosting platform.

---

## Dockerfile Structure

### Multi-Stage Build

```dockerfile
# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# ============================================
# Stage 2: Builder
# ============================================
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --no-lint

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/config ./config
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

# Create data directories for persistence
RUN mkdir -p /app/data/queue/pending /app/data/queue/approved \
             /app/data/queue/rejected /app/data/queue/published && \
    mkdir -p /app/data/content/posts && \
    chown -R nextjs:nodejs /app/data

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["docker-entrypoint.sh"]
```

---

## Entrypoint Script

**File:** `docker-entrypoint.sh`

```bash
#!/bin/sh
set -e

echo "🚀 Starting TechPulse Daily..."

# Ensure data directories exist with correct permissions
mkdir -p /app/data/queue/{pending,approved,rejected,published}
mkdir -p /app/data/content/posts
chown -R nextjs:nodejs /app/data || true

# Log environment info
echo "NODE_ENV: ${NODE_ENV}"
echo "Data directory: /app/data"
echo "Content directory: ${CONTENT_DIR:-/app/data/content}"

# Start Next.js server as nextjs user
exec su-exec nextjs node server.js
```

**Make executable:**
```bash
chmod +x docker-entrypoint.sh
```

---

## Volume Configuration

### Required Volumes

**Mount Point:** `/app/data`

**Purpose:**
- Persist article queues across container restarts
- Store generated MDX files
- Survive deployments

**Directory Structure:**
```
/app/data/
├── queue/
│   ├── pending/      # Articles awaiting review
│   ├── approved/     # Ready to publish
│   ├── rejected/     # Declined articles
│   └── published/    # Archive
└── content/
    └── posts/        # Generated MDX files
```

---

## Environment Variables

### Required in Production

```bash
# Anthropic API
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxx

# Site Configuration
SITE_URL=https://your-production-domain.com
NODE_ENV=production

# Path Configuration (critical!)
CONTENT_DIR=/app/data/content
DATA_DIR=/app/data

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong-password-here
```

### Optional

```bash
# Reddit API
REDDIT_CLIENT_ID=your-client-id
REDDIT_CLIENT_SECRET=your-client-secret

# Server Configuration
PORT=3000
```

---

## Build & Deploy

### Local Build

```bash
# Build image
docker build -t techpulse:latest .

# Check image size
docker images techpulse

# Should be ~150-200MB
```

### Run Container

```bash
docker run -d \
  --name techpulse-prod \
  -p 3000:3000 \
  -e CLAUDE_API_KEY="sk-ant-xxx" \
  -e SITE_URL="https://your-domain.com" \
  -e CONTENT_DIR="/app/data/content" \
  -e DATA_DIR="/app/data" \
  -v techpulse-data:/app/data \
  techpulse:latest
```

### Verify Deployment

```bash
# Check logs
docker logs -f techpulse-prod

# Health check
curl http://localhost:3000/api/health

# Test homepage
curl http://localhost:3000/
```

---

## Platform-Specific Guides

### AWS ECS (Elastic Container Service)

**Task Definition:**
```json
{
  "family": "techpulse-task",
  "containerDefinitions": [{
    "name": "techpulse",
    "image": "your-ecr-repo/techpulse:latest",
    "memory": 512,
    "portMappings": [{"containerPort": 3000}],
    "environment": [
      {"name": "NODE_ENV", "value": "production"},
      {"name": "SITE_URL", "value": "https://your-domain.com"},
      {"name": "CONTENT_DIR", "value": "/app/data/content"},
      {"name": "DATA_DIR", "value": "/app/data"}
    ],
    "secrets": [
      {"name": "CLAUDE_API_KEY", "valueFrom": "arn:aws:secretsmanager:..."}
    ],
    "mountPoints": [{
      "sourceVolume": "techpulse-data",
      "containerPath": "/app/data"
    }],
    "healthCheck": {
      "command": ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"],
      "interval": 30,
      "timeout": 5,
      "retries": 3
    }
  }],
  "volumes": [{
    "name": "techpulse-data",
    "efsVolumeConfiguration": {
      "fileSystemId": "fs-xxxxx"
    }
  }]
}
```

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/techpulse

# Deploy
gcloud run deploy techpulse \
  --image gcr.io/PROJECT_ID/techpulse \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars SITE_URL=https://your-domain.com \
  --set-env-vars CONTENT_DIR=/app/data/content \
  --set-env-vars DATA_DIR=/app/data \
  --set-secrets CLAUDE_API_KEY=techpulse-claude-key:latest \
  --memory 512Mi \
  --cpu 1
```

**Note:** Cloud Run is stateless - use Google Cloud Storage for `/app/data` persistence

### Azure Container Instances

```bash
az container create \
  --resource-group techpulse-rg \
  --name techpulse \
  --image youracr.azurecr.io/techpulse:latest \
  --cpu 1 --memory 1 \
  --ports 3000 \
  --environment-variables \
    NODE_ENV=production \
    SITE_URL=https://your-domain.com \
    CONTENT_DIR=/app/data/content \
    DATA_DIR=/app/data \
  --secure-environment-variables \
    CLAUDE_API_KEY=sk-ant-xxx \
  --azure-file-volume-account-name STORAGE_ACCOUNT \
  --azure-file-volume-account-key STORAGE_KEY \
  --azure-file-volume-share-name techpulse-data \
  --azure-file-volume-mount-path /app/data
```

### DigitalOcean App Platform

**app.yaml:**
```yaml
name: techpulse
services:
  - name: web
    source:
      repo: github.com/YOUR_ORG/techpulsedaily.app
      branch: main
    dockerfile_path: Dockerfile
    http_port: 3000
    instance_count: 1
    instance_size_slug: basic-xxs
    envs:
      - key: NODE_ENV
        value: production
      - key: SITE_URL
        value: ${APP_URL}
      - key: CONTENT_DIR
        value: /app/data/content
      - key: DATA_DIR
        value: /data
      - key: CLAUDE_API_KEY
        type: SECRET
    health_check:
      http_path: /api/health
```

---

## CI/CD Integration

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -t techpulse:${{ github.sha }} .

      - name: Push to registry
        run: |
          docker tag techpulse:${{ github.sha }} your-registry/techpulse:latest
          docker push your-registry/techpulse:latest

      - name: Deploy
        run: |
          # Platform-specific deployment command
          echo "Deploy to your platform"
```

---

## Monitoring & Health Checks

### Built-in Health Endpoint

**GET** `/api/health`

```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2025-01-15T10:00:00.000Z",
  "environment": "production"
}
```

### Docker Health Check

Already configured in Dockerfile:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
```

---

## Rollback Procedures

### Container Rollback

```bash
# Tag current as backup
docker tag techpulse:latest techpulse:backup

# Pull previous version
docker pull your-registry/techpulse:previous

# Stop current
docker stop techpulse-prod

# Start previous version
docker run -d --name techpulse-prod \
  [same flags as before] \
  your-registry/techpulse:previous
```

### Data Preservation

**Volume data persists across rollbacks** - no data loss!

---

## Security Best Practices

1. ✅ **Run as non-root user** (nextjs:nodejs)
2. ✅ **Use secrets management** (not env vars for sensitive data)
3. ✅ **Multi-stage builds** (minimize attack surface)
4. ✅ **Health checks** (detect failures)
5. ✅ **Alpine base image** (smaller, fewer vulnerabilities)
6. ✅ **No unnecessary packages** (production-only dependencies)

---

## Performance Optimization

### Image Size Reduction

Current: ~150MB
- ✅ Alpine base (`node:18-alpine`)
- ✅ Multi-stage build
- ✅ Production-only dependencies
- ✅ No dev tools in final image

### Resource Limits

**Recommended:**
- **CPU:** 0.5-1 vCPU
- **Memory:** 512MB-1GB
- **Disk:** 5GB (for volume)

### Caching Strategy

Docker build cache layers:
- Dependencies (rarely change)
- Source code (changes often)
- Build output (generated)

```bash
# Use BuildKit for better caching
DOCKER_BUILDKIT=1 docker build -t techpulse .
```

---

## Troubleshooting

See [Troubleshooting Guide](./06-troubleshooting.md) for common deployment issues.

**Quick checks:**
```bash
# Container logs
docker logs techpulse-prod

# Volume contents
docker exec techpulse-prod ls -la /app/data

# Environment variables
docker exec techpulse-prod env | grep CONTENT_DIR

# Health check
docker inspect --format='{{json .State.Health}}' techpulse-prod
```

---

**Maintained By:** [Gordon], [Flow]
**Version:** 2.0.0
**Last Updated:** January 2025
