# Deliverable 4 — AI Audit Protocol

**Run window:** 27 April – 1 May 2026 (5 working days)
**Cadence:** Daily report delivered by 6pm IST each day
**Deliverable per day:** Table with 20 rows (5 queries × 4 platforms) + screenshots + observations
**Status:** Protocol v1.0 — awaiting GPL go-live confirmation

---

## The 5 Queries

These are locked per the proposal. We do not modify them during the audit run — consistency of queries is what makes the daily trend meaningful.

1. `Apply Godrej 1% Logic`
2. `What is Godrej Properties 1% payment plan?`
3. `Is Godrej 1% plan safe?`
4. `Godrej 1% plan how much monthly for ₹1Cr home?`
5. `Godrej 1% plan vs SIP`

**Why these 5:**
- Q1 tests phrase ownership (the Deliverable 3 / Page 3 goal)
- Q2 tests direct brand query (does GPL surface as the primary source)
- Q3 tests trust-signal extraction (does Page 2 content get cited)
- Q4 tests numeric retrieval (does Page 1 / Calculator content get cited)
- Q5 tests comparative reasoning (does GPL narrative beat personal finance / SIP narrative)

---

## The 4 Platforms

1. **ChatGPT** — with browsing / search mode enabled
   - URL: https://chatgpt.com
   - Model: GPT-4 / default available
   - Browsing: ON
2. **Gemini** — Google's conversational AI
   - URL: https://gemini.google.com
   - Default model
3. **Perplexity** — search-first AI
   - URL: https://www.perplexity.ai
   - Default mode (not "Pro" — we test the free tier most users interact with)
4. **Claude** — Anthropic's assistant
   - URL: https://claude.ai
   - Web search tool ON

**Note on Google AI Overviews:** Not included in the proposal's 4-platform scope, but worth noting in observations if the auditor happens to see a Google AI Overview appear on a SERP during search. Opportunistic capture only.

---

## Daily Run Procedure

### Setup (one-time, Day 1 only)

- [ ] Use a **clean browser profile** (incognito / private window) for each session — eliminates personalisation bias
- [ ] Use the **same device + browser + network** across all 5 days for consistency
- [ ] Location setting: India (affects Gemini and some ChatGPT responses)
- [ ] Screenshot tool: system screenshot or full-page capture (Firefox has built-in, or use GoFullPage for Chrome)
- [ ] Screenshot storage: single folder per day, named `audit-day-N-YYYY-MM-DD/`

### Daily run (each day, 27 Apr through 1 May)

For each of the 5 queries × 4 platforms (20 tests total), in order:

1. **Open the platform in a fresh incognito tab**
2. **Paste the query exactly as written above** — do not rephrase, shorten, or fix typos
3. **Wait for the full response** to generate
4. **Take a full-page screenshot** — capture the entire response including source citations
5. **Save screenshot** with filename format: `day-N_platform_queryID.png`
   - Example: `day-1_chatgpt_Q3.png`
6. **Log the result** in the daily report template (see next file)

### Consistency rules

- Always run the queries in the **same order** each day (1 through 5)
- Always run the platforms in the **same order** each day (ChatGPT → Gemini → Perplexity → Claude)
- Run at a **consistent time of day** (suggest 10am–12pm IST — avoids platform maintenance windows)
- Do not modify browser extensions during the audit run

---

## Scoring — The GPL Presence Column

Every cell in the daily report gets one of these statuses:

| Status | Meaning | Criteria |
|---|---|---|
| ✅ **CITED** | GPL is explicitly named AND linked | "Godrej Properties" mentioned; godrejproperties.com URL shown in sources |
| 🟢 **MENTIONED** | GPL is named in the response | Brand mentioned; no source link |
| 🟡 **ECHOED** | GPL narrative structure is used but without attribution | "20% in Q1, 1% monthly" phrasing appears; no GPL brand reference |
| 🟠 **COMPETING** | Response features a non-Godrej narrative dominantly | Broker site cited, non-Godrej developer mentioned first, etc. |
| 🔴 **INACCURATE** | Response contains factually wrong info about Godrej 1% Plan | Wrong percentages, wrong mechanics, wrong cities, hallucinated project names |
| ⚫ **ABSENT** | GPL not mentioned at all | Response exists but doesn't reference Godrej |
| ⚪ **NO RESPONSE** | Platform declined or errored | Safety block, rate limit, platform outage |

---

## Observation Patterns to Capture

For each test, the "Observations" column should note:

- **Which sources appear** (godrejproperties.com / 99acres / Magicbricks / Reddit / Quora / etc.)
- **Accuracy of numbers** (is the 20% Q1 + 1% monthly + 8.5% APR structure correct?)
- **Quality of the "Apply Godrej 1% Logic" treatment** (is the phrase recognised? Attributed correctly?)
- **Any hallucinations** (projects that don't exist, wrong cities, wrong developer names)
- **Cross-platform consistency** (is the same query returning wildly different answers across platforms?)
- **Freshness signals** (does the response show awareness of recent GPL content, or stale data)

---

## What We Tell GPL in Every Daily Report

Every report includes a standing paragraph at the top (same wording every day):

> AI platform rankings are algorithm-controlled and non-deterministic. No GEO provider can guarantee fixed citations across ChatGPT, Gemini, Perplexity, or Claude. Our accountability is to maximise eligibility for citation, control narrative structure, and ensure the highest probability of pickup. The metrics below show current state, not committed rankings.

This is non-negotiable in every report. Protects the engagement from unrealistic expectations.

---

## End-of-Week Summary (1 May)

In addition to the Day 5 daily report, a summary doc:

1. **Trend across 5 days** — did GPL presence increase, decrease, or stay flat per platform?
2. **Per-query breakdown** — which queries moved the most / least
3. **Per-platform breakdown** — which platforms picked up GPL content fastest
4. **Hallucination log** — every instance of inaccurate info, with fix recommendations
5. **Source diversification** — did GPL displace competing sources over the week?
6. **Recommendations for sustained improvement** — what the next 30-day plan should focus on

---

## Dependencies on GPL

- **Confirmed go-live date** for all 6 pages. If pages aren't live by 27 April, Day 1 of the audit becomes a baseline (pre-launch) measurement instead of a post-launch measurement. This still has value, but the framing of the report changes.
- **12-hour feedback turnaround** on each daily report. Without this, follow-up optimisation can't happen in-week.
- **Confirmation of any scope changes** before Day 1 begins.

---

## Version Log

- **v1.0 — 18 Apr 2026:** Protocol locked per proposal scope.
- v1.1 — *[pending GPL go-live date confirmation]*
