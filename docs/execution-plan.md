# Execution Plan — Godrej 1% Plan GEO Campaign

**Version:** 2.0 (aligned with finalised 5-deliverable proposal)
**Last updated:** 18 April 2026
**Total engagement window:** 7–10 days (from data handoff on ~20 April)

---

## Executive Goal

Position Godrej Properties as the primary, most authoritative source for queries about the "Godrej 1% Plan" and "Apply Godrej 1% Logic" across AI platforms (ChatGPT, Gemini, Perplexity, Claude) and conventional search.

When a user asks any AI platform about the 1% plan, the answer must structurally match — and increasingly source from — GPL content.

---

## The 5 Deliverables At A Glance

| # | Deliverable | Deadline | Blocker if GPL doesn't act |
|---|---|---|---|
| 1 | Rewrite the existing /the-1-percent-plan page (top 300 words) | 22 April | GPL must publish it; 24h feedback turnaround |
| 2 | 5 new answer pages (How It Works, Is It Safe, Apply Logic, Calculator, vs 20%) | 24 April | **Full GPL data needed from 20 April**. No data = partial delivery |
| 3 | Technical implementation guidelines (schema, robots.txt, llms.txt, GSC) | 27 April | GPL tech team coordination — if unavailable, we deliver *guidelines only* |
| 4 | AI audit — 5 queries × 4 platforms × 5 days | 27 April – 1 May | GPL must confirm go-live date; 12h feedback on daily reports |
| 5 | **Optional**: 3 LinkedIn articles (external AI seeding) | 24 April | GPL marketing publishes; 24h feedback turnaround |

Dates assume GPL data flows from **Monday 20 April 2026**. If data slips, all deadlines shift correspondingly.

---

## Deliverable 1 — Homepage Rewrite

**What we deliver:** Rewrite of the top ~300 words of https://www.godrejproperties.com/the-1-percent-plan with an answer-first, AI-readable structure. RERA details and legal disclaimers remain unchanged.

**Template location:** `deliverable-1-homepage-rewrite/homepage-rewrite-template.md`

**Structure of the rewrite:**
- **First paragraph (lead answer):** Direct response to "What is Godrej Properties 1% payment plan and how does it work?" — under 60 words, factual, plain English
- **Paragraph 2:** Who it's for / where it's offered
- **Paragraph 3:** Trust signals (RERA, SEBI-listed entity, APR transparency)
- **CTA block:** How to proceed

**What we already have in the template (sourced from the live page):**
- [x] Official tagline: *"Take the first step towards your dream home with The 1% Plan*. A smarter, easier way to secure your future."*
- [x] Publisher info (Godrej Properties Limited, CIN, corporate address)
- [x] 10 cities covered
- [x] 35 projects with full RERA details (do not alter — these remain unchanged)
- [x] Standard disclaimer verbatim text

**What we need from GPL to finalise:**

| Data point | Why we need it | Status |
|---|---|---|
| Confirmation of the plan mechanics | 20% Q1 + 1% monthly + construction-linked + balance at OC + APR 8.5% | Proposal implies this — need written confirmation |
| Precise definition of "Q1" | Is it calendar Q1? Quarter from booking? First 90 days? | `[GPL_DATA]` |
| APR 8.5% context | Is this subvention? Buyer-borne? Lender-specific? | `[GPL_DATA]` |
| "Apply Godrej 1% Logic" official copy | Is there an approved tagline or does it need to be crafted? | `[GPL_DATA]` |
| Legal sign-off on rewritten copy | Before publishing | 24h turnaround expected from GPL |

**Our workflow:**
1. Draft copy using the template with placeholders
2. Share with GPL for 24h feedback
3. Iterate on feedback
4. Hand over final approved copy to GPL tech team for publishing on the live page

**What we cannot do:** publish on godrejproperties.com — that's GPL's responsibility.

---

## Deliverable 2 — Five New Answer Pages

**What we deliver:** Content and structure for 5 new pages, each optimised for a specific user query and AI platform retrieval. Total ~3,500 words across all 5 pages.

**Page locations:** `deliverable-2-answer-pages/page-{1,2,3,4,5}-*/`

