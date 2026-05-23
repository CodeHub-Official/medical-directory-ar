import Link from 'next/link';
import ClinicCard from '@/components/ClinicCard';
import {
  getTopRatedClinics,
  getAllCities,
  getAllSpecialties,
  getTopArticles
} from '@/utils/data';
import { generateOrganizationSchema } from '@/utils/seo';

export const revalidate = 10;

export default async function Home() {
  const topClinics = await getTopRatedClinics(6);
  const cities = await getAllCities();
  const specialties = await getAllSpecialties();
  const topArticles = await getTopArticles(6); 
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory-ar-c2m5.vercel.app';
  const organizationSchema = generateOrganizationSchema(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">دليل CodeHub الطبي</h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            بيانات طبية دقيقة ومحدثة تلقائياً من الملف المرفوع
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-600">🏙️ المدن</h3>
              <div className="space-y-2">
                {cities.slice(0, 5).map((city: any) => (
                  <Link key={city.id} href={`/clinics/${city.slug}`} className="block text-blue-600 hover:text-blue-800 hover:underline">
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-600">🏥 التخصصات</h3>
              <div className="space-y-2">
                {specialties.slice(0, 5).map((specialty: any) => (
                  <Link key={specialty.id} href={`/specialty/${specialty.slug}`} className="block text-blue-600 hover:text-blue-800 hover:underline">
                    {specialty.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-600">⭐ الأعلى تقييماً</h3>
              <div className="space-y-2">
                {topClinics.slice(0, 5).map((clinic: any) => (
                  <Link key={clinic.id} href={`/clinic/${clinic.id}`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                    {clinic.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">أحدث العيادات المضافة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topClinics.map((clinic: any) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </div>
      </section>

      {topArticles.length > 0 && (
        <section className="py-16 bg-blue-50 border-t border-b border-blue-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 border-r-4 border-blue-600 pr-3">📚 أحدث المقالات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topArticles.map((art: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{art.category || 'طبي'}</span>
                    <h3 className="text-lg font-bold mt-3 mb-2 text-gray-900">{art.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{art.description}</p>
                  </div>
                  <Link href={`/articles/${art.slug}.html`} className="text-blue-600 font-bold text-sm hover:text-blue-800 hover:underline inline-block mt-2">
                    اقرأ الدليل كاملاً ←
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

