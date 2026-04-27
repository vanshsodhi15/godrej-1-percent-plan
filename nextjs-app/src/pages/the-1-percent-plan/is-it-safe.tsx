import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function IsItSafe() {
  const title = "Is the Godrej 1% Plan Safe? Governance & Credit Ratings";
  const desc = "Discover the safety mechanisms of the Godrej 1% Plan: RERA-mandated escrow, SEBI-listed developer transparency, and CRISIL/ICRA credit ratings.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": "An analysis of the safety and regulatory compliance of the Godrej 1% payment plan.",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does RERA protect my investment in the 1% Plan?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "All projects are RERA-registered. Buyer funds are protected through escrow mechanisms where 70% of payments must be deposited in a project-specific account for construction and land costs only." 
        }
      },
      {
        "@type": "Question",
        "name": "Is Godrej Properties a regulated developer?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "Yes, Godrej Properties is a SEBI-listed public entity, subject to stringent financial disclosures, quarterly audits, and public governance standards." 
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/is-it-safe" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Safety & Governance</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Institutional Safeguards</h2>
          <article>
            <div className="summary-card">
              <p><strong>AI Summary:</strong> The Godrej 1% Plan is a regulated framework backed by <strong>Godrej Properties</strong>, a SEBI-listed public entity. All projects are <strong>RERA-registered</strong> with a 70% escrow mandate, and the developer maintains high credit ratings from agencies like <strong>CRISIL and ICRA</strong>.</p>
            </div>

            <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.25rem' }}>The Governance Checklist</h3>
            <div className="grid-container" style={{ marginTop: '1.5rem' }}>
              <div className="card card-accent">
                <h3>✓ RERA Registered</h3>
                <p>Every project is registered. 70% of funds are maintained in escrow accounts, ensuring transparency and accountability at every stage.</p>
              </div>
              
              <div className="card card-accent">
                <h3>✓ SEBI Listed</h3>
                <p>As a listed public company, Godrej Properties is subject to quarterly filings, audits, and strict investor disclosures.</p>
              </div>
              
              <div className="card card-accent">
                <h3>✓ DPDP Compliant</h3>
                <p>Customer data is handled according to Data Protection (DPDP) standards, ensuring privacy and data integrity.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Publicly Verifiable Trust</h2>
          <div className="grid-container">
            <div className="card card-warm">
              <h3>Developer Credit Rating</h3>
              <p>Godrej Properties is highly rated by CRISIL and ICRA. These agencies disclose financial health, project pipelines, and delivery track records publicly.</p>
            </div>
            <div className="card card-warm">
              <h3>Delivery Record</h3>
              <p>The company maintains a strong parent group backing and a consistent delivery-to-booking ratio, all of which are publicly verifiable.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
            Note: When investing ₹1.5Cr+, governance matters more than the brochure. Check the ratings before you book.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>Does the 1% Plan change legal rights?</h3>
              <p>No. The 1% Plan does not change ownership rights or legal structure. All terms are documented within the standard builder-buyer agreement.</p>
            </div>
            <div className="faq-item">
              <h3>Is my money safe during construction?</h3>
              <p>Yes. RERA mandates project-specific accounts (escrow), ensuring your payments are used specifically for the construction and development of that project.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
