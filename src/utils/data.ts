/**
 * Data Utility Functions
 */

import clinicsData from '@/data/clinics.json';

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

/**
 * Get all clinics
 */
export function getAllClinics(): Clinic[] {
  return clinicsData.clinics;
}

/**
 * Get clinic by ID
 */
export function getClinicById(id: string): Clinic | undefined {
  return clinicsData.clinics.find((clinic) => clinic.id === id);
}

/**
 * Get clinics by city
 */
export function getClinicsByCity(city: string): Clinic[] {
  return clinicsData.clinics.filter(
    (clinic) => clinic.city.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Get clinics by specialty
 */
export function getClinicsBySpecialty(specialty: string): Clinic[] {
  return clinicsData.clinics.filter(
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
  return clinicsData.clinics.filter(
    (clinic) =>
      clinic.city.toLowerCase() === city.toLowerCase() &&
      clinic.specialty.toLowerCase() === specialty.toLowerCase()
  );
}

/**
 * Get clinics by district
 */
export function getClinicsByDistrict(district: string): Clinic[] {
  return clinicsData.clinics.filter(
    (clinic) => clinic.district.toLowerCase() === district.toLowerCase()
  );
}

/**
 * Get top rated clinics
 */
export function getTopRatedClinics(limit: number = 10): Clinic[] {
  return [...clinicsData.clinics]
    .sort((a, b) => b.googleRating - a.googleRating)
    .slice(0, limit);
}

/**
 * Get clinics by category
 */
export function getClinicsByCategory(category: string): Clinic[] {
  return clinicsData.clinics.filter((clinic) => clinic.category === category);
}

/**
 * Search clinics
 */
export function searchClinics(query: string): Clinic[] {
  const lowerQuery = query.toLowerCase();
  return clinicsData.clinics.filter(
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
  return clinicsData.specialties;
}

/**
 * Get specialty by slug
 */
export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return clinicsData.specialties.find((spec) => spec.slug === slug);
}

/**
 * Get specialty by name
 */
export function getSpecialtyByName(name: string): Specialty | undefined {
  return clinicsData.specialties.find(
    (spec) => spec.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get all cities
 */
export function getAllCities(): City[] {
  return clinicsData.cities;
}

/**
 * Get city by slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return clinicsData.cities.find((city) => city.slug === slug);
}

/**
 * Get city by name
 */
export function getCityByName(name: string): City | undefined {
  return clinicsData.cities.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get unique cities from clinics
 */
export function getUniqueCities(): string[] {
  const cities = new Set(clinicsData.clinics.map((clinic) => clinic.city));
  return Array.from(cities).sort();
}

/**
 * Get unique specialties from clinics
 */
export function getUniqueSpecialties(): string[] {
  const specialties = new Set(
    clinicsData.clinics.map((clinic) => clinic.specialty)
  );
  return Array.from(specialties).sort();
}

/**
 * Get unique districts from clinics
 */
export function getUniqueDistricts(): string[] {
  const districts = new Set(
    clinicsData.clinics.map((clinic) => clinic.district)
  );
  return Array.from(districts).sort();
}

/**
 * Get clinics count by city
 */
export function getClinicsCountByCity(city: string): number {
  return clinicsData.clinics.filter(
    (clinic) => clinic.city.toLowerCase() === city.toLowerCase()
  ).length;
}

/**
 * Get clinics count by specialty
 */
export function getClinicsCountBySpecialty(specialty: string): number {
  return clinicsData.clinics.filter(
    (clinic) => clinic.specialty.toLowerCase() === specialty.toLowerCase()
  ).length;
}

/**
 * Get similar clinics (same specialty and city)
 */
export function getSimilarClinics(clinic: Clinic, limit: number = 5): Clinic[] {
  return clinicsData.clinics
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
  return clinicsData.clinics
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
  return clinicsData.clinics.map((clinic) => ({
    params: {
      id: clinic.id,
    },
  }));
}

/**
 * Generate static paths for cities
 */
export function generateCityPaths() {
  return clinicsData.cities.map((city) => ({
    params: {
      slug: city.slug,
    },
  }));
}

/**
 * Generate static paths for specialties
 */
export function generateSpecialtyPaths() {
  return clinicsData.specialties.map((specialty) => ({
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
  clinicsData.specialties.forEach((specialty) => {
    clinicsData.cities.forEach((city) => {
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
