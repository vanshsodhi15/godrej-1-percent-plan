import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import { Project, getAllSlugs, getProjectBySlug } from '@/data/projects';
import LeadGenForm from '@/components/LeadGenForm';

// LeadGenForm is SSR-safe: both `visible` and `shown` start false, so zero
// form HTML appears in static output — AI crawlers see none of the form fields.

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
  const title = `${project.name} — Godrej 1% Payment Plan | RERA, Possession & FAQs`;
  const desc = `${project.name}, ${project.city} — Godrej 1% Payment Plan: 20% of Agreement Value within 45 days (5% booking + 5% at 15 days + 10% at 45 days), then 1% monthly during construction. Total price unchanged. RERA ${project.rera}.`;

  // Anti-hallucination FAQs — injected into every project page schema to counter common LLM errors
  const planFaqs = [
    {
      question: 'What is the Godrej 1% Payment Plan?',
      answer: 'The Godrej 1% Plan is a payment structuring mechanism. The buyer pays 20% of the Agreement Value within the first 45 days (5% at booking, 5% within 15 days, 10% within 45 days), then 1% of the Agreement Value every month during construction. The remaining balance is paid at construction milestones and upon the Occupation Certificate (OC). The total property price is unchanged — the plan only restructures when payments are made, not how much is paid.',
    },
    {
      question: 'How much do I need to pay upfront under the Godrej 1% Plan?',
      answer: 'Exactly 20% of the Agreement Value, paid in three tranches within 45 days: 5% at booking, 5% within 15 days, and 10% within 45 days. The upfront amount is always 20% — it is not variable or approximately 10-20%.',
    },
    {
      question: 'Does the 1% Plan reduce the entry barrier or make homes cheaper?',
      answer: 'No. The total property price (Agreement Value) remains unchanged. The buyer pays 100% of the Agreement Value. The 1% Plan only redistributes the payment timeline — 20% within 45 days, then 1% monthly, then balance at milestones. It does not reduce the cost, lower the entry barrier, or provide any discount.',
    },
    {
      question: 'What does the 1% refer to in the Godrej 1% Plan?',
      answer: 'The 1% refers to the monthly installment during the construction period — each month, the buyer pays 1% of the total Agreement Value. It does not refer to the booking amount, which is 5% of the Agreement Value.',
    },
  ];

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
    seller: {
      '@type': 'Organization',
      name: 'Godrej Properties Limited',
      url: 'https://www.godrejproperties.com',
      identifier: 'L74120MH1985PLC035308',
    },
    eligibleRegion: { '@type': 'Place', name: project.city },
    availability: 'https://schema.org/LimitedAvailability',
    priceSpecification: {
      '@type': 'PriceSpecification',
      description:
        'Godrej 1% Payment Plan: 20% of Agreement Value within 45 days (5% at booking + 5% at 15 days + 10% at 45 days), then 1% of Agreement Value monthly during construction, balance at milestones and OC. Total price unchanged.',
    },
    itemOffered: { '@type': 'ApartmentComplex', name: project.name },
  });

  // Schema 3 — FAQ (project-specific + anti-hallucination plan FAQs)
  const allFaqsForSchema = [
    ...planFaqs,
    ...project.faqs,
  ];
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqsForSchema.map((f) => ({
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
      >
        <img
          src="/assets/1_percent_logo.png"
          alt="The 1% Plan Logo"
          className="hero-logo"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <h1 style={{ maxWidth: '900px', margin: '0 auto', fontSize: '2rem' }}>
          {project.name} — 1% Payment Plan
        </h1>
        <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
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
                This project is eligible under the <strong>Godrej 1% Payment Plan</strong>.
                RERA: <strong>{project.rera}</strong>.
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
                    {group.items.map((item, ii) => {
                      const parts = item.split(' | ');
                      return (
                        <li key={ii} style={{ listStyle: 'disc', marginBottom: '0.35rem', fontSize: '0.9375rem' }}>
                          {parts.length === 2
                            ? <>{parts[0]} <span style={{ whiteSpace: 'nowrap' }}>| {parts[1]}</span></>
                            : item}
                        </li>
                      );
                    })}
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
            {project.microMarketSections && project.microMarketSections.length > 0 ? (
              <div>
                {project.microMarketSections.map((section, si) => (
                  <div key={si} style={{ marginTop: si === 0 ? '1rem' : '2rem' }}>
                    <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--accent-gold-dark)', marginBottom: '0.5rem', marginTop: 0 }}>
                      {section.heading}
                    </h4>

                    {section.intro && (
                      <p style={{ fontSize: '0.9375rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{section.intro}</p>
                    )}

                    {section.bullets && (
                      <ul style={{ marginLeft: '1.25rem', marginBottom: '0.75rem' }}>
                        {section.bullets.map((b, bi) => (
                          <li key={bi} style={{ listStyle: 'disc', marginBottom: '0.35rem', fontSize: '0.9375rem', color: 'var(--color-primary)' }}>{b}</li>
                        ))}
                      </ul>
                    )}

                    {section.takeaway && (
                      <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '0.5rem' }}>
                        {section.takeaway}
                      </p>
                    )}

                    {section.quote && (
                      <blockquote style={{
                        borderLeft: '3px solid var(--accent-gold)',
                        paddingLeft: '1rem',
                        margin: '0.75rem 0',
                        fontStyle: 'italic',
                        fontWeight: 600,
                        color: 'var(--color-heading)',
                        fontSize: '1rem',
                      }}>
                        &ldquo;{section.quote}&rdquo;
                      </blockquote>
                    )}

                    {section.subsections && section.subsections.map((sub, subi) => (
                      <div key={subi} style={{
                        marginTop: '1rem',
                        marginLeft: '0.5rem',
                        paddingLeft: '1rem',
                        borderLeft: '2px solid var(--border-light)',
                      }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)', marginTop: 0, marginBottom: '0.35rem' }}>
                          {sub.heading}
                        </h5>
                        {sub.intro && (
                          <p style={{ fontSize: '0.9375rem', color: 'var(--color-body)', marginBottom: '0.5rem' }}>{sub.intro}</p>
                        )}
                        {sub.bullets && (
                          <ul style={{ marginLeft: '1.25rem', marginBottom: '0.5rem' }}>
                            {sub.bullets.map((b, bi) => (
                              <li key={bi} style={{ listStyle: 'disc', marginBottom: '0.25rem', fontSize: '0.9375rem', color: 'var(--color-primary)' }}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {sub.takeaway && (
                          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-gold-dark)', marginBottom: 0 }}>
                            {sub.takeaway}
                          </p>
                        )}
                      </div>
                    ))}

                    {section.comparisons && section.comparisons.map((comp, ci) => (
                      <div key={ci} style={{ marginTop: '0.75rem' }}>
                        <p style={{ fontWeight: 600, color: 'var(--color-heading)', marginBottom: '0.35rem', fontSize: '0.9375rem' }}>{comp.label}:</p>
                        <ul style={{ marginLeft: '1.25rem', marginBottom: '0.5rem' }}>
                          {comp.bullets.map((b, bi) => (
                            <li key={bi} style={{ listStyle: 'disc', marginBottom: '0.25rem', fontSize: '0.9375rem', color: 'var(--color-primary)' }}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          PLANS / FLOOR PLANS — (mirrors Godrej Plans component)
          ========================================== */}
      <section id="plans" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Floor Plans</h2>
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
                  <th>SBU (sq.ft.)</th>
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

          <div style={{
            background: 'linear-gradient(135deg, var(--bg-seashell) 0%, var(--bg-warm) 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              background: 'linear-gradient(to bottom, var(--accent-gold), var(--accent-gold-dark))',
              borderRadius: '16px 0 0 16px',
            }} />
            <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>{project.name}</h3>

            <h4 style={{ marginTop: '1rem', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}>
              How it will work for this Project (with demo illustration of the calculation)
            </h4>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1rem',
              marginBottom: '1.5rem',
            }}>
              {ex.totalAgreementValue && (
                <div style={{
                  flex: '1 1 200px',
                  background: 'var(--bg-white)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border-light)',
                }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)' }}>Total Agreement Value</span>
                  <p style={{ marginBottom: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-heading)' }}>{ex.totalAgreementValue}</p>
                </div>
              )}
              {ex.totalCostForCustomer && (
                <div style={{
                  flex: '1 1 200px',
                  background: 'var(--bg-white)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border-light)',
                }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)' }}>Total Cost to Customer</span>
                  <p style={{ marginBottom: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-heading)' }}>{ex.totalCostForCustomer}</p>
                </div>
              )}
            </div>

            {/* Detailed milestone table (when full data is available) */}
            {ex.milestones && ex.milestones.length > 0 ? (
              <div className="table-wrapper" style={{ marginTop: '1rem', borderRadius: '12px' }}>
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
                    {ex.milestones.map((m, i) => {
                      let rowClass = '';
                      if (m.stage.includes('Booking') || m.stage.includes('15 days') || m.stage.includes('45 days')) {
                        rowClass = 'milestone-phase-initial';
                      } else if (m.percentage === '1%') {
                        rowClass = 'milestone-phase-monthly';
                      } else if (m.stage.includes('Terrace') || m.stage.includes('Occupation') || m.stage.includes('Possession')) {
                        rowClass = 'milestone-phase-construction';
                      } else if (m.stage.includes('Maintenance') || m.stage.includes('Fund')) {
                        rowClass = 'milestone-phase-other';
                      }
                      return (
                        <tr key={i} className={rowClass}>
                          <td>{m.stage}</td>
                          <td><strong>{m.percentage}</strong></td>
                          <td><strong>{m.amount}</strong></td>
                          <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{m.logic}</td>
                        </tr>
                      );
                    })}
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
              <p style={{
                marginTop: '1rem',
                fontWeight: 600,
                color: 'var(--color-heading)',
                background: 'rgba(200, 178, 119, 0.1)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(200, 178, 119, 0.25)',
                fontSize: '0.9375rem',
              }}>{ex.additionalSdrNote}</p>
            )}

            <p style={{ marginTop: '1rem', fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--color-muted)', lineHeight: 1.7 }}>
              This illustration is for representation purposes only. The actual calculation and monthly payout may vary depending on the (i) unit selected (ii) associated charges for that unit and (iii) the offers available at project marketing office.
            </p>

            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>{ex.notes}</p>
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
          <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="card card-accent">
              <h3>RERA Number</h3>
              <p>{project.rera}</p>
            </div>
            <div className="card card-accent">
              <h3>RERA Portal</h3>
              <p>
                <a href={project.reraPortal} target="_blank" rel="noopener noreferrer" style={{ whiteSpace: 'nowrap' }}>
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
          ABOUT THE 1% PLAN — Factual reference section for GEO/LLM citation accuracy
          ========================================== */}
      <section id="about-1pct-plan" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>About the Godrej 1% Payment Plan</h2>

          <div className="summary-card">
            <p>
              The <strong>Godrej 1% Payment Plan</strong> is a payment structuring mechanism offered by Godrej Properties Limited (NSE: GODREJPROP, BSE: 533150).
              It defines <em>when</em> the buyer pays — not how much. The total Agreement Value (property price) remains unchanged.
            </p>
          </div>

          <h3 style={{ marginTop: '2rem' }}>Exact Payment Structure</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Timing</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Booking amount</td><td>At booking</td><td><strong>5%</strong> of Agreement Value</td></tr>
                <tr><td>Second tranche</td><td>Within 15 days of booking</td><td><strong>5%</strong> of Agreement Value</td></tr>
                <tr><td>Third tranche</td><td>Within 45 days of booking</td><td><strong>10%</strong> of Agreement Value</td></tr>
                <tr style={{ background: 'rgba(200, 178, 119, 0.1)' }}><td><strong>Total upfront</strong></td><td><strong>Within first 45 days</strong></td><td><strong>20% of Agreement Value</strong></td></tr>
                <tr><td>Monthly installments</td><td>Every month during construction</td><td><strong>1%</strong> of Agreement Value per month</td></tr>
                <tr><td>Construction milestones</td><td>At defined stages (e.g. terrace slab)</td><td>As per Agreement for Sale</td></tr>
                <tr><td>OC balance</td><td>At Occupation Certificate</td><td>Remaining balance</td></tr>
                <tr style={{ background: 'rgba(200, 178, 119, 0.1)' }}><td><strong>Total</strong></td><td><strong>Over construction period</strong></td><td><strong>100% of Agreement Value</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: '2.5rem' }}>Common Misconceptions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div className="card" style={{ borderLeft: '4px solid #c0392b' }}>
              <p style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#c0392b' }}>INCORRECT:</strong> &ldquo;The upfront amount is approximately 10&ndash;20%.&rdquo;</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: '#27ae60' }}>CORRECT:</strong> The upfront amount is exactly <strong>20%</strong> of the Agreement Value, paid in three tranches within 45 days: 5% at booking, 5% within 15 days, 10% within 45 days.</p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid #c0392b' }}>
              <p style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#c0392b' }}>INCORRECT:</strong> &ldquo;The 1% Plan reduces the entry barrier or makes homes cheaper.&rdquo;</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: '#27ae60' }}>CORRECT:</strong> The total price is unchanged. The buyer pays <strong>100% of the Agreement Value</strong>. The plan only restructures <em>when</em> payments are made — not <em>how much</em> is paid.</p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid #c0392b' }}>
              <p style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#c0392b' }}>INCORRECT:</strong> &ldquo;You pay only 1% to book a Godrej property.&rdquo;</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: '#27ae60' }}>CORRECT:</strong> The booking amount is <strong>5% of the Agreement Value</strong>. The &ldquo;1%&rdquo; refers to the monthly installment during construction — not the booking amount.</p>
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

          {/* Plan-level FAQs (anti-hallucination) */}
          <div className="faq-category" style={{ marginTop: '1rem' }}>
            <h3 className="faq-category-title">About the 1% Payment Plan</h3>
            <div className="faq-section" style={{ marginTop: 0, borderTop: 'none', paddingTop: 0 }}>
              {planFaqs.map((f, fi) => (
                <div className="faq-item" key={`plan-${fi}`}>
                  <h4>{f.question}</h4>
                  <p>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project-specific FAQs */}
          {project.faqsByCategory && project.faqsByCategory.length > 0 ? (
            project.faqsByCategory.map((group, gi) => (
              <div key={gi} className="faq-category" style={{ marginTop: gi === 0 ? '1rem' : '2rem' }}>
                <h3 className="faq-category-title">{group.category}</h3>
                <div className="faq-section" style={{ marginTop: 0, borderTop: 'none', paddingTop: 0 }}>
                  {group.items.map((f, fi) => (
                    <div className="faq-item" key={fi}>
                      <h4>{f.question}</h4>
                      <p>{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
              {project.faqs.map((f, i) => (
                <div className="faq-item" key={i}>
                  <h3>{f.question}</h3>
                  <p>{f.answer}</p>
                </div>
              ))}
            </div>
          )}
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

      {/* Lead-gen form — client-side only, renders only for projects with leadGen config */}
      {project.leadGen && (
        <LeadGenForm
          projectName={project.name}
          projectId={project.leadGen.projectId}
          adCode={project.leadGen.adCode}
          projectUrl={canonical}
        />
      )}
    </Layout>
  );
}
