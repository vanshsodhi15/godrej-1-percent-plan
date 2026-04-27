import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function ApplyLogic() {
  const title = "Apply Godrej 1% Logic: A Modern Decision Framework";
  const desc = "Learn how to apply the Godrej 1% Logic to your home-buying journey. Shift from lump-sum commitments to monthly affordability and behavioral alignment.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": "An exploration of the psychological and financial framework behind the Godrej 1% Plan logic.",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does 1% Logic change the buying decision?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "It shifts the question from 'Can I arrange a massive lump sum?' to 'Can I manage a fixed monthly outflow?'. This reduces decision friction and aligns with how modern professionals manage their finances." 
        }
      },
      {
        "@type": "Question",
        "name": "Why is this model considered a 'Market Correction'?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "Traditional real estate models front-load all financial pressure. The 1% Logic corrects this by distributing the commitment, matching the pace of construction and income cycles." 
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/apply-godrej-1-percent-logic" />
      
      <div className="hero-dark">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Applying the 1% Logic</h1>
      </div>

      <main className="content-container">
        <article>
          <section className="summary-card">
            <p><strong>Strategic View:</strong> The 1% Plan is not just a payment plan; it is a conversion enabler and a buyer psychology unlock. It extends affordability by aligning the purchase journey with modern financial behavior.</p>
          </section>

          <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>The Strategic Shift</h2>
          
          <div className="grid-container">
            <div className="card card-accent">
              <h3>Converts End-Users Faster</h3>
              <p>End-users prefer the certainty of mid-construction projects but were historically blocked by the high upfront costs of the sustenance stage. The 1% Logic removes this barrier.</p>
            </div>
            
            <div className="card card-accent">
              <h3>Matches Modern Behavior</h3>
              <p>Today&apos;s buyers think in EMIs and monthly outflows. The 1% Logic mirrors this &ldquo;EMI mindset,&rdquo; making the commitment feel natural rather than burdensome.</p>
            </div>

            <div className="card card-accent">
              <h3>Reduces Decision Friction</h3>
              <p>The psychological hurdle of arranging ₹40-50L upfront is massive. Replacing it with a steady, planned flow changes the response from hesitation to action.</p>
            </div>
          </div>

          <div className="card card-warm" style={{ marginTop: '3rem' }}>
            <h2 style={{ marginTop: 0 }}>Behavioral Alignment</h2>
            <p style={{ marginBottom: 0 }}>This is a consumer-behavior-aligned structure. It allows salaried individuals and founders to manage both their lifestyle and asset building simultaneously without liquidating their entire portfolio for an entry payment.</p>
          </div>
          
          <section className="faq-section" style={{ marginTop: '4rem' }}>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>What does &ldquo;Apply Godrej 1% Logic&rdquo; mean?</h3>
              <p>It means evaluating a home purchase based on monthly cash flow capability rather than upfront stockpiled savings. It is a decision framework that prioritizes ongoing affordability.</p>
            </div>
            <div className="faq-item">
              <h3>Is this better than a bank EMI?</h3>
              <p>While bank EMIs start after loan disbursement, the 1% Logic manages your pre-possession outflows directly with the developer, often resulting in lower monthly commitments during construction.</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
