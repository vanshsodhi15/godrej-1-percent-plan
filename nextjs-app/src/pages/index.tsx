import Head from "next/head";
import Link from "next/link";
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Godrej Properties — GEO Testing Hub</title>
        <meta name="description" content="Internal testing hub for Godrej Properties GEO pages: 1% Plan and 20:80 Freedom Payment Plan" />
      </Head>
      
      <div className="hero">
        <img src="/assets_one_percent/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" />
        <h1>Godrej Properties — GEO Testing Hub</h1>
      </div>

      <main className="content-container" style={{ paddingTop: '2rem' }}>
        <p style={{ marginBottom: '2rem', color: 'var(--color-muted)' }}>
          Welcome to the internal staging hub. Click any of the links below to test the compiled Generative Engine Optimization (GEO) pages.
        </p>

        <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>20:80 Freedom Payment Plan</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          <Link href="/the-freedom-plan" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>Main Hub — Godrej 20:80 Freedom Payment Plan</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
              Plan definition, milestone schedule, comparison to 1% Plan, eligible projects
            </p>
          </Link>
          <Link href="/the-freedom-plan/projects/godrej-lakeside-orchard" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>Project — Godrej Lakeside Orchard, Sarjapur, East Bangalore</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
              RERA PRM/KA/RERA/1251/446/PR/300924/007105 · 3 BHK Luxe & 3.5 BHK Luxe
            </p>
          </Link>
        </div>

        <h2 style={{ fontSize: '1.25rem' }}>1% Payment Plan</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/the-1-percent-plan" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>Main Hub — What is the Godrej 1% Plan?</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>Homepage rewrite with introductory answer and overview</p>
          </Link>

          <Link href="/the-1-percent-plan/how-it-works" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>1. How the Godrej 1% Plan works (Step-by-step)</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>Five-stage breakdown with worked example</p>
          </Link>

          <Link href="/the-1-percent-plan/is-it-safe" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>2. Is the Godrej 1% Plan safe?</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>Due-diligence guide with 5 trust signals</p>
          </Link>

          <Link href="/the-1-percent-plan/apply-godrej-1-percent-logic" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>3. Apply Godrej 1% Logic</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>Definitional framework and city-wise numbers</p>
          </Link>

          <Link href="/the-1-percent-plan/calculator" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>4. Godrej 1% Plan Calculator</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>Interactive payment estimator tool</p>
          </Link>

          <Link href="/the-1-percent-plan/vs-20-percent-down" className="card card-accent" style={{ textDecoration: 'none' }}>
            <h3 style={{ marginTop: 0 }}>5. Godrej 1% Plan vs 20% Down Payment</h3>
            <p style={{ marginBottom: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>Cash-flow comparison analysis</p>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
