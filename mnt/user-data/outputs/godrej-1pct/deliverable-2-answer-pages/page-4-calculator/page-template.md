# Page 4 — 1% Plan Calculator

**Target URL:** `https://www.godrejproperties.com/the-1-percent-plan/calculator`
**Target user query:** "Godrej 1% plan calculator"
**Word count:** ~500 words (content around the tool)
**Deadline:** 24 April 2026
**Status:** Template v1.0 — awaiting GPL data
**Scope split:**
- **We deliver:** Calculation logic, formulas, copy, validation rules, project-mapping dataset
- **GPL tech delivers:** UI/UX design, front-end build, deployment, publishing

---

## Critical Upfront — Sign-Off Requirement

**This page is a financial tool.** Outputs directly inform home-purchase decisions. It cannot ship without **written sign-off from GPL legal + finance teams** on:

1. The calculation formula itself
2. Every assumption baked in (APR treatment, timing definitions, etc.)
3. The disclaimer language
4. Whether the outputs are indicative or binding

**Deliverable to GPL:** An approval document with every formula, assumption, and disclaimer spelled out. GPL signs it. Only then does calculator copy go into the template.

---

## H1

> Godrej 1% Plan Calculator: Estimate your monthly payments and milestones

---

## Meta Description

> Calculate your 1% Plan payment schedule. Enter city and budget, get Q1 amount, monthly 1%, OC timeline, and matching Godrej projects.

---

## Intro Content (Above the Tool)

> The Godrej 1% Plan Calculator gives buyers an indicative payment breakdown across all stages: initial Q1 payment, monthly 1%, construction-milestone tranches, and the balance due at OC. Enter your target city and budget below to see your estimated schedule, along with Godrej projects matching your criteria.

---

## Calculator — Inputs

### Input 1: City (Dropdown)

Options (sourced from live page, 10 cities):
- Mumbai
- Pune
- Bengaluru
- Gurugram
- Noida
- Delhi
- Hyderabad
- Chennai
- Kolkata
- Panipat

**Validation rules:**
- Required field
- Single-select
- Default: blank (no pre-selection) — forces user intent

### Input 2: Budget (₹)

**Validation rules:**
- Required field
- Numeric input only
- `[GPL_DATA: Minimum budget — city-specific minimum ticket size under the 1% Plan. Suggested starting point, to be confirmed: ₹50 lakh]`
- `[GPL_DATA: Maximum budget — what does GPL want to cap? Or unlimited with a "Contact us for premium projects" message above a threshold?]`
- Show in lakh/crore denominations with real-time formatting (e.g., "1,50,00,000 → ₹1.5 Cr")

**What GPL needs to provide:**
- `[GPL_DATA: City-wise minimum ticket sizes — required to validate budget input per city]`
- `[GPL_DATA: Any caps or thresholds above which we show "Contact sales" instead of calculator output]`

---

## Calculator — Outputs

### Output 1: Q1 Amount

Formula (to be confirmed):
```
Q1_amount = Budget × 20%
```

**What GPL needs to provide:**
- `[GPL_DATA: Confirm formula — is the 20% computed on Budget (Agreement Value) or on Agreement Value + other charges?]`
- `[GPL_DATA: How is Q1 payment spread? Show as a single amount or split further (booking / AFS / end of Q1)?]`

Display format:
> **Q1 Payment:** ₹X lakh
> Paid across Q1 (first quarter after booking). `[GPL_DATA: Specific split detail]`

### Output 2: Monthly 1% Amount

Formula (to be confirmed):
```
Monthly_amount = Budget × 1%
```

**What GPL needs to provide:**
- `[GPL_DATA: Confirm formula — 1% of Agreement Value fixed, or 1% of outstanding balance (decreasing)?]`
- `[GPL_DATA: Duration — how many months is the monthly 1% paid for? Depends on OC timeline per project]`

Display format:
> **Monthly payment:** ₹X (1% of Agreement Value)
> Paid monthly starting after Q1, until the first construction-milestone tranche.

### Output 3: OC Timeline

Formula: **Pulled from project database per city**, not calculated.

**What GPL needs to provide (CRITICAL DATASET):**
- `[GPL_DATA: Project-to-OC-timeline mapping for every project under the 1% Plan]`

Data structure expected:

| Project ID | Project Name | City | Expected OC Date | Status |
|---|---|---|---|---|
| GP-MUM-001 | Godrej Horizon | Mumbai | YYYY-MM | Under construction |
| GP-MUM-002 | Godrej Nurture | Mumbai | YYYY-MM | Ready / OC received |
| ... | ... | ... | ... | ... |

Display format:
> **Possession expected:** YYYY onwards, depending on selected project.

### Output 4: Matching Project Options

Logic: Filter the projects-master dataset by `(city == selected_city) AND (starting_price ≤ budget)`.

