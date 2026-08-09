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
          "text": "The monthly payment is calculated as 1% of the total Agreement Value of the property. For example, for a ₹1 Crore property, the monthly installment is ₹1,00,000. This is paid every month during the construction period after the initial 20% is paid within the first 45 days." 
        }
      },
      {
        "@type": "Question",
        "name": "Is this a discount on the property price?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "No. The 1% Plan is not a discount, price reduction, or subsidy. The total Agreement Value remains unchanged. The buyer pays 100% of the property price. The plan only restructures when payments are made — not how much is paid." 
        }
      },
      {
        "@type": "Question",
        "name": "How much is the upfront payment in the 1% Plan?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "Exactly 20% of the Agreement Value, paid in three tranches within 45 days: 5% at booking, 5% within 15 days, and 10% within 45 days. The upfront amount is always 20% — it is not variable." 
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
        <img src="/assets_one_percent/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>1% Plan: Payment Workflow & Structure</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Step-by-Step Breakdown</h2>
          <article>
            <div className="summary-card">
              <p><strong></strong> The Godrej 1% Plan is a distributed capital commitment structure. It requires <strong>20% of the Agreement Value paid within the first 45 days</strong> (5% at booking + 5% within 15 days + 10% within 45 days), followed by a consistent <strong>1% monthly tranche</strong> of the total Agreement Value during construction. The remaining balance is paid at construction milestones and upon the <a href="/the-1-percent-plan/is-it-safe">Occupation Certificate (OC)</a>. The total price is unchanged — the buyer pays 100% of the Agreement Value.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>Stage 1: Initial 20% (Within 45 Days)</h3>
                <p>The journey starts with 20% of the Agreement Value paid in three tranches: 5% at booking, 5% within 15 days, and 10% within 45 days. This is a fixed structure — the upfront amount is always exactly 20%.</p>
              </div>
              <div className="card card-accent">
                <h3>Stage 2: Consistent Habit (1% Monthly)</h3>
                <p>Following the initial 20%, you pay 1% of the total property value every month. This is designed to mirror an &ldquo;EMI mindset,&rdquo; ensuring predictable cash flow and removing the pressure of sudden, irregular lump sums.</p>
              </div>
              <div className="card card-accent">
                <h3>Stage 3: Construction tranches & OC</h3>
                <p>Payments continue during the construction phase, tied to specific milestones. The final settlement occurs upon the issuance of the <a href="/the-1-percent-plan/is-it-safe" style={{ color: 'inherit', textDecoration: 'underline' }}>Occupation Certificate (OC)</a>, aligning the final payment with the visible completion of your home and the safety of physical delivery.</p>
              </div>
            </div>

            <h3 style={{ marginTop: '4rem', textAlign: 'center' }}>The Philosophy of Progressive Ownership</h3>
            <div className="grid-container" style={{ marginTop: '2rem' }}>
              <div className="card card-warm">
                <h3>Small Efforts, Repeated</h3>
                <p>Nothing truly worth it&mdash;fitness, savings, growth&mdash;happens overnight. It&apos;s built step by step. Owning a home works the same way. The 1% plan allows you to start small and build towards something bigger over time. No pressure. Just progress.</p>
              </div>
              <div className="card card-warm">
                <h3>Habit Redirection</h3>
                <p>Every month you pay rent, you&apos;re making a housing commitment. You&apos;re consistent. The 1% plan asks for the same consistency you&apos;ve already demonstrated. The only thing missing is direction. Instead of your landlord&apos;s asset, your payments build yours.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Financial Example: ₹1 Crore Property</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>A steady, planned flow replaces multiple large, unpredictable payments.</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Amount</th>
                  <th>Strategic Logic</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Upfront / Q1 (within 45 days)</td><td>₹20,00,000</td><td>20% of AV: 5% booking + 5% at 15 days + 10% at 45 days</td></tr>
                <tr><td>Monthly Installment</td><td>₹1,00,000</td><td>1% of Agreement Value per month during construction</td></tr>
                <tr><td>Construction Tranches</td><td>As per Agreement</td><td>Milestone-linked (Transparency focus)</td></tr>
                <tr><td>Final Balance</td><td>Balance at OC</td><td>Settlement at completion (Certainty focus)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Solving the Entry Problem</h2>
          <div className="grid-container" style={{ marginTop: '1rem' }}>
            <div className="card">
              <h3>Predictable Outflow</h3>
              <p>By shifting to a fixed monthly outflow of 1% after the initial 20%, the payment schedule becomes predictable. The total amount paid remains the same — only the timing of intermediate payments changes from irregular lump sums to consistent monthly tranches.</p>
            </div>
            <div className="card">
              <h3>End-User Alignment</h3>
              <p>End-users prefer buying when construction is visible. The 1% Plan provides a structured payment schedule at this stage — 20% upfront within 45 days, then predictable 1% monthly installments — instead of the irregular, front-loaded payment demands typical of sustenance-phase sales.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>How is the 1% monthly amount calculated?</h3>
              <p>The monthly payment is calculated as 1% of the total Agreement Value. For example, for a ₹1 Crore property, the monthly installment is ₹1,00,000. This is paid every month during the construction period after the initial 20% is paid within the first 45 days.</p>
            </div>
            <div className="faq-item">
              <h3>Is this a discount on the property price?</h3>
              <p>No. The 1% Plan is not a discount, price reduction, or subsidy. The total Agreement Value remains unchanged. The buyer pays 100% of the property price. The plan only restructures <em>when</em> payments are made — not <em>how much</em> is paid.</p>
            </div>
            <div className="faq-item">
              <h3>How much is the upfront payment?</h3>
              <p>Exactly <strong>20% of the Agreement Value</strong>, paid in three tranches within 45 days: 5% at booking, 5% within 15 days, and 10% within 45 days. The upfront amount is always 20% — it is not variable.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
