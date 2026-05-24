import { notFound } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  Clock, 
  Shield, 
  Award,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSyncedData } from '@/utils/data';

export default async function ClinicPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // انتظر params لدعم Next.js 16
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // جلب البيانات من ملفات الـ JSON المدمجة
  const data = await getSyncedData();
  
  // البحث عن العيادة بواسطة الـ slug أو الـ id
  const clinic = data.clinics.find((c: any) => 
    c.slug === decodedSlug || c.id === decodedSlug
  );

  if (!clinic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* المحتوى الرئيسي للعيادة */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
                        {clinic.specialty}
                      </span>
                      {clinic.category === 'A' && (
                        <span className="bg-amber-100 text-amber-600 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          مميزة
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{clinic.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span>{clinic.city}، {clinic.district}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-900">{clinic.googleRating}</span>
                        <span className="text-sm">({clinic.googleReviews} تقييم)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-8">
                  <p>{clinic.description}</p>
                </div>

                {clinic.services && clinic.services.length > 0 && (
                  <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">الخدمات المتاحة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {clinic.services.map((service: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* الجانب الجانبي - معلومات التواصل */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">معلومات التواصل</h3>
                
                <div className="space-y-4 mb-8">
                  <a href={`tel:${clinic.phone}`} className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-100 transition group">
                    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{clinic.phone}</span>
                  </a>

                  {clinic.website && (
                    <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-gray-100 transition group">
                      <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="font-medium">الموقع الإلكتروني</span>
                    </a>
                  )}
                </div>

                {/* روابط التواصل الاجتماعي */}
                {clinic.socialMedia && (
                  <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                    {clinic.socialMedia.facebook && (
                      <a href={clinic.socialMedia.facebook} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition">
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                    {clinic.socialMedia.instagram && (
                      <a href={clinic.socialMedia.instagram} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition">
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {clinic.socialMedia.whatsapp && (
                      <a href={`https://wa.me/${clinic.socialMedia.whatsapp}`} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition">
                        <MessageCircle className="w-6 h-6" />
                      </a>
                    )}
                    {clinic.socialMedia.youtube && (
                      <a href={clinic.socialMedia.youtube} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition">
                        <Youtube className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// توليد المسارات الثابتة لكل العيادات في ملفات الـ JSON
export async function generateStaticParams() {
  const data = await getSyncedData();
  return data.clinics.map((clinic: any) => ({
    slug: clinic.slug || clinic.id,
  }));
}
