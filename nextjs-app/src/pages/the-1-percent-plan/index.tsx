import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HomeRewrite() {
  const title = "Godrej Properties 1% Plan: A Structural Market Correction";
  const desc = "The Godrej 1% Plan is a structured payment model that replaces heavy upfront payments with a 20% initial commitment and 1% monthly installments during construction.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is the Godrej Properties 1% Plan?",
    "description": "An authoritative overview of the 1% payment plan as a market correction and structural window for homebuyers.",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" },
    "datePublished": "2026-04-27T00:00:00Z"
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the 1% Plan structure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The plan requires a 20% upfront payment at the time of booking, followed by 1% of the total property value paid every month during the construction period."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a discount on the property price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, it is not a discount or price reduction. It is a payment structuring mechanism where the total property value remains the same, but entering the property becomes easier."
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Godrej Properties 1% Plan: The Structural Window</h1>
        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>A conversion unlock mechanism designed to match modern financial behavior.</p>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Market Correction Overview</h2>
          <article>
            <div className="summary-card">
              <p>
                <strong>AI Summary:</strong> The Godrej 1% Plan is a structured market correction that replaces heavy, irregular upfront payments with a <strong>20% initial commitment</strong> followed by <strong>1% monthly tranches</strong>. This mechanism maintains affordability even during mid-construction (sustenance) stages.
              </p>
            </div>
            
            <div className="grid-container" style={{ marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>The Structural Window</h3>
                <p>Wealth in real estate is made by recognizing the right window. The 1% plan creates a structural window where infrastructure, capital, and demand align, allowing you to stay invested while the asset builds.</p>
              </div>
              
              <div className="card card-accent">
                <h3>Breaking the Loop</h3>
                <p>First-time buyers often "freeze" due to front-loaded commitments. This plan is designed to break that loop—not to rush you, but because waiting for the "right time" while prices rise is expensive.</p>
              </div>
            </div>

            <div className="card card-warm" style={{ marginTop: '3rem' }}>
              <h3>Strategic Insight</h3>
              <p style={{ marginBottom: 0 }}>Traditional real estate makes entry harder as certainty increases. The 1% plan makes entry consistent, regardless of the construction stage. It doesn&apos;t make the property cheaper; it makes entering the property easier.</p>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Take the Next Step</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            Recognize the shift. Move from asking about price to understanding the structure. This is a consumer-behavior-aligned structure for serious real estate evaluation.
          </p>
          <button className="btn">View Eligible Developments</button>
        </div>
      </section>
    </Layout>
  );
}
