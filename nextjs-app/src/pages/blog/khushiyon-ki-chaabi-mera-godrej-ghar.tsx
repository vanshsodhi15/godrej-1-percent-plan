import Head from 'next/head';
import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Copy, Mail, Phone, Share2 } from 'lucide-react';
import { blogTitle, blogUrl, metaDescription, metaTitle } from '../../data/diwali-blog-metadata';
import type { DiwaliBlog } from '../../lib/diwali-blog';
import styles from '../../styles/diwali-blog.module.css';

export async function getStaticProps() {
  const { loadDiwaliBlog } = await import('../../lib/diwali-blog');
  return { props: { blog: loadDiwaliBlog() } };
}

function displayDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

export default function DiwaliBlogPage({ blog }: Readonly<{ blog: DiwaliBlog }>) {
  const [shareStatus, setShareStatus] = useState('');
  const projectRegions = [...new Set(blog.projects.map(project => project.region))];
  async function share(copyOnly = false) {
    try {
      if (!copyOnly && navigator.share) await navigator.share({ title: blogTitle, url: blogUrl });
      else { await navigator.clipboard.writeText(blogUrl); setShareStatus('Link copied'); }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setShareStatus('Sharing unavailable. Please use the email link.');
    }
  }
  return (
    <div className={styles.page}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content={blog.indexable ? 'index, follow' : 'noindex, nofollow'} />
        <link rel="canonical" href={blogUrl} />
        <link rel="icon" href="/assets_diwali/favicon.ico" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={blogUrl} />
        <meta name="twitter:card" content={blog.hero ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {blog.hero && <><meta property="og:image" content={blog.hero.url} /><meta property="og:image:alt" content={blog.hero.alt} /><meta name="twitter:image" content={blog.hero.url} /></>}
        {blog.datePublished && <meta property="article:published_time" content={blog.datePublished} />}
        {blog.dateModified && <meta property="article:modified_time" content={blog.dateModified} />}
        {blog.schemas.map(schema => <script key={schema} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />)}
      </Head>
      <header className={styles.header}>
        <a href="https://www.godrejproperties.com/" aria-label="Godrej Properties home"><img src="/assets_diwali/godrej_properties_logo.svg" alt="Godrej Properties" width="154" height="58" /></a>
        <a href="https://www.godrejproperties.com/blog">The Godrej Blog <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>
      {!blog.indexable && <aside className={styles.review}>Editorial review | Not published</aside>}
      <main className={styles.main}>
        <a href="https://www.godrejproperties.com/blog" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Back to Blog</a>
        {blog.hero && <figure className={styles.hero}><img src={blog.hero.url} alt={blog.hero.alt} width={blog.hero.width} height={blog.hero.height} fetchPriority="high" /></figure>}
        <article>
          <div className={styles.masthead}>
            <p className={styles.campaign}>{blog.campaignName}</p>
            <div className={styles.meta}><span>Home Buying Guide</span>{blog.datePublished && <span>Published <time dateTime={blog.datePublished}>{displayDate(blog.datePublished)}</time></span>}{blog.dateModified && <span>Updated <time dateTime={blog.dateModified}>{displayDate(blog.dateModified)}</time></span>}</div>
            <h1>{blogTitle}</h1>
            <div className={styles.byline}>
              <p>{blog.author ? <>by <a href={blog.author.url}>{blog.author.name}</a></> : 'Godrej Properties'}</p>
              <div className={styles.share} aria-label="Share this article">
                <span>Share via</span>
                <button type="button" title="Share article" aria-label="Share article" onClick={() => share()}><Share2 size={18} /></button>
                <button type="button" title="Copy article link" aria-label="Copy article link" onClick={() => share(true)}>{shareStatus === 'Link copied' ? <Check size={18} /> : <Copy size={18} />}</button>
                <a title="Share by email" aria-label="Share by email" href={`mailto:?subject=${encodeURIComponent(blogTitle)}&body=${encodeURIComponent(blogUrl)}`}><Mail size={18} /></a>
              </div>
            </div>
            <output className={styles.shareStatus}>{shareStatus}</output>
          </div>
          <section className={styles.contents} aria-labelledby="contents-title">
            <h3 id="contents-title">Contents</h3>
            <p>{blog.summary}</p>
            <nav aria-label="Article contents"><ol>
              {blog.sections.filter(section => section.title).map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title.replace(/^\d+\.\s*/, '')}</a></li>)}
              <li><a href="#faqs">Frequently Asked Questions</a><ul>{blog.faqs.map(faq => <li key={faq.id}><a href={`#${faq.id}`} onClick={() => { const element = document.getElementById(faq.id); if (element instanceof HTMLDetailsElement) element.open = true; }}>{faq.question}</a></li>)}</ul></li>
            </ol></nav>
          </section>
          <div className={styles.body}>
            <h2 className={styles.repeatTitle}>{blogTitle}</h2>
            {blog.sections.map(section => <section key={section.id} id={section.id}>
              {section.title && <h2>{section.title}</h2>}
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
              {section.id === 'section-6' && blog.filmEmbedUrl && <iframe className={styles.film} src={blog.filmEmbedUrl} title={`${blog.campaignName} campaign film`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen" allowFullScreen />}
            </section>)}
          </div>
          <section id="faqs" className={styles.faqs}>
            <h2>7. Frequently Asked Questions</h2>
            {blog.faqs.map(faq => <details id={faq.id} key={faq.id}>
              <summary>{faq.question}<ChevronDown size={20} aria-hidden="true" /></summary>
              <p>{faq.answer}</p>
            </details>)}
          </section>
          <section id="contact" className={styles.contact}>
            <div><p className={styles.campaign}>{blog.campaignName}</p><h2>A home for your next chapter</h2><p>{blog.contactAnswer}</p></div>
            <div className={styles.contactActions}>{blog.salesPhone && <a href={`tel:${blog.salesPhone}`}><Phone size={18} aria-hidden="true" />{blog.salesPhoneDisplay}</a>}<a href={blog.contactUrl}>Enquire with Godrej Properties <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </section>
          <section className={styles.tags} aria-label="Article tags"><h2>Tags</h2><div>{blog.tags.length ? blog.tags.map(tag => <a key={tag.url} href={tag.url}>{tag.name}</a>) : ['Godrej Properties', 'Diwali', 'new beginnings', 'first Diwali', 'home buying guide', 'new home'].map(tag => <span key={tag}>{tag}</span>)}</div></section>
          {blog.projects.length > 0 && <section id="related-projects" className={styles.related}><h2>Related Projects</h2>
            {projectRegions.map(region => <section key={region} aria-label={`${region} projects`}>
              <h3>{region}</h3>
              <ul>{blog.projects.filter(project => project.region === region).map(project => <li key={project.url}>
                <a href={project.url}>{project.image && <img src={project.image} alt={project.name} width="480" height="320" loading="lazy" />}<span>{project.name}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
              </li>)}</ul>
            </section>)}
          </section>}
        </article>
      </main>
      <footer className={styles.footer}><a href="https://www.godrejproperties.com/">Godrej Properties</a><nav aria-label="Legal"><a href="https://www.godrejproperties.com/disclaimer">Disclaimer</a><a href="https://www.godrejproperties.com/privacy-policy">Privacy Policy</a><a href="https://www.godrejproperties.com/blog">Blog</a></nav></footer>
    </div>
  );
}