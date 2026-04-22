import Link from 'next/link';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import { groupByCity, projects } from '@/data/projects';

export default function ProjectsIndex() {
  const grouped = groupByCity();
  const cities = Object.keys(grouped);
  const total = projects.length;

  const title = `${total} Godrej projects under the 1% Plan: City-wise directory`;
  const desc = `Directory of ${total} Godrej Properties projects eligible under the 1% Payment Plan, grouped by city. Each entry links to a project-specific 1% Plan breakdown including RERA, possession, and worked example.`;

  const itemListSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://www.godrejproperties.com/the-1-percent-plan/projects/${p.slug}`,
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '1% Plan', item: 'https://www.godrejproperties.com/the-1-percent-plan' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.godrejproperties.com/the-1-percent-plan/projects' },
    ],
  });

  return (
    <Layout>
      <SEO
        title={title}
        description={desc}
        canonical="https://www.godrejproperties.com/the-1-percent-plan/projects"
        schema={[itemListSchema, breadcrumbSchema]}
      />

      <div className="hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" />
        <h1 style={{ maxWidth: '900px', margin: '0 auto' }}>
          {total} Godrej Projects under the 1% Plan
        </h1>
        <p style={{ marginTop: '0.5rem', color: 'var(--color-muted)' }}>
          A city-wise directory of project-specific 1% Plan breakdowns.
        </p>
      </div>

      <main className="content-container">
        <article>
          <div className="summary-card">
            <p>
              The Godrej 1% Payment Plan is offered across <strong>{total} projects in {cities.length} cities</strong>.
              Each entry below links to a project-specific page covering the 1% calculation, payment
              schedule worked example, RERA registration, possession and OC timelines, and project FAQs.
              For pricing, gallery, brochure, and site visit booking, each page also links to the
              corresponding live project page on godrejproperties.com.
            </p>
          </div>

          {cities.map((city) => (
            <section key={city} style={{ marginTop: '3rem' }}>
              <h2>{city}</h2>
              <div className="grid-container">
                {grouped[city].map((p) => (
                  <Link
                    key={p.slug}
                    href={`/the-1-percent-plan/projects/${p.slug}`}
                    className="card card-accent"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <h3 style={{ marginTop: 0 }}>{p.name}</h3>
                    <p style={{ marginBottom: '0.5rem' }}>{p.microLocation}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginBottom: 0 }}>
                      RERA: {p.rera}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2 style={{ color: 'var(--accent-gold-dark)' }}>Estimate your 1% Plan payments</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              Use the calculator to model the Q1 amount and monthly 1% tranche for any budget across
              any of these projects.
            </p>
            <Link href="/the-1-percent-plan/calculator" className="btn">
              Open 1% Plan Calculator
            </Link>
          </section>
        </article>
      </main>
    </Layout>
  );
}
