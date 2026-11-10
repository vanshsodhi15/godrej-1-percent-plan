import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import domino from '@mixmark-io/domino';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'griha-pravesh-during-diwali-auspicious-days-muhurat-rituals';
const html = await fs.readFile(path.join(root, 'out/blog', `${slug}.html`), 'utf8');
const document = domino.createDocument(html);
const article = document.querySelector('article');
assert.ok(article, 'Missing rendered article');
article.querySelectorAll('svg, button, output, [aria-label="Share this article"]').forEach(element => element.remove());
const converter = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
converter.use(gfm);
converter.addRule('faqQuestion', {
  filter: 'summary',
  replacement: content => `\n\n### ${content.trim()}\n\n`,
});
converter.addRule('sectionAnchor', {
  filter: node => (node.nodeName === 'SECTION' || node.nodeName === 'DETAILS') && Boolean(node.id),
  replacement: (content, node) => `\n\n<a id="${node.id}"></a>\n\n${content}\n\n`,
});
const markdown = converter.turndown(article) + '\n';
assert.ok(!markdown.includes('Review Notes'));
assert.ok(!markdown.includes('Inner Labs'));
assert.equal(article.querySelectorAll('#related-projects a').length, 12);
for (const answer of article.querySelectorAll('#faqs details p')) assert.ok(markdown.includes(answer.textContent));
for (const link of article.querySelectorAll('#related-projects a')) assert.ok(markdown.includes(link.getAttribute('href')));
const destination = path.join(root, '..', 'Godrej_Diwali_Blog_Content_Review.md');
await fs.writeFile(destination, markdown);
console.log(`Exact article content exported: ${destination}`);