/**
 * 🏥 Clinic Detail Page
 * Dynamic route using slug URLs for better SEO
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react';

// ✨ Metadata generation for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // In production, fetch from Supabase
  // const clinic = await getClinicBySlug(params.slug);

  return {
    title: `عيادة الأسنان المتقدمة | دليل العيادات الطبي`,
    description: `عيادة متخصصة في طب الأسنان بالقاهرة. خدمات تبييض وزراعة وتقويم. أطباء متخصصون وأسعار معقولة.`,
    keywords: [
      'عيادة أسنان',
      'القاهرة',
      'طبيب أسنان',
      'تبييض أسنان',
      'زراعة أسنان',
    ],
    openGraph: {
      title: `عيادة الأسنان المتقدمة`,
      description: `عيادة متخصصة في طب الأسنان بالقاهرة`,
      type: 'website',
      url: `https://medicaldir.com/clinic/${params.slug}`,
      images: [
        {
          url: 'https://via.placeholder.com/1200x630',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// ✨ Generate static params for all clinics
export async function generateStaticParams() {
  // In production, fetch all clinic slugs from Supabase
  // const slugs = await getAllClinicSlugs();
  // return slugs.map((slug) => ({ slug }));

  return [
    { slug: 'dental-clinic-cairo' },
    { slug: 'eye-clinic-giza' },
    { slug: 'skin-clinic-alexandria' },
  ];
}

interface ClinicPageProps {
  params: {
    slug: string;
  };
}

export default function ClinicPage({ params }: ClinicPageProps) {
  // ✨ Mock data - في الإنتاج، سيتم جلب البيانات من Supabase
  const clinic = {
    id: '1',
    name: 'عيادة الأسنان المتقدمة',
    slug: params.slug,
    description:
      'عيادة متخصصة في طب الأسنان توفر خدمات شاملة بأحدث التقنيات',
    specialty: {
      name: 'طب الأسنان',
      slug: 'dentistry',
    },
    city: {
      name: 'القاهرة',
      slug: 'cairo',
    },
    phone: '+201001234567',
    email: 'info@dentalclinic.com',
    website: 'www.dentalclinic.com',
    address: 'شارع النيل، القاهرة',
    latitude: 30.0444,
    longitude: 31.2357,
    average_rating: 4.8,
    rating_count: 245,
    images: [
      {
        id: '1',
        image_url: 'https://via.placeholder.com/600x400?text=Clinic+Front',
        alt_text: 'الواجهة الأمامية',
        is_cover: true,
      },
      {
        id: '2',
        image_url: 'https://via.placeholder.com/600x400?text=Waiting+Room',
        alt_text: 'غرفة الانتظار',
        is_cover: false,
      },
      {
        id: '3',
        image_url: 'https://via.placeholder.com/600x400?text=Treatment+Room',
        alt_text: 'عيادة العلاج',
        is_cover: false,
      },
    ],
    ratings: [
      {
        id: '1',
        rating: 5,
        comment: 'عيادة رائعة جداً، الدكتور محترف والموظفون لطيفون',
        user_name: 'أحمد محمد',
        created_at: '2024-03-10',
      },
      {
        id: '2',
        rating: 5,
        comment: 'خدمة ممتازة وأسعار معقولة',
        user_name: 'فاطمة علي',
        created_at: '2024-03-09',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✨ Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                الرئيسية
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href={`/clinics/${clinic.city.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {clinic.city.name}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">{clinic.name}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ✨ Main Content */}
          <div className="lg:col-span-2">
            {/* ✨ Images Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="relative h-96 bg-gray-200">
                <Image
                  src={
                    clinic.images[0]?.image_url ||
                    'https://via.placeholder.com/800x400'
                  }
                  alt={clinic.images[0]?.alt_text || clinic.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* ✨ Thumbnails */}
              {clinic.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto bg-gray-100">
                  {clinic.images.map((image) => (
                    <div
                      key={image.id}
                      className="flex-shrink-0 w-20 h-20 relative cursor-pointer hover:opacity-75"
                    >
                      <Image
                        src={image.image_url}
                        alt={image.alt_text}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ✨ Clinic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {clinic.name}
              </h1>

              {/* ✨ Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(clinic.average_rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {clinic.average_rating}
                </span>
                <span className="text-gray-600">
                  ({clinic.rating_count} تقييم)
                </span>
              </div>

              {/* ✨ Specialty & Location */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Link
                  href={`/specialty/${clinic.specialty.slug}`}
                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                >
                  {clinic.specialty.name}
                </Link>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {clinic.city.name}
                </span>
              </div>

              {/* ✨ Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {clinic.description}
              </p>

              {/* ✨ Contact Info */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a
                    href={`tel:${clinic.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {clinic.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {clinic.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <a
                    href={`https://${clinic.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {clinic.website}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <p className="text-gray-700">{clinic.address}</p>
                </div>
              </div>

              {/* ✨ CTA Button */}
              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                احجز موعد الآن
              </button>
            </div>

            {/* ✨ Reviews Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                تقييمات المرضى
              </h2>

              {clinic.ratings.map((rating) => (
                <div key={rating.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900">{rating.user_name}</p>
                  <p className="text-gray-600 text-sm mb-2">{rating.created_at}</p>
                  <p className="text-gray-700">{rating.comment}</p>
                </div>
              ))}

              {/* ✨ Add Review Button */}
              <button className="w-full mt-6 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                أضف تقييمك
              </button>
            </div>
          </div>

          {/* ✨ Sidebar */}
          <div>
            {/* ✨ Quick Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                معلومات سريعة
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">التخصص</p>
                  <p className="font-semibold text-gray-900">
                    {clinic.specialty.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">المدينة</p>
                  <p className="font-semibold text-gray-900">
                    {clinic.city.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">التقييم</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {clinic.average_rating}
                    </span>
                    <span className="text-gray-600">
                      من {clinic.rating_count} تقييم
                    </span>
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  احجز موعد
                </button>
              </div>
            </div>

            {/* ✨ Related Clinics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                عيادات مشابهة
              </h3>

              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    href="/clinic/another-clinic"
                    className="block p-3 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition"
                  >
                    <p className="font-semibold text-gray-900 text-sm">
                      عيادة أخرى {i}
                    </p>
                    <p className="text-gray-600 text-xs">4.5 ⭐ (120 تقييم)</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'MedicalBusiness',
            name: clinic.name,
            image: clinic.images[0]?.image_url,
            description: clinic.description,
            address: {
              '@type': 'PostalAddress',
              streetAddress: clinic.address,
              addressLocality: clinic.city.name,
              addressCountry: 'EG',
            },
            telephone: clinic.phone,
            url: `https://medicaldir.com/clinic/${clinic.slug}`,
            priceRange: '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: clinic.average_rating.toString(),
              ratingCount: clinic.rating_count.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            medicalSpecialty: clinic.specialty.name,
          }),
        }}
      />
    </div>
  );
}
