/**
 * 🏥 Clinic Detail Page - Connected to JSON Data
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Phone, Globe, Calendar } from 'lucide-react';
import { getAllClinics, getSimilarClinics } from '@/utils/data';
import type { Clinic } from '@/utils/data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory.example.com';

// ✨ Generate static params من الـ JSON
export async function generateStaticParams() {
  const clinics = getAllClinics();
  return clinics.map((clinic) => ({ slug: clinic.id }));
}

// ✨ Metadata لكل عيادة
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const clinics = getAllClinics();
  const clinic = clinics.find((c) => c.id === params.slug);

  if (!clinic) {
    return { title: 'عيادة غير موجودة' };
  }

  return {
    title: `${clinic.name} | دليل العيادات الطبي`,
    description: clinic.description,
    keywords: [clinic.specialty, clinic.city, clinic.district, 'عيادة', 'طبيب'],
    openGraph: {
      title: clinic.name,
      description: clinic.description,
      type: 'website',
      url: `${siteUrl}/clinic/${clinic.id}`,
      images: [{ url: clinic.image, width: 800, height: 600 }],
    },
    alternates: {
      canonical: `${siteUrl}/clinic/${clinic.id}`,
    },
  };
}

export default function ClinicPage({ params }: { params: { slug: string } }) {
  const clinics = getAllClinics();
  const clinic = clinics.find((c) => c.id === params.slug);

  if (!clinic) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">عيادة غير موجودة</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          العودة إلى الرئيسية
        </Link>
      </div>
    );
  }

  const similarClinics = getSimilarClinics(clinic, 3);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:text-blue-800">الرئيسية</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/specialties" className="text-blue-600 hover:text-blue-800">{clinic.specialty}</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">{clinic.name}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Clinic Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="relative h-72 bg-gray-200">
                <Image
                  src={clinic.image}
                  alt={clinic.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Clinic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{clinic.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(clinic.googleRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{clinic.googleRating}</span>
                <span className="text-gray-600">({clinic.googleReviews} تقييم)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {clinic.specialty}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {clinic.city}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {clinic.district}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">{clinic.description}</p>

              {/* Services */}
              {clinic.services && clinic.services.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">الخدمات</h2>
                  <div className="flex flex-wrap gap-2">
                    {clinic.services.map((service, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm border border-blue-200">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                {clinic.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a href={`tel:${clinic.phone}`} className="text-blue-600 hover:underline">
                      {clinic.phone}
                    </a>
                    {clinic.phone2 && (
                      <a href={`tel:${clinic.phone2}`} className="text-blue-600 hover:underline">
                        {clinic.phone2}
                      </a>
                    )}
                  </div>
                )}
                {clinic.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <a href={`https://${clinic.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {clinic.website}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <p className="text-gray-700">{clinic.address}</p>
                </div>
              </div>
            </div>

            {/* Similar Clinics */}
            {similarClinics.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">عيادات مشابهة</h2>
                <div className="space-y-3">
                  {similarClinics.map((sc) => (
                    <Link
                      key={sc.id}
                      href={`/clinic/${sc.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition"
                    >
                      <p className="font-semibold text-gray-900">{sc.name}</p>
                      <p className="text-gray-600 text-sm">{sc.googleRating} ⭐ ({sc.googleReviews} تقييم) - {sc.district}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات سريعة</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">التخصص</p>
                  <p className="font-semibold">{clinic.specialty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">المدينة</p>
                  <p className="font-semibold">{clinic.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الحي</p>
                  <p className="font-semibold">{clinic.district}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">التقييم</p>
                  <p className="font-semibold text-2xl">{clinic.googleRating} ⭐</p>
                  <p className="text-gray-500 text-sm">من {clinic.googleReviews} تقييم</p>
                </div>
                {clinic.phone && (
                  <a
                    href={`tel:${clinic.phone}`}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    اتصل الآن
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'MedicalBusiness',
            name: clinic.name,
            image: clinic.image,
            description: clinic.description,
            address: {
              '@type': 'PostalAddress',
              streetAddress: clinic.address,
              addressLocality: clinic.city,
              addressCountry: 'EG',
            },
            telephone: clinic.phone,
            url: `${siteUrl}/clinic/${clinic.id}`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: clinic.googleRating.toString(),
              ratingCount: clinic.googleReviews.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            medicalSpecialty: clinic.specialty,
          }),
        }}
      />
    </div>
  );
}
