import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function HomeRewrite() {
  const title = "Godrej Properties 1% Plan: How it Works";
  const desc = "Take the first step towards your dream home with The 1% Plan. A smarter, easier way to secure your future. Covered across 10 cities and 35 projects.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is Godrej Properties 1% payment plan and how does it work?",
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" },
    "datePublished": "2026-04-20T00:00:00Z"
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan" />
      
      <div className="hero">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>What is Godrej Properties 1% payment plan and how does it work?</h1>
      </div>

      <main className="content-container">
        <article>
          <div className="summary-card">
            <p>
              <strong>The Godrej 1% Plan</strong> allows you to book a home with an initial payment of 20% within Q1, followed by 1% of the Agreement Value every month until the next construction milestone. The plan carries an Annualised Percentage Rate (APR) of 8.5%, disclosed upfront, and the remaining balance is paid at the time of the Occupation Certificate (OC).
            </p>
          </div>
          
          <div className="grid-container">
            <div className="card card-warm">
              <h3>Who it&apos;s for</h3>
              <p>This plan is designed to make homeownership a reality for a wider demographic, available across <strong>35 eligible Godrej projects</strong> in 10 major Indian cities.</p>
            </div>
            
            <div className="card card-warm">
              <h3>Trust You Can Rely On</h3>
              <p>Backed by Godrej Properties Limited (CIN: L74120MH1985PLC035308), a SEBI-listed public entity. Benefit from RERA-mandated escrow protections and transparent 8.5% APR calculations.</p>
            </div>
          </div>

          <section style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2 style={{ color: 'var(--accent-gold-dark)' }}>Take the next step</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>Browse our eligible projects and apply the Godrej 1% logic to your housing budget today.</p>
            <button className="btn">Explore Eligible Projects</button>
            <div className="disclaimer">
              <p>Standard RERA disclosures and project-specific terms apply.</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