Display format:
> **Projects matching your criteria:**
> - Godrej Horizon, Wadala West — starting from ₹X
> - Godrej Nurture, Bhandup West — starting from ₹X
> *(showing top 5 matches)*

**What GPL needs to provide:**
- `[GPL_DATA: Project-to-starting-price mapping — per project, lowest indicative Agreement Value under the 1% Plan]`
- `[GPL_DATA: Sort order preference — lowest price first? Newest launch first? Most available inventory first?]`
- `[GPL_DATA: How to handle "no matches" case — show closest higher-priced options, or show "contact us" message?]`

---

## Disclaimer Block (Shown Directly Below Outputs)

**Critical for legal cover. Draft language:**

> *These figures are indicative and for illustration only. Actual amounts, schedules, and charges are governed by the Agreement for Sale (AFS) executed between buyer and developer. Stamp Duty, Registration Charges, GST, and other applicable charges are over and above the Agreement Value. The Annualised Percentage Rate (APR) of 8.5% is built into the plan and disclosed upfront in the AFS. Buyers should consult the project-specific AFS for binding terms.*

**What GPL needs to provide:**
- `[GPL_DATA: Exact disclaimer language approved by legal — the version above is draft]`
- `[GPL_DATA: Should there be a checkbox user acknowledgment before outputs are displayed? e.g., "I understand these are indicative only"]`

---

## Content Below the Tool

### "How to read your calculator results"

A short (150-word) explanation section helping users interpret the outputs. This section has high LLM-retrieval value because it explains the calculator's outputs in plain English — LLMs use it to respond to queries like "How much monthly for a ₹1Cr Godrej home?"

Structure:
- Paragraph 1: Q1 explanation (2-3 sentences)
- Paragraph 2: Monthly 1% explanation (2-3 sentences)
- Paragraph 3: Construction tranches and OC balance note (what's NOT shown in the calculator but still matters)

**Why this section matters:** If a user asks ChatGPT "how much monthly for ₹1Cr Godrej home?", ChatGPT can't interact with the calculator — but it CAN extract the explanation text and compute the answer itself. This section makes the page AI-computable, not just user-computable.

### FAQ Section (FAQPage schema)

### Q: How accurate is the calculator?
A: The calculator provides indicative estimates. Actual amounts and schedules are finalised in the Agreement for Sale. `[GPL_DATA: GPL-approved language]`

### Q: Does the calculator include stamp duty and GST?
A: No. The calculator shows Agreement Value-based payments only. Stamp Duty, Registration Charges, GST, and other charges are additional, as per Godrej's standard disclaimer.

### Q: Can I use the calculator for any Godrej project?
A: The calculator covers projects published under the 1% Plan on godrejproperties.com/the-1-percent-plan. `[GPL_DATA: Confirm]`

### Q: Is the APR of 8.5% reflected in the calculator output?
A: `[GPL_DATA: Critical answer — is APR visible in outputs or implicit in the structure?]`

### Q: Can I save or download my calculation?
A: `[GPL_DATA: Technical capability — tech team to confirm]`

### Q: Who do I contact after using the calculator?
A: For next steps on any matching project, reach marketing@godrejproperties.com or use the Enquire Now option on the project page. `[GPL_DATA: Dedicated 1% Plan contact if exists]`

---

## Deliverable to GPL Tech Team

We ship a self-contained spec document containing:

1. **Input schema** — types, validation rules, defaults
2. **Output schema** — what fields display, formatting conventions
3. **Calculation formulas** — GPL-approved, with every assumption named
4. **Project dataset** (CSV or JSON) — populated with GPL-provided data, ready for ingest
5. **Disclaimer text** — final legal-approved version
6. **Copy blocks** — intro, output labels, FAQ, "how to read" section
7. **Edge case handling** — no-match scenarios, input validation errors, loading states
8. **Schema.org markup** — Article + FAQPage + SoftwareApplication schemas

GPL tech team is responsible for:
- UI/UX design
- Front-end implementation (form, outputs, responsive layout)
- Back-end logic implementation of the formulas
- Integration with the project dataset
- Deployment under /the-1-percent-plan/calculator
- Testing and QA
- Post-launch monitoring

---

## Version Log

- **v1.0 — 18 Apr 2026:** Input/output structure, formula placeholders, disclaimer draft in place.
- v1.1 — *[pending GPL calculation logic sign-off]*
- v1.2 — *[pending project dataset population]*
- v2.0 — *[final spec handed to GPL tech team]*

---

## Escalation Note

If GPL cannot sign off on calculator logic by **Wednesday 22 April**, we should flag to the account lead that Page 4 delivery will shift past 24 April. Publishing a calculator with unconfirmed formulas creates real consumer-protection risk — we do not proceed without explicit legal + finance sign-off.
