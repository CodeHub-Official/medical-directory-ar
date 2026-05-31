import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Cache للبيانات لتحسين الأداء
let cachedData: { clinics: any[]; articles: any[]; cities: any[]; specialties: any[] } | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60000; // 60 ثانية

/**
 * جلب البيانات المدمجة من ملف clinics.json
 * يدعم الـ caching لتحسين الأداء
 */
export async function getSyncedData() {
  try {
    const now = Date.now();
    
    // استخدم الـ cache إذا كان لا يزال صالحاً
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      return cachedData;
    }

    const allArticles: any[] = [];
    const allClinics: any[] = [];
    const allCities: any[] = [];
    const allSpecialties: any[] = [];
    
    // المسار الصحيح والوحيد لملف البيانات الرئيسي
    const dataPath = join(process.cwd(), 'src', 'data', 'clinics.json');
    
    if (!existsSync(dataPath)) {
      console.warn(`⚠️ ملف البيانات غير موجود: ${dataPath}`);
      cachedData = { articles: [], clinics: [], cities: [], specialties: [] };
      cacheTimestamp = now;
      return cachedData;
    }
    
    try {
      const fileContent = readFileSync(dataPath, 'utf8');
      const content = JSON.parse(fileContent);
      
      if (content.articles && Array.isArray(content.articles)) {
        allArticles.push(...content.articles);
      }
      
      if (content.clinics && Array.isArray(content.clinics)) {
        // إضافة slug للعيادات إذا لم تكن موجودة
        allClinics.push(...content.clinics.map((clinic: any) => ({
          ...clinic,
          slug: clinic.slug || generateSlug(clinic.name)
        })));
      }
      
      if (content.cities && Array.isArray(content.cities)) {
        allCities.push(...content.cities);
      }
      
      if (content.specialties && Array.isArray(content.specialties)) {
        allSpecialties.push(...content.specialties);
      }
      
      console.log(`✅ تم تحميل البيانات: ${allClinics.length} عيادة، ${allArticles.length} مقالة`);
    } catch (e) {
      console.error(`❌ خطأ في قراءة ملف البيانات: ${e}`);
      cachedData = { articles: [], clinics: [], cities: [], specialties: [] };
      cacheTimestamp = now;
      return cachedData;
    }
    
    const result = {
      articles: allArticles,
      clinics: allClinics,
      cities: allCities,
      specialties: allSpecialties
    };
    
    // حفظ في الـ cache
    cachedData = result;
    cacheTimestamp = now;
    
    return result;
  } catch (err) {
    console.error('❌ خطأ في تحميل البيانات:', err);
    return { articles: [], clinics: [], cities: [], specialties: [] };
  }
}

/**
 * الحصول على جميع العيادات
 */
export async function getAllClinics(): Promise<any[]> {
  const data = await getSyncedData();
  return data.clinics;
}

/**
 * الحصول على جميع المدن
 */
export async function getAllCities(): Promise<any[]> {
  const data = await getSyncedData();
  
  // استخراج المدن الفريدة من العيادات إذا لم تكن موجودة
  if (data.cities.length === 0 && data.clinics.length > 0) {
    const uniqueCities = Array.from(
      new Map(
        data.clinics
          .filter((c: any) => c.city)
          .map((c: any) => [c.city, { 
            id: `city-${generateSlug(c.city)}`,
            name: c.city, 
            slug: generateSlug(c.city),
            clinicCount: 0
          }])
      ).values()
    );
    return uniqueCities;
  }
  
  return data.cities;
}

/**
 * الحصول على جميع التخصصات
 */
export async function getAllSpecialties(): Promise<any[]> {
  const data = await getSyncedData();
  
  // استخراج التخصصات الفريدة من العيادات إذا لم تكن موجودة
  if (data.specialties.length === 0 && data.clinics.length > 0) {
    const uniqueSpecialties = Array.from(
      new Map(
        data.clinics
          .filter((c: any) => c.specialty)
          .map((c: any) => [c.specialty, { 
            id: `specialty-${generateSlug(c.specialty)}`,
            name: c.specialty, 
            slug: generateSlug(c.specialty),
            clinicCount: 0
          }])
      ).values()
    );
    return uniqueSpecialties;
  }
  
  return data.specialties;
}

/**
 * الحصول على عيادة واحدة بواسطة ID
 */
export async function getClinicById(id: string): Promise<any | null> {
  const data = await getSyncedData();
  return data.clinics.find((c: any) => c.id === id) || null;
}

/**
 * الحصول على عيادة واحدة بواسطة slug
 */
export async function getClinicBySlug(slug: string): Promise<any | null> {
  const data = await getSyncedData();
  const decodedSlug = decodeURIComponent(slug);
  return data.clinics.find((c: any) => generateSlug(c.name) === decodedSlug || c.slug === decodedSlug) || null;
}

/**
 * البحث عن عيادات
 */
export async function searchClinics(query: string): Promise<any[]> {
  const data = await getSyncedData();
  const words = query.toLowerCase().trim().split(/\s+/).filter(w => w.length > 1);
  
  if (words.length === 0) return [];
  
  return data.clinics.filter((clinic: any) => {
    const text = `${clinic.name} ${clinic.specialty} ${clinic.city} ${clinic.district} ${clinic.description}`.toLowerCase();
    return words.some(w => text.includes(w));
  });
}

/**
 * الحصول على عيادات حسب التخصص
 */
export async function getClinicsBySpecialty(specialty: string): Promise<any[]> {
  const data = await getSyncedData();
  return data.clinics.filter((c: any) => c.specialty === specialty);
}

/**
 * الحصول على عيادات حسب المدينة
 */
export async function getClinicsByCity(city: string): Promise<any[]> {
  const data = await getSyncedData();
  return data.clinics.filter((c: any) => c.city === city);
}

/**
 * الحصول على جميع المقالات
 */
export async function getAllArticles(): Promise<any[]> {
  const data = await getSyncedData();
  return data.articles;
}

/**
 * الحصول على مقالة واحدة بواسطة slug
 */
export async function getArticleBySlug(slug: string): Promise<any | null> {
  const data = await getSyncedData();
  const decodedSlug = decodeURIComponent(slug).replace('.html', '');
  return data.articles.find((a: any) => 
    a.slug === decodedSlug || 
    a.id === `${decodedSlug}.html` || 
    a.id === decodedSlug ||
    generateSlug(a.title) === decodedSlug
  ) || null;
}

/**
 * تحويل النص إلى slug
 * مثال: "عيادة الأسنان" -> "eyadat-alasnan"
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  
  // تحويل العربية إلى لاتينية مبسطة
  const arabicToLatin: { [key: string]: string } = {
    'ا': 'a', 'أ': 'a', 'إ': 'a', 'آ': 'a',
    'ب': 'b', 'ت': 't', 'ث': 'th',
    'ج': 'j', 'ح': 'h', 'خ': 'kh',
    'د': 'd', 'ذ': 'dh', 'ر': 'r',
    'ز': 'z', 'س': 's', 'ش': 'sh',
    'ص': 's', 'ض': 'd', 'ط': 't',
    'ظ': 'z', 'ع': 'a', 'غ': 'gh',
    'ف': 'f', 'ق': 'q', 'ك': 'k',
    'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'و': 'w', 'ي': 'y',
    'ة': 'a', 'ء': ''
  };
  
  return text
    .toLowerCase()
    .split('')
    .map(char => arabicToLatin[char] || char)
    .join('')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * مسح الـ cache يدويًا
 */
export function clearCache(): void {
  cachedData = null;
  cacheTimestamp = 0;
}
