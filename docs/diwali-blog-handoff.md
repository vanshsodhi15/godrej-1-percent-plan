# Diwali Blog: Editorial Review and Ethinos Handoff

Status: draft, not approved for publication. Updated 12 November 2026.

Campaign: **Khushiyon Ki Chaabi, Mera Godrej Ghar**.

Canonical: https://www.godrejproperties.com/blog/khushiyon-ki-chaabi-mera-godrej-ghar

Redirect the previous `/blog/griha-pravesh-during-diwali-auspicious-days-muhurat-rituals` URL permanently to the canonical. The Vercel redirect is configured in `nextjs-app/vercel.json`; Ethinos must configure the equivalent redirect on the production host.

## Content and Implementation

The single blog route follows the supplied brief: summary under Contents, numbered navigation and sections, repeated body title, expandable server-rendered FAQs, tags, share controls, and conditional hero/film/related-project modules. Article, FAQPage and BreadcrumbList JSON-LD are emitted in the head. Seven supplied FAQs remain unchanged. FAQ 7 was updated on 12 November at the user's request to remove unsupported date exclusions and recommend location-specific practitioner guidance. FAQ 1 now follows the business's softer section 1 wording without the premature past-tense date claim; FAQ 4 uses the requested Lakshmi Puja capitalization. One separately added FAQ addresses home enquiries without presenting the sales team as a religious authority.

The loader uses `nextjs-app/src/data/diwali-blog-content.json`, containing only the public-facing article, summary and FAQs. It was generated from the original brief using `node scripts/import-diwali-brief.mjs`; that importer validates the source FAQ text against its schema and rejects private review-note leakage. The private root-level brief is not required in GitHub or Vercel, and must not be uploaded as an asset. Re-import only after approved copy changes; the public content JSON is versioned with the page.

Configure approved values in `nextjs-app/src/data/diwali-blog-publication.json`. The current `draft` state emits `noindex, nofollow` and a visible editorial-review marker. Setting `status` to `approved` with missing approval fields fails the build. Do not remove the indexing safeguard merely to pass a production checklist.

The 11 November update retains the campaign H1, introduces a query-led search title, and adds a bold question/direct answer below each of the six numbered headings. Only section headings 4 and 5 changed. The user-confirmed first-publication date is `2026-11-04`, and the latest substantive content revision date is `2026-11-12`; the approved author remains pending. A writer's byline does not replace a qualified calendar/ritual review. Article, FAQPage (all 11 answers) and BreadcrumbList were verified in the Vercel page head; they were not absent. The exact article Markdown intentionally excludes head markup. The handoff now includes `cms-head.html` for the CMS team; merge it without duplicating existing tags or schema.

No enquiry form was added or overwritten. The draft links to the official GPL homepage enquiry entry point; no project VCC has been repurposed as a brand phone number. After approval, the campaign number appears in the contact section, contact FAQ, tel link and publisher ContactPoint. Approved campaign art and film are intentionally absent rather than replaced with unrelated project images. The existing GPL logo is used for brand identity.

## Required Decisions

- The user selected the campaign-led headline and slug. Confirm the campaign hub URL and its inbound link to this blog.
- Supply the approved still, accurate alt text and intrinsic dimensions, plus the approved film embed URL. The brief's puja alt text must match the actual image; do not apply it to a different scene.
- Assign the real author and profile URL; use `Organization` if the byline is Godrej Properties Limited, not a fictional Person.
- The user confirmed 4 November 2026 as the first-publication date. The current revision date records the substantive 12 November 2026 content changes; update it only for subsequent substantive revisions, not on every build.
- The updated screenshot supersedes the earlier list: 12 projects, comprising 3 MMR, 2 NCR, 4 South Zone, 1 Ahmedabad and 2 Pune. Existing supplied destinations are retained. Altus uses its verified official Ahmedabad landing page; Elaris and Ivara use their verified official Pune project pages. Both section 6 and Related Projects use this list. No prices or eligibility claims were added.
- Confirm the brand/campaign sales telephone number, display format and enquiry destination. The source brief contains no phone number. Confirm existing tag archive URLs before enabling tag links.
- Have a named qualified reviewer verify all calendar dates, ritual claims and regional caveats against location-specific authoritative panchang sources. Record source URLs, location and review dates.
- Approve the additional contact FAQ and contextual read-more sentences. The campaign headline, summary, introduction, section headings, tags and FAQ 7 answer were updated at the user's request. The business's comment revisions are incorporated as recorded below; FAQs 1 and 4 received corresponding wording/capitalization updates.

