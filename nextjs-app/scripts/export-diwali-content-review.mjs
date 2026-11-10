import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'griha-pravesh-during-diwali-auspicious-days-muhurat-rituals';
const buildId = (await fs.readFile(path.join(root, '.next/BUILD_ID'), 'utf8')).trim();
const data = JSON.parse(await fs.readFile(path.join(root, 'out/_next/data', buildId, 'blog', `${slug}.json`), 'utf8'));
const blog = data.pageProps.blog;
const article = JSON.parse(blog.schemas[0]);
assert.equal(blog.projects.length, 12, 'Expected the current twelve-project campaign');
assert.equal(blog.faqs.length, 11, 'Expected the ten source FAQs and contact FAQ');
const converter = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
converter.use(gfm);
const lines = [
  '# ' + article.headline,
  '',
  '**' + blog.campaignName + '**',
  '',
  'Home Buying Guide',
  '',
  blog.author ? `by [${blog.author.name}](${blog.author.url})` : 'Godrej Properties',
  '',
];
if (blog.datePublished) lines.push('Published: ' + blog.datePublished, '');
if (blog.dateModified) lines.push('Updated: ' + blog.dateModified, '');
if (blog.hero) lines.push(`![${blog.hero.alt}](${blog.hero.url})`, '');
lines.push('### Contents', '', blog.summary, '');
for (const section of blog.sections.filter(section => section.title)) {
  lines.push(`${section.title.split('.')[0]}. [${section.title.replace(/^\d+\.\s*/, '')}](#${section.id})`);
}
lines.push('7. [Frequently Asked Questions](#faqs)');
for (const faq of blog.faqs) lines.push(`   - [${faq.question}](#${faq.id})`);
lines.push('', '## ' + article.headline, '');
for (const section of blog.sections) {
  lines.push(`<a id="${section.id}"></a>`, '');
  if (section.title) lines.push('## ' + section.title, '');
  lines.push(converter.turndown(section.html), '');
  if (section.id === 'section-6' && blog.filmEmbedUrl) lines.push(`[${blog.campaignName} campaign film](${blog.filmEmbedUrl})`, '');
}
lines.push('<a id="faqs"></a>', '', '## 7. Frequently Asked Questions', '');
for (const faq of blog.faqs) lines.push(`<a id="${faq.id}"></a>`, '', '### ' + faq.question, '', faq.answer, '');
lines.push('**' + blog.campaignName + '**', '', '## A home for your next chapter', '', blog.contactAnswer, '');
if (blog.salesPhone) lines.push(`[${blog.salesPhoneDisplay}](tel:${blog.salesPhone})`, '');
lines.push(`[Enquire with Godrej Properties](${blog.contactUrl})`, '', '## Tags', '',
  blog.tags.length ? blog.tags.map(tag => `[${tag.name}](${tag.url})`).join(', ') : 'griha pravesh puja, griha pravesh muhurat, diwali, vastu, home buying guide, new home', '', '## Related Projects', '');
for (const region of new Set(blog.projects.map(project => project.region))) {
  lines.push('### ' + region, '');
  for (const project of blog.projects.filter(project => project.region === region)) lines.push(`- [${project.name}](${project.url})`);
  lines.push('');
}
lines.push('---', '', '## Review Notes (Not Article Copy)', '',
  'This is the current page copy for team review, not approved publication copy. Calendar dates and ritual guidance require a named reviewer. The text refers to 20 November 2026 in the past tense even though this review was prepared on 10 November 2026; approve a correction before publication.', '',
  'Campaign imagery, film, author, publication date, campaign hub and sales telephone number remain pending. No phone number, offer or project image has been invented. The page remains a noindex draft.', '',
  'The project list follows the updated twelve-project screenshot. Existing supplied URLs are retained; Altus uses its verified official campaign page, while Elaris and Ivara use their verified official project pages.', '');
const markdown = lines.join('\n');
for (const project of blog.projects) assert.ok(markdown.includes(`[${project.name}](${project.url})`));
for (const faq of blog.faqs) assert.ok(markdown.includes(faq.answer));
assert.ok(!markdown.includes('Inner Labs'));
const destination = path.join(root, '..', 'Godrej_Diwali_Blog_Content_Review.md');
await fs.writeFile(destination, markdown);
console.log(`Content review exported: ${destination}`);