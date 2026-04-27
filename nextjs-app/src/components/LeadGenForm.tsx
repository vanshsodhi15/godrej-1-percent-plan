/**
 * LeadGenForm — Godrej Properties enquiry capture
 *
 * • Appears 5 s after mount as a floating modal (bottom-right on desktop,
 *   full-width bottom sheet on mobile)
 * • User can close/collapse; a sticky "Enquire" pill lets them reopen
 * • Rendered client-side only (dynamic import with ssr:false in [slug].tsx)
 *   → zero impact on static HTML / AI crawler visibility
 * • POSTs to https://www.godrejproperties.com/api/enquiry
 */

import { useState, useEffect, useRef } from 'react';

interface LeadGenFormProps {
  projectName: string;
  projectId: string;   // Salesforce projCode
  adCode: string;      // Campaign addCode
  projectUrl: string;  // canonical URL of the project page
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadGenForm({ projectName, projectId, adCode, projectUrl }: LeadGenFormProps) {
  const [visible, setVisible] = useState(false);      // modal open/closed
  const [shown, setShown] = useState(false);           // has modal appeared at least once
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      formData: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        propertyType: '',
        dateTime: new Date().toISOString(),
        property: {
          projCode: projectId,
          addCode: adCode,
          url: projectUrl,
        },
        phone: form.phone.trim(),
        countryCode: form.countryCode,
        country: 'India',
        optIn: 'Yes',
        OrganicCampagnID: '',
        websiteName: projectUrl,
      },
    };

    try {
      const res = await fetch('https://www.godrejproperties.com/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(`Server responded with ${res.status}. Please try again.`);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error — please check your connection and try again.');
    }
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
              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label htmlFor="lgf-firstName" style={labelStyle}>First Name *</label>
                  <input
                    ref={firstInputRef}
                    id="lgf-firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="lgf-lastName" style={labelStyle}>Last Name *</label>
                  <input
                    id="lgf-lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    style={inputStyle}
                  />
                </div>
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
                  placeholder="john@example.com"
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
                    style={{ ...inputStyle, width: '80px', flex: 'none', paddingRight: '0.25rem' }}
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
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p role="alert" style={{
                  color: '#c0392b',
                  fontSize: '0.8125rem',
                  marginBottom: '0.75rem',
                  background: '#fdf2f2',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #f5c6cb',
                }}>
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  width: '100%',
                  background: status === 'submitting' ? 'var(--color-muted)' : 'var(--bg-dark)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.75rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                {status === 'submitting' ? 'Sending…' : 'Get a Callback'}
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