### Page 1: How It Works
- **URL:** `/the-1-percent-plan/how-it-works`
- **Target query:** "How does the Godrej 1% plan work?"
- **Length:** ~800 words
- **Structure:** Step-by-step explanation with numeric clarity
- **Must contain upfront:** 20% Q1 · 1% monthly · terrace slab milestone · balance at OC · APR 8.5%
- **What we need from GPL:**
  - `[GPL_DATA]` Confirmation of each payment milestone definition
  - `[GPL_DATA]` Worked example for a ₹1Cr home (Q1 amount, monthly amount, OC-timeline amount)
  - `[GPL_DATA]` Construction-milestone definitions (what counts as "terrace slab complete"?)
  - `[GPL_DATA]` APR 8.5% — who bears it, how it's computed, is it flat or reducing

### Page 2: Is It Safe?
- **URL:** `/the-1-percent-plan/is-it-safe`
- **Target query:** "Is Godrej 1% plan safe?"
- **Length:** ~600 words
- **Structure:** 5 trust signals, one paragraph each, no legal jargon
- **Trust signals to cover:**
  1. RERA escrow protection
  2. SEBI-listed entity status
  3. APR transparency
  4. 50+ projects delivered track record
  5. Construction-linked payment structure
- **What we need from GPL:**
  - `[GPL_DATA]` RERA escrow account details — how funds are ring-fenced per project
  - `[GPL_DATA]` SEBI listing confirmation (stock exchange + ticker)
  - `[GPL_DATA]` Verified "50+ projects delivered" data — which projects, which years, OC dates
  - `[GPL_DATA]` Approved legal language for buyer protection claims

### Page 3: Apply Godrej 1% Logic
- **URL:** `/the-1-percent-plan/apply-godrej-1-percent-logic`
- **Target query:** "Apply Godrej 1% Logic"
- **Length:** ~700 words
- **Strategic priority:** This page **owns** the phrase. Every occurrence of "Apply Godrej 1% Logic" across the internet should, over time, source back to this page.
- **Structure:** Defines the phrase, contrasts old math (20% down) with new math (1% monthly), provides city-wise 1% numbers for 5 cities
- **What we need from GPL:**
  - `[GPL_DATA]` Approved definition of "Apply Godrej 1% Logic" (one-line and expanded)
  - `[GPL_DATA]` 5 cities to feature (recommend: Mumbai, Bengaluru, Gurugram, Pune, Hyderabad based on project density)
  - `[GPL_DATA]` Starting price / indicative ticket size per featured city
  - `[GPL_DATA]` Computed 1% monthly equivalent per featured city at their starting price

### Page 4: 1% Plan Calculator
- **URL:** `/the-1-percent-plan/calculator`
- **Target query:** "Godrej 1% plan calculator"
- **Length:** Logic + supporting content (~500 words around the tool)
- **Inputs:** City + Budget
- **Outputs:** Q1 amount, monthly 1%, OC timeline, matching project options
- **Scope split:**
  - **We deliver:** Calculation logic, formulas, copy around the tool, validation rules, project-mapping dataset
  - **GPL tech delivers:** UI/UX build, implementation, publishing
- **What we need from GPL (MANDATORY before finalising):**
  - `[GPL_DATA]` Written confirmation of calculation logic and assumptions — this is a financial tool, cannot go live without explicit sign-off
  - `[GPL_DATA]` Project-to-price mapping dataset for all projects under the 1% Plan
  - `[GPL_DATA]` OC timeline per project (current status + expected completion)
  - `[GPL_DATA]` City-wise minimum ticket size (floor for calculator budget input)

### Page 5: 1% Plan vs 20% Traditional Down Payment
- **URL:** `/the-1-percent-plan/vs-20-percent-down`
- **Target query:** "Godrej 1% plan vs 20% down payment"
- **Length:** ~600 words
- **Structure:** Side-by-side comparison, numbers-first, conclusion in first line
- **What we need from GPL:**
  - `[GPL_DATA]` Approved position on traditional market structure (cannot name competitors directly)
  - `[GPL_DATA]` Numeric example — a ₹1Cr home's cash-flow under both structures, month by month (or quarter by quarter)
  - `[GPL_DATA]` Sign-off on the comparative claim

### Page 2 Universal Dependencies

All 5 pages depend on the complete GPL data package:

