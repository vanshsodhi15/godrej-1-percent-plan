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
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>1% Plan: Safety & Governance</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Institutional Safeguards</h2>
          <article>
            <div className="summary-card">
              <p><strong></strong> The Godrej 1% Plan safety framework is a multi-layered regulatory structure backed by <strong>Godrej Properties</strong>, a SEBI-listed public entity. All projects are <strong>RERA-registered</strong> with a 70% escrow mandate, ensuring that the <a href="/the-1-percent-plan">1% payment tranches</a> are utilized exclusively for construction and land costs.</p>
            </div>

            <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.5rem' }}>The Governance Checklist</h3>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '1rem auto' }}>
              Institutional governance ensures that every ₹1.5 Cr+ decision is backed by publicly verifiable records. At Godrej Properties, safety is not a claim&mdash;it is a result of strict adherence to RERA, SEBI, and <a href="/the-1-percent-plan/how-it-works" style={{ color: 'inherit', textDecoration: 'underline' }}>milestone-linked transparency</a>.
            </p>
            <div className="grid-container" style={{ marginTop: '2.5rem' }}>
              <div className="card card-accent">
                <h3>✓ RERA Mandate</h3>
                <p>Every project is registered. 70% of funds are maintained in project-specific escrow accounts. This ensures that the capital you invest is used specifically for your project&apos;s construction and land costs.</p>
              </div>
              
              <div className="card card-accent">
                <h3>✓ SEBI & Public Scrutiny</h3>
                <p>As a listed public company, Godrej Properties is subject to quarterly investor calls, audits, and strict disclosures. This eliminates &ldquo;related-party&rdquo; hidden risks that often plague unstructured developers.</p>
              </div>
              
              <div className="card card-accent">
                <h3>✓ Data & Customer Protection</h3>
                <p>All operations, including customer data handling, are compliant with DPDP standards. This adds a layer of modern institutional security to the traditional real estate journey.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Due Diligence: Credit Ratings</h2>
          <div className="grid-container">
            <div className="card card-warm">
              <h3>CRISIL / ICRA Highly Rated</h3>
              <p>Almost no real estate buyer uses this tool, even though it is public and free. Ratings from CRISIL or ICRA disclose the developer&apos;s financial health, project pipeline, and delivery track record to the public.</p>
            </div>
            <div className="card card-warm">
              <h3>Clean Balance Sheet</h3>
              <p>Godrej Properties maintains a clean balance sheet and a strong parent group backing. The &ldquo;Delivery-to-booking ratio&rdquo; is a key metric that demonstrates consistent fulfillment of customer promises.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>Is the 1% Plan more risky?</h3>
              <p>On the contrary, it is more structured. Unlike informal payment arrangements, it is backed by a reputed developer and linked to a regulated framework with no ambiguity on timelines.</p>
            </div>
            <div className="faq-item">
              <h3>Does it change legal ownership?</h3>
              <p>No. The 1% Plan only restructures the payment flow. All ownership rights and legal structures remain standard as documented in the BBA.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
