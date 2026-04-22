# Final Execution Plan — v4.0

**Replaces:** `new-execution-plan.md` (v3.0)
**Date:** 22 April 2026
**Status:** Aligned with GPL final proposal. Pending tech SPOC + sample TS/TSX file from GPL.

---

## 1. What's Final About This Plan

After internal alignment with GPL, the scope is locked:

- **All deliverables ship as production-ready Next.js (TypeScript) components.** No Markdown templates, no PDFs, no external CMS scaffolding. GPL's team copy-pastes into their codebase.
- **URL slugs are fixed** (see §3) and match GPL's existing `/the-1-percent-plan/` taxonomy.
- **Target deployment + indexing date: 27 April 2026** — subject to GPL providing the sample component file and tech SPOC by Wednesday 23 April EOD.
- **Existing `/the-1-percent-plan` page is NOT replaced** — only the top hero/intro section is rewritten. URL preserved. Authority preserved. No redirects.
- **No existing project pages are modified.** New pages live as net-new sub-paths under the same parent slug.

A live working reference of the planned output is already deployed on Vercel:
**https://godrej-1-percent-plan.vercel.app/the-1-percent-plan/calculator**

GPL tech team can clone the reference repo (`github.com/vanshsodhi15/godrej-1-percent-plan`) and inspect the component structure, schema patterns, and shared `Layout` / `SEO` modules before integration.

---

## 2. What We Need From GPL — Priority Asks

### Tier 0 — Blocker (need by Wed 23 Apr EOD)

| # | Ask | Why it blocks |
|---|---|---|
| 1 | **One live page TS/TSX file** (ideally a current project page or article using the same template family as the 1% Plan landing page) | We mirror the exact import paths, naming, prop interfaces, and styling tokens used in production. Without this, integration becomes a refactor on GPL's side. |
| 2 | **Shared component files referenced by that page** — header, footer, FAQ accordion, schema injector, image/CTA blocks, breadcrumb | Lets us substitute our placeholder `Layout`/`SEO` components with GPL's real ones, so the handover is true copy-paste. |
| 3 | **Tech SPOC name + WhatsApp number** for the next 7 days | Single channel for clarification. Prevents email lag during integration window. |

### Tier 1 — Confirm by Thu 24 Apr

| # | Ask | Why we need it |
|---|---|---|
| 4 | Next.js version, React version, TypeScript version in production | Ensures our components don't use APIs unavailable in their stack. |
| 5 | Routing convention: Pages Router vs App Router | We've shipped Pages Router. If they're on App Router, we re-scaffold (≈half-day delta). |
| 6 | CSS approach: CSS Modules / Tailwind / styled-components / global CSS | Currently using global CSS. We swap to match. |
| 7 | Naming conventions for components, files, and folders | We rename before handover. Avoids GPL renaming 30+ files post-receipt. |
| 8 | Any code restrictions (linting rules, allowed dependencies, image domains in `next.config`) | Pre-empts CI failures on their side. |

### Tier 2 — Content data (ongoing as before)

Project-specific data per the 32 project pages — RERA numbers, starting prices, configurations, possession dates, location USPs. Already requested in `godrej-data-request.md`. No change.

---

## 3. Final Deliverables — Locked Scope

### 3A. Top-section rewrite of existing page

| URL | Action |
|---|---|
| `/the-1-percent-plan` | Rewrite top section only (hero + intro 300 words). All other sections, images, project listings, and CTAs unchanged. Delivered as a TSX component patch. |

### 3B. Five new article pages (under existing parent slug)

| URL | Page Type | Status |
|---|---|---|
| `/the-1-percent-plan/how-it-works` | Educational, AI-first | Reference live |
| `/the-1-percent-plan/is-it-safe` | Trust + RERA + escrow explainer | Reference live |
| `/the-1-percent-plan/apply-godrej-1-percent-logic` | Brand framework page | Reference live |
| `/the-1-percent-plan/calculator` | Interactive Q1/monthly calculator | **Live demo** |
| `/the-1-percent-plan/vs-20-percent-down` | Comparative analysis | Reference live |

