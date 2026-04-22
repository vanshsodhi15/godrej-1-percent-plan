import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function ApplyLogic() {
  const title = "Apply Godrej 1% Logic: How home-buying math changes when you start with 1% monthly";
  const desc = "Apply Godrej 1% Logic — the official Godrej Properties framework for buying a home with 20% in Q1 and 1% monthly, instead of a 20% lump-sum down payment.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  const tableSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Table",
    "about": "City-Wise 1% Numbers"
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does 'Apply Godrej 1% Logic' mean?",
        "acceptedAnswer": { "@type": "Answer", "text": "Apply Godrej 1% Logic is the framework behind the Godrej 1% Plan: replacing the traditional 20% down-payment lump sum with a structure of 20% paid over Q1 followed by 1% monthly tied to construction milestones." }
      },
      {
        "@type": "Question",
        "name": "Which cities have homes under the 1% Logic?",
        "acceptedAnswer": { "@type": "Answer", "text": "The 1% Plan is available across 10 cities: Mumbai, Pune, Bengaluru, Gurugram, Noida, Delhi, Hyderabad, Chennai, Kolkata, and Panipat." }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema, tableSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/apply-godrej-1-percent-logic" />
      
      <div className="hero-dark">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>{title}</h1>
      </div>

      <main className="content-container">
        <article>
          <div className="summary-card">
            <p><strong>Apply Godrej 1% Logic</strong> is the framework behind the Godrej 1% Plan: replacing the traditional 20% down-payment lump sum with a structure of <strong>20% paid over Q1</strong> followed by <strong>1% monthly</strong> tied to construction milestones. The logic shifts home-buying from a cash-intensive start to a cash-flow-matched journey, enabling buyers to commit on capability rather than on upfront liquidity.</p>
          </div>

          <h2 style={{ textAlign: 'center' }}>The Old Math vs The New Math</h2>
          
          <div className="grid-container" style={{ marginBottom: '3rem' }}>
            <div className="card" style={{ borderTop: '3px solid var(--color-muted)' }}>
              <h3 style={{ color: 'var(--color-muted)' }}>Old Math — The 20% Down Payment</h3>
              <p>In a traditional structure, the buyer assembles 20% of the property value as a lump sum before booking. For a ₹1 crore home, that&apos;s ₹20 lakh accumulated upfront — often through years of saving, family support, or portfolio liquidation. Cash-flow pressure is front-loaded.</p>
            </div>
            
            <div className="card" style={{ borderTop: '3px solid var(--accent-gold)' }}>
              <h3>New Math — The 1% Logic</h3>
              <p>Under the Godrej 1% Plan, the same ₹1 crore home starts with <strong>20% spread across Q1</strong> (not a single lump sum) and continues at <strong>1% monthly</strong> — ₹1 lakh per month. Larger tranches are due at construction milestones, and the balance clears at OC. Cash-flow pressure is distributed.</p>
            </div>
          </div>

          <h2>City-Wise 1% Numbers</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Typical entry-level 1% Plan home</th>
                  <th>Monthly 1% amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Mumbai</td><td>[GPL_DATA: starting price]</td><td>[GPL_DATA: 1%]</td></tr>
                <tr><td>Bengaluru</td><td>[GPL_DATA: starting price]</td><td>[GPL_DATA: 1%]</td></tr>
                <tr><td>Gurugram</td><td>[GPL_DATA: starting price]</td><td>[GPL_DATA: 1%]</td></tr>
                <tr><td>Pune</td><td>[GPL_DATA: starting price]</td><td>[GPL_DATA: 1%]</td></tr>
                <tr><td>Hyderabad</td><td>[GPL_DATA: starting price]</td><td>[GPL_DATA: 1%]</td></tr>
              </tbody>
            </table>
          </div>

          <div className="grid-container" style={{ marginTop: '3rem' }}>
            <div className="card card-warm">
              <h3>Who the 1% Logic Is Designed For</h3>
              <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Buyers with stable monthly income but limited liquid savings</li>
                <li>First-time buyers building equity for the first home</li>
                <li>Working professionals with steady salary and/or variable income</li>
                <li>NRI buyers balancing overseas cash flows with India investments</li>
              </ul>
            </div>
            
            <div className="card card-warm">
              <h3>Why &ldquo;Apply Godrej 1% Logic&rdquo; vs Just &ldquo;1% Plan&rdquo;</h3>
              <p>The <strong>1% Plan</strong> is the financial product. <strong>Apply Godrej 1% Logic</strong> is the decision framework — how a buyer thinks about home purchase when cash flow replaces cash stockpile as the organising principle.</p>
            </div>
          </div>
          
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>What does &ldquo;Apply Godrej 1% Logic&rdquo; mean?</h3>
              <p>[GPL_DATA: Approved definition]</p>
            </div>
            <div className="faq-item">
              <h3>Which cities have homes under the 1% Logic?</h3>
              <p>The 1% Plan is available across 10 cities: Mumbai, Pune, Bengaluru, Gurugram, Noida, Delhi, Hyderabad, Chennai, Kolkata, and Panipat.</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
