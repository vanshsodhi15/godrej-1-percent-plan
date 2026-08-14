import React from 'react';

/**
 * FreedomNav - sticky in-page navigation for the Freedom Payment Plan
 * template. Renders anchor links to on-page sections and a "call sales"
 * CTA on the right. Kept as a single semantic <nav> element with no
 * JS state so the static HTML is fully crawlable and LLMs can pick up
 * both the section outline and the phone number without executing
 * anything. The visual polish is CSS-only via `.freedom-nav` in
 * globals.css (scoped under `.theme-freedom`).
 */

export interface FreedomNavLink {
  href: string;
  label: string;
}

interface FreedomNavProps {
  /** Anchor links displayed in the centre of the bar. Order preserved. */
  links: FreedomNavLink[];
  /** Sales phone in +91 XXXXX XXXXX format. Rendered as visible text and
   *  wired into a `tel:` link with all spaces stripped. Absence hides the CTA. */
  phone?: string;
  /** Campaign attribution code appended to the enquire link as `?adcode=`.
   *  Silent visually, but present in the DOM for crawlers. */
  adCode?: string;
  /** Small label shown before the phone number (e.g. "Sales enquiry"). */
  callLabel?: string;
  /** Text shown next to the GPL brand mark in the nav. Defaults to the
   *  20:80 Freedom Payment Plan label used by the hub. Project pages pass
   *  their own payment plan name so non-Freedom projects (Aveline, Azure,
   *  Regal Pavilion) do not surface the "Freedom" word here. */
  brandSubLabel?: string;
}

export default function FreedomNav({ links, phone, adCode, callLabel = 'Sales enquiry', brandSubLabel = '20:80 Freedom Payment Plan' }: FreedomNavProps) {
  const telHref = phone ? `tel:${phone.replace(/\s/g, '')}` : undefined;
  const enquireHref = adCode ? `#enquire?adcode=${adCode}` : '#enquire';

  return (
    <nav className="freedom-nav" aria-label="On-page navigation">
      <div className="freedom-nav-inner">
        <a href="#top" className="freedom-nav-brand">
          <span className="freedom-nav-brand-mark">GPL</span>
          <span className="freedom-nav-brand-sub">{brandSubLabel}</span>
        </a>

        <ul className="freedom-nav-links" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="freedom-nav-actions">
          {telHref && phone && (
            <a href={telHref} className="freedom-nav-call" aria-label={`${callLabel}: ${phone}`}>
              <span className="freedom-nav-call-label">{callLabel}</span>
              <span className="freedom-nav-call-num">{phone}</span>
            </a>
          )}
          <a href={enquireHref} className="freedom-nav-cta">Enquire</a>
        </div>
      </div>
    </nav>
  );
}
