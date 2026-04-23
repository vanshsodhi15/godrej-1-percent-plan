import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import { Project, getAllSlugs, getProjectBySlug } from '@/data/projects';

interface ProjectPageProps {
  project: Project;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const project = getProjectBySlug(slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};

export default function ProjectPage({ project }: ProjectPageProps) {
  const canonical = `https://www.godrejproperties.com/the-1-percent-plan/projects/${project.slug}`;
  const title = `${project.name} 1% Plan: Payment breakdown, RERA, possession & FAQs`;
  const desc = `How the Godrej 1% Payment Plan applies to ${project.name}, ${project.city}: Q1 + monthly 1% calculation, RERA ${project.rera}, possession timeline, and project FAQs.`;

  // Schema 1 — ApartmentComplex (project entity)
  const apartmentSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: project.name,
    url: canonical,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.city,
      addressRegion: project.state,
      addressCountry: 'IN',
    },
    containsPlace: project.pricing.map((row) => ({
      '@type': 'Apartment',
      numberOfRooms: row.configuration,
      floorSize: { '@type': 'QuantitativeValue', value: row.area, unitText: 'SQFT' },
    })),
    accommodationCategory: project.type,
    publicAccess: true,
  });

  // Schema 2 — Offer (1% Plan availability)
  const offerSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `Godrej 1% Payment Plan — ${project.name}`,
    url: canonical,
    seller: { '@type': 'Organization', name: 'Godrej Properties Limited' },
    eligibleRegion: { '@type': 'Place', name: project.city },
    availability: 'https://schema.org/LimitedAvailability',
    priceSpecification: {
      '@type': 'PriceSpecification',
      description:
        'Initial 20% within Q1 + 1% of Agreement Value monthly until next construction milestone + balance at OC. APR disclosed at 8.5%.',
    },
    itemOffered: { '@type': 'ApartmentComplex', name: project.name },
  });

  // Schema 3 — FAQ
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: project.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  });

  // Schema 4 — Breadcrumb
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '1% Plan', item: 'https://www.godrejproperties.com/the-1-percent-plan' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: 'https://www.godrejproperties.com/the-1-percent-plan/projects',
      },
      { '@type': 'ListItem', position: 3, name: project.name, item: canonical },
    ],
  });

  // Schema 5 — Article (for E-E-A-T and freshness signals)
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: desc,
    image: 'https://www.godrejproperties.com/assets/1_percent_og_image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Godrej Properties Limited',
      url: 'https://www.godrejproperties.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Godrej Properties Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.godrejproperties.com/assets/godrej_properties_logo.svg'
      }
    },
    datePublished: '2026-04-14T08:00:00+05:30',
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    }
  });

  const ex = project.paymentPlanExample;

  return (
    <Layout>
      <SEO
        title={title}
        description={desc}
        canonical={canonical}
        schema={[apartmentSchema, offerSchema, faqSchema, breadcrumbSchema, articleSchema]}
      />

      {/* ==========================================
          HERO — Full-width banner (mirrors Godrej production Hero component)
          ========================================== */}
      <section
        className="project-hero"
        style={{
          background: 'var(--bg-seashell)',
          color: 'var(--color-heading)',
          padding: '3.5rem 2rem 3rem',
          textAlign: 'center',
        }}
      >
        <img
          src="/assets/1_percent_logo.png"
          alt="The 1% Plan Logo"
          className="hero-logo"
        />
        <h1 style={{ maxWidth: '900px', margin: '0 auto', fontSize: '2rem' }}>
          {project.name} — 1% Payment Plan
        </h1>
        <p style={{ marginTop: '0.5rem', color: 'var(--color-muted)', marginBottom: 0 }}>
          {project.microLocation}, {project.city}, {project.state}
        </p>
      </section>

      {/* ==========================================
          OVERVIEW — Summary (mirrors Godrej Overview component)
          ========================================== */}
      <section id="overview" style={{ background: '#fff', padding: '2.5rem 0 1rem' }}>
        <div className="content-container" style={{ paddingTop: '0', paddingBottom: '0' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Overview</h2>

          <article>
            <div className="summary-card">
              <p>
                <strong>{project.name}</strong> is a {project.type.toLowerCase()} project by{' '}
                <strong>{project.developer}</strong> in {project.microLocation}, {project.city}.
                Under the <strong>Godrej 1% Plan</strong>, buyers pay 20% of the Agreement Value within Q1,
                followed by <strong>1% monthly</strong> until the next construction-linked milestone, with the
                balance due at <strong>Occupation Certificate (OC)</strong>. The plan operates at a disclosed
                APR of <strong>8.5%</strong>. RERA: <strong>{project.rera}</strong>.
              </p>
            </div>

            {/* Project snapshot cards */}
            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="card card-warm">
                <h3>Sales Status</h3>
                <p>{project.salesStatus}</p>
              </div>
              <div className="card card-warm">
                <h3>Construction Status</h3>
                <p>{project.constructionStatus}</p>
              </div>
              <div className="card card-warm">
                <h3>Project Type</h3>
                <p>{project.type}</p>
              </div>
              <div className="card card-warm">
                <h3>Developer</h3>
                <p>{project.developer}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ==========================================
          NEIGHBOURHOOD / LOCATION — (mirrors Godrej Neighbourhood component)
          ========================================== */}
      <section id="neighbourhood" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Location Advantages</h2>
          {project.locationAdvantagesByCategory && project.locationAdvantagesByCategory.length > 0 ? (
            <div className="grid-container" style={{ marginTop: '1.5rem' }}>
              {project.locationAdvantagesByCategory.map((group, gi) => (
                <div key={gi} className="card" style={{ background: 'var(--bg-white)' }}>
                  <h3 style={{ marginTop: 0 }}>{group.category}</h3>
                  <ul style={{ marginLeft: '1.25rem' }}>
                    {group.items.map((item, ii) => (
                      <li key={ii} style={{ listStyle: 'disc', marginBottom: '0.35rem', fontSize: '0.9375rem' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul style={{ marginLeft: '1.5rem', marginTop: '1.5rem' }}>
              {project.locationAdvantages.map((u, i) => (
                <li key={i} style={{ listStyle: 'disc', marginBottom: '0.5rem' }}>{u}</li>
              ))}
            </ul>
          )}

          <div className="card card-warm" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Micro-Market Understanding</h3>
            <ul style={{ marginLeft: '1.25rem', marginBottom: 0 }}>
              {project.microMarketNotes.split('. ').map((sentence, idx, arr) => {
                const text = idx === arr.length - 1 ? sentence : sentence + '.';
                if (!text.trim()) return null;
                return (
                  <li key={idx} style={{ listStyle: 'disc', marginBottom: '0.75rem', fontSize: '0.9375rem', color: 'var(--color-primary)' }}>
                    {text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ==========================================
          PLANS / FLOOR PLANS — (mirrors Godrej Plans component)
          ========================================== */}
      <section id="plans" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Floor Plans</h2>
          <p>{project.floorPlans}</p>
          {project.floorPlanImages && project.floorPlanImages.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              {project.floorPlanImages.map((fp, i) => (
                <div key={i} className="card" style={{ marginBottom: '2rem', padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem 1.5rem 0.5rem' }}>
                    <h3 style={{ marginTop: 0 }}>{fp.label}</h3>
                    {fp.carpetArea && <p style={{ marginBottom: '0.25rem', fontSize: '0.9375rem' }}>RERA Carpet Area: <strong>{fp.carpetArea}</strong></p>}
                    {fp.saleableArea && <p style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>Saleable Area: <strong>{fp.saleableArea}</strong></p>}
                  </div>
                  <img
                    src={fp.src}
                    alt={fp.alt}
                    style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          PRICE — Configurations & Pricing (mirrors Godrej Price component)
          ========================================== */}
      <section id="price" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Configurations &amp; Pricing</h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            All pricing is in ₹ Crores and indicative of the Agreement Value range. Stamp Duty, Registration Charges (SDR), and GST treatment are shown alongside.
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Configuration</th>
                  <th>RERA / Saleable / SBU (sq.ft.)</th>
                  <th>Agreement Value (₹ Cr)</th>
                  <th>AV + GST (₹ Cr)</th>
                  <th>AV + GST + SDR (₹ Cr)</th>
                </tr>
              </thead>
              <tbody>
                {project.pricing.map((row, i) => (
                  <tr key={i}>
                    <td>{row.configuration}</td>
                    <td>{row.area}</td>
                    <td>{row.agreementValue}</td>
                    <td>{row.agreementValuePlusGst}</td>
                    <td>{row.agreementValuePlusGstSdr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
          1% PAYMENT PLAN — Applied to this project (mirrors Godrej payment structure)
          ========================================== */}
      <section id="payment-plan" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>The 1% Payment Plan — Applied to {project.name}</h2>

          <h3>How the Entry Point Is Calculated</h3>
          <p>
            The 1% is calculated against the <strong>Agreement Value (AV)</strong> of the unit being
            booked. Goods and Services Tax (GST) and Stamp Duty + Registration (SDR) are payable
            separately by the buyer per applicable law and are not included in the 1% calculation base
            unless explicitly stated in the Agreement for Sale.
          </p>

          <h3>Step-by-Step Workflow</h3>
          <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>
              <strong>Booking:</strong> {ex.upfrontAtBookingPct} of AV paid as booking amount
              ({ex.upfrontAtBookingAmount}).
            </li>
            <li>
              <strong>Registration:</strong> {ex.registrationAmount} paid at the time of registration
              of the Agreement for Sale.
            </li>
            <li>
              <strong>Q1 Top-up:</strong> Remaining amount paid such that the total reaches{' '}
              {ex.q1TotalPct} of AV ({ex.q1TotalAmount}) within the first quarter from booking.
            </li>
            <li>
              <strong>Monthly 1%:</strong> {ex.monthlyOnePctAmount} per month, charged from the month
              following Q1, continuing {ex.monthlyDurationMonths.toLowerCase()}.
            </li>
            <li>
              <strong>Construction-Linked Tranches:</strong> At each construction milestone (typically
              slab-by-slab), a defined tranche is invoiced as per the Agreement for Sale schedule.
            </li>
            <li>
              <strong>OC Balance:</strong> {ex.ocBalancePct} of the total consideration is paid at the
              time of Occupation Certificate, prior to handover.
            </li>
          </ol>

          <div className="card card-warm">
            <h3>Demo Illustration — {project.name}</h3>
            <p>
              Indicative Agreement Value used for this example:{' '}
              <strong>₹ {ex.indicativeAgreementValueCr} Cr</strong>
              {ex.totalCostForCustomer && <> | Total Cost to Customer: <strong>{ex.totalCostForCustomer}</strong></>}
              {ex.totalAgreementValue && <> | Total Agreement Value: <strong>{ex.totalAgreementValue}</strong></>}
              . Figures are illustrative; the Agreement for Sale governs the final payment schedule for each unit.
            </p>

            {/* Detailed milestone table (when full data is available) */}
            {ex.milestones && ex.milestones.length > 0 ? (
              <div className="table-wrapper" style={{ marginTop: '1rem' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Milestone</th>
                      <th>%</th>
                      <th>Amount (₹)</th>
                      <th>Calculation Logic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ex.milestones.map((m, i) => (
                      <tr key={i}>
                        <td>{m.stage}</td>
                        <td>{m.percentage}</td>
                        <td>{m.amount}</td>
                        <td style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{m.logic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-wrapper" style={{ marginTop: '1rem' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Trigger</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Booking</td>
                      <td>At booking</td>
                      <td>{ex.upfrontAtBookingAmount}</td>
                    </tr>
                    <tr>
                      <td>Registration</td>
                      <td>At AfS execution</td>
                      <td>{ex.registrationAmount}</td>
                    </tr>
                    <tr>
                      <td>Q1 Total ({ex.q1TotalPct})</td>
                      <td>Within first quarter</td>
                      <td>{ex.q1TotalAmount}</td>
                    </tr>
                    <tr>
                      <td>Monthly 1%</td>
                      <td>Each month post-Q1</td>
                      <td>{ex.monthlyOnePctAmount}</td>
                    </tr>
                    <tr>
                      <td>OC Balance</td>
                      <td>At Occupation Certificate</td>
                      <td>{ex.ocBalancePct}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {ex.additionalSdrNote && (
              <p style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}>{ex.additionalSdrNote}</p>
            )}

            <p style={{ marginTop: '1rem', marginBottom: 0, fontStyle: 'italic' }}>{ex.notes}</p>
          </div>

          <p style={{ marginTop: '1.5rem' }}>
            Use the{' '}
            <Link href="/the-1-percent-plan/calculator">
              <strong>1% Plan Calculator</strong>
            </Link>{' '}
            to model alternate budgets for {project.name}.
          </p>
        </div>
      </section>

      {/* ==========================================
          RERA & COMPLIANCES — (mirrors Godrej Maharera + Compliances components)
          ========================================== */}
      <section id="rera" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>RERA: Possession &amp; OC Timelines</h2>
          <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="card card-accent">
              <h3>RERA Number</h3>
              <p>{project.rera}</p>
            </div>
            <div className="card card-accent">
              <h3>RERA Portal</h3>
              <p>
                <a href={project.reraPortal} target="_blank" rel="noopener noreferrer">
                  Verify on State RERA portal
                </a>
              </p>
            </div>
            <div className="card card-accent">
              <h3>RERA Certificate</h3>
              <p>{project.reraCertificateLink}</p>
            </div>
            <div className="card card-accent">
              <h3>Possession (RERA)</h3>
              <p>{project.possessionRera}</p>
            </div>
            <div className="card card-accent">
              <h3>Possession (GPL Target)</h3>
              <p>{project.possessionGpl}</p>
            </div>
            <div className="card card-accent">
              <h3>OC (RERA)</h3>
              <p>{project.ocRera}</p>
            </div>
            <div className="card card-accent">
              <h3>OC (GPL Target)</h3>
              <p>{project.ocGpl}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FAQs — (mirrors Godrej FAQ sections)
          ========================================== */}
      <section id="faqs" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            {project.faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          LEGAL DISCLAIMERS
          ========================================== */}
      <section id="disclaimers" style={{ background: 'var(--bg-seashell)', padding: '2rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="disclaimer" style={{ borderTop: 'none', marginTop: 0 }}>
            <p>{project.legalDisclaimers}</p>
          </div>
        </div>
      </section>

      {/* Discreet SEO/GEO internal links — not visually prominent */}
      <nav aria-label="Related pages" style={{ padding: '1.5rem 2rem', fontSize: '0.8125rem', color: 'var(--color-muted)', textAlign: 'center' }}>
        <a href={project.liveProjectUrl} rel="noopener noreferrer" style={{ color: 'var(--color-muted)', marginRight: '1.5rem' }}>
          {project.name} on godrejproperties.com
        </a>
        <a href="https://www.godrejproperties.com/the-1-percent-plan" style={{ color: 'var(--color-muted)' }}>
          Godrej 1% Plan
        </a>
      </nav>
    </Layout>
  );
}
