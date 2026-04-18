# Robots.txt — Exact Diff for AI Crawler Access

**Target file:** `https://www.godrejproperties.com/robots.txt`
**Action:** Additive only. No existing rules are removed or modified.
**Deadline:** Implement by 27 April 2026

---

## Why This Matters

If robots.txt blocks (or fails to explicitly allow) AI crawlers, the 6 pages we're building will not appear in AI search results — regardless of content quality. This is a hard prerequisite.

---

## What to Add

Append the following block to the end of the existing robots.txt file on the root domain:

```
# ─────────────────────────────────────────────────────────────
# AI / LLM Crawlers — explicitly allowed
# Added: 2026-04-27 | Purpose: Support 1% Plan GEO campaign
# ─────────────────────────────────────────────────────────────

# OpenAI — ChatGPT (training + retrieval)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Google AI — Gemini, Bard, AI Overviews
User-agent: Google-Extended
Allow: /

# Anthropic — Claude
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Perplexity AI
User-agent: PerplexityBot
Allow: /

# Common Crawl — feeds many open and commercial LLMs
User-agent: CCBot
Allow: /

# Apple Intelligence
User-agent: Applebot-Extended
Allow: /

# Microsoft — Bing + Copilot
User-agent: Bingbot
Allow: /

# Updated sitemap reference
Sitemap: https://www.godrejproperties.com/sitemap.xml
```

---

## Pre-Implementation Checklist for GPL Tech Team

Before deploying, verify:

1. **Existing robots.txt is preserved in full.** No Disallow rules are removed or modified.
2. **No existing rules conflict with the new Allow directives.** If there's an existing `User-agent: *` with `Disallow: /`, the specific Allow rules above still override it for those user agents, but the setup should be reviewed.
3. **Any CDN-level bot blocking is disabled for the above user-agent strings.** If godrejproperties.com is behind Cloudflare or a similar CDN, Cloudflare's "Super Bot Fight Mode" will block GPTBot and ClaudeBot by default regardless of what robots.txt says. This must be manually exempted in the CDN dashboard.
4. **The file is served with `Content-Type: text/plain` and an HTTP 200 response.**
5. **Check the file from multiple regions** — ensure no geo-restrictions apply to robots.txt.

---

## Verification Steps After Deployment

1. **Fetch the file in browser:** `https://www.godrejproperties.com/robots.txt` — confirm the new block is visible.
2. **Run Google's robots.txt tester** (Google Search Console → Settings → robots.txt) — confirm syntax parses without errors.
3. **Test with a sample user-agent:**
   ```bash
   curl -A "GPTBot" -I https://www.godrejproperties.com/the-1-percent-plan
   # Expected: HTTP 200 response, no blocks
   ```
4. **Monitor bot access logs** for the next 7 days to confirm AI crawlers are reaching the site.

---

## Rollback Plan

If any issue arises:
- The added block can be deleted in a single edit — nothing else on the site is affected.
- Removal does not reverse already-completed crawls; any content AI crawlers have indexed remains indexed. Future crawl cycles will simply skip the site.

---

## What This Does NOT Cover

- Cloudflare / CDN-level bot blocking (handled separately in the tech spec)
- Pagespeed / caching configuration
- SSL / HTTPS enforcement (assumed already in place)
- User-agent-based content differentiation (we serve identical content to all crawlers — this is intentional)

---

## Escalation

If GPL tech team cannot implement this by 27 April, **flag immediately**. Without AI-crawler access:
- Deliverable 4 (AI audit) will show zero pickup across all platforms
- The 6 pages we build cannot be cited by any AI system
- The campaign's primary KPIs cannot be met

This is a hard prerequisite.