## Business Comments: 12 November 2026

Read all eight embedded comments by Jhanvi Parikh in the root-level `Content Page_Comments.docx`, including their anchored passages. The document also contains five tracked lowercase-to-uppercase Puja replacements and one inserted concern about section 5 dates. The source Word file is private review material, not a deployable asset.

| Comment ID | Disposition |
|---|---|
| 0 | Applied revised summary. |
| 1 | Applied revised introduction and keyword-led closing paragraph. |
| 2 | Applied section 1 answer and body wording, except the date paragraph: linked to the already sourced section 2 distinctions for 20/21 November instead of restoring an uncited Diwali date or one universal cutoff. Aligned FAQ 1 with the revised answer. |
| 3 | Applied section 2 lead and explanatory paragraphs. Preserved the sourced table requested by the user. Omitted the final sentence promising upcoming housewarming dates because that schedule was withdrawn. |
| 4 | Applied section 3 answer and opening paragraphs. |
| 5 | Applied the warmer handover/Diwali/ceremony sequence introduction and bullet wording. |
| 6 | Applied section 4 wording and capitalization, including corresponding FAQ 4 capitalization. |
| 19 | Applied section 6 wording, retaining the fire-safety qualification. The supplied film description still requires approved asset verification. |

The screenshot and tracked note questioning section 5 dates are addressed by retaining the user's already revised, date-free priest/panchang guidance. The previously revised FAQ 7 is unchanged. Direct comparison against Word comments matched 44 paragraphs, with only the two calendar adaptations documented above. This records implementation of feedback, not final copy/ritual/asset approval or an author byline.

## Editorial Conflicts to Resolve

On 12 November, the unverified section 5 date table and its associated blackout, nakshatra and fallback claims were removed. At the user's request, the subsequent government calendar citation was also removed. Section 5 now advises consulting a priest or qualified panchang practitioner based on location, family traditions and any Vastu considerations the family follows, then confirming local ceremony times and practical home readiness. Its heading no longer promises a date list. No housewarming-date schedule has been reinstated; qualified calendar review remains incomplete. The content revision date is 2026-11-12; the user-confirmed first-publication date remains 2026-11-04.

Section 2 now cites one publisher, Drik Panchang, using four claim-specific pages checked on 12 November 2026 for New Delhi:

- Dev Uthani Ekadashi: https://www.drikpanchang.com/ekadashis/prabodhini/prabodhini-ekadashi-date-time.html?year=2026 lists 20 November, with Gauna/Vaishnava observances on 21 November. This is not a universal housewarming exclusion.
- Dhanu solar transition: https://www.drikpanchang.com/sankranti/sankranti.html?year=2026 lists 16 December at 10:29 a.m. IST.
- Makara solar transition: https://www.drikpanchang.com/sankranti/makar-sankranti-date-time.html?year=2027 distinguishes 14 January at 9:14 p.m. IST from the festival observation on 15 January.
- Adhik Maas calculation rule: https://www.drikpanchang.com/shubh-dates/griha-pravesh-dates-with-muhurat.html?year=2026 explicitly excludes the intercalary lunar month and requires location-based calculation and practitioner consultation. It does not support a blanket Ashada ban or all regional claims in the previous table.

The unsupported historical explanation, dawn-worship generalisation and blanket Ashada rule were removed from section 2. Source verification is not a named religious review or copy approval. FAQ 7 now follows the practitioner-led guidance and no longer repeats fixed avoidance dates or the January-February exclusion. FAQ 1 was subsequently aligned with the business's softer answer, removing the premature past-tense claim. Ritual advice still requires review before indexed publication.

