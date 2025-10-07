# Admin Operations

> **Dashboard usage and content management guide**

**Version:** 2.0.0
**Last Updated:** January 2025
**Maintained By:** [Codey], [Verity]

---

## Admin Dashboard Access

**URL:** `/admin`

**Authentication Required:**
- Username: `ADMIN_USERNAME` (from env)
- Password: `ADMIN_PASSWORD` (from env)

**Default Credentials (Development):**
```
Username: admin
Password: (set in .env.local)
```

⚠️ **Security:** Change default credentials in production!

---

## Dashboard Overview

### Main Sections

1. **Stats Panel** - Queue counts and system status
2. **Actions Panel** - Scrape, publish, reset operations
3. **Pending Queue** - Articles awaiting review
4. **Approved Queue** - Articles ready to publish
5. **Rejected Queue** - Declined articles
6. **Published Archive** - Live articles

---

## Daily Operations

### 1. Scraping New Articles

**Frequency:** 2-4 times per day (recommended)

**Steps:**
1. Click **"Scrape New Articles"** button
2. Wait 30-120 seconds for completion
3. Review success message: `"Scraped X articles, Y added to pending"`

**Expected Results:**
- 10-50 articles scraped (varies by source activity)
- 5-20 articles pass quality filter (score >= 6)
- Articles appear in **Pending Queue**

