# New Execution Plan — v3.0

**Replaces:** `00-start-here/execution-plan.md` (v2.0)
**Trigger for update:** Discovery that `/the-1-percent-plan/{city}/{project}` pages already exist on godrejproperties.com, with minimal AI-readable text content.
**Date:** 18 April 2026

---

## What Changed Since v2

When v2 was written, we assumed all 5 new pages plus the rewrite had to be created from scratch. On 18 April, we verified the following live URLs and found:

1. **`/the-1-percent-plan`** — Exists (main landing page, already analysed).
2. **`/the-1-percent-plan/bengaluru/godrej-lakeside-orchard`** — Exists. Confirmed live. **But the page contains almost no AI-readable content about the 1% Plan itself.** It has price, possession date, configurations, an image gallery, an EMI calculator widget, and a 25x4 payment plan footnote — but zero substantive text explaining the 1% Plan mechanics.

By pattern, all 37 project pages likely follow this template: `{city}/{project}` structure under `/the-1-percent-plan/`, visually rich, text-sparse, and missing structured data. AI crawlers visiting these URLs find nothing quotable about the 1% Plan.

**This changes our problem from "create new pages" to "enrich existing pages so AI platforms can actually use them."**

---

## The Core Finding

The existing URL architecture is good. The existing visual design is fine for human buyers. What's broken is the **machine-readable layer** — there's no JSON-LD, no FAQ schema, no plain-text explanatory content, and no bridge between the project page URL (which implies 1% Plan context) and the page body (which talks about 25x4 plans and lifestyle amenities).

An AI assistant asked *"What's the Godrej Lakeside Orchard 1% Plan?"* today lands on the live page, finds no answer, and either hallucinates one or declines to respond. Either outcome is bad for GPL.

---

### What actually works in this case for GEO

Three layers, in descending order of impact:

#### Layer 1 — JSON-LD Structured Data (Highest Impact, Lowest Cost)

**What it is:** A `<script type="application/ld+json">` block inside the `<head>` of each existing page. Invisible to human visitors, fully machine-readable by Google AI Overviews, Bing Copilot, Perplexity, and increasingly ChatGPT/Claude when they fetch pages.

**What we embed per project page:**
- `ApartmentComplex` schema: project name, location, developer, RERA number, configurations
- `Offer` schema: 1% Plan terms, pricing range, availability, eligibleRegion
- `FAQPage` schema: 5–7 project-specific Q&A pairs answering common AI-retrieval queries
- `BreadcrumbList` schema: site hierarchy
- `Organization` schema: GPL corporate identity (inherited, identical across pages)

**GPL tech team effort:** ~80 lines of JSON per project page × 37 project pages = a templatised insertion in their CMS. Probably 2–3 days of dev work if schema is parametrised from the existing project database.

**Why it works:** LLMs are specifically trained to parse JSON-LD. It's the industry-standard answer to this exact problem.

#### Layer 2 — Companion "Details" Page Per Project (High Impact, Medium Cost)

**What it is:** A text-heavy page at a sub-path like:
`/the-1-percent-plan/bengaluru/godrej-lakeside-orchard/details/`

This page is plain-text, prose-heavy, answer-first — the format AI crawlers reliably extract. It's linked from the main project page (e.g., "Read full 1% Plan details for this project") but is designed primarily for machine consumption.

**Content per companion page (~800 words):**
1. Plain-text description of 1% Plan terms for this specific project
2. 1% Plan worked example using this project's starting price
3. Project-specific Q&A (What's the 1% monthly for Godrej Lakeside Orchard? How does this project's milestones work? etc.)
4. RERA + escrow + developer confirmation
5. Contact / next-step CTA

**Why it works:** The marketing page stays exactly as it is for humans. The companion page exists purely to serve AI retrieval. Both pages link to each other and both carry the same URL authority under `/the-1-percent-plan/`.

#### Layer 3 — `llms.txt` + JSON Data Endpoints (Supplementary)

**What it is:**
- A `/llms.txt` at the root of godrejproperties.com listing the authoritative 1% Plan URLs
- Optional: JSON data files at `/the-1-percent-plan/data/projects/{project-slug}.json` that crawlers can fetch directly

**Why it's supplementary:** These are emerging standards with partial adoption. Perplexity and Claude pay attention to `llms.txt`; ChatGPT and Gemini barely do. Useful but not primary.

---

## The New Deliverable Structure

Five deliverables, rescoped to enrich existing infrastructure rather than build parallel pages.

| # | Deliverable | Deadline | What's different from v2 |
|---|---|---|---|
| 1 | **Rewrite of `/the-1-percent-plan` top 300 words** | 22 April | Unchanged from v2. This is still the correct approach for the hub page. |
| 2 | **5 Answer Pages** → Rescoped to **Enrichment Package** | 24 April | See below |
| 3 | **Technical Implementation Guidelines (expanded)** | 27 April | Now includes JSON-LD rollout for all 37 project pages |
| 4 | **AI Audit (27 April – 1 May)** | Daily | Unchanged from v2 |
| 5 | **Optional: External AI Seeding** | 24 April | Unchanged from v2 |

