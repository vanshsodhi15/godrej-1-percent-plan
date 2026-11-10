import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'griha-pravesh-during-diwali-auspicious-days-muhurat-rituals';
const output = path.join(root, 'out');
const destination = path.join(root, 'Deliverables_Diwali');
const page = `blog/${slug}.html`;
const publication = JSON.parse(await fs.readFile(path.join(root, 'src/data/diwali-blog-publication.json'), 'utf8'));
const html = await fs.readFile(path.join(output, page), 'utf8');
for (const forbidden of ['[CONFIRM]', 'Inner Labs', '584 non-branded', 'COPILOT BUILD BRIEF', 'Inline link:']) {
  assert.ok(!html.includes(forbidden), `Private instruction leaked: ${forbidden}`);
}
assert.ok(html.includes('application/ld+json'), 'Missing structured data');
if (publication.status === 'draft') assert.ok(html.includes('noindex, nofollow'), 'Draft must remain non-indexable');
await fs.rm(destination, { recursive: true, force: true });
await fs.mkdir(path.join(destination, 'blog'), { recursive: true });
await fs.copyFile(path.join(output, page), path.join(destination, page));
await Promise.all(['_next', 'assets_diwali'].map(directory =>
  fs.cp(path.join(output, directory), path.join(destination, directory), { recursive: true })
));
await fs.mkdir(path.join(destination, 'assets'), { recursive: true });
await fs.copyFile(path.join(output, 'assets/inter-var-latin.woff2'), path.join(destination, 'assets/inter-var-latin.woff2'));
await fs.copyFile(path.join(output, 'favicon.ico'), path.join(destination, 'favicon.ico'));
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
  mapping: { [page]: `/blog/${slug}`, assets_diwali: '/assets_diwali/', _next: '/_next/', assets: '/assets/' },
  instructions: 'For review, serve the package root with extensionless HTML support. For the GPL CMS, integrate article/schema into the existing blog shell and preserve forms, consent and analytics. Do not overwrite a live shared _next directory with this package.',
  files: await fileManifest(destination),
};
await fs.writeFile(path.join(destination, 'release-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Diwali blog packaged: ${manifest.files.length} files; ${manifest.status}.`);