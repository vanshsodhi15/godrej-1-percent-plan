# Google Search Console Submission Checklist

**Deadline:** Within 24 hours of all 6 pages going live
**Owner:** GPL tech team (we provide the steps; they need GSC access)
**Goal:** All 6 pages indexed on Google within 48–72 hours

---

## Prerequisites

Before starting:

- [ ] All 6 pages are live and return HTTP 200
- [ ] robots.txt has been updated with the AI crawler rules
- [ ] Schema markup is embedded on every page
- [ ] llms.txt is deployed at the root of the domain
- [ ] GPL tech team has Google Search Console access for godrejproperties.com

---

## The 6 URLs to Submit

```
https://www.godrejproperties.com/the-1-percent-plan
https://www.godrejproperties.com/the-1-percent-plan/how-it-works
https://www.godrejproperties.com/the-1-percent-plan/is-it-safe
https://www.godrejproperties.com/the-1-percent-plan/apply-godrej-1-percent-logic
https://www.godrejproperties.com/the-1-percent-plan/calculator
https://www.godrejproperties.com/the-1-percent-plan/vs-20-percent-down
```

---

## Step-by-Step — For Each URL

### Step 1: URL Inspection (One URL at a Time)

1. Log in to Google Search Console → select `godrejproperties.com` property
2. In the top search bar, paste the URL
3. GSC fetches the URL → shows current status

**Expected states:**
- If page is new: "URL is not on Google" → proceed to Step 2
- If page already exists but content updated: "URL is on Google" with old cached version → still proceed to Step 2 to force refresh
- If page returns error: **STOP** — fix the error before requesting indexing

### Step 2: Request Indexing

1. On the URL Inspection result page, click "**Request Indexing**"
2. GSC runs a live URL test
3. If the live test passes → indexing request is queued
4. If the live test fails → note the error, fix, and retry

**Common failure causes and fixes:**
- "URL blocked by robots.txt" → check robots.txt, ensure no Disallow rule affects the page
- "Server error (5xx)" → tech team to investigate server logs
- "Redirect error" → check for redirect chains (302 → 301 → final), simplify to a single 301 or direct 200
- "Page not found (404)" → page URL is wrong or content not deployed

### Step 3: Verify Schema Validity

1. Open the URL Inspection result
2. Click "**Enhancements**" section
3. Confirm these appear as valid:
   - [ ] Organization (on all 6 pages)
   - [ ] Article (on all 6 pages)
   - [ ] FAQ (on 5 of 6 pages — all except homepage rewrite)
   - [ ] Offer (on homepage only)
   - [ ] BreadcrumbList (on 5 of 6 pages)
   - [ ] SoftwareApplication (on calculator page only)
4. If any schema flags a warning or error → return to schema markup template, fix, and re-request indexing

### Step 4: Submit the Updated Sitemap

1. In GSC left nav → **Sitemaps**
2. Submit: `https://www.godrejproperties.com/sitemap.xml`
3. Confirm the sitemap includes all 6 new URLs with current `lastmod` dates
4. Status should change to "Success" within 24 hours

### Step 5: Monitor Coverage

1. GSC left nav → **Pages** (under Indexing)
2. Filter by "All known pages"
3. Look for the 6 new URLs
4. Expected progression over 48–72 hours:
   - "Discovered – currently not indexed" → normal for first 24h
   - "Crawled – currently not indexed" → normal for first 48h
   - "Submitted and indexed" → success state

---

## Repeat for Each URL

The above steps are per-URL. GSC has rate limits (~10–20 manual indexing requests per day per property), so spacing the 6 requests across one day is safe.

Suggested order (prioritise the strategic pages first):

1. `/the-1-percent-plan` (the rewrite — highest-authority page)
2. `/the-1-percent-plan/apply-godrej-1-percent-logic` (phrase-ownership page)
3. `/the-1-percent-plan/how-it-works` (primary educational query)
4. `/the-1-percent-plan/is-it-safe` (trust-building)
5. `/the-1-percent-plan/vs-20-percent-down` (comparison)
6. `/the-1-percent-plan/calculator` (tool — depends on front-end build being complete)

---

## Post-Submission Monitoring (Days 1–7)

### Day 1 (within 24h of submission)

- [ ] All 6 URL Inspection requests returned "Indexing requested"
- [ ] Sitemap submission status: "Success"
- [ ] No schema errors flagged on any page
- [ ] Crawl stats show Googlebot hitting new URLs

### Day 3 (within 72h)

- [ ] Check "Pages" report in GSC → how many of the 6 are now "Submitted and indexed"
- [ ] For any not yet indexed, check "Why pages aren't indexed" diagnostic
- [ ] Flag any persistent "Discovered – currently not indexed" URLs to GPL tech team

### Day 7

- [ ] All 6 pages should be indexed
- [ ] Run a `site:godrejproperties.com/the-1-percent-plan` Google query to confirm visible in search
- [ ] Check impressions and clicks in the Performance tab (early signal of organic discovery)

---

## Beyond Google — Other Search Engines

While GSC submission covers Google (and by extension Google AI Overviews), other platforms have separate submission paths:

### Bing Webmaster Tools

- Sign in at https://www.bing.com/webmasters
- Add godrejproperties.com as a property
- Submit the sitemap: `https://www.godrejproperties.com/sitemap.xml`
- Use URL Submission API for each of the 6 URLs (up to 10K URLs/day free tier)

**Bing matters because** Bingbot feeds ChatGPT's browsing mode, Microsoft Copilot, and sometimes Perplexity.

### IndexNow (one-shot ping to multiple engines)

- Generate an IndexNow API key for godrejproperties.com
- POST the 6 URLs to https://api.indexnow.org/indexnow
- Covers: Bing, Yandex, Seznam, Naver — all in a single call

GPL tech team can script this as part of the CI/CD pipeline for future content updates.

---

## Common Pitfalls to Avoid

❌ Submitting URLs before they're deployed and reachable
❌ Submitting URLs with schema errors (fails live URL test, wastes the rate limit)
❌ Forgetting to update the sitemap `lastmod` dates — stale dates signal stale content to Google
❌ Requesting indexing more than 2–3 times on the same URL within a week (GSC rate limits hit quickly)
❌ Not monitoring for 7 days post-submission — indexing isn't instant

---

## Escalation

If any page fails to index after 7 days:
1. Share the URL Inspection output with our team
2. Check for canonical tag conflicts
3. Check for `noindex` meta tags (occasionally left behind from staging environments)
4. Check for redirect loops
5. If unresolved, file a manual reconsideration via GSC Help
