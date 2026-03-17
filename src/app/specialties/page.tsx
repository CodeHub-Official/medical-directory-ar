import { Metadata } from 'next';
import Link from 'next/link';
import { getAllSpecialties, getClinicsBySpecialty } from '@/utils/data';

export const metadata: Metadata = {
  title: 'التخصصات الطبية - دليل العيادات الطبي',
  description: 'جميع التخصصات الطبية المتوفرة في دليل العيادات الطبي',
  keywords: ['تخصصات طبية', 'جراحة تجميل', 'جلدية', 'ليزر'],
};

export default function SpecialtiesPage() {
  const specialties = getAllSpecialties();

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
            <span className="text-gray-800 font-semibold">التخصصات</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">التخصصات الطبية</h1>
          <p className="text-blue-100 text-lg">
            اختر التخصص الطبي الذي تبحث عنه
          </p>
        </div>
      </section>

      {/* Specialties Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty) => {
            const clinicCount = getClinicsBySpecialty(specialty.name).length;
            return (
              <Link
                key={specialty.id}
                href={`/specialty/${specialty.slug}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{specialty.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {specialty.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {specialty.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {clinicCount} عيادة
                  </span>
                  <span className="text-blue-600 font-semibold">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SEO Content */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">التخصصات الطبية المتوفرة</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              يوفر دليل العيادات الطبي قائمة شاملة بجميع التخصصات الطبية المتوفرة في مصر.
              اختر التخصص الذي تبحث عنه لعرض جميع العيادات المتخصصة في هذا المجال.
            </p>
            <p className="text-gray-700 leading-relaxed">
              كل تخصص يحتوي على عيادات متعددة توفر خدمات متقدمة وذات جودة عالية.
              يمكنك الاطلاع على تقييمات العملاء والتواصل مع العيادة مباشرة من خلال موقعنا.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
