/**
 * 🗄️ Database Utilities
 * Slug generation, image handling, and full text search
 */

// ✨ Slug Generation
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ✨ Generate unique slug
export async function generateUniqueSlug(
  text: string,
  supabase: any,
  tableName: string
): Promise<string> {
  let baseSlug = generateSlug(text);
  let newSlug = baseSlug;
  let counter = 1;

  while (true) {
    const { data } = await supabase
      .from(tableName)
      .select('id')
      .eq('slug', newSlug)
      .single();

    if (!data) break;
    newSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return newSlug;
}

// ✨ Image Management
export interface ClinicImage {
  id: string;
  clinic_id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
  is_cover: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function addClinicImage(
  supabase: any,
  clinicId: string,
  imageUrl: string,
  altText: string,
  isCover: boolean = false
): Promise<ClinicImage> {
  const { data, error } = await supabase
    .from('clinic_images')
    .insert([
      {
        clinic_id: clinicId,
        image_url: imageUrl,
        alt_text: altText,
        is_cover: isCover,
        display_order: 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getClinicImages(
  supabase: any,
  clinicId: string
): Promise<ClinicImage[]> {
  const { data, error } = await supabase
    .from('clinic_images')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getCoverImage(
  supabase: any,
  clinicId: string
): Promise<ClinicImage | null> {
  const { data, error } = await supabase
    .from('clinic_images')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('is_cover', true)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data;
}

export async function deleteClinicImage(
  supabase: any,
  imageId: string
): Promise<void> {
  const { error } = await supabase
    .from('clinic_images')
    .delete()
    .eq('id', imageId);

  if (error) throw error;
}

export async function updateImageOrder(
  supabase: any,
  imageId: string,
  order: number
): Promise<void> {
  const { error } = await supabase
    .from('clinic_images')
    .update({ display_order: order })
    .eq('id', imageId);

  if (error) throw error;
}

// ✨ Full Text Search
export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  rank: number;
}

export interface ClinicSearchResult extends SearchResult {
  average_rating: number;
  rating_count: number;
}

export async function searchClinics(
  supabase: any,
  query: string
): Promise<ClinicSearchResult[]> {
  const { data, error } = await supabase.rpc('search_clinics', {
    search_query: query,
  });

  if (error) throw error;
  return data || [];
}

export async function searchSpecialties(
  supabase: any,
  query: string
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('search_specialties', {
    search_query: query,
  });

  if (error) throw error;
  return data || [];
}

export async function searchCities(
  supabase: any,
  query: string
): Promise<SearchResult[]> {
  const { data, error } = await supabase.rpc('search_cities', {
    search_query: query,
  });

  if (error) throw error;
  return data || [];
}

// ✨ Clinic operations with slug
export async function getClinicBySlug(
  supabase: any,
  slug: string
): Promise<any> {
  const { data, error } = await supabase
    .from('clinics')
    .select(
      `
      *,
      specialty:specialties(id, name, slug),
      city:cities(id, name, slug),
      images:clinic_images(*)
    `
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data;
}

export async function getClinicsBySpecialtySlug(
  supabase: any,
  slug: string,
  limit: number = 20
): Promise<any[]> {
  const { data, error } = await supabase
    .from('clinics')
    .select(
      `
      *,
      specialty:specialties(id, name, slug),
      city:cities(id, name, slug),
      images:clinic_images(*)
    `
    )
    .eq('specialty.slug', slug)
    .eq('is_active', true)
    .order('average_rating', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getClinicsByCitySlug(
  supabase: any,
  slug: string,
  limit: number = 20
): Promise<any[]> {
  const { data, error } = await supabase
    .from('clinics')
    .select(
      `
      *,
      specialty:specialties(id, name, slug),
      city:cities(id, name, slug),
      images:clinic_images(*)
    `
    )
    .eq('city.slug', slug)
    .eq('is_active', true)
    .order('average_rating', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getClinicsBySpecialtyAndCitySlug(
  supabase: any,
  specialtySlug: string,
  citySlug: string,
  limit: number = 20
): Promise<any[]> {
  const { data, error } = await supabase
    .from('clinics')
    .select(
      `
      *,
      specialty:specialties(id, name, slug),
      city:cities(id, name, slug),
      images:clinic_images(*)
    `
    )
    .eq('specialty.slug', specialtySlug)
    .eq('city.slug', citySlug)
    .eq('is_active', true)
    .order('average_rating', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// ✨ Get all slugs for static generation
export async function getAllClinicSlugs(supabase: any): Promise<string[]> {
  const { data, error } = await supabase
    .from('clinics')
    .select('slug')
    .eq('is_active', true);

  if (error) throw error;
  return (data || []).map((clinic: any) => clinic.slug);
}

export async function getAllSpecialtySlugs(supabase: any): Promise<string[]> {
  const { data, error } = await supabase
    .from('specialties')
    .select('slug');

  if (error) throw error;
  return (data || []).map((specialty: any) => specialty.slug);
}

export async function getAllCitySlugs(supabase: any): Promise<string[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('slug');

  if (error) throw error;
  return (data || []).map((city: any) => city.slug);
}

// ✨ Clinic creation with slug
export async function createClinic(
  supabase: any,
  clinicData: any
): Promise<any> {
  const slug = await generateUniqueSlug(clinicData.name, supabase, 'clinics');

  const { data, error } = await supabase
    .from('clinics')
    .insert([
      {
        ...clinicData,
        slug,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✨ Update clinic
export async function updateClinic(
  supabase: any,
  clinicId: string,
  clinicData: any
): Promise<any> {
  const { data, error } = await supabase
    .from('clinics')
    .update(clinicData)
    .eq('id', clinicId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✨ Get clinic with all related data
export async function getClinicWithAllData(
  supabase: any,
  clinicId: string
): Promise<any> {
  const { data: clinic, error: clinicError } = await supabase
    .from('clinics')
    .select(
      `
      *,
      specialty:specialties(id, name, slug),
      city:cities(id, name, slug)
    `
    )
    .eq('id', clinicId)
    .single();

  if (clinicError) throw clinicError;

  const { data: images, error: imagesError } = await supabase
    .from('clinic_images')
    .select('*')
    .eq('clinic_id', clinicId)
    .order('display_order', { ascending: true });

  if (imagesError) throw imagesError;

  const { data: ratings, error: ratingsError } = await supabase
    .from('ratings')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (ratingsError) throw ratingsError;

  return {
    ...clinic,
    images: images || [],
    ratings: ratings || [],
  };
}

// ✨ Batch operations
export async function createMultipleClinics(
  supabase: any,
  clinics: any[]
): Promise<any[]> {
  const clinicsWithSlugs = await Promise.all(
    clinics.map(async (clinic) => ({
      ...clinic,
      slug: await generateUniqueSlug(clinic.name, supabase, 'clinics'),
    }))
  );

  const { data, error } = await supabase
    .from('clinics')
    .insert(clinicsWithSlugs)
    .select();

  if (error) throw error;
  return data || [];
}
