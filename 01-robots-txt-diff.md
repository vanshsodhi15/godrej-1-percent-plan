# Robots.txt

**Target file:** `https://www.godrejproperties.com/robots.txt`

**Action:** Replace entire file with the combined version below. All existing restrictions are preserved and duplicated for safety.

---

## Why This Matters

If robots.txt blocks (or fails to explicitly allow) AI crawlers, the pages we're building will not appear in AI search results — regardless of content quality. **This is a hard prerequisite.**

---

## The Final Combined robots.txt

Replace the entire contents of the existing `robots.txt` file on the root domain with the following combined version.

*Note: The explicit AI bots have been grouped. Crucially, the `Disallow` rules from the general crawler block have been duplicated into the AI crawler block. This is a strict technical requirement, because when a crawler matches a specific `User-agent` group, it completely bypasses the `User-agent: *` group and could otherwise index your `/admin/` and `/login*` routes.* 

```text
# ─────────────────────────────────────────────────────────────
# General Crawlers
# ─────────────────────────────────────────────────────────────
User-agent: *
Disallow: /admin/
Disallow: /*?page=
Disallow: /*?city=
Disallow: /login*
Disallow: /success-page
Disallow: /undefined

# ─────────────────────────────────────────────────────────────
# AI / LLM Crawlers — Explicitly Supported
# Added: 2026-XX-XX (please fill in the date) | Purpose: Support 1% Plan GEO campaign
# ─────────────────────────────────────────────────────────────
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: Claude-Web
User-agent: PerplexityBot
User-agent: CCBot
User-agent: Applebot-Extended
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /*?page=
Disallow: /*?city=
Disallow: /login*
Disallow: /success-page
Disallow: /undefined

Sitemap: https://www.godrejproperties.com/sitemap.xml
```

---

## Pre-Implementation Checklist for GPL Tech Team

Before deploying, verify:

1. **Existing restrictions are preserved in full.** All current `Disallow` rules have been carried over to both the `*` and AI bot blocks.
2. **Any CDN-level bot blocking is disabled for the AI user-agent strings.** This is paramount: if godrejproperties.com is behind Cloudflare or a similar CDN, features like "Super Bot Fight Mode" block `GPTBot` and `ClaudeBot` by default. Giving them `Allow` in `robots.txt` doesn't stop the CDN from dropping the connection. They must be manually exempted in the WAF/CDN dashboard.
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
