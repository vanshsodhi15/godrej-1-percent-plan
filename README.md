# Godrej 1% Plan — GEO Campaign Workspace

This is the working folder for the Godrej Properties 1% Plan Generative Engine Optimization (GEO) campaign. Everything you need to deliver the 5 scoped items lives here.

**Client:** Godrej Properties Limited (GPL)
**Engagement window:** 7–10 days, starting from when GPL shares data (anticipated Monday 20 April 2026)
**Official source of truth:** https://www.godrejproperties.com/the-1-percent-plan

---

## Where to Start

**Open `00-start-here/execution-plan.md` first.** It is the single authoritative document for this engagement. Everything else supports it.

```
godrej-1pct/
├── 00-start-here/
│   ├── execution-plan.md               ← Master plan. Read first.
│   └── godrej-data-request.md          ← Send this to Gaurav on Monday 20 April
│
├── deliverable-1-homepage-rewrite/
│   └── homepage-rewrite-template.md    ← Plug GPL data in the marked blanks
│
├── deliverable-2-answer-pages/
│   ├── page-1-how-it-works/            ← One folder per page (800 words each)
│   ├── page-2-is-it-safe/
│   ├── page-3-apply-godrej-1pct-logic/
│   ├── page-4-calculator/
│   └── page-5-vs-20pct-down/
│
├── deliverable-3-tech-implementation/
│   ├── 01-robots-txt-diff.md           ← Exact lines to add to godrejproperties.com/robots.txt
│   ├── 02-llms-txt-template.md         ← llms.txt content for the domain root
│   ├── 03-schema-markup-templates.json ← FAQ + Article schema to embed per page
│   └── 04-gsc-submission-checklist.md  ← Google Search Console submission steps
│
├── deliverable-4-ai-audit/
│   ├── audit-protocol.md               ← The 5 queries × 4 platforms × 5 days method
│   └── daily-report-template.md        ← Screenshot format for daily client updates
│
├── deliverable-5-optional-external-seeding/
│   └── linkedin-article-templates.md   ← 3 LinkedIn article templates (optional add-on)
│
├── _reference-from-godrej-website/
│   ├── projects-master.json            ← All 35 projects with RERA (100% sourced)
│   └── sourced-facts.md                ← Every fact we can state without GPL docs
│
└── _optional-assets-from-v1/
    └── README.md                       ← Earlier work — use only if explicitly useful
```

---

## What You (Account Lead) Do Next — Simple Workflow

### Today (Saturday, 18 April 2026)

1. **Read** `00-start-here/execution-plan.md` end to end. 20 minutes.
2. **Review** each deliverable folder — you'll see templates with clearly marked **`[GPL_DATA: ...]`** placeholders. These are what we need from Gaurav's team.
3. **Prepare** the Monday kickoff email using `00-start-here/godrej-data-request.md` as the body.

### Monday (20 April 2026) — Kickoff

4. **Send** the data request email to Gaurav, Prerna, Kushal. Mark specific asks with deadlines.
5. **Set up** a shared folder (Google Drive / Dropbox) where GPL drops documents as they arrive.
6. **Schedule** a 30-min sync with Godrej tech team contact — this is the blocker for Deliverable 3.

### Day by Day (as data flows in)

7. **Homepage rewrite** (Deliverable 1) — ship to GPL by **Apr 22**. Needs only Day-1 data. Start drafting Mon/Tue.
8. **5 answer pages** (Deliverable 2) — ship by **Apr 24**. Each page can be drafted in parallel as data arrives.
9. **Tech implementation guidelines** (Deliverable 3) — ship by **Apr 27**. Tech team sync required.
10. **AI audit** (Deliverable 4) — runs **Apr 27 to May 1**. Daily reports.
11. **Optional LinkedIn articles** (Deliverable 5) — if opted in, ship by **Apr 24**.

### Important — Manage Expectations Upfront

- Content quality is guaranteed **only for data GPL actually shares**. No data = partial delivery.
- If GPL tech team doesn't align, Deliverable 3 becomes "guidelines only" — we cannot force implementation.
- AI citation is probabilistic. We maximise eligibility; we cannot guarantee rankings.

---

## Key Clarification the Original Website Left Ambiguous — Now Resolved

The proposal explicitly confirms the plan is:
- **20% in Q1** (first quarter after booking)
- **1% monthly** thereafter
- **Construction-linked** milestones (e.g., terrace slab)
- **Balance at possession (OC)**
- **APR 8.5%** disclosed upfront

This matches the meta title on the live page (*"Pay 1% Monthly & Easy Payment Plan"*). All templates in this workspace reflect this structure. If any of this has moved since the proposal was drafted, flag immediately — it cascades through every deliverable.

---

## Sourced vs. Pending — The Authenticity Rule

Every content asset in this folder follows one strict rule:

> Every fact is either (a) **SOURCED** from a confirmed GPL document or the live website, or (b) marked **`[GPL_DATA: ...]`** as a blank to be filled.
> Nothing is inferred. Nothing is AI-generated about numbers, terms, or mechanics.

When GPL sends data, replace the `[GPL_DATA: ...]` placeholders. Do not edit anything else without noting the change in a version log.

---

## The V1 Archive

The `_optional-assets-from-v1/` folder contains work from an earlier, broader 9-deliverable version of this project (before the 5-deliverable scope was finalised). Most of it is now out of scope, but some pieces may be reusable:

- The earlier **brand-memory.json** and **FAQ knowledge base** contain sourced facts that are still valid.
- Earlier **infrastructure spec** for subdirectories/subdomains — not applicable to the new scope (rewrite + new pages go on the main site, not a separate subdirectory).
- Earlier **audit framework** — superseded by the simpler 5-query protocol in the new scope.

Default stance: **don't use v1 assets unless the new deliverable explicitly references them**. The v1 folder's README flags which pieces are still useful.

---

## Who to Contact

- **GPL primary:** Gaurav (wants AI accuracy, no hallucinations)
- **GPL secondary:** Prerna, Kushal
- **Our team lead:** *[add name + contact]*
- **Single comms channel for updates:** *[set up on Monday — suggest shared Slack channel or dedicated email group]*

---

## One Reminder

The 7–10 day clock starts when GPL shares data. Without data, the clock doesn't start, timelines don't begin, and that should be communicated back clearly before Day 1 if data slips.
