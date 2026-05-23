import clinicsData from '../data/clinics.json';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface Clinic {
  id: string;
  name: string;
  nameEn: string;
  specialty: string;
  specialtyEn: string;
  city: string;
  cityEn: string;
  district: string;
  address: string;
  phone: string;
  phone2?: string;
  website?: string;
  googleRating: number;
  googleReviews: number;
  description: string;
  services: string[];
  socialMedia: Record<string, string>;
  category: string;
  image: string;
}

export interface Specialty {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  icon: string;
  relatedServices: string[];
}

export interface City {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  population: number;
  clinicCount: number;
  image: string;
}

export interface Article {
  title: string;
  slug: string;
  description: string;
  category?: string;
  full_html?: string;
}

async function getSyncedData() {
  try {
    const filePath = join(process.cwd(), 'public', 'data_sync.json');
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory-ar-c2m5.vercel.app';
      const res = await fetch(`${siteUrl}/data_sync.json`, { next: { revalidate: 10 } });
      if (res.ok) return await res.json();
    } catch (fetchErr) {
      console.error('Failed to fetch sync data');
    }
    return null;
  }
}

export async function getAllClinics(): Promise<Clinic[]> {
  const synced = await getSyncedData();
  const baseClinics = (clinicsData as any).clinics || [];
  const extraClinics = synced?.clinics || [];
  return [...baseClinics, ...extraClinics];
}

export async function getTopRatedClinics(limit: number = 10): Promise<Clinic[]> {
  const clinics = await getAllClinics();
  return [...clinics]
    .sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0))
    .slice(0, limit);
}

export async function getAllSpecialties(): Promise<Specialty[]> {
  const synced = await getSyncedData();
  const baseSpecs = (clinicsData as any).specialties || [];
  const extraSpecs = synced?.specialties || [];
  return [...baseSpecs, ...extraSpecs];
}

export async function getAllCities(): Promise<City[]> {
  const synced = await getSyncedData();
  const baseCities = (clinicsData as any).cities || [];
  const extraCities = synced?.cities || [];
  return [...baseCities, ...extraCities];
}

export async function getTopArticles(limit: number = 6): Promise<Article[]> {
  const synced = await getSyncedData();
  const baseArticles = (clinicsData as any).articles || [];
  const extraArticles = synced?.articles || [];
  
  const allArticles = [...baseArticles, ...extraArticles].map(art => ({
    ...art,
    slug: art.slug || art.id?.replace('.html', '') || 'article'
  }));

  return allArticles.slice(0, limit);
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const cities = await getAllCities();
  return cities.find((city) => city.slug === slug);
}

export async function getSpecialtyBySlug(slug: string): Promise<Specialty | undefined> {
  const specs = await getAllSpecialties();
  return specs.find((spec) => spec.slug === slug);
}