1. The premature claim that Chaturmas "ended" on 20 November 2026 is now removed from section 1 and FAQ 1. The user-confirmed first-publication date is unchanged; do not backdate later edits.
2. The section 5 table has been removed, section 2 now has scoped calendar references, and FAQs 1/7 no longer state unsupported avoidance dates. The calendar interpretations and their applicability to family traditions still require a named qualified reviewer.
3. The remaining ritual sequence and regional advice require review. Do not present one tradition as universal.
4. The campaign-led introduction does not answer six questions within the first 150 words. Do not assert that this original brief requirement is met.
5. The concluding reference to the campaign film cannot be verified without the approved film. Retain only after campaign review.
6. Generalize safety-sensitive advice only with editorial approval: any flame, milk-boiling or balcony ritual must comply with building fire rules. Possession/registration timing remains subject to legal readiness and practical availability, not festival auspiciousness.

The research figures and competitors are planning context, not independently verified public claims. They are excluded from the article. Schema and a verified contact number can support accurate retrieval; they cannot guarantee citations or a phone-number mention.

## Links and CMS Publication

The draft includes the four contextual outbound blog links requested in the brief. Before release, verify each live destination and insert the following reciprocal sentence in the four existing articles below (requires CMS/Ethinos access):

> Celebrate your first Diwali in a new home with Khushiyon Ki Chaabi, Mera Godrej Ghar, covering key handover, family traditions and planning your homecoming.

Link `Khushiyon Ki Chaabi, Mera Godrej Ghar` to the canonical above.

- `/blog/griha-pravesh-muhurat-best-dates-and-timings`
- `/blog/explore-property-purchase-muhurat-for-your-new-home`
- `/blog/griha-pravesh-decoration-ideas`
- `/blog/why-is-buying-a-flat-considered-to-be-auspicious-on-diwali`

Also link from the blog index, approved tag archives and campaign hub. Project links go directly to the approved project pages. The existing Diwali-purchase article's discount text is a separate editorial review item, not permission to change unrelated production content.

After all approvals, set status to `approved`, run `DIWALI_PUBLISH_TARGET=production npm run build` outside Vercel, and validate the exported HTML. An unapproved production build fails; default builds and Vercel always remain noindex. Ensure one canonical without trailing slash, exactly one H1, approved publication data, matching FAQ/schema, and no placeholder or draft metadata. Test desktop/mobile, all assets and controls, raw HTML with JavaScript disabled, phone links and the destination enquiry flow. Use Schema.org Validator; Google's Rich Results Test evaluates only supported rich features and does not guarantee FAQ display or AI citation.

The legacy payment-plan packagers are unchanged. A dedicated postbuild step, `scripts/package-diwali-blog.mjs`, generates `Deliverables_Diwali/site-root/blog/khushiyon-ki-chaabi-mera-godrej-ghar/index.html` and a route-scoped `assets/` directory. It preserves the rendered content, CSS and JSON-LD, removes the Next.js runtime, and supplies standalone FAQ/share controls. No Node.js or build step is needed on the deployment server. The package also includes the exact article Markdown, deployment README and file/checksum manifest. No unrelated assets, private brief, credentials, unapproved hero or film are included. The package is marked review-only while the page is a draft.

Upload only the route folder inside `site-root` to the matching production path. Internally map the extensionless canonical URL to its `index.html`; redirect duplicate slash/index.html variants and the old slug to the canonical. Do not upload the handoff documents or modify shared `_next`/assets directories. If the existing CMS owns the route, Ethinos must add a route mapping or integrate the article/head metadata into its existing template, retaining lead-generation, consent, analytics and tag modules. The standalone page does not include those site-wide integrations. The ZIP is suitable for technical staging, not an approved indexed launch until the listed content/asset approvals are resolved.

On publication: add the canonical to the existing sitemap with a truthful lastmod, verify crawl/WAF access and production `index, follow`, confirm reciprocal links, inspect/request indexing in authorized Search Console access, and record the selected canonical. Keep Vercel previews protected or noindexed independently of the approved production artifact. There is no separate documented Claude webmaster URL-submission step.

Require written post-launch confirmation from Rahul/the publishing team: final URL, check date, HTTP 200, actual robots meta, X-Robots-Tag header (or its absence), self-canonical, main blog/category listing, XML sitemap entry and Search Console indexing-request status. Inspect the deployed HTML and HTTP headers, not only the CMS settings or visual page. A noindex directive blocks search indexing; its effect on individual AI retrieval systems varies, and removing it does not guarantee citations.

Refresh annually and on approved calendar corrections. Archive source evidence and update actual visible/structured modification dates together. Report preview, artifact validation, production publication and indexing as separate outcomes.