### Deliverable 2 — Rescoped Into Two Parts

#### 2A: 5 Topic Pages (new content, as originally scoped)

These remain new pages because no equivalent exists today:
- `/the-1-percent-plan/how-it-works`
- `/the-1-percent-plan/is-it-safe`
- `/the-1-percent-plan/apply-godrej-1-percent-logic`
- `/the-1-percent-plan/calculator`
- `/the-1-percent-plan/vs-20-percent-down`

All v2 templates for these remain valid. No changes to Deliverable 2A.

#### 2B: Project Page Enrichment Package (NEW)

For each of the 37 existing project pages under `/the-1-percent-plan/{city}/{project}`:

1. **A JSON-LD block** embedded in `<head>` — `ApartmentComplex` + `Offer` + `FAQPage` schemas populated with project-specific data
2. **A companion "details" page** at `/{project-url}/details/` — 800 words of AI-readable prose covering the 1% Plan as it applies to that project
3. **A plain-text data summary** served at `/{project-url}/data.json` — machine-consumable project snapshot

**Approach:** We don't build 37 companion pages by hand. We build **one master template** populated from GPL's project dataset. GPL's tech team runs the template across all 37 projects once the data is provided. This scales cleanly — when GPL adds a 38th project to the 1% Plan, the same template generates its enrichment package.

**Priority ranking for companion pages (if time-constrained, ship these first):**
1. High-velocity projects GPL is actively marketing (GPL to nominate — typically 8–10 projects)
2. Lakeside Orchard Bengaluru — the one we've already analysed
3. Flagship launches (Vrikshya, Alira, Madison Avenue, Reserve, etc.)
4. Remaining long-tail in subsequent batches

This approach front-loads impact on the projects that matter most for GPL's current sales cycle.

---

## What GPL Needs to Provide (Updated List)

### Tier 1 — Blockers for Day 1 (send Monday 20 Apr email unchanged)

- Payment plan mechanics written confirmation (20% Q1 + 1% monthly + construction-linked + OC + APR 8.5%)
- Tech team SPOC (name, email, phone)
- Single comms channel for data drops

### Tier 2 — New: Project Database in Structured Format

**This is the critical new ask under v3.** For the enrichment package to scale across 37 project pages, we need GPL's project data in a single structured dataset — ideally the same database their CMS already uses to render the existing project pages.

Required fields per project:
- Project name (exact spelling)
- URL slug (matching the live URL)
- City + micro-location
- RERA number (already sourced from the public page)
- Developer legal entity
- Starting price (indicative Agreement Value)
- Configurations (unit types and carpet areas)
- Current status (launched / under construction / OC received / sold out)
- Possession / OC timeline
- Top 3–5 location USPs (already visible as icons on each page — we need the text)
- 1% Plan applicability (is this project actually under the 1% Plan, or was the URL created speculatively?)

**Why this matters:** The last field especially — we need to know which of the 37 URLs actually have the 1% Plan as a live offering, vs which were built as a URL structure but not activated. Godrej Lakeside Orchard's page doesn't mention the 1% Plan at all in its body content, which suggests the URL taxonomy may have outrun the actual product rollout.

### Tier 3 — Same as v2

All content-shaping data: DRHP, pricing sheets, floor plans, micro-market briefs, sales FAQs, brand guidelines, 50+ projects delivered list, SEBI listing details, RERA escrow language, worked ₹1Cr example, "Apply Godrej 1% Logic" approved copy, city-wise starting prices, calculator logic sign-off, project-to-price mapping.

### Tier 4 — New: Tech Team Confirmation

Before we ship Deliverable 2B, GPL tech team must confirm:
- They can embed JSON-LD blocks into the existing project page template (not a bespoke-per-page edit)
- They can deploy new `/details/` sub-pages under the existing URL tree
- Their CMS allows serving JSON endpoints at arbitrary paths (for the data.json layer)

If any of these three isn't feasible in their current stack, the enrichment package scope shrinks accordingly. Better to know on Monday than on Thursday.

---

## Revised Timeline

| Date | Milestone |
|---|---|
| **Mon 20 Apr** | Kickoff email sent. Tier 1 + Tier 4 data requested. Tech team sync scheduled. |
| **Tue 21 Apr** | Homepage rewrite (D1) draft shared. Tech team sync held — confirm enrichment feasibility. |
| **Wed 22 Apr** | D1 finalised. Master project dataset (Tier 2) ingested. D2A page drafts in progress. |
| **Thu 23 Apr** | D2A page drafts (How It Works, Is It Safe, Apply Logic, Vs 20%) shared. D2B enrichment template built. |
| **Fri 24 Apr** | D2A Calculator page + D2B enrichment package for top 8–10 priority projects shared. LinkedIn articles (D5) drafted if opted. |
| **Mon 27 Apr** | D3 Technical guidelines delivered (robots.txt, llms.txt, schema templates, GSC checklist, **PLUS** enrichment rollout spec for the remaining 27 projects). AI audit Day 1. |
| **Tue 28 – Thu 30 Apr** | Daily AI audit reports. GPL tech team rolling out enrichment package to remaining projects. |
| **Fri 1 May** | Final AI audit report + summary. End-of-week scorecard. |