**If 0 Articles:**
- Check API credentials (CLAUDE_API_KEY, REDDIT_CLIENT_ID)
- Verify source configuration in `config/sources.json`
- Lower score thresholds if needed
- See [Troubleshooting](./06-troubleshooting.md#scraping-problems)

---

### 2. Reviewing Pending Articles

**Workflow:**

For each article in Pending Queue:

1. **Read the summary**
   - Key Takeaway
   - Quality Score (0-10)
   - Source and author

2. **Check quality indicators:**
   - ✅ Quality Score >= 7 (excellent)
   - ✅ Clear, informative summary
   - ✅ Relevant to tech/AI audience
   - ✅ Recent publication date
   - ✅ Reputable source

3. **Make decision:**
   - **Approve** → Moves to Approved Queue
   - **Reject** → Moves to Rejected Queue

**Review Criteria:**

| Factor | Approve If | Reject If |
|--------|-----------|-----------|
| **Quality Score** | >= 6 | < 6 |
| **Relevance** | AI, tech, startup news | Off-topic, spam |
| **Timeliness** | <7 days old | >30 days old |
| **Source** | Known publications | Unknown/sketchy sites |
| **Duplicate** | Original content | Already published |

---

### 3. Publishing Articles

**When to Publish:**
- Approved queue has 5+ articles
- At least daily (keep content fresh)
- After reviewing all pending articles

**Steps:**
1. Click **"Publish Articles"** button
2. Wait 2-5 seconds for processing
3. Verify success message: `"Published X articles"`
4. Check homepage to see new articles

**What Happens:**
1. Generate MDX files from approved articles
2. Write to `content/posts/*.mdx`
3. Update `index.mdx`
4. Regenerate `sitemap.xml`
5. Move articles from approved → published queue

**Verification:**
```bash
# Check MDX files created
ls -la data/content/posts/

# View homepage
curl https://your-domain.com/
```

---

## Bulk Operations

### Approve Multiple Articles

**Manual Method:**
1. Review each article individually
2. Click "Approve" on each

**Future:** Bulk select with checkboxes (not yet implemented)

---

### Clear Queues

**⚠️ Destructive Operation**

**Use Case:** Testing, removing test data, fresh start

**Steps:**
1. Click **"Reset All Queues"** button
2. Confirm action
3. All queue files deleted (pending, approved, rejected, published)

**Alternative (API):**
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/reset
```

**Does NOT delete:**
- Published MDX files in `content/posts/`
- Homepage remains intact

---

## Queue Management

### Pending Queue

**Purpose:** Articles awaiting human review

**Actions:**
- ✅ Approve → Move to Approved
- ❌ Reject → Move to Rejected

**Best Practices:**
- Review daily
- Don't let queue grow >50 articles
- Prioritize high quality scores (8+)

---

### Approved Queue

**Purpose:** Articles ready for publishing

**Actions:**
- 📝 Publish → Generate MDX and go live
- ⏸️ Unapprove → Move back to Pending (manual file move)

**Best Practices:**
- Publish when queue has 5+ articles
- Check for duplicates before publishing
- Verify diverse topics (not all same source)

---

### Rejected Queue

**Purpose:** Archive of declined articles

**Actions:**
- 🗑️ Delete → Permanently remove
- ♻️ Reconsider → Move back to Pending (manual)

**Cleanup:**
- Review monthly
- Delete articles older than 30 days
- Keep for reference (why rejected)

---

### Published Queue

**Purpose:** Archive of live articles

**Actions:**
- 📊 View metadata
- 🗑️ Delete from archive (doesn't unpublish)

**Note:** Deleting from published queue doesn't remove MDX files!

**Unpublish Article:**
```bash
# Manual process
rm data/content/posts/2025-01-15-article-slug.mdx

# Regenerate sitemap
curl -X POST -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/publish
```

---

## Monitoring & Stats

### Dashboard Metrics

**Stats Panel Shows:**
- 📊 **Pending:** Articles awaiting review
- ✅ **Approved:** Ready to publish
- ❌ **Rejected:** Declined articles
- 📝 **Published:** Live on site
- 📈 **Total:** Sum of all queues
- ⏰ **Last Scraped:** Timestamp of last scrape

**Refresh:** Reload page to update stats

---

### Health Indicators

**Healthy System:**
- ✅ Pending: 5-30 articles
- ✅ Approved: 3-10 articles
- ✅ Published: Growing daily
- ✅ Last scraped: <6 hours ago

**Warning Signs:**
- ⚠️ Pending: >50 articles (review backlog)
- ⚠️ Approved: 0 articles (need content)
- ⚠️ Published: Not growing (publish more)
- ⚠️ Last scraped: >24 hours (scraping issue)

---

## Common Tasks

### Daily Routine

**Morning (10 AM):**
1. Login to admin dashboard
2. Click "Scrape New Articles"
3. Review pending queue (approve/reject)
4. Publish approved articles

**Evening (6 PM):**
1. Click "Scrape New Articles"
2. Quick review of pending queue
3. Publish if 5+ approved articles

**Time Required:** 10-20 minutes per session

---

### Weekly Maintenance

**Every Monday:**
1. Review rejected queue
2. Delete rejected articles >30 days old
3. Check homepage displays correctly
4. Verify sitemap.xml updated
5. Review quality score trends

**Time Required:** 30 minutes

---

### Monthly Tasks

**First of Month:**
1. Backup data directory
2. Review scraping sources (add/remove)
3. Analyze published article performance
4. Adjust quality thresholds if needed
5. Update source configuration

**Time Required:** 1 hour

---

## Troubleshooting Operations

### "Scrape" Button Doesn't Work

**Check:**
1. Console for errors (F12 → Console)
2. Network tab for API response
3. Server logs for errors
4. API key validity

**Solution:**
```bash
# Test API directly
curl -X POST -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/scrape
```

---

### Articles Not Appearing After Publish

**Cause:** ISR cache or path issues

**Solution:**
1. Check MDX files created:
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/debug
```

2. Verify `CONTENT_DIR` set correctly:
```bash
curl -X POST -H "x-api-key: admin-session-key" \
  https://your-domain.com/api/admin/debug-env
```

3. See [Troubleshooting Guide](./06-troubleshooting.md#homepage-issues)

---

### Can't Login to Dashboard

**Check:**
1. Correct URL: `/admin` (not `/admin/`)
2. Username matches `ADMIN_USERNAME` env var
3. Password correct
4. Browser cookies enabled

**Reset Password:**
```bash
# Generate new hash
node -e "console.log(require('bcryptjs').hashSync('new-password', 10))"

# Update ADMIN_PASSWORD env var with hash
```

---

## Security Best Practices

### DO ✅

1. **Use strong passwords** (12+ characters)
2. **Log out when done** (especially on shared computers)
3. **Review before publishing** (quality control)
4. **Monitor published content** (check homepage daily)
5. **Backup regularly** (data directory)

### DON'T ❌

1. **Don't share credentials** (each admin gets own account - future)
2. **Don't publish without review** (always human oversight)
3. **Don't ignore warnings** (investigate issues)
4. **Don't leave logged in** (security risk)
5. **Don't bulk approve** (quality over quantity)

---

## Keyboard Shortcuts

**Future Enhancement:**

```
a - Approve selected article
r - Reject selected article
s - Scrape new articles
p - Publish approved articles
Esc - Close modal
```

**Not yet implemented**

---

## Mobile Access

**Current:** Desktop only (responsive design planned)

**Workaround:** Use tablet in landscape mode

**Future:** Mobile-optimized admin panel

---

## Delegation & Roles

**Current:** Single admin user

**Future (Multi-user):**
- **Admin** - Full access
- **Editor** - Approve/reject only
- **Viewer** - Read-only access

---

## Performance Tips

### Speed Up Review Process

1. **Skim first** - Read quality score and title
2. **Check source** - Trusted sources = likely approve
3. **Use summaries** - Don't click through to full article
4. **Batch review** - Review all pending at once
5. **Set time limit** - 10-15 minutes max per session

### Optimize Publishing

1. **Publish in batches** - 5-10 articles at once
2. **Off-peak hours** - Less traffic impact
3. **Monitor homepage** - Ensure articles appear
4. **Check sitemap** - Verify SEO updated

---

## Analytics Integration (Future)

**Planned:**
- Article view counts
- Engagement metrics
- Quality score trends
- Source performance analysis
- Time-to-publish metrics

---

## Next Steps

After mastering admin operations:
1. Read [Security Guide](./09-security.md) for best practices
2. Review [Content Pipeline](./07-content-pipeline.md) for workflow details
3. Check [Troubleshooting](./06-troubleshooting.md) for common issues

---

**Maintained By:** [Codey], [Verity]
**Version:** 2.0.0
**Last Updated:** January 2025
