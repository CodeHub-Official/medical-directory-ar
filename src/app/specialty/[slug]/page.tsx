import { Metadata } from 'next';
import Link from 'next/link';
import {
  getClinicsBySpecialty,
  getSpecialtyBySlug,
  generateSpecialtyPaths,
} from '@/utils/data';
import {
  generateSpecialtyMetaTags,
  generateBreadcrumbSchema,
} from '@/utils/seo';
import ClinicCard from '@/components/ClinicCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medical-directory.example.com';

export async function generateStaticParams() {
  return generateSpecialtyPaths();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const specialty = getSpecialtyBySlug(params.slug);

  if (!specialty) {
    return {
      title: 'تخصص غير موجود',
      description: 'التخصص المطلوب غير موجود',
    };
  }

  const metaTags = generateSpecialtyMetaTags(specialty, siteUrl);

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

export default function SpecialtyPage({ params }: { params: { slug: string } }) {
  const specialty = getSpecialtyBySlug(params.slug);

  if (!specialty) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">تخصص غير موجود</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          العودة إلى الرئيسية
        </Link>
      </div>
    );
  }

  const clinics = getClinicsBySpecialty(specialty.name);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'الرئيسية', url: siteUrl },
      { name: 'التخصصات', url: `${siteUrl}/specialties` },
      { name: specialty.name, url: `${siteUrl}/specialty/${specialty.slug}` },
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
            <Link
              href="/specialties"
              className="text-blue-600 hover:text-blue-800"
            >
              التخصصات
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">{specialty.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            {specialty.icon} {specialty.name}
          </h1>
          <p className="text-blue-100 text-lg">{specialty.description}</p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">الخدمات المتوفرة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialty.relatedServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-gray-800">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinics List */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">
          عيادات متخصصة في {specialty.name}
        </h2>

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
              لا توجد عيادات متخصصة في {specialty.name} حالياً
            </p>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">
              دليل {specialty.name} في مصر
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {specialty.description}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              يوفر دليل العيادات الطبي قائمة شاملة بأفضل العيادات والمراكز المتخصصة في {specialty.name}.
              جميع العيادات المدرجة هنا تتمتع بسمعة جيدة وتقديم خدمات متقدمة في هذا المجال.
            </p>
            <p className="text-gray-700 leading-relaxed">
              يمكنك البحث عن عيادات {specialty.name} حسب المدينة أو الحي، والاطلاع على تقييمات العملاء
              والتواصل مع العيادة مباشرة من خلال موقعنا.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