**Same hard constraint as v2:** Timelines assume GPL data flows from Monday 20 Apr. Each day of delay = one day of shift.

---

## Why This Plan Is Better Than V2

1. **Lower creation burden.** We're not building 37 new project pages from scratch — we're enriching 37 existing pages with a templated package. Faster, cheaper, lower legal overhead.
2. **Higher AI coverage.** In v2, only 6 pages would be AI-optimised. In v3, 6 + 37 = 43 pages carry structured data for 1% Plan queries. Every project-specific query ("1% Plan for Lakeside Orchard", "Godrej Majesty payment plan") now has an authoritative answer.
3. **Preserves existing SEO equity.** The project pages already have domain authority from the main site. Enriching them is lower-risk than creating new pages that have to earn authority from scratch.
4. **Honest about what already exists.** Our earlier plan promised value from creating content that, in large part, already existed structurally. v3 shifts the promise to what actually needs work: the machine-readable layer.

---

## Why This Plan Is Honest About Limitations

1. **If GPL tech team can't embed JSON-LD** (e.g., CMS limitation, template rigidity), Deliverable 2B collapses to guidelines only — we write the spec, they can't implement. Escalation trigger: flag by Tuesday evening.
2. **If GPL can't provide a structured project dataset**, we can't template the enrichment package. We'd fall back to manually enriching 5–8 top priority projects instead of all 37. Escalation trigger: flag if dataset isn't received by Wednesday morning.
3. **If some of the 37 project URLs are actually "URL-reserved, product-not-active"** (as the Lakeside Orchard body content suggests), we should not enrich those pages with 1% Plan claims. Better to request GPL confirm which projects are genuinely under the 1% Plan, and enrich only those. If the answer is "fewer than 37," we report that honestly in the AI audit rather than pretending full coverage.
4. **AI citation remains probabilistic.** Same caveat as v2. We maximise eligibility; platforms decide what to cite.

---

## What You (Account Lead) Do Next

### Today (Friday–Saturday, 18–19 April)

1. **Read this plan.** 15 minutes.
2. **Review the three findings** above with your senior team. Get internal alignment on the scope shift before presenting to GPL.
3. **Update the Monday data request email** (`00-start-here/godrej-data-request.md`) with the two new Tier 2 + Tier 4 sections on the structured project dataset and tech-team feasibility check.

### Monday (20 April)

4. **Send the updated email to Gaurav, Prerna, Kushal.**
5. **In a separate short note to Gaurav**, walk him through the finding on the existing project pages. Frame it as an opportunity, not a problem:
   > "Good news — the URL structure for 1% Plan project pages is already in place. The bigger opportunity is to make these pages AI-readable (they're currently image-heavy with low text density). We've adjusted our deliverables to leverage this existing structure rather than duplicate it. Net result: we now cover 43 pages for AI optimisation instead of 6, with lower tech-team lift. New plan attached."
6. **Schedule the tech team sync for Monday or Tuesday.** This is the single most important meeting of the week.

### Tuesday onwards

7. Standard workflow: data in → templates populated → drafts shared → 24h feedback → ship.

---

## What the Original Goal Looks Like Under V3

Original goal from the proposal:

> When a user asks AI platforms about the 1% plan, the answer should structurally match and increasingly source from GPL content.

Under v3, this is achieved across a broader surface:
- Generic 1% Plan queries (*"What is the Godrej 1% Plan?"*) → Served by the homepage rewrite + 5 topic pages (D1 + D2A)
- Brand-specific queries (*"Apply Godrej 1% Logic"*) → Served by D2A Page 3 + LinkedIn articles (D5)
- Project-specific queries (*"Godrej Lakeside Orchard 1% Plan monthly"*) → Served by the 37 enriched project pages (D2B)
- Comparative queries (*"Godrej 1% Plan vs SIP"*) → Tested in D4 audit, addressed by D2A Page 5

Same goal, wider coverage, same 7–10 day window.

---

## Version Log

- **v3.0 — 18 Apr 2026:** Rescoped to leverage existing `/the-1-percent-plan/{city}/{project}` URLs via enrichment package rather than net-new page creation.
- v2.0 — 18 Apr 2026 (superseded): Original 5-deliverable plan based on proposal, before verification of live URL state.
- v1.0 — 17 Apr 2026 (archived): 9-deliverable plan, pre-proposal-finalisation.
