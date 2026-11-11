import { marked } from 'marked';
import publicationSettings from '../data/diwali-blog-publication.json';
import content from '../data/diwali-blog-content.json';
import { blogTitle, blogUrl, metaDescription } from '../data/diwali-blog-metadata';

type Publication = {
  status: string;
  campaignName: string;
  campaignHubUrl: string | null;
  author: { name: string; url: string; type: 'Person' | 'Organization' } | null;
  datePublished: string | null;
  dateModified: string | null;
  hero: { url: string; alt: string; width: number; height: number } | null;
  filmEmbedUrl: string | null;
  salesPhone: string | null;
  salesPhoneDisplay: string | null;
  contactUrl: string;
  projects: { name: string; url: string; image?: string; location: string; region: string }[];
  approvedTags: { name: string; url: string }[];
  calendarSources: { name: string; url: string; location: string; checkedOn: string }[];
  calendarReviewer: string | null;
  copyApproved: boolean;
  campaignAssetsApproved: boolean;
  contactApproved: boolean;
};

export function publicationBlockers(publication: Publication): string[] {
  const required = {
    'campaign hub': publication.campaignHubUrl,
    'author assignment': publication.author,
    'publication date': publication.datePublished,
    'modification date': publication.dateModified,
    'approved hero': publication.hero,
    'approved film': publication.filmEmbedUrl,
    'campaign sales number': publication.salesPhone && publication.salesPhoneDisplay,
    'participating projects': publication.projects.length,
    'existing tag destinations': publication.approvedTags.length,
    'calendar sources': publication.calendarSources.length,
    'calendar reviewer': publication.calendarReviewer,
    'editorial approval': publication.copyApproved,
    'asset approval': publication.campaignAssetsApproved,
    'contact approval': publication.contactApproved,
  };
  return Object.entries(required).filter(([, value]) => !value).map(([label]) => label);
}

function safeUrl(value: string) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error(`Expected public HTTPS URL: ${value}`);
  return value;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function serializeSchema(value: unknown) {
  return JSON.stringify(value).replaceAll('<', String.raw`\u003c`);
}

function validateDates(publication: Publication, ready: boolean) {
  const dates = [publication.datePublished, publication.dateModified].filter((value): value is string => Boolean(value));
  for (const date of dates) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error('Use a real ISO date');
    if (ready && Date.parse(date) > Date.now()) throw new Error('Do not publish future publication/modification dates');
  }
  if (publication.datePublished && publication.dateModified && publication.dateModified < publication.datePublished) throw new Error('Updated date cannot precede publication');
}

function validateAssets(publication: Publication) {
  if (publication.hero && (!publication.hero.alt || publication.hero.width <= 0 || publication.hero.height <= 0)) throw new Error('Hero requires accurate alt text and dimensions');
  if (publication.filmEmbedUrl && !['www.youtube-nocookie.com', 'player.vimeo.com'].includes(new URL(publication.filmEmbedUrl).hostname)) throw new Error('Use an approved privacy-conscious film embed host');
}

function validatePublication(publication: Publication) {
  const blockers = publicationBlockers(publication);
  if (!['draft', 'approved'].includes(publication.status)) throw new Error('Unknown blog publication status');
  if (publication.status === 'approved' && blockers.length) throw new Error(`Diwali publication blocked: ${blockers.join(', ')}`);
  const ready = publication.status === 'approved' && blockers.length === 0;
  const urls = [publication.contactUrl, publication.campaignHubUrl, publication.author?.url, publication.hero?.url, publication.filmEmbedUrl,
    ...publication.projects.flatMap(project => [project.url, project.image]), ...publication.approvedTags.map(tag => tag.url), ...publication.calendarSources.map(source => source.url)];
  urls.filter((value): value is string => Boolean(value)).forEach(safeUrl);
  if (publication.salesPhone && !/^\+[1-9]\d{7,14}$/.test(publication.salesPhone)) throw new Error('Campaign number must be E.164');
  validateAssets(publication);
  validateDates(publication, ready);
  return ready;
}

function createFaqs(publication: Publication) {
  const faqs = content.faqs.map(faq => ({ ...faq }));
  if (faqs.length !== 10) throw new Error('Expected ten source FAQs');
  const contactAnswer = publication.contactApproved && publication.salesPhone
    ? `For home enquiries and current availability, contact Godrej Properties on ${publication.salesPhoneDisplay}. The sales team can help with home enquiries; consult your family priest for advice on rituals and muhurat.`
    : 'Use the enquiry option on the official Godrej Properties website for project information and current availability. The sales team can help with home enquiries; consult your family priest for advice on rituals and muhurat.';
  faqs.push({ id: 'faq-contact', question: 'How can I contact Godrej Properties about a home?', answer: contactAnswer });
  return { faqs, contactAnswer };
}

