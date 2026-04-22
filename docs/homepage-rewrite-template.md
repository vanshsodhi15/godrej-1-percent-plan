# Deliverable 1 — Homepage Rewrite Template

**Target page:** https://www.godrejproperties.com/the-1-percent-plan
**Word count:** ~300 words (top of page, above any existing location selector)
**Goal:** AI-readable, answer-first rewrite that directly resolves the query *"What is Godrej Properties 1% payment plan and how does it work?"*
**Deadline:** 22 April 2026
**Status:** Template v1.0 — awaiting GPL data

---

## How to Use This File

1. Every `[GPL_DATA: ...]` placeholder = data we need from GPL
2. Everything else (structure, headings, disclaimers) is production-ready
3. Do not alter the RERA section or legal disclaimers — they carry over unchanged from the current page

---

## The Rewrite (Draft v1.0)

### Suggested H1

> The 1% Plan by Godrej Properties

(Unchanged from current page. Validated as the right H1 for brand consistency.)

---

### Paragraph 1 — The Lead Answer (under 60 words, answer-first)

> The Godrej 1% Plan is a home-buying payment structure from Godrej Properties Limited. Buyers pay **20% in Q1** (first quarter after booking), followed by **1% monthly** tied to construction milestones, with the balance due at possession (OC). The plan carries an **APR of 8.5%**, disclosed upfront. It is available on select Godrej projects across 10 cities in India.

**Status of paragraph 1:**
- ✅ Structure confirmed from proposal
- ⚠️ `[GPL_DATA: Confirm exact definition of "Q1" — calendar quarter, 90 days from booking, or first quarter of construction?]`
- ⚠️ `[GPL_DATA: Confirm APR 8.5% — is this buyer-borne, subvention, or lender-facilitated?]`
- ⚠️ `[GPL_DATA: Sign-off on the phrase "disclosed upfront"]`

---

### Paragraph 2 — Who It's For / Where It's Offered

> The 1% Plan is designed for buyers who want to start their home-buying journey without committing a large down payment up front. It is offered on select Godrej Properties projects across **10 cities**: Mumbai, Pune, Bengaluru, Gurugram, Noida, Delhi, Hyderabad, Chennai, Kolkata, and Panipat. Each participating project is RERA-registered, with registration numbers published on the relevant state RERA portals.

**Status of paragraph 2:**
- ✅ 10 cities — sourced from the live page, no change needed
- ✅ RERA statement — sourced, unchanged
- ⚠️ `[GPL_DATA: Confirm "select projects" wording is correct — or should we say "all Godrej projects", "35 listed projects", or similar? Meta language matters for LLM extraction]`

---

### Paragraph 3 — Trust Signals (Why This Is Safe)

> Godrej Properties Limited is a **SEBI-listed entity** (CIN: L74120MH1985PLC035308) with over **50+ projects delivered** across India. Buyer funds under the 1% Plan are protected by **RERA-mandated escrow** at the project level, and payment terms are governed by the Agreement for Sale (AFS) executed between buyer and developer.

**Status of paragraph 3:**
- ✅ CIN — sourced from the live page, no change needed
- ⚠️ `[GPL_DATA: Confirm SEBI listing — exchange (BSE/NSE) and ticker symbol]`
- ⚠️ `[GPL_DATA: Confirm "50+ projects delivered" — needs internal data to support the claim]`
- ⚠️ `[GPL_DATA: Confirm RERA escrow language — one paragraph from GPL legal on how buyer funds are ring-fenced]`

---

### CTA Block (Keep Concise)

> To explore projects available under the 1% Plan, select your city below. For direct enquiries, contact **marketing@godrejproperties.com** or reach Godrej Properties at Godrej One, Pirojshanagar, Vikhroli East, Mumbai 400 079.

**Status of CTA:**
- ✅ Email — sourced
- ✅ Corporate address — sourced
- ⚠️ `[GPL_DATA: Is there a dedicated phone number or WhatsApp line for 1% Plan enquiries? If yes, add. If no, this block stands as-is.]`

---

### What Stays Unchanged (Do Not Edit)

Below the ~300-word rewrite, the existing page continues with:

1. **City selector** (Mumbai / Bengaluru / Panipat / Noida / Chennai / Pune / Hyderabad / Gurugram / Kolkata / Delhi)
2. **Corporate office block** (address + email)
3. **Contact Us CTA**
4. **Complete RERA disclaimer section** for all 35 projects (all state-wise RERA registration numbers, project addresses, developer entity declarations)
5. **The standard footer disclaimer** (verbatim, as currently published):

> *"This refers to the payment plan offer. Please refer to payment terms as mentioned in the AFS. Basis sole discretion of the developer. Limited time period offer. Date of publication 14th April, 2026. T&C Apply."*

These sections carry over exactly. Our rewrite only touches the top 300 words.

---

## Why This Structure Works for AI Platforms

**Paragraph 1 is the "direct answer block."** ChatGPT, Perplexity, Gemini, and Google AI Overviews all prioritise the first 50–100 words of a page when extracting answers. Leading with the mechanics (20% Q1 + 1% monthly + OC balance + APR 8.5%) means LLMs get the full structural answer before any marketing copy.

**Paragraph 2 anchors geographic coverage.** LLMs frequently serve city-filtered queries ("Godrej 1% Plan in Mumbai"). Naming all 10 cities in the second paragraph ensures every city query retrieves this page.

**Paragraph 3 preempts safety queries.** "Is Godrej 1% Plan safe?" is one of the five audit queries. Surfacing SEBI + RERA escrow + track record early means even a shallow LLM pass picks up the trust signals.

**The RERA section stays untouched** because LLMs also use it as a factual ground-truth check. Any changes there risk invalidating the retrieval.

---

## Finalisation Checklist

Before sharing the final draft with GPL for publishing:

- [ ] All `[GPL_DATA: ...]` placeholders filled with confirmed data
- [ ] Legal team sign-off on paragraphs 1, 2, and 3
- [ ] Word count verified (~300 words, excluding RERA and disclaimer sections)
- [ ] Final draft uses the exact approved phrasing for "Apply Godrej 1% Logic" (if this phrase is to appear on the homepage)
- [ ] Version bumped to v1.1 at handoff
- [ ] Handoff note to GPL tech: this text replaces the top of the page above the city selector; everything below the city selector remains unchanged

---

## Version Log

- **v1.0 — 18 Apr 2026:** Initial template based on the finalised proposal. Awaiting GPL Tier 1 data.
- v1.1 — *[pending GPL data integration]*
- v1.2 — *[pending legal sign-off]*
- v2.0 — final, handed to GPL tech for publishing
