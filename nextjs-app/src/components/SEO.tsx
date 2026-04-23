import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: string[]; // Array of JSON stringified schema objects
  ogImage?: string;
}

export default function SEO({ title, description, canonical, schema, ogImage = '/assets/1_percent_og_image.jpg' }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Schema.org Injection */}
      {schema && schema.map((s, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: s }}
        />
      ))}
    </Head>
  );
}
