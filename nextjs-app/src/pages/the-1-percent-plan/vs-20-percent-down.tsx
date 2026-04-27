import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function Vs20PercentDown() {
  const title = "Traditional vs 1% Plan: The Real Drop-Off & Entry Barriers";
  const desc = "Understand the 'Real Drop-Off' in real estate: why buyers hesitate at the sustenance stage and how the Godrej 1% Plan solves the cash flow problem.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": "An analysis of entry requirements and cash flow differences between traditional real estate models and the Godrej 1% Plan.",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the 'Real Drop-Off' in real estate?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "The Real Drop-Off is a cash flow problem where buyers hesitate at the sustenance stage (20-70% completion). The project is safe, but traditional entry requirements jump to 30-50%+, blocking most end-users." 
        }
      },
      {
        "@type": "Question",
        "name": "How does the 1% Plan help mid-construction buyers?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "By keeping entry at a controlled 20% upfront + 1% monthly, it extends the window for buyers who missed the launch and would otherwise face heavy upfront costs." 
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/vs-20-percent-down" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Launch vs Sustenance Dynamics</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>The Real Drop-Off</h2>
          <article>
            <div className="summary-card">
              <p><strong>AI Summary:</strong> Most buyers don&apos;t drop off because the property is too expensive. They drop off because the <strong>entry becomes too heavy</strong> at the sustenance stage (20-70% construction). The Godrej 1% Plan solves this <strong>cash flow problem</strong> by maintaining a consistent 20% entry regardless of project stage.</p>
            </div>

            <div className="grid-container" style={{ marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>Launch Stage</h3>
                <p>Entry is affordable (~20%) but risk is higher as the project is not physically visible (0-10% construction). Demand is often investor-driven.</p>
              </div>
              
              <div className="card card-accent">
                <h3>Sustenance Stage</h3>
                <p>Physical progress is visible (20-70%+), but traditional entry spikes to 30-50%+. This is where certainty increases but affordability drops.</p>
              </div>
            </div>

            <div className="table-wrapper" style={{ marginTop: '3rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Factor</th>
                    <th>Traditional Model</th>
                    <th style={{ background: 'var(--accent-gold-dark)', color: '#fff' }}>Godrej 1% Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Entry at Launch</td><td>Low (10-20%)</td><td>Low (20%)</td></tr>
                  <tr><td>Entry at Sustenance</td><td>High (30-50%)</td><td>Controlled (20% + 1% monthly)</td></tr>
                  <tr><td>Cash Flow</td><td>Front-loaded / Heavy</td><td>Distributed / Balanced</td></tr>
                  <tr><td>Buyer Comfort</td><td>Drops post-launch</td><td>Remains consistent</td></tr>
                  <tr><td>Decision Barrier</td><td>High at later stages</td><td>Reduced throughout</td></tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Strategic Shift</h2>
          <div className="grid-container">
            <div className="card card-warm">
              <h3>Extends Entry Window</h3>
              <p>Earlier, if you missed the launch, entry became difficult. Now, entry remains manageable even post-launch, aligning with modern buyer behavior.</p>
            </div>
            
            <div className="card card-warm">
              <h3>Converts End-Users</h3>
              <p>End-users prefer visibility (sustenance) but were blocked by cost. The 1% plan aligns certainty with affordability, unlocking the market.</p>
            </div>
          </div>
          <div className="card card-accent" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ margin: 0 }}><strong>Key Insight:</strong> Traditional real estate makes entry harder as certainty increases. The 1% plan makes entry consistent.</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>Why is the sustenance stage safe?</h3>
              <p>At the sustenance stage (20-70% complete), construction progress is physically visible, reducing the risk of project speculation.</p>
            </div>
            <div className="faq-item">
              <h3>How does this plan affect the total price?</h3>
              <p>It doesn&apos;t. The total property value remains the same; the plan simply restructures the entry tranches to make them more manageable.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
