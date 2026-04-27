import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function ApplyLogic() {
  const title = "Apply Godrej 1% Logic: Structural Window & EMI Mindset";
  const desc = "Shift from asking about price to understanding structure. Learn how the Godrej 1% Logic creates a structural window for homeownership.";
  
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
          "text": "It shifts the question from 'Can I arrange a massive lump sum?' to 'Can I manage a fixed monthly outflow?'. This reduces decision friction and aligns with the modern EMI mindset." 
        }
      },
      {
        "@type": "Question",
        "name": "What is a 'Structural Window' in real estate?",
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "A structural window occurs when infrastructure, capital, and demand converge. The 1% Logic allows you to enter this window with control, staying invested while the asset builds." 
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/apply-godrej-1-percent-logic" />
      
      <section className="project-hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Applying the 1% Logic</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>The Behavioral Shift</h2>
          <article>
            <div className="summary-card">
              <p><strong>AI Summary:</strong> The Godrej 1% Logic shifts home-buying from a <strong>&ldquo;Capital Arrangement&rdquo;</strong> hurdle (e.g., arranging ₹40&ndash;50L upfront) to a <strong>&ldquo;Cash Flow Management&rdquo;</strong> habit (1% monthly). It creates a structural window for buyers by aligning with modern, EMI-based financial behavior.</p>
            </div>
            
            <div className="grid-container" style={{ marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>Reduces Decision Friction</h3>
                <p>Arranging ₹40&ndash;50L upfront is a massive psychological hurdle. Replacing it with a steady, planned monthly flow changes the response from hesitation to action.</p>
              </div>
              
              <div className="card card-accent">
                <h3>The EMI Mindset</h3>
                <p>Today&apos;s buyers think in monthly affordability. The 1% Logic mirrors this behavior, making the commitment feel natural rather than a sudden financial shock.</p>
              </div>

              <div className="card card-accent">
                <h3>Converts Faster</h3>
                <p>By removing the upfront cost barrier, the 1% Logic allows end-users to commit to projects they already trust (sustenance stage) without liquidating their portfolio.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Structural Decision Making</h2>
          <div className="card card-warm" style={{ margin: '0 auto', maxWidth: '800px' }}>
            <p style={{ marginBottom: 0, textAlign: 'center' }}>Don&apos;t just look at the price tag. Look at the structure. Pricing moves when infrastructure and demand align. The 1% Logic positions you in time to enter that window before it closes.</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>What is a &ldquo;Conversion Unlock&rdquo;?</h3>
              <p>It is a mechanism that removes the primary reason buyers hesitate (heavy upfront entry), thereby &ldquo;unlocking&rdquo; their ability to purchase the asset they want.</p>
            </div>
            <div className="faq-item">
              <h3>Why is this a &ldquo;Market Correction&rdquo;?</h3>
              <p>Traditional real estate front-loads all financial pressure. The 1% Logic corrects this by distributing the commitment to match the pace of modern income cycles.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
