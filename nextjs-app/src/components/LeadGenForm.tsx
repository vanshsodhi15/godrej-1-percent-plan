/**
 * LeadGenForm — Godrej Properties enquiry capture
 *
 * • Appears 5 s after mount as a floating modal (bottom-right on desktop,
 *   full-width bottom sheet on mobile)
 * • User can close/collapse; a sticky "Enquire" pill lets them reopen
 * • Rendered client-side only (dynamic import with ssr:false in [slug].tsx)
 *   → zero impact on static HTML / AI crawler visibility
 * • Submission logic / validation to be wired up by IT
 */

import { useState, useEffect, useRef } from 'react';

interface LeadGenFormProps {
  projectName: string;
}

type FormStatus = 'idle' | 'success';

export default function LeadGenForm({ projectName }: LeadGenFormProps) {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
  });

  // Show after 5 s on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      setShown(true);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  // Focus first field when modal opens
  useEffect(() => {
    if (visible) firstInputRef.current?.focus();
  }, [visible]);

  const close = () => setVisible(false);
  const open = () => {
    setVisible(true);
    setShown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submission / validation handled by IT
    setStatus('success');
  };

  return (
    <>
      {/* ── Sticky reopen pill (shows after modal has appeared at least once and is closed) ── */}
      {shown && !visible && (
        <button
          onClick={open}
          aria-label="Open enquiry form"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9998,
            background: 'var(--bg-dark)',
            color: 'var(--color-white)',
            border: 'none',
            borderRadius: '999px',
            padding: '0.75rem 1.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ fontSize: '1rem' }}>💬</span> Enquire
        </button>
      )}

      {/* ── Modal overlay ── */}
      {visible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enquiry form for ${projectName}`}
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 9999,
            width: '100%',
            maxWidth: '420px',
            background: 'var(--bg-white)',
            boxShadow: '0 -4px 40px rgba(0,0,0,0.18)',
            borderRadius: '16px 16px 0 0',
            padding: '1.5rem',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
          // Responsive: full-width on mobile (maxWidth handles desktop)
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-gold-dark)',
                margin: '0 0 0.2rem',
              }}>
                Godrej Properties
              </p>
              <h2 style={{
                fontSize: '1.0625rem',
                fontWeight: 600,
                color: 'var(--color-heading)',
                margin: 0,
                lineHeight: 1.3,
              }}>
                {projectName}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', margin: '0.25rem 0 0' }}>
                Get details, pricing &amp; callback
              </p>
            </div>
            <button
              onClick={close}
              aria-label="Close enquiry form"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: 'var(--color-muted)',
                lineHeight: 1,
                padding: '0.25rem',
                marginTop: '-0.25rem',
              }}
            >
              ✕
            </button>
          </div>

          {/* Success state */}
          {status === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '1.5rem 0',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
              <h3 style={{ color: 'var(--color-heading)', margin: '0 0 0.5rem' }}>Thank you!</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', margin: 0 }}>
                A Godrej Properties advisor will reach out to you shortly.
              </p>
              <button
                onClick={close}
                style={{
                  marginTop: '1.25rem',
                  background: 'var(--bg-dark)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.6rem 1.5rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div style={{ marginBottom: '0.75rem' }}>
                <label htmlFor="lgf-fullName" style={labelStyle}>Full Name *</label>
                <input
                  ref={firstInputRef}
                  id="lgf-fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '0.75rem' }}>
                <label htmlFor="lgf-email" style={labelStyle}>Email *</label>
                <input
                  id="lgf-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  style={inputStyle}
                />
              </div>

              {/* Phone with country code */}
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="lgf-phone" style={labelStyle}>Mobile *</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    aria-label="Country code"
                    style={{ ...inputStyle, width: '90px', flex: 'none', paddingRight: '0.25rem', height: '2.4375rem', boxSizing: 'border-box' }}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <input
                    id="lgf-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel-national"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={form.countryCode === '+91' ? '9876543210' : ''}
                    style={{ ...inputStyle, flex: 1, height: '2.4375rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'var(--bg-dark)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.75rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                Get a Callback
              </button>

              <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.6rem', marginBottom: 0, textAlign: 'center', lineHeight: 1.5 }}>
                By submitting, you agree to be contacted by Godrej Properties. T&amp;C apply.
              </p>
            </form>
          )}
        </div>
      )}

      {/* ── Mobile-specific styles ── */}
      <style>{`
        @media (max-width: 480px) {
          [role="dialog"][aria-label*="Enquiry form"] {
            max-width: 100% !important;
            border-radius: 16px 16px 0 0 !important;
          }
        }
      `}</style>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--color-heading)',
  marginBottom: '0.3rem',
  letterSpacing: '0.02em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--border-light)',
  borderRadius: '4px',
  padding: '0.5rem 0.75rem',
  fontSize: '0.9375rem',
  fontFamily: 'inherit',
  color: 'var(--color-primary)',
  background: 'var(--bg-white)',
  boxSizing: 'border-box',
  outline: 'none',
};
