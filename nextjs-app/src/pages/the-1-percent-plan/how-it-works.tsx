import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HowItWorks() {
  const title = "How the Godrej 1% Plan Works: A Step-by-Step Breakdown";
  const desc = "Learn the mechanics of the Godrej 1% Plan: 20% upfront, 1% monthly installments, and a construction-linked payment structure designed for modern buyers.";
  
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
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>How the 1% Plan Works</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Workflow Overview</h2>
          <article>
            <div className="summary-card">
              <p><strong>The 60-Second Answer:</strong> The Godrej 1% Plan replaces heavy, irregular milestones with a predictable monthly flow. After an initial <strong>20% booking and Q1 payment</strong>, buyers pay <strong>1% of the total property value monthly</strong> during construction, with the balance due at the Occupation Certificate (OC).</p>
            </div>

            <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.25rem' }}>The Five Stages of Ownership</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <div className="card card-accent">
                <h3>Stage 1: Booking & Q1 (20% Upfront)</h3>
                <p>The journey begins with an initial booking amount, scaling to 20% of the Agreement Value within the first quarter (Q1).</p>
              </div>
              <div className="card card-accent">
                <h3>Stage 2: Monthly 1% Installments</h3>
                <p>Post-Q1, you transition to a steady monthly payment of 1% of the total property value, ensuring predictable cash flow.</p>
              </div>
              <div className="card card-accent">
                <h3>Stage 3: Construction-Linked Tranches</h3>
                <p>Specific construction milestones, such as terrace slab completion, may trigger intermediate tranches as per the agreement.</p>
              </div>
              <div className="card card-accent">
                <h3>Stage 4: Balance at OC</h3>
                <p>The remaining balance is settled upon the issuance of the Occupation Certificate (OC) and possession.</p>
              </div>
              <div className="card card-accent">
                <h3>Stage 5: Transparent APR (8.5%)</h3>
                <p>The plan operates within a transparent framework with an Annualised Percentage Rate (APR) of 8.5%, disclosed upfront.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Financial Example</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>This example demonstrates how the 1% Plan structures payments for a property valued at ₹1 Crore.</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Payment Milestone</th>
                  <th>Timeline</th>
                  <th>Amount</th>
                  <th>Total Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Initial Booking & Q1</td><td>Day 0 to Month 3</td><td>₹20,00,000</td><td>20%</td></tr>
                <tr><td>Monthly Installment (1%)</td><td>Month 4 onwards</td><td>₹1,00,000 / month</td><td>Progressive</td></tr>
                <tr><td>Construction Tranches</td><td>Per Project Milestone</td><td>As per Agreement</td><td>Progressive</td></tr>
                <tr><td>Final Settlement</td><td>At OC / Possession</td><td>Remaining Balance</td><td>100%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>How is the 1% monthly amount calculated?</h3>
              <p>It is calculated as 1% of the total Agreement Value. For instance, on a ₹1 Crore property, the monthly payment is ₹1 Lakh.</p>
            </div>
            <div className="faq-item">
              <h3>Is this available for mid-construction projects?</h3>
              <p>Yes. In fact, the 1% Plan is highly relevant for sustenance-stage projects where traditional entry requirements often jump to 30-50%.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