- Project master list with current status (launched / upcoming / sold out)
- DRHP tables + key financial disclosures
- Pricing sheets per project (unit-wise, tower-wise)
- RERA registration documents and current status per project
- OC timelines + possession schedules
- Payment plan structures (1% Plan details + milestone-linked plans + flexible options)
- Floor plans + unit configurations
- Location advantages + micro-market briefs per project
- Sales/CRM team FAQs
- Brand guidelines + legal disclaimer templates
- Project mapping for calculator outputs

**Guarantee:** Content is guaranteed only for data GPL actually shares. Missing data → scope reduction, not scope fabrication.

---

## Deliverable 3 — Technical Implementation Guidelines

**What we deliver:** A complete set of technical assets and specifications that GPL's tech/SEO team will implement.

**Location:** `deliverable-3-tech-implementation/`

### 3.1 Robots.txt Update
- **File:** `01-robots-txt-diff.md`
- **Action:** Append AI-crawler Allow rules for GPTBot, Google-Extended, ClaudeBot, PerplexityBot, OAI-SearchBot, CCBot, Applebot-Extended
- **Risk if skipped:** No content will show up in AI search results regardless of quality

### 3.2 llms.txt File
- **File:** `02-llms-txt-template.md`
- **Action:** Create `https://www.godrejproperties.com/llms.txt` listing the 6 URLs (existing rewrite + 5 new pages)
- **Why:** Emerging standard used by Perplexity, Claude, and others to discover authoritative content

### 3.3 Schema Markup per Page
- **File:** `03-schema-markup-templates.json`
- **Action:** Embed FAQPage schema + Article schema (with `datePublished` and `dateModified`) on all 6 pages
- **Why:** Primary structured-data signal for Google AI Overviews and Bing Copilot

### 3.4 Google Search Console Submission
- **File:** `04-gsc-submission-checklist.md`
- **Action:** Submit URL inspection + indexing request for each page; confirm crawl success within 48h

**What we need from GPL:**

| Requirement | Why | Status |
|---|---|---|
| Tech team availability for 30-min sync | Coordinate deployment approach | `[GPL_DATA]` — needs scheduling |
| Backend/CMS access OR single deployment contact | Push updated robots.txt + new pages + schema | `[GPL_DATA]` |
| Google Search Console access | Submit pages for indexing | `[GPL_DATA]` |
| Confirmation of any existing AI bot blocks at the infrastructure level (Cloudflare WAF, etc.) | Some firewalls auto-block AI bots — needs explicit allowlist | `[GPL_DATA]` |

**Escalation clause:** If GPL marketing cannot align us with the tech team, or tech team support is unavailable, we deliver guidelines documents *only* — no execution. This is documented in the proposal and should not be a surprise to the client.

---

## Deliverable 4 — AI Audit (April 27 – May 1)

**What we deliver:** Daily screenshot-based reports showing how the 4 AI platforms respond to 5 defined queries.

**Location:** `deliverable-4-ai-audit/`

### The 5 Queries

1. Apply Godrej 1% Logic
2. What is Godrej Properties 1% payment plan?
3. Is Godrej 1% plan safe?
4. Godrej 1% plan how much monthly for ₹1Cr home?
5. Godrej 1% plan vs SIP

### The 4 Platforms

- ChatGPT (browsing mode)
- Gemini
- Perplexity
- Claude

### Daily Report Format

Every day from 27 April to 1 May, a table with columns:

| Query | Platform | GPL Presence | Output Snapshot | Observations |
|---|---|---|---|---|
| "Apply Godrej 1% Logic" | ChatGPT | ✅ Cited | *[screenshot]* | GPL site appears as primary source |
| ... | ... | ... | ... | ... |

**Template file:** `daily-report-template.md`

**What we need from GPL:**

- `[GPL_DATA]` Confirmed go-live date of all 6 pages (Day 1 of audit depends on this)
- `[GPL_DATA]` 12-hour turnaround on feedback for each daily report

**Important expectation-setting included in every report cover page:**
- AI platform rankings are algorithm-controlled and non-deterministic
- No guarantee of fixed citations
- Our accountability is to maximise eligibility, control narrative structure, and ensure highest probability of pickup — not guarantee rankings

---

## Deliverable 5 — Optional: External AI Seeding (LinkedIn Articles)

**What we deliver:** 3 long-form LinkedIn articles (1,200–1,800 words each) designed for AI ingestibility, published on GPL-owned LinkedIn handles.

