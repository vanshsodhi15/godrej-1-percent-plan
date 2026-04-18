# Optional Assets From v1 (Earlier 9-Deliverable Scope)

**What this folder is:** An archive pointer to work done before the proposal was narrowed to 5 deliverables. Most of it is now out of scope — but a few pieces remain useful as reference.

**Rule of thumb:** Don't reach for anything in this folder unless a v2 deliverable explicitly references it, or you have a specific reason to re-use the content. Default is to ignore.

---

## What's Here (in `/home/claude/godrej-1pct-v1-archive/`)

The v1 working folder is preserved at `/home/claude/godrej-1pct-v1-archive/`. Below is a map of what's in there and whether it's still usable.

### ✅ Still Useful (already copied into v2 where relevant)

- **`deliverable-1-brand-memory/projects-master.json`** — 100% sourced list of all 37 projects with RERA numbers. Already copied to `_reference-from-godrej-website/projects-master.json` in v2. Use this as the canonical project dataset.
- **Sourced facts in the brand-memory v1.1.0** — The "SOURCED" fields inside the old `brand-memory.json` are still valid. They're already distilled into `_reference-from-godrej-website/sourced-facts.md` in v2.

### ⚠️ Partially Useful (cherry-pick, don't reuse wholesale)

- **`deliverable-1-brand-memory/faq-knowledge-base.md`** — Had 45 SOURCED + 25 PENDING Q&A pairs. Some of the SOURCED entries still hold and can inform the FAQ sections inside each v2 page template. But do NOT lift verbatim — the v2 scope is tighter and each page has its own query-specific FAQs.
- **`deliverable-4-schema-llms/json-ld-schema-templates.json`** — Superseded by v2's `deliverable-3-tech-implementation/03-schema-markup-templates.json`, which is tighter and scope-aligned. Keep v1 version for cross-reference only.

### ❌ Out of Scope (do not use)

- **`deliverable-2-infrastructure/*`** — Built around the idea of a separate `/ai-feeds/` subdirectory or subdomain. The v2 scope publishes on the main site structure (`/the-1-percent-plan/*`), so subdirectory planning, server-config specs, and CDN-level deployment guidance no longer apply.
- **`deliverable-3-pages/*`** — Was designed for 25 pages. v2 scope is 6 pages (1 rewrite + 5 new). The v1 page template is more elaborate than needed and uses URL paths (`/ai-feeds/...`) that don't match v2.
- **`deliverable-4-schema-llms/llms.txt`** — Referenced `/ai-feeds/...` URLs. v2 `llms-txt-template.md` uses the correct `/the-1-percent-plan/*` URLs.
- **`deliverable-6-audit/audit-framework.md`** — v1 had a broader 4-tier, 7-platform audit with weekly scorecards. v2 scope is narrower: 5 queries × 4 platforms × 5 days of daily reports. Use v2 protocol only.
- **`deliverable-7-analytics/*`** — Bot vs human analytics was a v1 deliverable (Deliverable 7 of 9). Out of scope in v2.
- **`deliverable-5-maintenance/*`** and **`deliverable-8-refresh/*`** — Automation pipeline and ongoing-refresh process. Out of scope for the 7-10 day engagement.
- **`deliverable-9-reels/*`** — Short-form video deliverable. Out of scope.

---

## Why the v1 Work Still Has Value

Two reasons to keep the archive intact rather than delete it:

1. **Sourced data is reusable forever.** The project list with RERA numbers, the verbatim disclaimers, the corporate facts — these are sourced from the live website and don't change based on scope. If GPL ever expands the engagement (e.g., adds city-specific pages, adds project-specific pages), the v1 sourced content accelerates that work.

2. **Contingency option for Deliverable 3.** If GPL tech team blocks the main-site publishing path for Deliverable 1 + 2, there's a fallback: host the 6 new pages on a subdirectory (e.g., `/insights/` or `/knowledge/`) using the v1 infrastructure spec as the technical reference. This is a last-resort option and should not be proposed without first escalating the block through Gaurav — but the archive means we can execute it if it becomes necessary.

---

## Rule for Using Archive Content

If during v2 work you find yourself wanting to reuse something from the archive:

1. Check whether the scope of that content fits v2. (Most of it doesn't.)
2. If it fits, copy the **sourced facts only**, not the structural framing.
3. Note the reuse in the relevant v2 file's version log.
4. Never use v1 inferred content (anything that was marked `[PENDING]` or written by AI about plan mechanics) — that content is what the new v2 templates explicitly avoid.

---

## Questions About What's Reusable?

If you hit a specific question ("can we reuse X from v1?"), ask the team. Default answer is "no, use the v2 template." Escalate only if there's a clear time-saving case.
