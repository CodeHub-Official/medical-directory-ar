 * Data Utility Functions - CodeHub Medical Directory v2
 * Fully Automated & Dynamic Version linked with Desert Admiral Engine
 */

import clinicsData from '../data/clinics.json';

// الـ Interfaces الأصلية للموقع لضمان استقرار النظام
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

// 🚀 الـ Interface الجديد الخاص بالمقالات الديناميكية
export interface Article {
  title: string;
  slug: string;
  description: string;
  category?: string;
}

/**
 * Get all clinics
 */
export function getAllClinics(): Clinic[] {
  return (clinicsData as any).clinics || [];
}

/**
 * Get clinic by ID
 */
export function getClinicById(id: string): Clinic | undefined {
  return getAllClinics().find((clinic) => clinic.id === id);
}

/**
 * Get clinics by city
 */
export function getClinicsByCity(city: string): Clinic[] {
  return getAllClinics().filter(
    (clinic) => clinic.city.toLowerCase() === city.toLowerCase() || clinic.cityEn.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Get clinics by specialty
 */
export function getClinicsBySpecialty(specialty: string): Clinic[] {
  return getAllClinics().filter(
    (clinic) => clinic.specialty.toLowerCase() === specialty.toLowerCase()
  );
}

/**
 * Get clinics by city and specialty
 */
export function getClinicsByCityAndSpecialty(
  city: string,
  specialty: string
): Clinic[] {
  return getAllClinics().filter(
    (clinic) =>
      (clinic.city.toLowerCase() === city.toLowerCase() || clinic.cityEn.toLowerCase() === city.toLowerCase()) &&
      clinic.specialty.toLowerCase() === specialty.toLowerCase()
  );
}

/**
 * Get clinics by district
 */
export function getClinicsByDistrict(district: string): Clinic[] {
  return getAllClinics().filter(
    (clinic) => clinic.district.toLowerCase() === district.toLowerCase()
  );
}

/**
 * Get top rated clinics
 */
export function getTopRatedClinics(limit: number = 10): Clinic[] {
  return [...getAllClinics()]
    .sort((a, b) => b.googleRating - a.googleRating)
    .slice(0, limit);
}

/**
 * Get clinics by category
 */
export function getClinicsByCategory(category: string): Clinic[] {
  return getAllClinics().filter((clinic) => clinic.category === category);
}

/**
 * Search clinics
 */
export function searchClinics(query: string): Clinic[] {
  const lowerQuery = query.toLowerCase();
  return getAllClinics().filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(lowerQuery) ||
      clinic.nameEn.toLowerCase().includes(lowerQuery) ||
      clinic.specialty.toLowerCase().includes(lowerQuery) ||
      clinic.city.toLowerCase().includes(lowerQuery) ||
      clinic.district.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all specialties
 */
export function getAllSpecialties(): Specialty[] {
  return (clinicsData as any).specialties || [];
}

/**
 * Get specialty by slug
 */
export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return getAllSpecialties().find((spec) => spec.slug === slug);
}

/**
 * Get specialty by name
 */
export function getSpecialtyByName(name: string): Specialty | undefined {
  return getAllSpecialties().find(
    (spec) => spec.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get all cities
 */
export function getAllCities(): City[] {
  return (clinicsData as any).cities || [];
}

/**
 * Get city by slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return getAllCities().find((city) => city.slug === slug);
}

/**
 * Get city by name
 */
export function getCityByName(name: string): City | undefined {
  return getAllCities().find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get unique cities from clinics
 */
export function getUniqueCities(): string[] {
  const cities = new Set(getAllClinics().map((clinic) => clinic.city));
  return Array.from(cities).sort();
}

/**
 * Get unique specialties from clinics
 */
export function getUniqueSpecialties(): string[] {
  const specialties = new Set(
    getAllClinics().map((clinic) => clinic.specialty)
  );
  return Array.from(specialties).sort();
}

/**
 * Get unique districts from clinics
 */
export function getUniqueDistricts(): string[] {
  const districts = new Set(
    getAllClinics().map((clinic) => clinic.district)
  );
  return Array.from(districts).sort();
}

/**
 * Get clinics count by city
 */
export function getClinicsCountByCity(city: string): number {
  return getAllClinics().filter(
    (clinic) => clinic.city.toLowerCase() === city.toLowerCase() || clinic.cityEn.toLowerCase() === city.toLowerCase()
  ).length;
}

/**
 * Get clinics count by specialty
 */
export function getClinicsCountBySpecialty(specialty: string): number {
  return getAllClinics().filter(
    (clinic) => clinic.specialty.toLowerCase() === specialty.toLowerCase()
  ).length;
}

/**
 * Get similar clinics (same specialty and city)
 */
export function getSimilarClinics(clinic: Clinic, limit: number = 5): Clinic[] {
  return getAllClinics()
    .filter(
      (c) =>
        c.id !== clinic.id &&
        c.specialty === clinic.specialty &&
        c.city === clinic.city
    )
    .sort((a, b) => b.googleRating - a.googleRating)
    .slice(0, limit);
}

/**
 * Get related clinics (same specialty, different city)
 */
export function getRelatedClinics(clinic: Clinic, limit: number = 5): Clinic[] {
  return getAllClinics()
    .filter(
      (c) => c.id !== clinic.id && c.specialty === clinic.specialty
    )
    .sort((a, b) => b.googleRating - a.googleRating)
    .slice(0, limit);
}

/**
 * Generate static paths for clinics
 */
export function generateClinicPaths() {
  return getAllClinics().map((clinic) => ({
    params: {
      id: clinic.id,
    },
  }));
}

/**
 * Generate static paths for cities
 */
export function generateCityPaths() {
  return getAllCities().map((city) => ({
    params: {
      slug: city.slug,
    },
  }));
}

/**
 * Generate static paths for specialties
 */
export function generateSpecialtyPaths() {
  return getAllSpecialties().map((specialty) => ({
    params: {
      slug: specialty.slug,
    },
  }));
}

/**
 * Generate static paths for specialty + city combinations
 */
export function generateSpecialtyCityPaths() {
  const paths: any[] = [];
  getAllSpecialties().forEach((specialty) => {
    getAllCities().forEach((city) => {
      paths.push({
        params: {
          specialty: specialty.slug,
          city: city.slug,
        },
      });
    });
  });
  return paths;
}

/**
 * 🚀 الدالة الأوتوماتيكية الجديدة: قراءة المقالات من ملف الـ JSON مباشرة
 * تُغذي قسم المقالات في الصفحة الرئيسية بدون أي تعديل كود مستقبلي
 */
export function getTopArticles(limit: number = 6): Article[] {
  return ((clinicsData as any).articles || []).slice(0, limit);
   }
