import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import domino from '@mixmark-io/domino';
import './export-diwali-content-review.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'khushiyon-ki-chaabi-mera-godrej-ghar';
const output = path.join(root, 'out');
const destination = path.join(root, 'Deliverables_Diwali');
const route = `/blog/${slug}`;
const page = `site-root${route}/index.html`;
const publication = JSON.parse(await fs.readFile(path.join(root, 'src/data/diwali-blog-publication.json'), 'utf8'));
const html = await fs.readFile(path.join(output, `blog/${slug}.html`), 'utf8');
for (const forbidden of ['[CONFIRM]', 'Inner Labs', '584 non-branded', 'COPILOT BUILD BRIEF', 'Inline link:']) {
  assert.ok(!html.includes(forbidden), `Private instruction leaked: ${forbidden}`);
}
assert.ok(html.includes('application/ld+json'), 'Missing structured data');
if (publication.status === 'draft') assert.ok(html.includes('noindex, nofollow'), 'Draft must remain non-indexable');
await fs.rm(destination, { recursive: true, force: true });
await fs.mkdir(path.dirname(path.join(destination, page)), { recursive: true });
const copiedAssets = new Map();
async function copyAsset(reference) {
  const url = new URL(reference, 'https://www.godrejproperties.com');
  const relative = url.pathname.slice(1);
  const publicPath = `${route}/assets/${relative}`;
  if (!copiedAssets.has(relative)) {
    copiedAssets.set(relative, publicPath);
    const target = path.join(destination, 'site-root', publicPath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    if (relative.endsWith('.css')) {
      let css = await fs.readFile(path.join(output, relative), 'utf8');
      for (const match of [...css.matchAll(/url\(\s*(['"]?)([^'"\s)]+)\1\s*\)/g)]) {
        const resource = match[2];
        if (/^(data:|https?:|\/\/|#)/.test(resource)) continue;
        const asset = new URL(resource, url);
        css = css.replace(match[0], `url("${await copyAsset(asset.pathname + asset.search + asset.hash)}")`);
      }
      await fs.writeFile(target, css);
    } else await fs.copyFile(path.join(output, relative), target);
  }
  return publicPath + url.search + url.hash;
}
const document = domino.createDocument(html);
document.querySelectorAll('script:not([type="application/ld+json"]), link[as="script"], link[rel="modulepreload"]').forEach(element => element.remove());
for (const element of document.querySelectorAll('link[href], img[src], source[src]')) {
  const attribute = element.hasAttribute('href') ? 'href' : 'src';
  const reference = element.getAttribute(attribute);
  if (reference.startsWith('/') && !reference.startsWith('//')) element.setAttribute(attribute, await copyAsset(reference));
}
const script = document.createElement('script');
script.src = `${route}/assets/article.js`;
script.defer = true;
document.body.appendChild(script);
await fs.copyFile(path.join(root, 'scripts/diwali-static.js'), path.join(destination, `site-root${route}/assets/article.js`));
await fs.writeFile(path.join(destination, page), '<!DOCTYPE html>\n' + document.documentElement.outerHTML);
await fs.copyFile(path.join(root, '..', 'Godrej_Diwali_Blog_Content_Review.md'), path.join(destination, 'article.md'));
await fs.writeFile(path.join(destination, 'README.md'), `# Khushiyon Ki Chaabi, Mera Godrej Ghar

## Release status

${publication.status === 'draft' ? 'STAGING / REVIEW ONLY. This artifact retains noindex, nofollow and the editorial-review banner. It is not approved for an indexed production launch.' : 'Content approved; deployment checks and production owner sign-off are still required.'}

## Upload mapping

- Final URL: https://www.godrejproperties.com${route}
- Upload the entire site-root${route}/ folder to the matching /blog/${slug}/ directory on the web server or CDN.
- Serve index.html with HTTP 200 at the exact extensionless URL ${route} using an internal rewrite. Serve the assets/ subdirectory unchanged. No Node.js, npm, React or build step is needed on the server.
- Redirect the trailing-slash and /index.html variants to ${route}; ensure the internal rewrite does not create a redirect loop.
- Add a permanent HTTP 301/308 redirect from /blog/griha-pravesh-during-diwali-auspicious-days-muhurat-rituals to ${route}.
- All assets are scoped below ${route}/assets/. Do not upload anything into the live site's shared /_next or /assets folders, and do not replace its favicon, robots.txt or sitemap.
- README.md, article.md and release-manifest.json are handoff documents; do not upload them to the public site.

## Existing CMS / application

If the existing application owns /blog routes, the tech team must configure the route/rewrite or integrate the article and head metadata/schema into its existing template. File upload alone cannot override an application route. Preserve the site's consent, analytics, lead forms and routing. This standalone page has an enquiry link, not a lead-capture form or analytics integration.

## Assets and content

Included: HTML, CSS, local fonts, GPL logo, favicon, FAQ/share JavaScript, Article/FAQPage/BreadcrumbList JSON-LD, and the complete article.md exported from the rendered article. All 12 project destinations are retained. The approved hero image and campaign film have not been supplied and are not included.

## Approval before public launch

The current source requires approved copy and location-specific calendar/ritual review, campaign hero/film, author and real publication/update dates, campaign hub, tag destinations, sales contact and asset/contact sign-offs. Resolve these in the publication settings and regenerate the package before indexed release. The supplied copy also describes 20 November 2026 as past and contains calendar-window conflicts; these need editorial resolution. Do not remove noindex or the review banner as a substitute for approval.

## Deployment acceptance

1. Back up the current route and redirect configuration for rollback.
2. Verify the exact URL returns 200, every local asset returns 200 with the correct MIME type, and old/duplicate URLs redirect once to the new route.
3. Check one H1, the canonical and og:url, all three JSON-LD blocks, all 11 FAQ answers, both sets of 12 project links, contents navigation, sharing and the enquiry destination on desktop and mobile.
4. On approved production release only, verify index, follow, no preview X-Robots-Tag, add the URL to the existing sitemap and link from the blog index/campaign hub. Keep Vercel review previews noindexed.
5. Confirm the production URL and release checksum to the requester. On failure, restore the previous route/configuration and remove only this release's isolated folder.

The SHA-256 values in release-manifest.json cover the included deployment files and handoff documents. Actual GPL production hosting, CMS integration and indexing are not verified by this package.
`);
async function fileManifest(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const records = await Promise.all(entries.map(async entry => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return fileManifest(filename);
    const data = await fs.readFile(filename);
    return [{ path: path.relative(destination, filename).split(path.sep).join('/'), bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') }];
  }));
  return records.flat();
}
const manifest = {
  status: publication.status === 'draft' ? 'review-only-not-for-production' : 'approved-content-needs-deployment-validation',
  canonical: `https://www.godrejproperties.com/blog/${slug}`,
  page,
  mapping: { [page]: route, [`site-root${route}/assets/`]: `${route}/assets/` },
  redirect: { from: '/blog/griha-pravesh-during-diwali-auspicious-days-muhurat-rituals', to: route, status: 301 },
  instructions: 'Upload only the route folder inside site-root; serve index.html at the extensionless URL. All assets are route-scoped. See README.md for CMS integration, approvals and rollback.',
  files: await fileManifest(destination),
};
await fs.writeFile(path.join(destination, 'release-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Diwali blog packaged: ${manifest.files.length} files; ${manifest.status}.`);