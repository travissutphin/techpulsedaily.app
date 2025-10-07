# Security Guide

> **Authentication, authorization, and security best practices**

**Version:** 2.0.0
**Last Updated:** January 2025
**Maintained By:** [Sentinal]

---

## Table of Contents

1. [Security Overview](#security-overview)
2. [Authentication](#authentication)
3. [Authorization](#authorization)
4. [API Security](#api-security)
5. [Docker Security](#docker-security)
6. [Environment Variables](#environment-variables)
7. [Best Practices](#best-practices)

---

## Security Overview

### Security Model

**Current:** Single-user admin with API key authentication

**Layers:**
1. **Network** - HTTPS in production
2. **Application** - API key middleware
3. **Session** - HttpOnly cookies
4. **Data** - File permissions in Docker
5. **Secrets** - Environment variables

---

## Authentication

### Admin Dashboard Login

**Implementation:** `src/app/api/admin/login/route.ts`

**Flow:**
1. User submits username/password
2. Server verifies against env vars
3. Password hashed with bcrypt (10 rounds)
4. Session cookie set on success

**Password Hashing:**
```typescript
import bcrypt from 'bcryptjs';

// Hash password (development)
const hash = bcrypt.hashSync('your-password', 10);

// Verify password (login)
const valid = bcrypt.compareSync(inputPassword, storedHash);
```

**Session Cookie:**
```typescript
{
  name: 'admin-session',
  value: 'secure-session-token',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}
```

---

### API Key Authentication

**Implementation:** `src/lib/auth/authMiddleware.ts`

```typescript
export function requireAuth(handler: Function) {
  return async (req: NextRequest) => {
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey || apiKey !== VALID_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(req);
  };
}
```

**Usage:**
```typescript
// Protect endpoint
export const POST = requireAuth(async (request: NextRequest) => {
  // Handler code
});
```

**API Key:**
- **Default:** `admin-session-key`
- **Change in:** Environment variable `ADMIN_API_KEY`
- **Transmitted via:** `x-api-key` header

---

## Authorization

### Current Model

**Single Role:** Admin (full access)

**Protected Routes:**
- `/admin/*` - Dashboard pages
- `/api/admin/*` - Admin API endpoints

**Public Routes:**
- `/` - Homepage
- `/posts/*` - Article pages
- `/api/health` - Health check

---

### Future Multi-User Roles

**Planned:**

| Role | Permissions |
|------|-------------|
| **Admin** | All operations |
| **Editor** | Approve/reject, publish |
| **Viewer** | Read-only access |

**Implementation:**
```typescript
// Future role-based middleware
export function requireRole(role: 'admin' | 'editor' | 'viewer') {
  return async (req: NextRequest) => {
    const session = await getSession(req);
    if (!session || session.role !== role) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return handler(req);
  };
}
```

---

## API Security

### Rate Limiting (Future)

**Not currently implemented**

**Recommended:**
```typescript
// src/lib/security/rateLimiter.ts
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute'
});

export async function rateLimit(req: NextRequest) {
  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return new NextResponse('Too many requests', { status: 429 });
  }
}
```

**Apply to:**
- `/api/scrape` - 10 requests/minute
- `/api/admin/publish` - 20 requests/minute
- Other endpoints - 100 requests/minute

---

### CORS Configuration

**Current:** No CORS restrictions (Next.js defaults)

**Production (Future):**
```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Only allow same origin
  res.headers.set('Access-Control-Allow-Origin', process.env.SITE_URL);
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  res.headers.set('Access-Control-Allow-Headers', 'x-api-key, Content-Type');

  return res;
}
```

---

### Input Validation

**Current:** Basic type checking

**Improvements:**
```typescript
import { z } from 'zod';

// Schema validation
const ArticleSchema = z.object({
  articleId: z.string().min(1),
  action: z.enum(['approve', 'reject'])
});

// Validate request body
const validated = ArticleSchema.parse(await req.json());
```

**Benefits:**
- Prevent injection attacks
- Type safety
- Clear error messages

---

## Docker Security

### Non-Root User

**Dockerfile:**
```dockerfile
# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Run as non-root
USER nextjs
```

**Why Important:**
- Limits container escape impact
- Follows least privilege principle
- Industry best practice

---

### File Permissions

**Volume Permissions:**
```bash
# In docker-entrypoint.sh
chown -R nextjs:nodejs /app/data
chmod 755 /app/data
chmod 644 /app/data/**/*.json
```

**Prevents:**
- Unauthorized file access
- Permission denied errors
- Data tampering

---

### Secrets Management

**❌ DON'T:**
```dockerfile
# Never hardcode secrets
ENV CLAUDE_API_KEY=sk-ant-xxx
```

**✅ DO:**
```bash
# Pass at runtime
docker run -e CLAUDE_API_KEY="$CLAUDE_API_KEY" techpulse
```

**Best Practice:**
- Use platform secret management (AWS Secrets Manager, etc.)
- Never commit secrets to git
- Rotate keys monthly

---

### Image Security

**Vulnerability Scanning:**
```bash
# Scan image
docker scan techpulse:latest

# Or use Trivy
trivy image techpulse:latest
```

**Update Base Image:**
```bash
# Keep Node.js updated
FROM node:18-alpine  # Check for latest

# Update packages
RUN apk update && apk upgrade
```

---

## Environment Variables

### Sensitive Variables

**Secrets (never log or expose):**
- `CLAUDE_API_KEY`
- `ADMIN_PASSWORD`
- `REDDIT_CLIENT_SECRET`
- `ADMIN_API_KEY`

**Non-Sensitive:**
- `SITE_URL`
- `NODE_ENV`
- `CONTENT_DIR`
- `DATA_DIR`

---

### Secure Storage

**Local Development:**
```bash
# .env.local (gitignored)
CLAUDE_API_KEY=sk-ant-xxx
ADMIN_PASSWORD=secure-password
```

**Docker Production:**
```bash
# Docker secrets
docker secret create claude_key claude_api_key.txt
docker service update --secret-add claude_key techpulse
```

**Cloud Platforms:**
- AWS: Secrets Manager + ECS task env vars
- GCP: Secret Manager + Cloud Run env vars
- Azure: Key Vault + Container Instance env vars

---

## Best Practices

### Password Policy

**Admin Password Requirements:**
- ✅ Minimum 12 characters
- ✅ Mix of uppercase, lowercase, numbers, symbols
- ✅ Not a common password
- ✅ Change every 90 days

**Generate Secure Password:**
```bash
# Random 20-character password
openssl rand -base64 20

# Or use password manager (recommended)
```

---

### API Key Rotation

**Monthly Rotation:**

1. Generate new key:
```bash
openssl rand -hex 32
```

2. Update environment variable:
```bash
ADMIN_API_KEY=new-key-here
```

3. Restart application:
```bash
docker restart techpulse
```

4. Update API clients with new key

---

### HTTPS Enforcement

**Production:**
```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  // Redirect HTTP to HTTPS
  if (req.nextUrl.protocol === 'http:' && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(
      `https://${req.headers.get('host')}${req.nextUrl.pathname}`,
      308
    );
  }
}
```

**Or use platform-level:**
- Most cloud platforms handle HTTPS automatically
- Use Cloudflare for additional DDoS protection

---

### Security Headers

**Add to `next.config.js`:**
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

---

### Dependency Security

**Audit Dependencies:**
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check outdated packages
npm outdated
```

**Update Dependencies:**
```bash
# Update all to latest (test first!)
npm update

# Update specific package
npm update package-name
```

**Automated (Future):**
- Dependabot (GitHub)
- Snyk (vulnerability monitoring)

---

## Incident Response

### If Credentials Compromised

**Immediate Actions:**

1. **Rotate all keys:**
```bash
# Generate new API key
ADMIN_API_KEY=$(openssl rand -hex 32)

# Generate new admin password
ADMIN_PASSWORD=$(openssl rand -base64 20)

# Restart application
docker restart techpulse
```

2. **Review logs:**
```bash
docker logs techpulse | grep "Unauthorized"
docker logs techpulse | grep "error"
```

3. **Check for unauthorized changes:**
```bash
# Inspect queue files
ls -la /app/data/queue/*/

# Check published articles
git diff content/posts/
```

4. **Notify team**

---

### Security Monitoring

**Set up alerts for:**
- Failed login attempts (>5 in 10 minutes)
- Unusual API activity
- High CPU/memory usage
- Disk space warnings
- Container restarts

**Tools:**
- Docker logs
- Platform monitoring (AWS CloudWatch, etc.)
- Third-party (Datadog, Sentry)

---

## Compliance & Privacy

### GDPR Considerations

**Data Collected:**
- ❌ No user data (public content aggregator)
- ❌ No personal information
- ❌ No tracking cookies
- ✅ Only admin session cookies

**If adding user accounts (future):**
- Privacy policy required
- Cookie consent banner
- Data export/deletion features
- GDPR compliance

---

### Content Licensing

**Scraped Content:**
- Store metadata and summaries only
- Link to original source
- Respect robots.txt
- Fair use for aggregation

**User-Generated (future):**
- Terms of Service required
- Content licensing policy
- DMCA takedown process

---

## Security Checklist

### Development

- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in code
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak info
- [ ] Dev dependencies not in production

### Deployment

- [ ] HTTPS enabled
- [ ] Strong admin password set
- [ ] API key rotated from default
- [ ] Environment variables secured
- [ ] Docker runs as non-root user

### Production

- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring and alerts set up
- [ ] Regular security audits
- [ ] Backup and recovery tested

---

## Resources

**Security Tools:**
- OWASP ZAP - Vulnerability scanner
- Snyk - Dependency monitoring
- Trivy - Container scanning
- npm audit - Package vulnerabilities

**Learning:**
- OWASP Top 10 - Web vulnerabilities
- SANS Security - Best practices
- Docker Security - Container hardening

---

## Reporting Security Issues

**If you find a vulnerability:**

1. **DO NOT** create public GitHub issue
2. Email: security@your-domain.com
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
4. Allow 90 days for fix before disclosure

---

**Maintained By:** [Sentinal]
**Version:** 2.0.0
**Last Updated:** January 2025
