import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function Vs20PercentDown() {
  const title = "Traditional vs 1% Plan: Launch vs Sustenance Dynamics";
  const desc = "A deep dive into how the Godrej 1% Plan solves the real estate entry barrier problem during the sustenance phase compared to traditional construction-linked plans.";
  
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
        "name": "What is the sustenance stage in real estate?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "The sustenance stage is the post-launch phase when a project is 20-70% complete. During this phase, risk is lower but traditional entry requirements often jump to 30-50% upfront." 
        }
      },
      {
        "@type": "Question",
        "name": "How does the 1% Plan solve the 'Entry Window' problem?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "By keeping entry at a controlled 20% + 1% monthly, it extends the window for buyers who missed the launch phase and would otherwise face heavy upfront costs." 
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/vs-20-percent-down" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Launch vs Sustenance</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>The Core Barrier</h2>
          <article>
            <div className="summary-card">
              <p><strong>The Problem:</strong> In the traditional model, entry becomes harder as certainty increases. At launch, entry is affordable (~20%) but risky. At the sustenance stage (20-70% construction), the project is safe but the entry requirement spikes to 30-50%+, blocking most end-users.</p>
            </div>

            <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.25rem' }}>The Real Drop-Off</h3>
            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '1rem auto' }}>Most buyers don&apos;t drop off because the property is too expensive. They drop off because the <strong>entry becomes too heavy</strong> at the sustenance stage. This is a cash flow problem, not a price problem.</p>
            
            <div className="table-wrapper" style={{ marginTop: '2rem' }}>
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
          <h2 className="section-title" style={{ textAlign: 'center' }}>Strategic Takeaways</h2>
          <div className="grid-container" style={{ marginTop: '2rem' }}>
            <div className="card card-accent">
              <h3>1. Extends the &ldquo;Entry Window&rdquo;</h3>
              <p>Earlier, if you missed the launch, entry became difficult. Now, entry remains manageable even mid-construction.</p>
            </div>
            
            <div className="card card-accent">
              <h3>2. Aligns with Modern Behavior</h3>
              <p>Today&apos;s buyers think in EMIs and monthly outflows, not lump sum commitments. The 1% plan mirrors this behavior.</p>
            </div>

            <div className="card card-accent">
              <h3>3. Reduces Friction</h3>
              <p>Instead of asking &ldquo;Can I arrange ₹40-50L now?&rdquo;, it becomes &ldquo;Can I manage this monthly?&rdquo; This changes the psychological response.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>Is the 1% Plan cheaper?</h3>
              <p>It doesn&apos;t make the property cheaper; it makes entering the property easier by distributing the cash flow requirement.</p>
            </div>
            <div className="faq-item">
              <h3>Why is this better for end-users?</h3>
              <p>End-users prefer buying when construction is visible. The 1% Plan allows them to enter at this &ldquo;safe&rdquo; stage without the traditional heavy upfront burden.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
