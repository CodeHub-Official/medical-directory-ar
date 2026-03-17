import Link from 'next/link';
import ClinicCard from '@/components/ClinicCard';
import {
  getTopRatedClinics,
  getAllCities,
  getAllSpecialties,
} from '@/utils/data';
import { generateOrganizationSchema } from '@/utils/seo';

export default function Home() {
  const topClinics = getTopRatedClinics(6);
  const cities = getAllCities();
  const specialties = getAllSpecialties();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory.example.com';

  const organizationSchema = generateOrganizationSchema(siteUrl);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            دليل العيادات الطبي
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            اعثر على أفضل العيادات والمراكز الطبية في مصر بسهولة
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ابحث عن عيادة أو تخصص..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">تصفح حسب</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Cities */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-600">🏙️ المدن</h3>
              <div className="space-y-2">
                {cities.slice(0, 5).map((city) => (
                  <Link
                    key={city.id}
                    href={`/clinics/${city.slug}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {city.name} ({city.clinicCount})
                  </Link>
                ))}
              </div>
              <Link
                href="/cities"
                className="text-blue-600 hover:text-blue-800 text-sm mt-3 inline-block"
              >
                عرض جميع المدن →
              </Link>
            </div>

            {/* Specialties */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                🏥 التخصصات
              </h3>
              <div className="space-y-2">
                {specialties.slice(0, 5).map((specialty) => (
                  <Link
                    key={specialty.id}
                    href={`/specialty/${specialty.slug}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {specialty.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/specialties"
                className="text-blue-600 hover:text-blue-800 text-sm mt-3 inline-block"
              >
                عرض جميع التخصصات →
              </Link>
            </div>

            {/* Top Rated */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                ⭐ الأعلى تقييماً
              </h3>
              <div className="space-y-2">
                {topClinics.slice(0, 5).map((clinic) => (
                  <Link
                    key={clinic.id}
                    href={`/clinic/${clinic.id}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                  >
                    {clinic.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Clinics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">أفضل العيادات</h2>
            <Link href="/clinics/cairo" className="text-blue-600 hover:text-blue-800">
              عرض الكل →
            </Link>
          </div>

          <div className="grid-responsive">
            {topClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا اختيارنا؟</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">بحث سهل</h3>
              <p className="text-gray-600">
                ابحث عن العيادات حسب التخصص أو المدينة أو الحي بسهولة
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">تقييمات حقيقية</h3>
              <p className="text-gray-600">
                اطلع على تقييمات العملاء الحقيقية لكل عيادة
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">معلومات كاملة</h3>
              <p className="text-gray-600">
                احصل على جميع معلومات التواصل والعنوان والخدمات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">هل تملك عيادة؟</h2>
          <p className="text-lg mb-6 text-blue-100">
            أضف عيادتك إلى دليلنا وزد من عدد عملائك
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            أضف عيادتك الآن
          </button>
        </div>
      </section>
    </>
  );
}
