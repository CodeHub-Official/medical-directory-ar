import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities } from '@/utils/data';

export const metadata: Metadata = {
  title: 'المدن - دليل العيادات الطبي',
  description: 'جميع المدن المتوفرة في دليل العيادات الطبي',
  keywords: ['مدن', 'عيادات', 'القاهرة', 'الجيزة'],
};

export default function CitiesPage() {
  const cities = getAllCities();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">المدن</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">المدن</h1>
          <p className="text-blue-100 text-lg">
            اختر المدينة لعرض جميع العيادات فيها
          </p>
        </div>
      </section>

      {/* Cities Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/clinics/${city.slug}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {city.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {city.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {city.clinicCount} عيادة
                  </span>
                  <span className="text-blue-600 font-semibold">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO Content */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">المدن المتوفرة</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              يوفر دليل العيادات الطبي قائمة شاملة بجميع المدن التي تتوفر فيها عيادات ومراكز طبية.
              اختر المدينة التي تبحث عنها لعرض جميع العيادات فيها.
            </p>
            <p className="text-gray-700 leading-relaxed">
              كل مدينة تحتوي على عيادات متعددة توفر خدمات طبية متقدمة وذات جودة عالية.
              يمكنك الاطلاع على تقييمات العملاء والتواصل مع العيادة مباشرة من خلال موقعنا.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