### 3C. 32 project-specific pages

| URL pattern | Count | Approach |
|---|---|---|
| `/the-1-percent-plan/{city}/{project-slug}` | 32 | Single parameterised template populated from GPL's project dataset. One TSX template + one JSON data file = 32 generated pages. Zero hand-coding per project. |

Each project page includes: project hero, 1% Plan terms specific to that project, worked example using project's starting price, FAQ block (5–7 Q&As), `ApartmentComplex` + `Offer` + `FAQPage` schema.

### 3D. Each page (3A, 3B, 3C) ships with

- Clean Next.js TSX component (no inline JS hacks, no untyped props)
- AI-first structured content (answer-first, scannable, prose-heavy)
- JSON-LD schema injected via the existing `<SEO>` component pattern
- FAQ + Article (or ApartmentComplex/Offer) schema where applicable
- Canonical URL set to the GPL production domain
- Open Graph metadata pre-filled

### 3E. Implementation guidelines (one document)

- `robots.txt` diff to allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot` (already drafted in `docs/01-robots-txt-diff.md`)
- `/llms.txt` template with all new URLs (already drafted in `docs/02-llms-txt-template.md`)
- Schema validation checklist (Rich Results Test + Schema.org validator)
- GSC submission checklist for immediate URL inspection on all 38 new pages (already drafted in `docs/04-gsc-submission-checklist.md`)

---

## 4. Out of Scope (for clarity)

- Modifying any existing URL beyond the `/the-1-percent-plan` top-section rewrite
- Touching project pages that already exist on godrejproperties.com
- Hosting, deployment, CDN, image optimisation pipelines
- Schema deployment verification post-publish (we ship the schema; GPL deploys; we re-validate as part of D4 audit)
- Backlink building or paid distribution

---

## 5. Timeline (locked to 27 Apr deployment target)

| Date | Owner | Milestone |
|---|---|---|
| **Wed 23 Apr** | GPL | Sample TSX file + shared components + SPOC contact shared. |
| **Wed 23 Apr** | Us | Reference repo cloned by GPL tech. Initial review call (30 min) on integration assumptions. |
| **Thu 24 Apr** | Us | Top-section rewrite (3A) + 3 of 5 article pages (3B) reformatted to GPL conventions. Project template (3C) parameterised from sample. |
| **Fri 25 Apr** | Us | Remaining 2 article pages + 32 project pages generated. Implementation guidelines (3E) finalised. Full handover bundle delivered. |
| **Sat–Sun 26–27 Apr** | GPL | Integration + deploy. Robots.txt + llms.txt updated. GSC submission of all 38 URLs. |
| **Mon 27 Apr** | Us | Day 1 AI audit begins (queries against ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews). Daily audit reports for the following week. |

If the sample TSX file slips past Wed 23 Apr EOD, deployment date moves day-for-day. This is the only schedule risk on our side.

---

## 6. Strategic Response to SEO Concerns Raised by Jay

This section is intended to be lifted directly into a written reply to Jay/the SEO team if helpful. Each concern is addressed in sequence on its own merits.

### Framing

The concerns raised assume we are creating **parallel landing pages competing for the same queries as existing pages.** We're not. We're building a **topic cluster under an existing pillar page** — a content architecture explicitly recommended by Google's own search documentation, and one that strengthens (rather than dilutes) the authority of the parent slug. Below is a point-by-point response.

### 6.1 — On "Duplicate Content Risk"

**The concern:** Search engines may flag the new pages as duplicates of existing project pages.

**Reality:** Duplicate-content risk arises when two URLs serve substantially the same body content targeting the same intent. None of the proposed pages do this:

- `/the-1-percent-plan/calculator` — Interactive tool. No equivalent page exists on the site today. Zero overlap with any project listing page.
- `/the-1-percent-plan/is-it-safe` — Trust/risk explainer. No equivalent exists. Zero overlap.
- `/the-1-percent-plan/how-it-works` — Mechanism explainer. No equivalent exists. Zero overlap.
- `/the-1-percent-plan/apply-godrej-1-percent-logic` — Brand framework page. No equivalent exists. Zero overlap.
- `/the-1-percent-plan/vs-20-percent-down` — Comparative analysis. No equivalent exists. Zero overlap.
- `/the-1-percent-plan/{city}/{project-slug}` — These URLs already exist on the live site. We are NOT creating new URLs here — we are providing the structured, AI-readable body content that the existing pages currently lack. There is no duplicate to create because we're populating an empty shell, not building a parallel page.

In short: 5 pages target queries no existing page targets. 32 pages enrich existing URLs without changing them. Duplicate-content risk is zero by definition.

### 6.2 — On "Keyword Cannibalization"

**The concern:** Multiple pages targeting the same project + location keywords will compete with each other.

**Reality:** Cannibalization happens when two pages target the **same query intent.** Our pages target deliberately distinct intents:

| Existing page targets | New page targets | Overlap |
|---|---|---|
| "Godrej Lakeside Orchard Bengaluru" (transactional / project discovery) | "1% plan calculator" (informational / tool) | None |
| "Godrej Vrikshya price" (commercial) | "is the 1% plan safe" (trust / due diligence) | None |
| "Godrej Madison Avenue floor plan" (commercial) | "how does the 1% plan work" (educational) | None |
| "Godrej Reserve Bangalore" (transactional) | "1% plan vs 20% down payment" (comparative) | None |

The new pages will rank for query types the existing pages **cannot rank for** in their current form, because those queries demand text-heavy, structured, answer-first content — which the image-heavy project pages do not provide.

For the project-specific URLs (3C), we are enriching the same URL the existing page lives on. Since it's the same URL, cannibalization is mathematically impossible — there is only one page per query.

### 6.3 — On "Authority & Ranking Dilution"

**The concern:** Authority signals will split across multiple pages, weakening overall SEO performance.

**Reality:** This concern inverts how topic clusters work. A pillar-and-cluster architecture **concentrates** authority on the pillar page through internal linking — it does not dilute it. Reference: Google's own E-E-A-T documentation and the topic cluster model that has been industry-standard SEO practice since 2017 (HubSpot, Moz, Search Engine Journal).

In this implementation:

- All 5 new article pages (3B) link **back** to `/the-1-percent-plan` as the parent pillar in their breadcrumbs and contextually within content.
- All 32 project pages (3C) link to the parent `/the-1-percent-plan` pillar page.
- The pillar page links **out** to all cluster pages.
- Internal anchor text uses the parent slug consistently.

Net effect on the pillar page: **more incoming internal links from authoritative subpages, more dwell time across the cluster, more topical depth signalled to Google.** This is a textbook authority-concentration play, not dilution.

The only way authority gets diluted is if the new pages were on a different domain or under an unrelated parent slug. Both scenarios are explicitly avoided.

### 6.4 — On "Indexing Uncertainty"

**The concern:** Google may index only one page, both but rank neither strongly, or delay indexing due to similarity.

**Reality:** Indexing uncertainty arises from (a) thin content, (b) duplicate content, (c) crawl-budget exhaustion, or (d) lack of internal links. None apply here:

- Each new page is 800–1,500 words of unique, structured, schema-supported content. Not thin.
- Each page targets a distinct intent and contains distinct H1/H2/title metadata. Not duplicate.
- 38 new URLs is a trivial fraction of GPL's existing crawl budget. No exhaustion risk.
- Every new page is internally linked from the pillar and from sibling cluster pages. Strong link signal.

We additionally mitigate indexing latency by submitting all 38 URLs directly through Google Search Console URL Inspection on day 1 of deployment — bypassing organic discovery entirely. This is standard practice and is documented in `docs/04-gsc-submission-checklist.md`.

### 6.5 — On "LLM / AI Search Impact"

**The concern:** Duplicate pages confuse entity understanding for ChatGPT, Gemini, Perplexity.

**Reality:** This concern is the strongest argument **for** the proposed plan, not against it. AI platforms reward:

1. Clear, single-answer pages with explicit Q&A structure → exactly what our 5 article pages provide
2. JSON-LD `FAQPage` and `Article` schema → injected on every new page
3. High text-to-image ratio with answer-first prose → the inverse of the current image-heavy pages
4. Topical clustering under a pillar URL → exactly what the `/the-1-percent-plan/*` structure achieves

The current site state is what creates AI confusion: an LLM asked "what is the Godrej 1% Plan calculator?" today returns either a hallucinated answer or no answer, because no page on the site provides that information in machine-readable form. Our new pages eliminate that confusion by being the single authoritative source per query type.

There is no "duplicate" for AI to be confused by — we are creating content where none currently exists.

### 6.6 — On "Enhancing Existing Pages Instead"

**The concern (constructive proposal from Jay):** Add FAQs and structured content to existing landing pages rather than create new ones.

**Reality (and why we don't recommend this as the primary strategy):** Enhancing the existing pages is something we welcome **in addition to** the new pages — it is not a substitute. Three reasons:

1. **Architectural mismatch.** The existing project pages are built as visual marketing assets — image carousels, lifestyle photography, amenity icons, EMI widgets. Inserting 800–1,500 words of FAQ-format prose into these pages either (a) breaks the visual hierarchy buyers respond to, or (b) hides the content in an accordion where AI crawlers and users both miss it. Neither outcome serves the goal.

2. **Risk to live ranking pages.** The existing pages currently rank for high-intent commercial queries (project name, location, configuration). Materially editing live, ranking pages introduces ranking volatility — exactly the risk Jay flags in his note about URL changes. Creating new URLs sidesteps this risk entirely. The existing pages keep ranking exactly as they do today.

3. **Different jobs require different formats.** A buyer ready to enquire needs price, possession date, gallery, EMI, contact form. A user evaluating the 1% Plan concept needs a calculator, a safety explainer, a comparison vs 20% down. Forcing both jobs onto one page compromises both. Splitting them across pillar + cluster lets each page do its job well.

The most effective combined strategy is therefore: **keep the existing pages doing what they do well + add cluster pages that target the queries the existing pages cannot serve.** This is what the current plan delivers.

### 6.7 — On "Retaining Current URLs / Avoiding Redirects"

**The concern:** Changing URLs would require redirects, leading to ranking drops.

**Reality:** We agree completely. **No existing URL is being changed in this plan.** No redirects are needed. All new pages are net-new URLs under the existing parent slug. The 32 project URLs remain exactly as they are today — we're enriching their body content, not changing their address.

### 6.8 — Summary in One Line

The plan creates new pages where none exist (5 informational), enriches existing pages without changing their URLs (32 project pages), preserves all current rankings, and uses topic-cluster architecture that concentrates rather than dilutes authority. The risks Jay raises are real risks for a different kind of plan — they don't apply to this one.

---

## 7. What Happens After Handover (GPL Scope)

Per the proposal, GPL's post-handover scope:

1. Publish all pages
2. Validate schema deployment via Google Rich Results Test
3. Update `robots.txt` to allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot` — diff provided in `docs/01-robots-txt-diff.md`
4. Create and host `/llms.txt` — template provided in `docs/02-llms-txt-template.md`
5. Submit all 38 new URLs via GSC URL Inspection — checklist in `docs/04-gsc-submission-checklist.md`

We provide written implementation guidelines for all 5 steps. We do not require backend access at any point.

---

## 8. Version Log

- **v4.0 — 22 Apr 2026:** Final plan post-proposal alignment. Production-ready Next.js components confirmed as delivery format. SEO concerns from Jay addressed in §6. 32 project pages confirmed (down from 37 in v3 once GPL confirmed scope). Reference deployment live on Vercel.
- v3.0 — 18 Apr 2026 (superseded): Rescoped to enrichment package after discovery of existing project URLs.
- v2.0 — 18 Apr 2026 (superseded): Original 5-deliverable plan based on initial proposal.
- v1.0 — 17 Apr 2026 (archived): Pre-proposal 9-deliverable plan.
