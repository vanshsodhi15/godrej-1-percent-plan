import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import domino from '@mixmark-io/domino';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const read = filename => fs.readFileSync(path.join(root, filename), 'utf8');
const settings = JSON.parse(read('src/data/diwali-blog-publication.json'));
const content = JSON.parse(read('src/data/diwali-blog-content.json'));
function evaluate(filename, dependencies, environment = {}) {
  const compiled = ts.transpileModule(read(filename), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const loadedModule = { exports: {} };
  const resolve = name => Object.hasOwn(dependencies, name) ? dependencies[name] : require(name);
  new Function('require', 'module', 'exports', 'process', compiled)(resolve, loadedModule, loadedModule.exports, { env: environment });
  return loadedModule.exports;
}
const metadata = evaluate('src/data/diwali-blog-metadata.ts', {});
function load(publication, environment = {}) {
  return evaluate('src/lib/diwali-blog.ts', {
    '../data/diwali-blog-publication.json': publication,
    '../data/diwali-blog-content.json': content,
    '../data/diwali-blog-metadata': metadata,
  }, environment).loadDiwaliBlog();
}
const approved = {
  ...settings, status: 'approved', campaignHubUrl: 'https://example.com/campaign',
  author: { name: 'Test Author', type: 'Person', url: 'https://example.com/author' },
  datePublished: '2020-01-01', dateModified: '2020-01-02',
  hero: { url: 'https://example.com/hero.jpg', alt: 'Test', width: 100, height: 100 },
  filmEmbedUrl: 'https://www.youtube-nocookie.com/embed/test',
  salesPhone: '+12025550123', salesPhoneDisplay: '+1 202 555 0123',
  approvedTags: [{ name: 'Test', url: 'https://example.com/tag' }],
  calendarSources: [{ name: 'Test', url: 'https://example.com/calendar', location: 'Test', checkedOn: '2020-01-01' }],
  calendarReviewer: 'Test Reviewer', copyApproved: true, campaignAssetsApproved: true, contactApproved: true,
};
const draft = { ...approved, status: 'draft' };
assert.equal(load(draft).indexable, false);
assert.throws(() => load(draft, { DIWALI_PUBLISH_TARGET: 'production' }), /requires completed publication approvals/);
assert.equal(load(approved).indexable, false);
assert.equal(load(approved, { DIWALI_PUBLISH_TARGET: 'production' }).indexable, true);
assert.equal(load(approved, { DIWALI_PUBLISH_TARGET: 'production', VERCEL: '1' }).indexable, false);

const blog = load(settings, process.env);
const schemas = blog.schemas.map(JSON.parse);
const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
assert.equal(articleSchema.author?.name, settings.author?.name);
assert.equal(articleSchema.datePublished, settings.datePublished ?? undefined);
assert.equal(articleSchema.dateModified, settings.dateModified ?? undefined);
const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
assert.equal(faqSchema.mainEntity.length, 11);
const route = `/blog/${metadata.blogSlug}`;
const original = domino.createDocument(read(`out${route}.html`));
const packaged = domino.createDocument(read(`Deliverables_Diwali/site-root${route}/index.html`));
const cmsHead = domino.createDocument(read('Deliverables_Diwali/cms-head.html'));
const expectedRobots = blog.indexable ? 'index, follow' : 'noindex, nofollow';
for (const document of [original, packaged, cmsHead]) {
  assert.equal(document.title, metadata.metaTitle);
  assert.equal(document.querySelector('link[rel="canonical"]').href, metadata.blogUrl);
  assert.equal(document.querySelector('meta[name="robots"]').content, expectedRobots);
  assert.deepEqual([...document.querySelectorAll('script[type="application/ld+json"]')].map(element => JSON.parse(element.textContent)), schemas);
}
assert.equal(packaged.querySelector('article').textContent, original.querySelector('article').textContent);
assert.equal(original.querySelector('h1').textContent, metadata.blogTitle);
assert.equal(original.querySelectorAll('#related-projects a').length, 12);
assert.equal(original.querySelectorAll('#section-6 a[href*="/residential/"]').length, 12);
const markdown = read('../Godrej_Diwali_Blog_Content_Review.md');
assert.equal(read('Deliverables_Diwali/article.md'), markdown);
const calendarSection = original.getElementById('section-5');
assert.equal(calendarSection.querySelectorAll('table').length, 0);
assert.equal(calendarSection.querySelectorAll('a[href^="http"]').length, 0);
assert.ok(calendarSection.textContent.includes('Ask your priest or a qualified panchang practitioner'));
assert.ok(calendarSection.textContent.includes('based on your location, family traditions and any Vastu considerations you follow'));
assert.ok(!calendarSection.textContent.includes('standard panchang calculations for New Delhi'));
assert.ok(!original.querySelector('article').textContent.includes('Rashtriya Panchang'));
assert.ok(!markdown.includes('mausam.imd.gov.in'));
assert.ok(!markdown.includes('| November 2026 | 11, 14, 20, 21, 25, 26 |'));
const avoidanceSection = original.getElementById('section-2');
assert.equal(avoidanceSection.querySelectorAll('tbody tr').length, 3);
const avoidanceSources = Array.from(avoidanceSection.querySelectorAll('a[href^="https://www.drikpanchang.com/"]'));
assert.equal(avoidanceSources.length, 4);
for (const source of avoidanceSources) {
  assert.ok(new URL(source.href).searchParams.has('year'));
  assert.ok(markdown.includes(source.href));
}
assert.ok(avoidanceSection.textContent.includes('14 January 2027 at 9:14 p.m.'));
assert.ok(avoidanceSection.textContent.includes('observed on 15 January'));
assert.ok(!avoidanceSection.textContent.includes('Many Telugu, Tamil and North Indian families'));
for (const section of content.sections.filter(section => section.title)) {
  const element = original.getElementById(section.id);
  assert.equal(element.querySelector('h2').textContent, section.title);
  assert.equal(element.querySelector('p strong').textContent, section.question);
  assert.equal(element.querySelectorAll('p')[1].textContent, section.answer);
  assert.ok(markdown.includes(`**${section.question}**`));
  assert.ok(markdown.includes(section.answer));
  assert.ok(!element.textContent.includes('Short answer:'));
}
for (const [index, element] of [...original.querySelectorAll('#faqs details')].entries()) {
  assert.equal(element.querySelector('summary').textContent, faqSchema.mainEntity[index].name);
  assert.equal(element.querySelector('p').textContent, faqSchema.mainEntity[index].acceptedAnswer.text);
}
console.log('Diwali validation passed: production/preview indexing, six answer leads, author/date integrity, schema parity, exact Markdown and isolated package.');