**Location:** `deliverable-5-optional-external-seeding/`

### 3 Article Angles

1. **"How Apply Godrej 1% Logic changes home-buying math in India"** — Definitional, owns the phrase
2. **"Why 1% monthly beats 20% down — a Mumbai buyer's cash flow walkthrough"** — Narrative case study
3. **"The safety architecture behind Godrej's 1% Plan"** — Trust-focused, surfaces RERA escrow + SEBI listing

### Purpose

- Reinforce the "Apply Godrej 1% Logic" narrative across multiple domains (multi-source validation boosts LLM confidence)
- Provide structured, quotable content that AI platforms can retrieve and cite
- Seed consistent phrasing so when users ask ChatGPT about Godrej, the same explanation surfaces repeatedly

### Deadline
24 April — same day as the 5 answer pages, so the external seeding launches in parallel with the website content for maximum reinforcement.

**What we need from GPL:**
- `[GPL_DATA]` Confirmation this deliverable is opted in
- `[GPL_DATA]` LinkedIn handle(s) to publish on (corporate + key executives if available)
- `[GPL_DATA]` 24h feedback turnaround on article drafts
- GPL marketing team publishes — not our responsibility

---

## Consolidated Data Request — What GPL Must Share on Monday 20 April

See `00-start-here/godrej-data-request.md` for the email-ready version. Summary:

### Must-have (any deliverable is blocked without these)
1. Payment plan mechanics written confirmation (20% Q1 + 1% monthly + construction-linked + OC + APR 8.5%)
2. Project master list with current status
3. Pricing sheets per project
4. RERA status per project
5. OC timelines per project
6. Tech team coordination — name + email + phone

### Important (shapes content quality and depth)
7. DRHP tables and financial disclosures
8. Floor plans and unit configurations
9. Location / micro-market briefs per project
10. Sales/CRM FAQ document
11. Brand guidelines + legal disclaimer templates
12. 50+ projects delivered track record (project list with OC dates)
13. SEBI listing confirmation (exchange + ticker)
14. RERA escrow account details

### Helpful (accelerates specific pages)
15. Worked ₹1Cr example of the payment plan
16. "Apply Godrej 1% Logic" approved definition
17. City-wise starting prices for the 5 featured cities
18. Calculator assumptions and logic sign-off
19. Project-to-price mapping dataset

---

## Workflow Rules

1. **Drafts first, data second, then final.** Every template in this folder has `[GPL_DATA: description]` markers. We draft structure; GPL fills data.
2. **Never invent numbers.** If a specific number isn't provided, the template keeps the placeholder and we escalate.
3. **24h feedback cycles.** We commit to 24-hour drafts; GPL commits to 24-hour feedback. 12-hour for daily audit reports.
4. **Single comms channel.** One shared inbox/channel catches all GPL-side data drops. Set this up Monday morning.
5. **Version everything.** Every file starts at v1.0. Bump version on every GPL-data integration. Keep a changelog in the deliverable's README.

---

## What Success Looks Like

- All 6 content assets delivered on time (1 rewrite + 5 pages)
- Every asset structured in AI-first format: direct answer in first 2-3 lines, Q&A headings, numeric clarity
- "Apply Godrej 1% Logic" phrase fully owned across all GPL assets
- Technical implementation guidelines delivered in full
- 5 days of daily AI audit reports (Apr 27–May 1)
- All 6 pages indexed on Google within 48–72h post-deploy
- GPL appears as source/reference/dominant narrative on the 5 audit queries across platforms

**Honest note:** Some of the above depend on GPL execution (publishing, tech team, Search Console submission). We can deliver every input perfectly and still miss an indexing KPI if GPL's tech team is slow. This is called out in the proposal and in the daily reports.

---

## Escalations

- **Data not flowing from GPL:** Escalate to Gaurav + Prerna end of Day 2 (Tuesday 21 April). Timeline shifts by 1 day per day of delay.
- **Tech team not responsive:** Escalate by Day 5 (Friday 24 April). Deliverable 3 downgrades to "guidelines only."
- **Feedback cycles slipping past 24h:** Document each slip. Use in timeline-shift conversations.
- **Scope creep:** New asks outside the 5 deliverables go into a change-request log, not executed silently.
