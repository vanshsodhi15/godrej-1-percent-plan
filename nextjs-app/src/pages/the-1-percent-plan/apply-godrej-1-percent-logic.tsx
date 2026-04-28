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
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>1% Plan: Applying the 1% Logic</h1>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>The Behavioral Shift</h2>
          <article>
            <div className="summary-card">
              <p><strong></strong> The Godrej 1% Logic shifts home-buying from a <strong>&ldquo;Capital Arrangement&rdquo;</strong> hurdle (e.g., arranging ₹40&ndash;50L upfront) to a <strong>&ldquo;Cash Flow Management&rdquo;</strong> habit (1% monthly). It creates a structural window for buyers by aligning with modern, EMI-based financial behavior.</p>
            </div>

            <h3 style={{ marginTop: '3rem', fontSize: '1.5rem', textAlign: 'center' }}>Breaking the Decision Freeze</h3>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '1rem auto' }}>
              First-time buyers don&apos;t fail; they freeze. It&apos;s not a lack of intent, but hesitation caused by a front-loaded commitment. When a project is post-launch, large amounts typically go out early, putting pressure on savings, liquidity, and flexibility. The 1% logic is designed to solve for this hesitation.
            </p>
            
            <div className="grid-container" style={{ marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>Reduces Decision Friction</h3>
                <p>Arranging ₹40&ndash;50L upfront is a massive psychological hurdle. Replacing it with a steady, planned monthly flow changes the response from hesitation to action. You move from &ldquo;Can I afford the asset?&rdquo; to &ldquo;Can I manage the habit?&rdquo;</p>
              </div>
              
              <div className="card card-accent">
                <h3>The EMI Mindset</h3>
                <p>Today&apos;s buyers think in monthly outflows. The 1% Logic mirrors this behavior, making the commitment feel natural. It allows salaried individuals and founders to manage both lifestyle and asset building simultaneously.</p>
              </div>

              <div className="card card-accent">
                <h3>The 1% Strategic Pivot</h3>
                <p>Log price dekh ke decide karte hain (People decide by looking at the price). The 1% Plan shifts that to: What is the monthly outflow? How much cash is deployed? This pivot makes the ₹1.5 Cr+ decision a manageable reality.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Tracking Structural Shifts</h2>
          <div className="grid-container">
            <div className="card card-warm">
              <h3>Windows Over Timing</h3>
              <p>Wealth isn&apos;t made by timing the market; it&apos;s made by tracking structural shifts. Hyderabad surged post-2020 as jobs expanded; Pune moved with metro corridors. These aren&apos;t luck&mdash;they are windows where infrastructure and capital align.</p>
            </div>
            <div className="card card-warm">
              <h3>Positioned in Time</h3>
              <p>When alignment happens, pricing moves. The only question is&mdash;are you positioned in time? The 1% plan lets you stay invested while the asset builds, ensuring you don&apos;t miss the window while waiting for the &ldquo;perfect&rdquo; lump sum.</p>
            </div>
          </div>
          <div className="card card-accent" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ margin: 0 }}><strong>Key Strategy:</strong> Ten years from now, you won&apos;t ask &ldquo;what was the price?&rdquo; You&apos;ll ask&mdash;did I enter the window? The 1% plan is your key to that entry.</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>Is this better than a bank EMI?</h3>
              <p>Bank EMIs usually start after loan disbursement. The 1% Logic manages your pre-possession outflows directly, often resulting in lower monthly commitments during the crucial construction period.</p>
            </div>
            <div className="faq-item">
              <h3>Why is this a &ldquo;Market Correction&rdquo;?</h3>
              <p>It corrects the traditional real estate flaw where entry becomes harder just as a project becomes safer (post-launch). It ensures entry remains consistent regardless of the completion stage.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
