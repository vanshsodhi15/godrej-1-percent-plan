# Diwali Blog: Editorial Review and Ethinos Handoff

Status: draft, not approved for publication. Prepared 10 November 2026.

Campaign: **Khushiyon Ki Chaabi, Mera Godrej Ghar**.

Canonical: https://www.godrejproperties.com/blog/khushiyon-ki-chaabi-mera-godrej-ghar

Redirect the previous `/blog/griha-pravesh-during-diwali-auspicious-days-muhurat-rituals` URL permanently to the canonical. The Vercel redirect is configured in `nextjs-app/vercel.json`; Ethinos must configure the equivalent redirect on the production host.

## Content and Implementation

The single blog route follows the supplied brief: summary under Contents, numbered navigation and sections, repeated body title, expandable server-rendered FAQs, tags, share controls, and conditional hero/film/related-project modules. Article, FAQPage and BreadcrumbList JSON-LD are emitted in the head. All ten supplied FAQs remain unchanged; one separately added FAQ addresses home enquiries without presenting the sales team as a religious authority.

The loader uses `nextjs-app/src/data/diwali-blog-content.json`, containing only the public-facing article, summary and FAQs. It was generated from the original brief using `node scripts/import-diwali-brief.mjs`; that importer validates the source FAQ text against its schema and rejects private review-note leakage. The private root-level brief is not required in GitHub or Vercel, and must not be uploaded as an asset. Re-import only after approved copy changes; the public content JSON is versioned with the page.

Configure approved values in `nextjs-app/src/data/diwali-blog-publication.json`. The current `draft` state emits `noindex, nofollow` and a visible editorial-review marker. Setting `status` to `approved` with missing approval fields fails the build. Do not remove the indexing safeguard merely to pass a production checklist.

No enquiry form was added or overwritten. The draft links to the official GPL homepage enquiry entry point; no project VCC has been repurposed as a brand phone number. After approval, the campaign number appears in the contact section, contact FAQ, tel link and publisher ContactPoint. Approved campaign art and film are intentionally absent rather than replaced with unrelated project images. The existing GPL logo is used for brand identity.

## Required Decisions

- The user selected the campaign-led headline and slug. Confirm the campaign hub URL and its inbound link to this blog.
- Supply the approved still, accurate alt text and intrinsic dimensions, plus the approved film embed URL. The brief's puja alt text must match the actual image; do not apply it to a different scene.
- Assign the real author and profile URL; use `Organization` if the byline is Godrej Properties Limited, not a fictional Person.
- Supply true publication and updated dates. Do not use build timestamps as editorial dates.
- The updated screenshot supersedes the earlier list: 12 projects, comprising 3 MMR, 2 NCR, 4 South Zone, 1 Ahmedabad and 2 Pune. Existing supplied destinations are retained. Altus uses its verified official Ahmedabad landing page; Elaris and Ivara use their verified official Pune project pages. Both section 6 and Related Projects use this list. No prices or eligibility claims were added.
- Confirm the brand/campaign sales telephone number, display format and enquiry destination. The source brief contains no phone number. Confirm existing tag archive URLs before enabling tag links.
- Have a named qualified reviewer verify all calendar dates, ritual claims and regional caveats against location-specific authoritative panchang sources. Record source URLs, location and review dates.
- Approve the additional contact FAQ and contextual read-more sentences. The campaign headline, summary, introduction, section headings and tags were updated at the user's request; the ten supplied FAQ questions and answers remain unchanged.

## Editorial Conflicts to Resolve

1. Today is 10 November 2026. The supplied copy says Chaturmas "ended" on 20 November 2026. Either approve a future-tense correction throughout the article/FAQs or choose a genuinely later publication date; do not backdate the page.
2. The November table lists 11 and 14 November before the stated end of Chaturmas. The December/January rows also include dates within the stated avoidance window. The draft preserves the supplied caveats, but the calendar reviewer must distinguish calculation criteria from applicable family practice explicitly.
3. The general avoidance of Tuesdays/Saturdays and certain tithis, the suggested universal Abhijit fallback, the January-February blackout, and the ritual sequence require review. Do not present one tradition as universal or label the entire table auspicious for every city/family.
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

After all approvals, set status to `approved`, rebuild, and validate the exported HTML. Ensure one canonical without trailing slash, exactly one H1, approved publication data, matching FAQ/schema, and no placeholder or draft metadata. Test desktop/mobile, all assets and controls, raw HTML with JavaScript disabled, phone links and the destination enquiry flow. Use Schema.org Validator; Google's Rich Results Test evaluates only supported rich features and does not guarantee FAQ display or AI citation.

The legacy payment-plan packagers are unchanged. A dedicated postbuild step, `scripts/package-diwali-blog.mjs`, generates `Deliverables_Diwali/site-root/blog/khushiyon-ki-chaabi-mera-godrej-ghar/index.html` and a route-scoped `assets/` directory. It preserves the rendered content, CSS and JSON-LD, removes the Next.js runtime, and supplies standalone FAQ/share controls. No Node.js or build step is needed on the deployment server. The package also includes the exact article Markdown, deployment README and file/checksum manifest. No unrelated assets, private brief, credentials, unapproved hero or film are included. The package is marked review-only while the page is a draft.

Upload only the route folder inside `site-root` to the matching production path. Internally map the extensionless canonical URL to its `index.html`; redirect duplicate slash/index.html variants and the old slug to the canonical. Do not upload the handoff documents or modify shared `_next`/assets directories. If the existing CMS owns the route, Ethinos must add a route mapping or integrate the article/head metadata into its existing template, retaining lead-generation, consent, analytics and tag modules. The standalone page does not include those site-wide integrations. The ZIP is suitable for technical staging, not an approved indexed launch until the listed content/asset approvals are resolved.

On publication: add the canonical to the existing sitemap with a truthful lastmod, verify crawl/WAF access and production `index, follow`, confirm reciprocal links, inspect/request indexing in authorized Search Console access, and record the selected canonical. Keep Vercel previews protected or noindexed independently of the approved production artifact. There is no separate documented Claude webmaster URL-submission step.

Refresh annually and on approved calendar corrections. Archive source evidence and update actual visible/structured modification dates together. Report preview, artifact validation, production publication and indexing as separate outcomes.