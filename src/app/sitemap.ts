import { MetadataRoute } from 'next';
import {
  getAllClinics,
  getAllCities,
  getAllSpecialties,
} from '@/utils/data';
import { generateSitemapEntry } from '@/utils/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const clinics = getAllClinics();
  const cities = getAllCities();
  const specialties = getAllSpecialties();

  const entries: MetadataRoute.Sitemap = [];

  // Home page
  entries.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Clinic pages
  clinics.forEach((clinic) => {
    entries.push({
      url: `${siteUrl}/clinic/${clinic.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // City pages
  cities.forEach((city) => {
    entries.push({
      url: `${siteUrl}/clinics/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Specialty pages
  specialties.forEach((specialty) => {
    entries.push({
      url: `${siteUrl}/specialty/${specialty.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Specialty + City combination pages
  specialties.forEach((specialty) => {
    cities.forEach((city) => {
      entries.push({
        url: `${siteUrl}/${specialty.slug}-clinics-${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Static pages
  entries.push({
    url: `${siteUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  entries.push({
    url: `${siteUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  return entries;
}
