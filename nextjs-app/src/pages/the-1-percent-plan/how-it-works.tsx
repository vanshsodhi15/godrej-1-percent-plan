import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HowItWorks() {
  const title = "How the Godrej 1% Plan works: A step-by-step guide";
  const desc = "The Godrej 1% Plan: 20% in Q1, 1% monthly, construction-linked tranches, balance at possession, APR 8.5%. Full step-by-step breakdown.";
  
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the minimum booking amount for the Godrej 1% Plan?",
        "acceptedAnswer": { "@type": "Answer", "text": "Provide specific minimum or typical range based on Godrej policy." }
      },
      {
        "@type": "Question",
        "name": "How is the 1% monthly amount calculated?",
        "acceptedAnswer": { "@type": "Answer", "text": "It is calculated as 1% of the Agreement Value every month." }
      }
    ]
  });

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/how-it-works" />
      
      <div className="hero-dark">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>{title}</h1>
      </div>

      <main className="content-container">
        <article>
          <div className="summary-card">
            <p><strong>The 60-Second Answer:</strong> The Godrej 1% Plan breaks a home purchase into five payment stages: <strong>20% in Q1</strong> (first quarter after booking), <strong>1% monthly</strong> thereafter, milestone-linked tranches tied to construction stages (including terrace slab completion), and the <strong>balance at the Occupation Certificate (OC)</strong>. The plan carries an <strong>APR of 8.5%</strong>, disclosed upfront.</p>
          </div>

          <h2 style={{ textAlign: 'center' }}>Stage-by-Stage Breakdown</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="card card-accent">
              <h3>Stage 1 — Booking to Q1 (20% of agreement value)</h3>
              <p>At booking, the buyer pays the initial amount. Within Q1 of booking, the cumulative payment reaches 20% of the Agreement Value.</p>
            </div>
            <div className="card card-accent">
              <h3>Stage 2 — Monthly 1% (ongoing)</h3>
              <p>After the Q1 20%, the buyer pays 1% of the Agreement Value every month until the next construction milestone.</p>
            </div>
            <div className="card card-accent">
              <h3>Stage 3 — Construction-Milestone Tranches</h3>
              <p>At specific construction milestones — including terrace slab completion — a larger tranche becomes payable.</p>
            </div>
            <div className="card card-accent">
              <h3>Stage 4 — Balance at OC</h3>
              <p>At the issuance of the Occupation Certificate (OC), the remaining balance of the Agreement Value becomes due.</p>
            </div>
            <div className="card card-accent">
              <h3>Stage 5 — APR 8.5% — What It Means</h3>
              <p>The 1% Plan operates at an Annualised Percentage Rate (APR) of 8.5%. This is disclosed upfront and forms part of the Agreement for Sale.</p>
            </div>
          </div>

          <h2 style={{ marginTop: '3rem' }}>Worked Example — A ₹1 Crore Home</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>When</th>
                  <th>Amount</th>
                  <th>Cumulative</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Booking</td><td>Day 0</td><td>[GPL_DATA]</td><td>[GPL_DATA]</td></tr>
                <tr><td>Q1 completion</td><td>End of Q1</td><td>[GPL_DATA]</td><td>[GPL_DATA]</td></tr>
                <tr><td>Monthly 1%</td><td>Month 4 onwards</td><td><strong>₹1,00,000/month</strong></td><td>Running</td></tr>
                <tr><td>Balance at OC</td><td>[GPL_DATA]</td><td>[GPL_DATA]</td><td>100%</td></tr>
              </tbody>
            </table>
          </div>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>What is the minimum booking amount for the Godrej 1% Plan?</h3>
              <p>[GPL_DATA: Provide specific minimum or typical range]</p>
            </div>
            <div className="faq-item">
              <h3>How is the 1% monthly amount calculated?</h3>
              <p>[GPL_DATA: Is it 1% of Agreement Value, or 1% of outstanding balance?]</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
