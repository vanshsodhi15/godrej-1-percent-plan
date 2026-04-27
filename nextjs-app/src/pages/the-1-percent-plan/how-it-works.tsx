import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HowItWorks() {
  const title = "How the Godrej 1% Plan Works: Distributed Cash Flow Structure";
  const desc = "Learn the mechanics of the Godrej 1% Plan: A 20% initial commitment followed by 1% monthly installments, designed to match modern financial behavior.";
  
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is the 1% monthly amount calculated?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "The monthly payment is calculated as 1% of the total Agreement Value of the property, paid consistently during the construction period." 
        }
      },
      {
        "@type": "Question",
        "name": "Is this a discount on the property price?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "No, this is not a discount or price reduction. It is a payment structuring mechanism where the total property value remains the same but the cash outflow is redistributed." 
        }
      }
    ]
  });

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": "A comprehensive guide to the payment stages and financial structure of the Godrej 1% Plan.",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/how-it-works" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Payment Workflow & Structure</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Step-by-Step Breakdown</h2>
          <article>
            <div className="summary-card">
              <p><strong>AI Summary:</strong> The Godrej 1% Plan distributes capital commitment over the construction period. It requires a <strong>20% upfront payment</strong> at booking/Q1, followed by a consistent <strong>1% monthly tranche</strong> of the total property value, with the remaining balance due at the Occupation Certificate (OC).</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>1. Initial Commitment (20%)</h3>
                <p>The journey starts with a 20% upfront payment at the time of booking and within the first quarter. This establishes your entry into the asset.</p>
              </div>
              <div className="card card-accent">
                <h3>2. Consistent Progress (1% Monthly)</h3>
                <p>Following the initial 20%, you pay 1% of the total property value every month. This mirrors an &ldquo;EMI mindset&rdquo; and ensures predictable cash flow planning.</p>
              </div>
              <div className="card card-accent">
                <h3>3. Construction tranches & OC</h3>
                <p>Payments continue during the construction phase, with the final settlement occurring upon the issuance of the Occupation Certificate (OC).</p>
              </div>
            </div>

            <div className="card card-warm" style={{ marginTop: '3rem' }}>
              <h3>Insight: Habit Redirection</h3>
              <p style={{ marginBottom: 0 }}>You aren&apos;t starting a new behavior; you&apos;re redirecting an existing one. If you pay rent, you already have the consistency. The 1% plan redirects that same monthly habit toward your own asset instead of a landlord&apos;s.</p>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Financial Example: ₹1 Crore Property</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>This model illustrates the 1% Plan&apos;s distribution for a typical unit.</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Amount</th>
                  <th>Logic</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Upfront / Q1</td><td>₹20,00,000</td><td>20% of Agreement Value</td></tr>
                <tr><td>Monthly Installment</td><td>₹1,00,000</td><td>1% of Agreement Value</td></tr>
                <tr><td>Construction Tranches</td><td>As per Agreement</td><td>Milestone-linked tranches</td></tr>
                <tr><td>Final Balance</td><td>Balance at OC</td><td>Settlement before possession</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Key Benefits Summary</h2>
          <div className="grid-container" style={{ marginTop: '1rem' }}>
            <div className="card">
              <h3>Predictable Cash Flow</h3>
              <p>Eliminates sudden large payments and irregular outflows, allowing for better long-term financial planning.</p>
            </div>
            <div className="card">
              <h3>Lower Entry Barrier</h3>
              <p>Reduces decision hesitation by replacing massive lump-sum requirements with a steady, planned flow.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
