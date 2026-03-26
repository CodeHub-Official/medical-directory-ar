import { Metadata } from 'next';
import Link from 'next/link';
import {
  getClinicsByCity,
  getCityBySlug,
  getAllCities,
  generateCityPaths,
} from '@/utils/data';
import {
  generateCityMetaTags,
  generateBreadcrumbSchema,
} from '@/utils/seo';
import ClinicCard from '@/components/ClinicCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory.example.com';

export async function generateStaticParams() {
  return generateCityPaths();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.slug);

  if (!city) {
    return {
      title: 'مدينة غير موجودة',
      description: 'المدينة المطلوبة غير موجودة',
    };
  }

  const metaTags = generateCityMetaTags(city, null, siteUrl);

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      url: metaTags.ogUrl,
      type: 'website',
    },
    alternates: {
      canonical: metaTags.canonical,
    },
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = getCityBySlug(params.slug);

  if (!city) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">مدينة غير موجودة</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          العودة إلى الرئيسية
        </Link>
      </div>
    );
  }

  const clinics = getClinicsByCity(city.nameEn);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'الرئيسية', url: siteUrl },
      { name: 'العيادات', url: `${siteUrl}/clinics` },
      { name: city.name, url: `${siteUrl}/clinics/${city.slug}` },
    ],
    siteUrl
  );

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">{city.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">عيادات في {city.name}</h1>
          <p className="text-blue-100 text-lg">
            اعثر على أفضل العيادات والمراكز الطبية في {city.name}
          </p>
        </div>
      </section>

      {/* Clinics List */}
      <div className="container mx-auto px-4 py-12">
        {clinics.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600 text-lg">
                عدد العيادات: <strong>{clinics.length}</strong>
              </p>
            </div>

            <div className="grid-responsive">
              {clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              لا توجد عيادات في {city.name} حالياً
            </p>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">
              دليل العيادات في {city.name}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              يوفر دليل العيادات الطبي قائمة شاملة بأفضل العيادات والمراكز الطبية في {city.name}.
              سواء كنت تبحث عن عيادة متخصصة في التجميل أو الجلدية أو أي تخصص آخر، ستجد هنا
              جميع المعلومات التي تحتاجها.
            </p>
            <p className="text-gray-700 leading-relaxed">
              كل عيادة مدرجة في دليلنا تتمتع بسمعة جيدة وتقديم خدمات طبية متقدمة. يمكنك الاطلاع
              على تقييمات العملاء والتواصل مع العيادة مباشرة من خلال موقعنا.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