function createSections(publication: Publication) {
  const { summary, sections: segments } = content;
  if (segments.length !== 7) throw new Error('Expected intro and six article sections');
  const contextualLinks: Record<string, { slug: string; anchor: string }[]> = {
    'section-2': [{ slug: 'explore-property-purchase-muhurat-for-your-new-home', anchor: 'auspicious dates for property registration' }],
    'section-3': [{ slug: 'griha-pravesh-muhurat-best-dates-and-timings', anchor: 'griha pravesh muhurat dates' }],
    'section-4': [{ slug: 'griha-pravesh-decoration-ideas', anchor: 'decorating your new home for the ceremony' }],
    'section-6': [{ slug: 'significance-of-main-door-direction-in-vastu-shastra', anchor: 'main door direction' }],
  };
  const sections = segments.map(segment => {
    const body = segment.question ? segment.markdown.replace(/^\s*\*\*Short answer:[\s\S]*?\*\*\s*/, '') : segment.markdown;
    const markdown = segment.question ? `**${segment.question}**\n\n${segment.answer}\n\n${body}` : body;
    let html = marked.parse(markdown, { async: false }) as string;
    for (const link of contextualLinks[segment.id] || []) html += `<p>Read more about <a href="https://www.godrejproperties.com/blog/${link.slug}">${link.anchor}</a>.</p>`;
    if (publication.campaignHubUrl && ['introduction', 'section-6'].includes(segment.id)) html += `<p><a href="${escapeHtml(publication.campaignHubUrl)}">${escapeHtml(segment.id === 'introduction' ? publication.campaignName : 'first Diwali in a new home')}</a></p>`;
    if (segment.id === 'section-6' && publication.projects.length) {
      const links = publication.projects.map(project => `<a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a>`).join(', ');
      html += `<p>Explore ${links}.</p>`;
    }
    if (segment.id === 'section-5' && publication.calendarSources.length) {
      const sources = publication.calendarSources.map(source => `<a href="${escapeHtml(source.url)}">${escapeHtml(source.name)} (${escapeHtml(source.location)}, checked ${escapeHtml(source.checkedOn)})</a>`).join('; ');
      html += `<p>Calendar review: ${escapeHtml(publication.calendarReviewer || '')}. Sources: ${sources}.</p>`;
    }
    return { id: segment.id, title: segment.title, html };
  });
  return { summary, sections };
}

export function loadDiwaliBlog() {
  const publication: Publication = publicationSettings;
  const ready = validatePublication(publication);
  const productionRequested = process.env.DIWALI_PUBLISH_TARGET === 'production';
  if (productionRequested && !ready) throw new Error('Diwali production export requires completed publication approvals');
  const indexable = ready && productionRequested && process.env.VERCEL !== '1';
  const { faqs, contactAnswer } = createFaqs(publication);
  const { summary, sections } = createSections(publication);
  const organization = {
    '@type': 'Organization', '@id': 'https://www.godrejproperties.com/#organization', name: 'Godrej Properties', url: 'https://www.godrejproperties.com/',
    ...(publication.contactApproved && publication.salesPhone ? { contactPoint: { '@type': 'ContactPoint', name: `${publication.campaignName} home enquiries`, contactType: 'sales', telephone: publication.salesPhone, url: publication.contactUrl } } : {}),
  };
  const article = {
    '@context': 'https://schema.org', '@type': 'Article', '@id': `${blogUrl}#article`, headline: blogTitle, description: metaDescription,
    mainEntityOfPage: { '@type': 'WebPage', '@id': blogUrl }, publisher: organization, inLanguage: 'en-IN',
    ...(publication.author ? { author: { '@type': publication.author.type, name: publication.author.name, url: publication.author.url } } : {}),
    ...(publication.datePublished ? { datePublished: publication.datePublished } : {}),
    ...(publication.dateModified ? { dateModified: publication.dateModified } : {}),
    ...(publication.hero ? { image: publication.hero.url } : {}),
    ...(publication.calendarSources.length ? { citation: publication.calendarSources.map(source => source.url) } : {}),
  };
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${blogUrl}#faqs`, mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://www.godrejproperties.com/blog' },
    { '@type': 'ListItem', position: 2, name: blogTitle, item: blogUrl },
  ] };
  return { ready, indexable, campaignName: publication.campaignName, summary, sections, faqs, contactAnswer, contactUrl: publication.contactUrl,
    salesPhone: publication.contactApproved ? publication.salesPhone : null, salesPhoneDisplay: publication.contactApproved ? publication.salesPhoneDisplay : null,
    author: publication.author, datePublished: publication.datePublished, dateModified: publication.dateModified, hero: publication.hero,
    filmEmbedUrl: publication.filmEmbedUrl, projects: publication.projects, tags: publication.approvedTags,
    schemas: [article, faq, breadcrumb].map(serializeSchema) };
}

export type DiwaliBlog = Awaited<ReturnType<typeof loadDiwaliBlog>>;