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

            <h3 style={{ marginTop: '3rem', fontSize: '1.5rem', textAlign: 'center' }}>Understanding the Visibility Trade-off</h3>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '1rem auto' }}>
              At launch, entry is light and developers make it easy to start. But once that window closes and the project is 40-50% built, the conversation changes. The construction progress is visible, but the easy entry is gone. Traditional models at this stage ask for heavy upfront commitments, forcing a choice between &ldquo;Safety&rdquo; and &ldquo;Affordability.&rdquo;
            </p>
            
            <div className="grid-container" style={{ marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>Launch Stage (0&ndash;10%)</h3>
                <p><strong>Mindset:</strong> &ldquo;I&apos;m entering early to benefit from appreciation.&rdquo;<br/><strong>Emotion:</strong> Risky but affordable. Entry price is lower, but the project is not physically visible.</p>
              </div>
              
              <div className="card card-accent">
                <h3>Sustenance Stage (20&ndash;70%+)</h3>
                <p><strong>Mindset:</strong> &ldquo;I can see what I&apos;m buying. I want certainty.&rdquo;<br/><strong>Emotion:</strong> Safe but financially heavy. Prices are higher, and traditional entry requirements spike to 30-50%.</p>
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
              <p>Earlier, if you missed the launch, entry became difficult. Now, entry remains manageable even mid-construction. It aligns with how modern buyers actually manage money&mdash;thinking in monthly outflows, not lump sum commitments.</p>
            </div>
            
            <div className="card card-warm">
              <h3>Converts End-Users</h3>
              <p>End-users prefer buying when they can see progress. By aligning certainty with affordability, the 1% plan creates a structural window for end-users who were previously blocked by the heavy upfront costs of the sustenance phase.</p>
            </div>
          </div>
          <div className="card card-accent" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ margin: 0 }}><strong>Key Takeaway:</strong> The 1% plan is a market correction that aligns project visibility with financial accessibility. It ensures that the safer a project becomes, the easier it remains to enter.</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>Why is the sustenance stage safe?</h3>
              <p>At the sustenance stage, construction progress is physically visible. You are not buying a brochure; you are buying an asset with tangible development.</p>
            </div>
            <div className="faq-item">
              <h3>Is this better than launch-stage buying?</h3>
              <p>It depends on your risk appetite. The 1% plan removes the penalty for choosing certainty, allowing you to enter a &ldquo;safer&rdquo; project with launch-like affordability.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
