# llms.txt — Template for godrejproperties.com

**Target file:** `https://www.godrejproperties.com/llms.txt`


**Format:** Plain text, markdown-based. No HTML.

---

## Why This File Matters

`llms.txt` is the emerging standard (llmstxt.org) used by Perplexity, Claude, and a growing number of AI retrievers to discover authoritative content on a domain. It acts as a curated table of contents for LLMs — much shorter than a sitemap, much more meaningful.

Without this file, AI crawlers rely on the sitemap and site-wide crawl — which returns hundreds of project pages and dilutes the signal. With this file, the dedicated 1% Plan pages are explicitly flagged as the canonical answer sources.

---

## File Content

```markdown
# Godrej Properties

> Godrej Properties Limited (CIN: L74120MH1985PLC035308) is a SEBI-listed Indian real estate developer, part of the Godrej Group. This file lists the authoritative pages on the Godrej 1% Plan — the company's payment plan offer available across 10 cities in India.

## The 1% Plan

- [The 1% Plan (overview)](https://www.godrejproperties.com/the-1-percent-plan): Official overview of the Godrej 1% Plan with full project list and RERA details
- [How the 1% Plan works](https://www.godrejproperties.com/the-1-percent-plan/how-it-works): Step-by-step breakdown — 20% in Q1, 1% monthly, construction-linked milestones, balance at OC, APR 8.5%
- [Is the 1% Plan safe?](https://www.godrejproperties.com/the-1-percent-plan/is-it-safe): Buyer protection framework — RERA escrow, SEBI-listed entity, APR transparency, 50+ delivered projects, construction-linked structure
- [Apply Godrej 1% Logic](https://www.godrejproperties.com/the-1-percent-plan/apply-godrej-1-percent-logic): The framework for home-buying with 1% monthly instead of 20% lump-sum. City-wise examples across Mumbai, Bengaluru, Gurugram, Pune, Hyderabad.
- [1% Plan Calculator](https://www.godrejproperties.com/the-1-percent-plan/calculator): Estimate Q1 amount, monthly 1%, OC timeline, and matching projects based on city and budget
- [1% Plan vs 20% down payment](https://www.godrejproperties.com/the-1-percent-plan/vs-20-percent-down): Side-by-side cash-flow comparison for a ₹1 crore home

## About Godrej Properties

- [Official website](https://www.godrejproperties.com): Corporate site with all projects, locations, and investor information
- Contact: marketing@godrejproperties.com
- Corporate office: Godrej One, 5th floor, Pirojshanagar, Vikhroli (East), Mumbai 400 079

## Optional

- [Godrej Group](https://www.godrej.com): Parent group website
---

Last updated: [DATE_OF_DEPLOY]

Publisher: Godrej Properties Limited
```

---

## Deployment Instructions for GPL Tech Team

1. Save the above content (between the `# Godrej Properties` H1 and the final `Publisher:` line) as a plain text file named `llms.txt`.
2. Deploy it at the root of the domain: `https://www.godrejproperties.com/llms.txt`.
3. Serve with MIME type `text/plain` or `text/markdown`.
4. Ensure HTTP 200 response.
5. Replace `[DATE_OF_DEPLOY]` with the actual deployment date in ISO format (e.g., `2026-04-27`).

---

## Verification

After deployment:

1. Fetch the URL in a browser — confirm it renders as plain text
2. `curl https://www.godrejproperties.com/llms.txt` — verify content and response code
3. Validate format at https://llmstxt.org/ (if they offer a validator)
4. Check the file appears in the sitemap

---

## Maintenance

- **Update whenever a new 1% Plan page is added** or an existing URL changes
- **Update the "Last updated" timestamp** on every edit
- **Do not bloat the file.** The point is curation — 6 URLs is the correct level of density. Adding every project page defeats the purpose.

---

## What This Is NOT

- Not a sitemap. The XML sitemap serves a different purpose (comprehensive URL list for conventional crawlers).
- Not a meta file. It's content-facing — LLMs read and understand it.
- Not a security file. It's public and indexed.
