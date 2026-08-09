import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  /** Optional theme scope. Currently supports "freedom" (20:80 Freedom Payment Plan
   *  terracotta palette). Falls back to the default Godrej 1% Plan charcoal + gold. */
  theme?: 'freedom';
}

export default function Layout({ children, theme }: LayoutProps) {
  const themeClass = theme ? `theme-${theme}` : '';
  return (
    <div className={`page-wrapper ${themeClass}`.trim()}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header — matches godrejproperties.com sticky header */}
      <header className="main-header">
        <div className="header-container">
          <a href="/" className="logo-container" aria-label="Godrej Properties Home">
            <img src="/assets/godrej_properties_logo.svg" alt="Godrej Properties" />
          </a>
        </div>
      </header>

      {children}

      {/* Footer — matches godrejproperties.com black footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} Godrej Properties Limited. All Rights Reserved.
          </span>
          <div className="footer-logo">
            <img src="/assets/godrej_properties_logo.svg" alt="Godrej Properties" />
          </div>
        </div>
      </footer>
    </div>
  );
}
