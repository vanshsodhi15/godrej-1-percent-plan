import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="page-wrapper">
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

      {/* Demo Disclaimer Banner */}
      <div className="demo-banner">
        <strong>⚠️ Demo Template:</strong> The content on these pages has not been reviewed and is for demonstration purposes only. The focus is on layout, template structure, and look/feel of how pages can appear once live on the website.
      </div>

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
