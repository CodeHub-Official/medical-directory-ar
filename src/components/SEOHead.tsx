'use client';

import Head from 'next/head';
import { SEOMetaTags, SchemaMarkup } from '@/utils/seo';

interface SEOHeadProps {
  metaTags: SEOMetaTags;
  schema?: SchemaMarkup | SchemaMarkup[];
}

export default function SEOHead({ metaTags, schema }: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="language" content="Arabic" />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTags.ogTitle} />
      <meta property="og:description" content={metaTags.ogDescription} />
      <meta property="og:url" content={metaTags.ogUrl} />
      {metaTags.ogImage && (
        <meta property="og:image" content={metaTags.ogImage} />
      )}
      <meta property="og:site_name" content="دليل العيادات الطبي" />
      <meta property="og:locale" content="ar_EG" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={metaTags.twitterCard} />
      <meta name="twitter:title" content={metaTags.ogTitle} />
      <meta name="twitter:description" content={metaTags.ogDescription} />
      {metaTags.ogImage && (
        <meta name="twitter:image" content={metaTags.ogImage} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={metaTags.canonical} />

      {/* Alternate Links */}
      <link rel="alternate" hrefLang="ar" href={metaTags.canonical} />
      <link rel="alternate" hrefLang="x-default" href={metaTags.canonical} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Schema.org Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      {/* Additional Meta Tags for SEO */}
      <meta name="author" content="دليل العيادات الطبي" />
      <meta name="copyright" content="© 2024 دليل العيادات الطبي" />
    </Head>
  );
}
