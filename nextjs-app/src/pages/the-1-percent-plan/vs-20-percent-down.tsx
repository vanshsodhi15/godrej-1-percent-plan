import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function Vs20PercentDown() {
  const title = "Godrej 1% Plan vs 20% down payment: A cash-flow comparison";
  const desc = "Godrej 1% Plan vs 20% down payment. Side-by-side numbers on cash outflow for a ₹1 Cr home. Conclusion: cash flow stays manageable with 1% Plan.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  const tableSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Table",
    "about": "Side-by-Side Cashflow Table"
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the 1% Plan cheaper than a traditional 20% down payment?",
        "acceptedAnswer": { "@type": "Answer", "text": "The 1% Plan changes cash-flow timing, not necessarily total cost. Monthly outflow during construction is lower; the APR of 8.5% is disclosed upfront and forms part of the Agreement for Sale." }
      },
      {
        "@type": "Question",
        "name": "Is the 1% Plan available for all Godrej projects?",
        "acceptedAnswer": { "@type": "Answer", "text": "The 1% Plan is published against 35 projects across 10 cities on godrejproperties.com/the-1-percent-plan." }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, tableSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/vs-20-percent-down" />
      
      <div className="hero-dark">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>{title}</h1>
      </div>

      <main className="content-container">
        <article>
          <div className="summary-card">
            <p><strong>Conclusion:</strong> For a ₹1 crore home, the Godrej 1% Plan requires <strong>₹20 lakh spread across Q1</strong> and <strong>₹1 lakh per month thereafter</strong> — against a traditional structure&apos;s <strong>₹20 lakh lump sum upfront</strong>. The Godrej structure spreads the same 20% over three months instead of concentrating it on Day 1, and replaces immediate EMIs with construction-linked payments until possession.</p>
          </div>

          <h2 style={{ textAlign: 'center' }}>Side-by-Side Comparison</h2>
          <p style={{ textAlign: 'center' }}><strong>For a ₹1 crore home</strong></p>
          
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th style={{ background: 'var(--color-muted)' }}>Traditional 20% + Loan</th>
                  <th style={{ background: 'var(--accent-gold-dark)', color: '#fff' }}>Godrej 1% Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Month 0 (Booking)</td><td>₹20 lakh (down payment)</td><td>[GPL_DATA: split portion]</td></tr>
                <tr><td>Month 1</td><td>₹X (EMI start)</td><td>[GPL_DATA: split portion]</td></tr>
                <tr><td>Month 2</td><td>₹X (EMI)</td><td>[GPL_DATA: split portion]</td></tr>
                <tr style={{ fontWeight: 600 }}><td>Month 3 (End of Q1)</td><td>₹X (EMI)</td><td style={{ color: 'var(--accent-gold-dark)' }}>Cumulative 20% reached</td></tr>
                <tr><td>Month 4</td><td>₹X (EMI)</td><td><strong>₹1 lakh (1% monthly)</strong></td></tr>
                <tr><td>...until OC</td><td>EMI continues</td><td>1% monthly + tranches</td></tr>
                <tr style={{ borderTop: '2px solid var(--border-light)' }}><td>At possession / OC</td><td>Loan mostly paid down</td><td><strong>Balance due at OC</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ marginTop: '3rem' }}>The Three Key Differences</h2>
          <div className="grid-container">
            <div className="card card-accent">
              <h3>1. Cash-Flow Timing</h3>
              <p><strong>Traditional:</strong> ₹20 lakh concentrated on Day 1.</p>
              <p><strong>1% Plan:</strong> ₹20 lakh spread across three months.</p>
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--bg-seashell)', borderRadius: '4px' }}>
                <strong>Impact:</strong> The buyer doesn&apos;t need ₹20 lakh liquid on booking day.
              </div>
            </div>
            
            <div className="card card-accent">
              <h3>2. EMI Trigger Point</h3>
              <p><strong>Traditional:</strong> Home loan EMI starts within 60-90 days.</p>
              <p><strong>1% Plan:</strong> ₹1 lakh/month (1% of ₹1 Cr), balance at OC.</p>
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--bg-seashell)', borderRadius: '4px' }}>
                <strong>Impact:</strong> Lower monthly outflow during construction.
              </div>
            </div>

            <div className="card card-accent">
              <h3>3. Risk Alignment</h3>
              <p><strong>Traditional:</strong> Full risk regardless of construction pace.</p>
              <p><strong>1% Plan:</strong> Construction-linked tranches align outflow with progress.</p>
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--bg-seashell)', borderRadius: '4px' }}>
                <strong>Impact:</strong> If construction lags, payment pressure reduces.
              </div>
            </div>
          </div>

          <div className="card card-warm" style={{ marginTop: '3rem' }}>
            <h2 style={{ marginTop: 0, color: 'var(--color-muted)' }}>What This Comparison Does NOT Cover</h2>
            <p style={{ marginBottom: 0 }}>This comparison shows cash-flow structure only. Total cost-of-ownership — including APR impact, home loan interest, stamp duty, and GST — may differ between the two structures. Buyers should evaluate total cost, not only monthly cash flow, when comparing.</p>
          </div>
        </article>
      </main>
    </Layout>
  );
}
