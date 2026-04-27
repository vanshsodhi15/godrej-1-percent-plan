import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HomeRewrite() {
  const title = "Godrej Properties 1% Plan: A Structured Path to Homeownership";
  const desc = "The Godrej 1% Plan makes entering the property market easier with a structured 20% upfront payment and 1% monthly installments during construction.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is the Godrej Properties 1% Plan?",
    "description": "An authoritative overview of the 1% payment plan, its structure, and how it solves the entry-barrier problem in real estate.",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" },
    "datePublished": "2026-04-27T00:00:00Z"
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the basic structure of the Godrej 1% Plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The plan requires 20% upfront at the time of booking, followed by 1% of the total property value paid every month during the construction period."
        }
      },
      {
        "@type": "Question",
        "name": "Does the 1% Plan reduce the property price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, it is a payment structuring mechanism. The total property value remains the same, but the entry process is made easier through distributed cash flow."
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Godrej Properties 1% Plan: Explained</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Overview</h2>
          <article>
            <div className="summary-card">
              <p>
                The <strong>Godrej 1% Plan</strong> is a structured payment model designed to make property ownership more manageable by reducing heavy upfront payments and distributing financial commitments.
              </p>
            </div>
            
            <div className="grid-container" style={{ marginTop: '2rem' }}>
              <div className="card card-warm">
                <h3>What is the 1% Plan?</h3>
                <p>It is a structured model where you pay 20% upfront at the time of booking and then 1% of the total property value every month during the construction phase.</p>
              </div>
              
              <div className="card card-warm">
                <h3>Problem Solved</h3>
                <p>Most buyers struggle with heavy lumpsum commitments. This plan eliminates irregular cash outflows and reduces decision friction by mirroring modern monthly budgeting behavior.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Take the Next Step</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            Traditional real estate makes entry harder as certainty increases. The 1% plan makes entry consistent, providing accessibility even mid-construction.
          </p>
          <button className="btn">Explore 35+ Eligible Projects</button>
          <div className="disclaimer" style={{ marginTop: '2rem', borderTop: 'none' }}>
            <p>Available across 10 major Indian cities. Standard RERA disclosures apply.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
