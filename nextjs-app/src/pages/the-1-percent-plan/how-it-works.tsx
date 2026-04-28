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
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>1% Plan: Payment Workflow & Structure</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Step-by-Step Breakdown</h2>
          <article>
            <div className="summary-card">
              <p><strong></strong> The Godrej 1% Plan is a distributed capital commitment structure designed for the sustenance phase of construction. It requires a <strong>20% upfront payment</strong> at booking/Q1, followed by a consistent <strong>1% monthly tranche</strong> of the total property value, with the remaining balance due at the <a href="/the-1-percent-plan/is-it-safe">Occupation Certificate (OC)</a>.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>Stage 1: The Entry Window (20%)</h3>
                <p>The journey starts with a 20% upfront payment at the time of booking and within the first quarter. This establishes your entry into the asset, particularly crucial in the sustenance phase (20-70% construction) where traditional entry usually spikes to 30-50%.</p>
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
                <tr><td>Upfront / Q1</td><td>₹20,00,000</td><td>Initial entry at 20% (Affordability focus)</td></tr>
                <tr><td>Monthly Installment</td><td>₹1,00,000</td><td>1% of total value (Cash flow focus)</td></tr>
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
              <p>By shifting to a fixed monthly outflow, the decision changes from &ldquo;Can I arrange a massive lump sum?&rdquo; to &ldquo;Can I manage this monthly?&rdquo; This changes the psychological response completely.</p>
            </div>
            <div className="card">
              <h3>End-User Alignment</h3>
              <p>End-users prefer buying when construction is visible. The 1% Plan allows entry at this &ldquo;safe&rdquo; stage without the traditional heavy upfront burden that usually blocks capable buyers.</p>
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
              <p>The monthly payment is calculated as 1% of the total Agreement Value of the property, paid consistently during the construction period.</p>
            </div>
            <div className="faq-item">
              <h3>Is this a discount on the property price?</h3>
              <p>No, this is not a discount or price reduction. It is a payment structuring mechanism where the total property value remains the same but the cash outflow is redistributed.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
