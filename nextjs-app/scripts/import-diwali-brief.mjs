import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] || path.join(root, '..', 'Godrej_Diwali_Blog_GrihaPravesh_Copilot_Brief.md'));
const brief = await fs.readFile(source, 'utf8');
const summaryPart = brief.split('## SUMMARY PARAGRAPH')[1]?.split('## TABLE OF CONTENTS')[0];
const summary = summaryPart?.split('\n').filter(line => line.startsWith('> ')).map(line => line.slice(2)).join(' ');
assert.ok(summary, 'Missing summary');
const article = brief.split('**Intro**')[1]?.split('## 7. Frequently Asked Questions')[0];
assert.ok(article, 'Missing article');
const sections = [{ id: 'introduction', title: '', markdown: '' }];
for (const token of marked.lexer(article)) {
  if (token.type === 'hr') continue;
  if (token.type === 'paragraph' && token.text.startsWith('*[Inline link:')) continue;
  if (token.type === 'blockquote' && token.text.startsWith('[CONFIRM]')) continue;
  if (token.type === 'heading' && token.depth === 2) sections.push({ id: `section-${sections.length}`, title: token.text, markdown: '' });
  else sections.at(-1).markdown += token.raw;
}
assert.equal(sections.length, 7, 'Expected introduction and six sections');
const schemas = marked.lexer(brief).flatMap(token => token.type === 'code' && token.lang === 'json' ? [JSON.parse(token.text)] : []);
const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
assert.equal(faqSchema?.mainEntity.length, 10, 'Expected ten source FAQs');
const faqCopy = brief.split('## 7. Frequently Asked Questions')[1].split('## INTERNAL LINKING MAP')[0];
const faqs = faqSchema.mainEntity.map((question, index) => {
  const visibleAnswer = faqCopy.split(`**${question.name}**`)[1]?.split('\n\n')[0].replace(/\s+/g, ' ').trim();
  assert.equal(visibleAnswer, question.acceptedAnswer.text, `FAQ source/schema mismatch: ${question.name}`);
  return { id: `faq-${index + 1}`, question: question.name, answer: visibleAnswer };
});
const content = { summary, sections, faqs };
const output = JSON.stringify(content, null, 2) + '\n';
for (const forbidden of ['[CONFIRM]', 'Inner Labs', '584 non-branded', 'COPILOT BUILD BRIEF', 'Inline link:']) {
  assert.ok(!output.includes(forbidden), `Private instruction leaked: ${forbidden}`);
}
await fs.writeFile(path.join(root, 'src/data/diwali-blog-content.json'), output);
console.log('Imported public-facing copy only: summary, six sections and ten source-matched FAQs.');