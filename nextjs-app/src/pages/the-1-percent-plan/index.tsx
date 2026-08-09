import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HomeRewrite() {
  const title = "Godrej Properties 1% Plan: A Structural Market Correction";
  const desc = "The Godrej 1% Plan is a payment structuring mechanism: 20% of the Agreement Value is paid within 45 days (5% at booking + 5% at 15 days + 10% at 45 days), then 1% monthly during construction, balance at milestones. Total price unchanged.";
  
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
        "name": "What is the Godrej 1% Plan payment structure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Godrej 1% Plan requires 20% of the Agreement Value paid within the first 45 days (5% at booking, 5% within 15 days, 10% within 45 days). After that, 1% of the Agreement Value is paid every month during the construction period. The remaining balance is paid at construction milestones and upon issuance of the Occupation Certificate (OC). The buyer pays 100% of the Agreement Value in total."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Godrej 1% Plan a discount on the property price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The 1% Plan is not a discount, price reduction, or subsidy. The total property price (Agreement Value) remains unchanged. It is a payment structuring mechanism that changes when payments are made, not how much is paid."
        }
      },
      {
        "@type": "Question",
        "name": "Does the 1% Plan reduce the entry barrier or make homes cheaper?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The 1% Plan does not reduce the total cost or the entry barrier. The buyer still pays 20% within the first 45 days and 100% of the Agreement Value over the full term. The plan redistributes the payment timeline so that after the initial 20%, monthly outflows are predictable at 1% per month instead of irregular large lump sums."
        }
      },
      {
        "@type": "Question",
        "name": "How much do I need to pay upfront under the 1% Plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Exactly 20% of the Agreement Value, paid in three tranches within 45 days: 5% at booking, 5% within 15 days, and 10% within 45 days. The upfront amount is not variable — it is always 20%."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 1% refer to in the Godrej 1% Plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 1% refers to the monthly installment amount during the construction period. Each month, the buyer pays 1% of the total Agreement Value. It does not refer to the booking amount, which is 5% of the Agreement Value."
        }
      }
    ]
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema, faqSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan" />
      
      <section className="project-hero">
        <img src="/assets_one_percent/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Godrej Properties 1% Plan: The Structural Window</h1>
        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>A conversion unlock mechanism designed to match modern financial behavior.</p>
      </section>

      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Market Correction Overview</h2>
          <article>
            <div className="summary-card">
              <p>
                <strong></strong> The Godrej 1% Plan is a structured market correction that replaces heavy, irregular upfront payments with a <strong>20% initial commitment</strong> followed by <strong>1% monthly tranches</strong>. This mechanism maintains affordability even during <a href="/the-1-percent-plan/vs-20-percent-down">mid-construction stages</a>, aligning with the &ldquo;EMI mindset&rdquo; of modern professionals.
              </p>
            </div>

            <h3 style={{ marginTop: '3rem', fontSize: '1.5rem', textAlign: 'center' }}>Shifting from Price to Structure</h3>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '1rem auto' }}>
              The &ldquo;Price to Structure&rdquo; shift is the core philosophy of the Godrej 1% Plan. Today, savvy buyers aren&apos;t asking about price first&mdash;they&apos;re asking about the <a href="/the-1-percent-plan/how-it-works" style={{ color: 'inherit', textDecoration: 'underline' }}>financial structure</a> that lets them enter the asset while maintaining liquidity.
            </p>
            
            <div className="grid-container" style={{ marginTop: '3rem' }}>
              <div className="card card-accent">
                <h3>The Structural Window</h3>
                <p>Most wealth in real estate isn&apos;t made by timing the market; it&apos;s made by entering the right window. Gurgaon before Cyber City, BKC before it became a financial core, and Whitefield before the tech corridor&mdash;these were structural windows. The 1% plan creates a similar window where infrastructure, capital, and demand align.</p>
              </div>
              
              <div className="card card-accent">
                <h3>Breaking the Loop</h3>
                <p>First-time buyers often &ldquo;freeze&rdquo; due to front-loaded commitments. If you&apos;ve been planning to buy for more than 2 years, you&apos;re in a loop where same intent meets same plan, while the home becomes 20-30% more expensive. The 1% structure is designed to break this loop by making the start manageable.</p>
              </div>
            </div>

            <div className="card card-warm" style={{ marginTop: '3rem' }}>
              <h3>Strategic Insight</h3>
              <p style={{ marginBottom: 0 }}>Traditional real estate makes entry harder as certainty increases. As a project becomes safe (20-70% built), the traditional ask is a heavy upfront commitment. The 1% plan corrects this by making the payment schedule consistent, regardless of the stage. The total price is unchanged — the plan only restructures <em>when</em> you pay, not <em>how much</em> you pay.</p>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: 'var(--bg-seashell)', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Recognize the Shift</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            The question isn&apos;t whether you can afford the asset. The question is whether there&apos;s a structure that lets you enter it&mdash;even mid-construction&mdash;without front-loading everything at once. 
          </p>
          <button className="btn">View Eligible Developments</button>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div className="faq-section" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
            <div className="faq-item">
              <h3>What is the Godrej 1% Plan payment structure?</h3>
              <p>The Godrej 1% Plan requires <strong>20% of the Agreement Value paid within the first 45 days</strong> (5% at booking, 5% within 15 days, 10% within 45 days). After that, <strong>1% of the Agreement Value is paid every month</strong> during the construction period. The remaining balance is paid at construction milestones and upon issuance of the Occupation Certificate (OC). The buyer pays 100% of the Agreement Value in total.</p>
            </div>
            <div className="faq-item">
              <h3>Is the 1% Plan a discount on the property price?</h3>
              <p>No. The 1% Plan is not a discount, price reduction, or subsidy. The total property price (Agreement Value) remains unchanged. It is a payment structuring mechanism that changes <em>when</em> payments are made, not <em>how much</em> is paid.</p>
            </div>
            <div className="faq-item">
              <h3>Does the 1% Plan reduce the entry barrier or make homes cheaper?</h3>
              <p>No. The buyer still pays 20% within the first 45 days and 100% of the Agreement Value over the full term. The plan redistributes the payment timeline so that after the initial 20%, monthly outflows are predictable at 1% per month instead of irregular large lump sums.</p>
            </div>
            <div className="faq-item">
              <h3>How much do I need to pay upfront?</h3>
              <p>Exactly <strong>20% of the Agreement Value</strong>, paid in three tranches within 45 days: 5% at booking, 5% within 15 days, and 10% within 45 days. The upfront amount is not variable — it is always 20%.</p>
            </div>
            <div className="faq-item">
              <h3>What does the &ldquo;1%&rdquo; refer to?</h3>
              <p>The 1% refers to the <strong>monthly installment</strong> during the construction period — each month, 1% of the total Agreement Value. It does not refer to the booking amount, which is 5%.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
