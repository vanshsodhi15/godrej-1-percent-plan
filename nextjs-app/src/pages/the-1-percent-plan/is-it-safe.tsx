import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function IsItSafe() {
  const title = "Is the Godrej 1% Plan Safe? Regulatory Oversight & Trust";
  const desc = "Discover the safety mechanisms of the Godrej 1% Plan: RERA-mandated escrow, SEBI-listed developer transparency, and structured builder-buyer agreements.";
  
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
          "text": "All projects are RERA-registered. Buyer funds are protected through escrow mechanisms where 70% of payments must be deposited in a project-specific account for construction use only." 
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
      
      <div className="hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Safety & Transparency</h1>
      </div>

      <main className="content-container">
        <article>
          <section className="summary-card">
            <p><strong>The 60-Second Answer:</strong> The Godrej 1% Plan is not just a payment structure; it is a regulated framework. It operates within the strict bounds of <strong>RERA compliance</strong>, <strong>SEBI oversight</strong>, and <strong>institutional governance</strong>, ensuring that every rupee paid is accounted for and tied to project progress.</p>
          </section>

          <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Four Pillars of Buyer Protection</h2>
          
          <div className="grid-container">
            <div className="card card-accent">
              <h3>1. RERA Compliance</h3>
              <p>Every project is RERA-registered. Funds are protected through escrow accounts, and all timelines and approvals are publicly disclosed on the RERA portal.</p>
            </div>
            
            <div className="card card-accent">
              <h3>2. Developer Credibility</h3>
              <p>As a SEBI-listed public entity, Godrej Properties Limited maintains high standards of financial transparency and corporate governance.</p>
            </div>
            
            <div className="card card-accent">
              <h3>3. Structured Documentation</h3>
              <p>The 1% Plan does not change your legal rights. All terms are explicitly documented within the standard Builder-Buyer Agreement (BBA).</p>
            </div>
            
            <div className="card card-accent">
              <h3>4. Milestone Alignment</h3>
              <p>Unlike informal arrangements, this plan is linked to an organized framework where obligations and timelines are clearly defined and backed by a reputed developer.</p>
            </div>
          </div>

          <div className="card card-warm" style={{ marginTop: '3rem' }}>
            <h2 style={{ marginTop: 0 }}>The Safety Takeaway</h2>
            <p style={{ marginBottom: 0 }}>The 1% Plan is not about reducing risk—it’s about structuring entry better while operating within a highly regulated and credible ecosystem. It aligns affordability with the certainty of a professional developer.</p>
          </div>
          
          <section className="faq-section" style={{ marginTop: '4rem' }}>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>How does RERA protect me?</h3>
              <p>RERA mandates that 70% of all collections be kept in an escrow account, ensuring funds are used specifically for the project&apos;s construction and land costs.</p>
            </div>
            <div className="faq-item">
              <h3>Are there any hidden costs?</h3>
              <p>No. The APR of 8.5% is disclosed upfront and all charges are part of the transparent agreement for sale.</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
