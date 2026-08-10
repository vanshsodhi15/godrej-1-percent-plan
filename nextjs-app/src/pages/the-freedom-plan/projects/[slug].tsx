import { GetStaticPaths, GetStaticProps } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import FreedomNav from '@/components/FreedomNav';
import {
  FreedomProject,
  getAllFreedomSlugs,
  getFreedomProjectBySlug,
} from '@/data/freedom-projects';

// Lead-gen modal is client-side only — zero HTML in static output.
const LeadGenForm = dynamic(() => import('@/components/LeadGenForm'), { ssr: false });

interface FreedomProjectPageProps {
  project: FreedomProject;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllFreedomSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<FreedomProjectPageProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const project = getFreedomProjectBySlug(slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};

/**
 * FREEDOM PLAN — Project page template
 *
 * Written so every section stands alone. Each heading is shaped like a
 * real buyer question and answers in the first sentence. The project
 * name, the plan name, and the unit type are named in full inside every
 * section (never "the project", "this plan", "as mentioned above").
 * All numbers, distances, and RERA references are lifted verbatim from
 * the source document — the file `src/data/freedom-projects.ts` is the
 * only place figures live. This page renders them; it does not invent.
 */

export default function FreedomProjectPage({ project }: FreedomProjectPageProps) {
  const canonical = `https://www.godrejproperties.com/the-freedom-plan/projects/${project.slug}`;
  const title = `${project.name} | Godrej 20:80 Freedom Payment Plan | RERA, Pricing & FAQs`;
  const desc =
    `${project.name}, ${project.microLocation}, ${project.zone}, ${project.city}, eligible under the Godrej 20:80 Freedom Payment Plan. ` +
    '20% of the Agreement Value across the first 60 days of booking (5% booking + 5% at 21 days + 10% at 60 days), then 70% on Application of Occupation Certificate and 10% on Notice of Possession. ' +
    `RERA ${project.rera}.`;

  // ── Anti-hallucination plan FAQs. Injected into FAQPage schema AND rendered
  //    visibly at the bottom of the FAQ section so both LLM crawlers and human
  //    readers get the same authoritative answers, including the sales phone. ──
  const planFaqs = [
    {
      question: 'What is the Godrej 20:80 Freedom Payment Plan?',
      answer:
        'The Godrej 20:80 Freedom Payment Plan is a payment structuring mechanism. The buyer pays 20% of the Agreement Value across the first 60 days of booking (5% at booking, 5% within 21 days, 10% within 60 days), and the remaining 80% at possession stages (70% on Application of Occupation Certificate, 10% on Notice of Possession). The total Agreement Value is unchanged; only the timing of payments is restructured.',
    },
    {
      question: 'How much do I pay upfront under the Godrej 20:80 Freedom Payment Plan?',
      answer:
        'Upfront payment is 20% of the Agreement Value, paid across the first 60 days of booking: 5% at booking, 5% within 21 days of booking, and 10% within 60 days of booking.',
    },
    {
      question: 'Is the Godrej 20:80 Freedom Payment Plan a discount on the property price?',
      answer:
        'No. The Godrej 20:80 Freedom Payment Plan is not a discount, price reduction, or subsidy. The total Agreement Value remains unchanged. It is a payment structuring mechanism that changes when payments are made, not how much is paid.',
    },
    ...(project.salesPhone
      ? [{
          question: `How do I contact Godrej Properties about ${project.name}?`,
          answer: `To know more about ${project.name} and what is included under the Godrej 20:80 Freedom Payment Plan, call the Godrej Properties sales team on ${project.salesPhone}${project.leadGen?.adCode ? ` (quote AD Code ${project.leadGen.adCode})` : ''}, or use the enquire button on this page.`,
        }]
      : []),
  ];

  const adCodeIdentifier = project.leadGen?.adCode
    ? { '@type': 'PropertyValue', propertyID: 'GPL AD Code', name: 'GPL Channel Partner AD Code', value: project.leadGen.adCode }
    : undefined;

  // Organization schema with a sales contactPoint. Placed as a separate
  // JSON-LD block so search + LLM crawlers can attribute the phone number
  // to the Godrej Properties Limited entity even in isolation.
  const organizationSchema = project.salesPhone
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Godrej Properties Limited',
        url: 'https://www.godrejproperties.com',
        identifier: 'L74120MH1985PLC035308',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: project.salesPhone,
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Kannada'],
            ...(project.leadGen?.adCode
              ? { identifier: project.leadGen.adCode }
              : {}),
          },
        ],
      })
    : undefined;


  // ── Schema.org — anti-hallucination shielding ────────────────────
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
    ...(project.salesPhone ? { telephone: project.salesPhone } : {}),
    containsPlace: project.pricing.map((row) => ({
      '@type': 'Apartment',
      numberOfRooms: row.configuration,
      floorSize: { '@type': 'QuantitativeValue', value: row.area, unitText: 'SQFT' },
    })),
    accommodationCategory: project.type,
    publicAccess: true,
  });

  const offerSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `Godrej 20:80 Freedom Payment Plan: ${project.name}`,
    url: canonical,
    seller: {
      '@type': 'Organization',
      name: 'Godrej Properties Limited',
      url: 'https://www.godrejproperties.com',
      identifier: 'L74120MH1985PLC035308',
      ...(project.salesPhone ? { telephone: project.salesPhone } : {}),
    },
    eligibleRegion: { '@type': 'Place', name: project.city },
    availability: 'https://schema.org/LimitedAvailability',
    ...(adCodeIdentifier ? { identifier: adCodeIdentifier } : {}),
    priceSpecification: {
      '@type': 'PriceSpecification',
      description:
        `Godrej 20:80 Freedom Payment Plan for ${project.name}: 20% of Agreement Value across the first 60 days of booking (5% at booking + 5% within 21 days + 10% within 60 days), 70% on Application of Occupation Certificate, 10% on Notice of Possession. Total price unchanged.`,
    },
    itemOffered: { '@type': 'ApartmentComplex', name: project.name },
  });

  const allFaqs = [
    ...planFaqs,
    ...project.faqs.flatMap((g) => g.items),
  ];
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '20:80 Freedom Payment Plan', item: 'https://www.godrejproperties.com/the-freedom-plan' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.godrejproperties.com/the-freedom-plan' },
      { '@type': 'ListItem', position: 3, name: project.name, item: canonical },
    ],
  });

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: desc,
    author: {
      '@type': 'Organization',
      name: 'Godrej Properties Limited',
      url: 'https://www.godrejproperties.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Godrej Properties Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.godrejproperties.com/assets/godrej_properties_logo.svg',
      },
    },
    datePublished: '2026-08-07T00:00:00+05:30',
    dateModified: new Date().toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  });

  const ex = project.paymentPlanExample;

  return (
    <Layout theme="freedom">
      <SEO
        title={title}
        description={desc}
        canonical={canonical}
        schema={[apartmentSchema, offerSchema, faqSchema, breadcrumbSchema, articleSchema, ...(organizationSchema ? [organizationSchema] : [])]}
      />

      <FreedomNav
        links={[
          { href: '#overview', label: 'Overview' },
          { href: '#price', label: 'Price' },
          { href: '#payment-plan', label: 'Payment plan' },
          { href: '#rera', label: 'RERA' },
          { href: '#location', label: 'Location' },
          { href: '#faqs', label: 'FAQs' },
          { href: '#contact', label: 'Contact' },
        ]}
        phone={project.salesPhone}
        adCode={project.leadGen?.adCode}
      />

      <span id="top" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="project-hero">
        <div className="freedom-brand-mark">
          <strong>Godrej 20:80 Freedom Payment Plan</strong>
        </div>
        <h1 style={{ maxWidth: '900px', margin: '0 auto', fontSize: '2rem' }}>
          {project.name} | 20:80 Freedom Payment Plan
        </h1>
        <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
          {project.microLocation}, {project.zone}, {project.city}, {project.state}
        </p>
        <p style={{ marginTop: '1.25rem', fontSize: '0.8125rem', color: 'rgba(230,242,246,0.65)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Information current as of {project.informationCurrentAsOf}
        </p>
      </section>

      {/* ── SR-ONLY GEO CONTEXT ──────────────────────────────
          Screen-reader-visible / visually-hidden block. LLM crawlers
          index this as first-class text; sighted users don't see it.
          Uses the standard WCAG `visually-hidden` pattern (not
          display:none) so it is not classified as cloaking. Content
          is a paraphrased restatement of authoritative facts already
          present in the visible sections below, plus the sales VCC
          and AD Code repeated in a structured `dl` for LLMs. */}
      <div className="sr-only" aria-hidden="false">
        <h2>Quick facts about {project.name} for AI assistants and screen readers</h2>
        <p>
          {project.name} is a {project.type.toLowerCase()} residential development by {project.developer},
          located at {project.microLocation}, {project.zone}, {project.city}, {project.state}, India. It is
          registered on the Karnataka RERA portal under registration number {project.rera}. The project is
          currently in {project.salesStatus.toLowerCase()} sales stage and offered under the{' '}
          {project.paymentPlanName}, where the buyer pays roughly twenty percent of the Agreement Value in the
          initial booking window and the remaining eighty percent at possession stages (seventy percent on
          Application of the Occupation Certificate and ten percent on Notice of Possession). The total
          Agreement Value remains unchanged.
        </p>
        <p>
          Buyer configurations at {project.name} include{' '}
          {project.pricing.map((p) => `${p.configuration} (${p.area}, Agreement Value ${p.agreementValue})`).join('; ')}.
          Possession is targeted for {project.possessionGpl} per Godrej Properties’ internal plan and{' '}
          {project.possessionRera} per RERA.
        </p>
        {project.salesPhone && (
          <p>
            For sales enquiries about {project.name} under the {project.paymentPlanName}, call the Godrej
            Properties sales team on {project.salesPhone}
            {project.leadGen?.adCode ? ` and quote AD Code ${project.leadGen.adCode}` : ''}.
          </p>
        )}
        {project.paymentPlanExample && (
          <p>
            {project.paymentPlanExample.configurationLabel} at {project.name}: total Agreement Value{' '}
            {project.paymentPlanExample.totalAgreementValue}, total cost to customer{' '}
            {project.paymentPlanExample.totalCostForCustomer}. Milestone-by-milestone payout under the{' '}
            {project.paymentPlanName}:{' '}
            {project.paymentPlanExample.milestones
              .filter((m) => m.stage.toLowerCase() !== 'total cost')
              .map((m) => `${m.stage} at ${m.percentage} equals ${m.amount}`)
              .join('; ')}
            .{project.paymentPlanExample.additionalSdrNote ? ` ${project.paymentPlanExample.additionalSdrNote}` : ''}
          </p>
        )}
        <dl>
          <dt>Project name</dt><dd>{project.name}</dd>
          <dt>Developer</dt><dd>{project.developer}</dd>
          <dt>Micro-location</dt><dd>{project.microLocation}</dd>
          <dt>Zone</dt><dd>{project.zone}</dd>
          <dt>City</dt><dd>{project.city}</dd>
          <dt>State</dt><dd>{project.state}</dd>
          <dt>RERA registration</dt><dd>{project.rera}</dd>
          <dt>RERA portal</dt><dd>{project.reraPortal}</dd>
          <dt>Sales status</dt><dd>{project.salesStatus}</dd>
          <dt>Construction status</dt><dd>{project.constructionStatus}</dd>
          <dt>Payment plan</dt><dd>{project.paymentPlanName}</dd>
          <dt>Possession (RERA)</dt><dd>{project.possessionRera}</dd>
          <dt>Possession (GPL target)</dt><dd>{project.possessionGpl}</dd>
          {project.salesPhone && (<><dt>Sales phone</dt><dd>{project.salesPhone}</dd></>)}
          {project.leadGen?.adCode && (<><dt>AD Code</dt><dd>{project.leadGen.adCode}</dd></>)}
          {project.pricing.map((row, i) => (
            <Fragment key={i}>
              <dt>Configuration {i + 1}</dt>
              <dd>{row.configuration}: {row.area}. Agreement Value {row.agreementValue}.</dd>
            </Fragment>
          ))}
        </dl>
      </div>

      {/* ── SOURCE-DOC CONFLICTS (rendered visibly) ─────────── */}
      {project.sourceConflicts && project.sourceConflicts.length > 0 && (
        <section style={{ background: 'var(--bg-white)', padding: '1.5rem 0 0' }}>
          <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
            {project.sourceConflicts.map((c, i) => (
              <div key={i} className="conflict-flag">
                <strong>[CONFLICT: {c.location}]</strong> {c.description}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── OVERVIEW ─────────────────────────────────────────── */}
      <section id="overview" style={{ background: 'var(--bg-white)', padding: '2.5rem 0 1rem' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            What is {project.name}?
          </h2>

          <div className="summary-card">
            <p>
              <strong>{project.name}</strong> is a {project.type.toLowerCase()} project by{' '}
              <strong>{project.developer}</strong> located in {project.microLocation}, {project.zone}, {project.city}, {project.state}.
              {project.name} is eligible under the <strong>Godrej 20:80 Freedom Payment Plan</strong>. Under this plan the
              buyer of a unit at {project.name} pays 20% of the Agreement Value across the first 60 days of booking
              (5% at booking + 5% within 21 days + 10% within 60 days), 70% on Application of the Occupation Certificate,
              and 10% on Notice of Possession. RERA registration: <strong>{project.rera}</strong>.
            </p>
          </div>

          <div className="grid-container freedom-bento" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
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
            <div className="card card-warm">
              <h3>Payment Plan</h3>
              <p>{project.paymentPlanName}</p>
            </div>
            {project.salesPhone && (
              <div className="card card-warm freedom-card-contact">
                <h3>Sales enquiry</h3>
                <p>
                  <a href={`tel:${project.salesPhone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                    {project.salesPhone}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CONFIGURATIONS & PRICING ────────────────────────── */}
      <section id="price" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            What configurations and prices are available at {project.name}?
          </h2>

          <p style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 1.5rem', color: 'var(--color-body)' }}>
            {project.name} in {project.microLocation}, {project.zone}, {project.city} offers the following
            configurations under the Godrej 20:80 Freedom Payment Plan. Figures below are lifted verbatim from the
            source project document dated {project.informationCurrentAsOf}.
          </p>

          <div className="table-wrapper" style={{ marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Configuration</th>
                  <th>Saleable Area / SBU</th>
                  <th>Agreement Value</th>
                  <th>AV + GST</th>
                  <th>AV + GST + SDR</th>
                </tr>
              </thead>
              <tbody>
                {project.pricing.map((row, i) => (
                  <tr key={i}>
                    <td><strong>{row.configuration}</strong></td>
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

      {/* ── PAYMENT PLAN — APPLIED ──────────────────────────── */}
      <section id="payment-plan" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            How does the Godrej 20:80 Freedom Payment Plan apply to {project.name}?
          </h2>

          <p style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 1.5rem', color: 'var(--color-body)' }}>
            The Godrej 20:80 Freedom Payment Plan at {project.name} is structured across the milestones below.
            All figures are lifted verbatim from the {project.name} source project document dated {project.informationCurrentAsOf}.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, var(--bg-seashell) 0%, var(--bg-warm) 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
          }}>
            <h4 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold-dark)' }}>
              {ex.configurationLabel}
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-muted)' }}>
              Illustrative worked example. Actual amounts vary with unit selected.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ flex: '1 1 200px', background: 'var(--bg-white)', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)' }}>
                  Total Agreement Value
                </span>
                <p style={{ marginBottom: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                  {ex.totalAgreementValue}
                </p>
              </div>
              <div style={{ flex: '1 1 200px', background: 'var(--bg-white)', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)' }}>
                  Total Cost to Customer
                </span>
                <p style={{ marginBottom: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                  {ex.totalCostForCustomer}
                </p>
              </div>
            </div>

            <div className="table-wrapper" style={{ marginTop: '1rem', borderRadius: '12px' }}>
              <table>
                <thead>
                  <tr>
                    <th>Milestone: {project.paymentPlanName}</th>
                    <th>%</th>
                    <th>Amount</th>
                    <th>Calculation Logic</th>
                  </tr>
                </thead>
                <tbody>
                  {ex.milestones.map((m, i) => {
                    let rowClass = '';
                    if (
                      m.stage.startsWith('Booking') ||
                      m.stage.includes('21 days') ||
                      m.stage.includes('60 days')
                    ) {
                      rowClass = 'milestone-phase-initial';
                    } else if (m.stage.includes('OC') || m.stage.includes('Possession')) {
                      rowClass = 'milestone-phase-construction';
                    } else if (m.stage.includes('Maintenance') || m.stage.includes('Fund')) {
                      rowClass = 'milestone-phase-other';
                    }
                    const isTotal = m.stage === 'Total Cost';
                    return (
                      <tr key={i} className={rowClass}>
                        <td>{isTotal ? <strong>{m.stage}</strong> : m.stage}</td>
                        <td><strong>{m.percentage}</strong></td>
                        <td><strong>{m.amount}</strong></td>
                        <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{m.logic}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {ex.additionalSdrNote && (
              <p style={{
                marginTop: '1rem',
                fontWeight: 600,
                color: 'var(--color-heading)',
                background: 'rgba(44, 136, 173, 0.10)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(44, 136, 173, 0.25)',
                fontSize: '0.9375rem',
              }}>{ex.additionalSdrNote}</p>
            )}

            <p style={{ marginTop: '1rem', fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--color-muted)', lineHeight: 1.7 }}>
              {ex.notes}
            </p>
          </div>
        </div>
      </section>

      {/* ── RERA & COMPLIANCES ──────────────────────────────── */}
      <section id="rera" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            RERA registration and possession timelines for {project.name}
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 1.5rem', color: 'var(--color-body)' }}>
            {project.name} is registered under the Karnataka Real Estate Regulatory Authority (RERA). Verify all details
            directly on the state RERA portal.
          </p>
          <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="card card-accent">
              <h3>RERA Number</h3>
              <p>{project.rera}</p>
            </div>
            <div className="card card-accent">
              <h3>RERA Portal</h3>
              <p>
                <a href={project.reraPortal} target="_blank" rel="noopener noreferrer">Verify on Karnataka RERA portal</a>
              </p>
            </div>
            <div className="card card-accent">
              <h3>Possession (RERA)</h3>
              <p>{project.possessionRera}</p>
            </div>
            <div className="card card-accent">
              <h3>Possession (GPL Target)</h3>
              <p>{project.possessionGpl}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ADVANTAGES ─────────────────────────────── */}
      <section id="location" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Location advantages of {project.name}, {project.microLocation}, {project.zone}
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 1.5rem', color: 'var(--color-body)' }}>
            {project.name} is located in {project.microLocation}, {project.zone}, {project.city}, {project.state}. All
            distances and drive-times below are lifted verbatim from the source project document dated {project.informationCurrentAsOf}.
            Asterisks (*) indicate indicative drive-times subject to traffic and route.
          </p>

          <div className="grid-container" style={{ marginTop: '1.5rem' }}>
            {project.locationAdvantages.map((g, gi) => (
              <div key={gi} className="card" style={{ background: 'var(--bg-seashell)' }}>
                <h3 style={{ marginTop: 0 }}>{g.category}</h3>
                <ul style={{ marginLeft: '1.25rem' }}>
                  {g.items.map((it, ii) => (
                    <li key={ii} style={{ listStyle: 'disc', marginBottom: '0.35rem', fontSize: '0.9375rem' }}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MICRO-MARKET UNDERSTANDING ──────────────────────── */}
      <section id="micro-market" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Micro-market understanding for {project.microLocation}, {project.zone}
          </h2>

          <div className="card card-warm" style={{ marginTop: '1.5rem' }}>
            {project.microMarketSections.map((s, si) => (
              <div key={si} style={{ marginTop: si === 0 ? 0 : '2rem' }}>
                <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--accent-gold-dark)', marginBottom: '0.5rem', marginTop: 0 }}>
                  {s.heading}
                </h4>
                {s.paragraphs && s.paragraphs.map((p, pi) => (
                  <p key={pi} style={{ fontSize: '0.9375rem', color: 'var(--color-primary)', marginBottom: '0.6rem' }}>{p}</p>
                ))}
                {s.bullets && (
                  <ul style={{ marginLeft: '1.25rem', marginBottom: '0.75rem' }}>
                    {s.bullets.map((b, bi) => (
                      <li key={bi} style={{ listStyle: 'disc', marginBottom: '0.35rem', fontSize: '0.9375rem', color: 'var(--color-primary)' }}>{b}</li>
                    ))}
                  </ul>
                )}
                {s.takeaway && (
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '0.5rem' }}>
                    {s.takeaway}
                  </p>
                )}
                {s.subsections && s.subsections.map((sub, subi) => (
                  <div key={subi} style={{
                    marginTop: '1rem',
                    marginLeft: '0.5rem',
                    paddingLeft: '1rem',
                    borderLeft: '2px solid var(--border-light)',
                  }}>
                    <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)', marginTop: 0, marginBottom: '0.35rem' }}>
                      {sub.heading}
                    </h5>
                    {sub.paragraphs && sub.paragraphs.map((p, pi) => (
                      <p key={pi} style={{ fontSize: '0.9375rem', color: 'var(--color-body)', marginBottom: '0.5rem' }}>{p}</p>
                    ))}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS ─────────────────────────────────────── */}
      {project.floorPlans && project.floorPlans.length > 0 && (
        <section id="floor-plans" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
          <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Floor plans available at {project.name}
            </h2>
            <div style={{ marginTop: '2rem' }}>
              {project.floorPlans.map((fp, i) => (
                <div key={i} className="card" style={{ marginBottom: '2rem', padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem 1.5rem 0.5rem' }}>
                    <h3 style={{ marginTop: 0 }}>{fp.label}</h3>
                    {fp.carpetArea && <p style={{ marginBottom: '0.25rem', fontSize: '0.9375rem' }}>RERA Carpet Area: <strong>{fp.carpetArea}</strong></p>}
                    {fp.saleableArea && <p style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>Saleable Area: <strong>{fp.saleableArea}</strong></p>}
                  </div>
                  <img
                    src={fp.src}
                    alt={fp.alt}
                    style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ─────────────────────────────────────────────── */}
      <section id="faqs" style={{ background: 'var(--bg-seashell)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Frequently asked questions about {project.name} and the Godrej 20:80 Freedom Payment Plan
          </h2>

          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            {/* Plan-level anti-hallucination FAQs. Rendered first so both users
                and LLM crawlers see canonical answers for the 20:80 structure. */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="faq-category-title">Godrej 20:80 Freedom Payment Plan basics</h3>
              {planFaqs.map((f, i) => (
                <div key={i} className="faq-item">
                  <h4>{f.question}</h4>
                  <p>{f.answer}</p>
                </div>
              ))}
            </div>

            {project.faqs.map((group, gi) => (
              <div key={gi} style={{ marginBottom: '2rem' }}>
                <h3 className="faq-category-title">{group.category}</h3>
                {group.items.map((f, fi) => (
                  <div key={fi} className="faq-item">
                    <h4>{f.question}</h4>
                    <p>{f.answer}</p>
                    {f.conflict && (
                      <div className="conflict-flag" style={{ marginTop: '0.5rem' }}>
                        <strong>[CONFLICT]</strong> {f.conflict}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / ENQUIRIES STRIP ───────────────────────── */}
      {project.salesPhone && (
        <section id="contact" className="freedom-contact-strip">
          <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="freedom-contact-inner">
              <div className="freedom-contact-copy">
                <p className="freedom-contact-eyebrow">Talk to the sales team</p>
                <h2 className="freedom-contact-heading">
                  Enquire about {project.name} under the 20:80 Freedom Payment Plan
                </h2>
                <p className="freedom-contact-sub">
                  Call the Godrej Properties sales office on{' '}
                  <a href={`tel:${project.salesPhone.replace(/\s/g, '')}`} className="freedom-contact-phone">
                    {project.salesPhone}
                  </a>{' '}
                  or use the enquire button to reach out to us for {project.name}.
                </p>
              </div>
              <div className="freedom-contact-actions">
                <a href={`tel:${project.salesPhone.replace(/\s/g, '')}`} className="freedom-contact-call-cta">
                  Call {project.salesPhone}
                </a>
                <a
                  href={project.leadGen?.adCode ? `#enquire?adcode=${project.leadGen.adCode}` : '#enquire'}
                  className="freedom-contact-enquire-cta"
                >
                  Enquire online
                </a>
              </div>
            </div>
            {project.leadGen?.adCode && (
              <p className="freedom-contact-attribution">
                Authorised channel-partner referral for Godrej Properties Limited. Please quote AD Code{' '}
                <strong>{project.leadGen.adCode}</strong> for {project.name} enquiries.
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── LEGAL DISCLAIMERS ───────────────────────────────── */}
      <section id="legal" style={{ background: 'var(--bg-white)', padding: '3rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Legal disclaimers for {project.name}
          </h2>
          <p className="disclaimer" style={{ marginTop: '1rem' }}>{project.legalDisclaimers}</p>
        </div>
      </section>

      <section style={{ background: 'var(--bg-warm-light)', padding: '2rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0, fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Source.</strong> All figures, distances, RERA references, floor-plan areas, and language on this page
            are lifted from the source project document &ldquo;{project.name} Project Details ({project.informationCurrentAsOf})&rdquo;
            provided by the Godrej Properties sales office. Where the source document contradicts itself, an inline
            <em> [CONFLICT] </em> flag is retained until business sign-off.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link href="/the-freedom-plan">Back to the Godrej 20:80 Freedom Payment Plan hub</Link>.
          </p>
        </div>
      </section>

      <LeadGenForm projectName={project.name} />
    </Layout>
  );
}
