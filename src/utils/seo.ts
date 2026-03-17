/**
 * SEO Utilities for Medical Directory
 */

export interface SEOMetaTags {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  canonical: string;
}

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate SEO meta tags for a clinic page
 */
export function generateClinicMetaTags(
  clinic: any,
  siteUrl: string
): SEOMetaTags {
  const title = `${clinic.name} - ${clinic.specialty} في ${clinic.city}`;
  const description = `${clinic.description} | ${clinic.name} متخصصة في ${clinic.specialty} بـ ${clinic.city}. التقييم: ${clinic.googleRating}/5 ⭐`;
  const keywords = [
    clinic.name,
    clinic.specialty,
    clinic.city,
    `عيادة ${clinic.specialty}`,
    `${clinic.specialty} في ${clinic.city}`,
    clinic.district,
  ];

  const clinicUrl = `${siteUrl}/clinic/${clinic.id}`;

  return {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage: clinic.image,
    ogUrl: clinicUrl,
    twitterCard: 'summary_large_image',
    canonical: clinicUrl,
  };
}

/**
 * Generate SEO meta tags for a city page
 */
export function generateCityMetaTags(
  city: any,
  specialty: string | null,
  siteUrl: string
): SEOMetaTags {
  let title: string;
  let description: string;
  let keywords: string[];
  let url: string;

  if (specialty) {
    title = `عيادات ${specialty} في ${city.name}`;
    description = `دليل شامل لأفضل عيادات ${specialty} في ${city.name}. اعثر على أفضل الأطباء والعيادات المتخصصة`;
    keywords = [
      `${specialty} في ${city.name}`,
      `عيادات ${specialty}`,
      city.name,
      `أفضل عيادات ${specialty}`,
    ];
    url = `${siteUrl}/${specialty.toLowerCase()}-clinics-${city.slug}`;
  } else {
    title = `عيادات في ${city.name} - دليل العيادات الطبي`;
    description = `دليل شامل للعيادات والمراكز الطبية في ${city.name}. اعثر على أفضل الأطباء والعيادات`;
    keywords = [
      `عيادات في ${city.name}`,
      city.name,
      'عيادات طبية',
      'مراكز طبية',
    ];
    url = `${siteUrl}/clinics/${city.slug}`;
  }

  return {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage: city.image,
    ogUrl: url,
    twitterCard: 'summary_large_image',
    canonical: url,
  };
}

/**
 * Generate SEO meta tags for a specialty page
 */
export function generateSpecialtyMetaTags(
  specialty: any,
  siteUrl: string
): SEOMetaTags {
  const title = `${specialty.name} - دليل العيادات الطبي`;
  const description = `${specialty.description} | اعثر على أفضل عيادات ${specialty.name} والأطباء المتخصصين`;
  const keywords = [
    specialty.name,
    `عيادات ${specialty.name}`,
    `أفضل ${specialty.name}`,
    `متخصصين ${specialty.name}`,
  ];

  const url = `${siteUrl}/specialty/${specialty.slug}`;

  return {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage: '',
    ogUrl: url,
    twitterCard: 'summary',
    canonical: url,
  };
}

/**
 * Generate Schema.org markup for a clinic
 */
export function generateClinicSchema(clinic: any, siteUrl: string): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: clinic.name,
    description: clinic.description,
    image: clinic.image,
    url: `${siteUrl}/clinic/${clinic.id}`,
    telephone: clinic.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      addressCountry: 'EG',
    },
    areaServed: {
      '@type': 'City',
      name: clinic.city,
    },
    medicalSpecialty: clinic.specialty,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: clinic.googleRating,
      reviewCount: clinic.googleReviews,
    },
    priceRange: '$$',
  };
}

/**
 * Generate Schema.org markup for a LocalBusiness
 */
export function generateLocalBusinessSchema(
  clinic: any,
  siteUrl: string
): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: clinic.name,
    image: clinic.image,
    description: clinic.description,
    url: `${siteUrl}/clinic/${clinic.id}`,
    telephone: clinic.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      postalCode: '00000',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '0',
      longitude: '0',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: clinic.googleRating,
      reviewCount: clinic.googleReviews,
    },
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl: string
): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(siteUrl: string): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'دليل العيادات الطبي',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'دليل شامل للعيادات والمراكز الطبية في مصر',
    sameAs: [
      'https://www.facebook.com/medicaldir',
      'https://www.instagram.com/medicaldir',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@medicaldir.com',
    },
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate SEO-friendly URL
 */
export function generateUrl(
  baseUrl: string,
  ...segments: string[]
): string {
  return [baseUrl, ...segments.map(slugify)].join('/').replace(/\/+/g, '/');
}

/**
 * Generate sitemap entry
 */
export function generateSitemapEntry(
  url: string,
  lastmod: string = new Date().toISOString().split('T')[0],
  changefreq: string = 'weekly',
  priority: string = '0.8'
): string {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
