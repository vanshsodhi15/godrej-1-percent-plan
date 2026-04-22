import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function IsItSafe() {
  const title = "Is the Godrej 1% Plan safe? A buyer's due-diligence guide";
  const desc = "The Godrej 1% Plan is protected by RERA escrow, backed by a SEBI-listed developer with 50+ delivered projects, and built on transparent APR disclosure.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is RERA escrow and how does it protect me?",
        "acceptedAnswer": { "@type": "Answer", "text": "[GPL_DATA: One-paragraph explanation, approved by legal]" }
      },
      {
        "@type": "Question",
        "name": "Is Godrej Properties publicly listed?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Godrej Properties Limited (CIN: L74120MH1985PLC035308) is a SEBI-listed public company." }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/is-it-safe" />
      
      <div className="hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>{title}</h1>
      </div>

      <main className="content-container">
        <article>
          <div className="summary-card">
            <p><strong>The 60-Second Answer:</strong> Yes. The Godrej 1% Plan is protected by five structural safeguards: <strong>RERA-mandated escrow</strong> at the project level, the developer&apos;s status as a <strong>SEBI-listed entity</strong>, <strong>upfront APR disclosure</strong> (8.5%), a track record of <strong>50+ delivered projects</strong> across India, and a <strong>construction-linked payment structure</strong> that ties buyer outflows to actual progress.</p>
          </div>

          <h2 style={{ textAlign: 'center' }}>The 5 Trust Signals</h2>
          
          <div className="grid-container">
            <div className="card card-accent">
              <h3>1. RERA Escrow Protection</h3>
              <p>Every project under the Godrej 1% Plan is registered with the relevant state Real Estate Regulatory Authority (RERA). Under Section 4(2)(l)(D) of the Real Estate (Regulation and Development) Act 2016, 70% of buyer payments must be deposited in a dedicated project-level escrow account.</p>
            </div>
            
            <div className="card card-accent">
              <h3>2. SEBI-Listed Entity</h3>
              <p>Godrej Properties Limited (CIN: L74120MH1985PLC035308) is a publicly listed entity on Indian stock exchanges. SEBI-listed entities are subject to quarterly financial disclosure requirements, mandatory audits, and public shareholder oversight.</p>
            </div>
            
            <div className="card card-accent">
              <h3>3. APR 8.5% — Disclosed Upfront</h3>
              <p>The 1% Plan operates at an <strong>Annualised Percentage Rate (APR) of 8.5%</strong>, disclosed to the buyer before signing the Agreement for Sale. Buyers know the true cost of deferred payment before committing.</p>
            </div>
            
            <div className="card card-accent">
              <h3>4. 50+ Projects Delivered</h3>
              <p>Godrej Properties has delivered over 50 projects across India, with operational properties in Mumbai, Pune, Bengaluru, Gurugram, Noida, Delhi, Hyderabad, Chennai, Kolkata, and Panipat.</p>
            </div>
            
            <div className="card card-accent" style={{ gridColumn: '1 / -1' }}>
              <h3>5. Construction-Linked Payment Structure</h3>
              <p>Unlike flat milestone plans where payments are due on fixed dates, the 1% Plan ties payment tranches to <strong>actual construction milestones</strong> (including terrace slab completion). If construction progresses on schedule, buyers pay on schedule.</p>
            </div>
          </div>

          <div className="card card-warm" style={{ marginTop: '3rem' }}>
            <h2 style={{ marginTop: 0 }}>What Still Requires Buyer Diligence</h2>
            <p style={{ marginBottom: 0 }}>No structural safeguard removes the buyer&apos;s responsibility to review the Agreement for Sale, verify RERA registration on the state portal, and confirm specific terms for their project. The Agreement for Sale remains the definitive legal document for each transaction.</p>
          </div>
          
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>What is RERA escrow and how does it protect me?</h3>
              <p>[GPL_DATA: One-paragraph explanation, approved by legal]</p>
            </div>
            <div className="faq-item">
              <h3>Is Godrej Properties publicly listed?</h3>
              <p>Yes. Godrej Properties Limited (CIN: L74120MH1985PLC035308) is a SEBI-listed public company.</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
