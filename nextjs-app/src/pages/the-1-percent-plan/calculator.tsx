import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

export default function Calculator() {
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState<{ q1: number; monthly: number } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget || isNaN(Number(budget))) return;
    const numBudget = Number(budget);
    setResults({
      q1: numBudget * 0.20,
      monthly: numBudget * 0.01
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const title = "Godrej 1% Plan Calculator: Estimate your monthly payments and milestones";
  const desc = "Calculate your 1% Plan payment schedule. Enter city and budget, get Q1 amount, monthly 1%, OC timeline, and matching Godrej projects.";
  
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": { "@type": "Organization", "name": "Godrej Properties Limited" }
  });

  return (
    <Layout>
      <SEO title={title} description={desc} schema={[articleSchema]} canonical="https://www.godrejproperties.com/the-1-percent-plan/calculator" />
      
      <div className="hero-dark">
        <img src="/assets/1_percent_logo.png" alt="The 1% Plan Logo" className="hero-logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>Calculate Your 1% Plan Payments</h1>
      </div>

      <main className="content-container">
        <article>
          <p style={{ marginBottom: '2rem', fontSize: '1.0625rem' }}>
            The Godrej 1% Plan Calculator gives buyers an indicative payment breakdown across all stages: initial Q1 payment, monthly 1%, construction-milestone tranches, and the balance due at OC.
          </p>

          <div className="calculator-panel">
            <h2 style={{ marginTop: 0 }}>Calculator — Inputs</h2>
            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label>City</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} required>
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Noida">Noida</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Panipat">Panipat</option>
                </select>
              </div>

              <div className="form-group">
                <label>Budget (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 10000000 for 1 Crore" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required 
                  min="1000000"
                />
              </div>
              
              <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Calculate Breakdown</button>
            </form>

            {results && (
              <div className="results-box">
                <h3 style={{ color: 'var(--accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  Estimated Breakdown{city ? ` for ${city}` : ''}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span>Q1 Payment (20%)</span>
                  <strong style={{ color: 'var(--accent-gold)', fontSize: '1.125rem' }}>{formatCurrency(results.q1)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span>Monthly Payment (1%)</span>
                  <strong style={{ color: 'var(--accent-gold)', fontSize: '1.125rem' }}>{formatCurrency(results.monthly)}</strong>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7, marginBottom: 0 }}>
                  Balance due at OC. Milestone tranches apply during construction.
                </p>
              </div>
            )}
          </div>

          <div className="grid-container">
            <div className="card card-warm">
              <h3>How to read your results</h3>
              <p>The <strong>Q1 payment</strong> represents 20% reached by end of Q1. The <strong>monthly 1%</strong> is your regular outflow until the next construction milestone.</p>
            </div>
            <div className="card card-warm">
              <h3>What is not included</h3>
              <p>Stamp Duty, Registration Charges, GST, and other applicable charges are over and above the Agreement Value shown here.</p>
            </div>
          </div>

          <div className="disclaimer">
            <p><em>These figures are indicative and for illustration only. Actual amounts, schedules, and charges are governed by the Agreement for Sale (AFS). The APR of 8.5% is built into the plan and disclosed upfront in the AFS.</em></p>
          </div>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>How accurate is the calculator?</h3>
              <p>The calculator provides indicative estimates. Actual amounts and schedules are finalised in the Agreement for Sale.</p>
            </div>
            <div className="faq-item">
              <h3>Does the calculator include stamp duty and GST?</h3>
              <p>No. The calculator shows Agreement Value-based payments only. Stamp Duty, Registration Charges, GST, and other charges are additional.</p>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}
