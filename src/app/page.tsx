import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  Stethoscope, 
  Shield, 
  Clock, 
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClinicCard from '@/components/ClinicCard';
import { getSyncedData } from '@/utils/data';

export default async function Home() {
  // جلب البيانات الديناميكية من ملفات الـ JSON
  const data = await getSyncedData();
  
  // 1. جلب التخصصات الفريدة من العيادات المضافة
  const specialties = Array.from(new Set(data.clinics.map((c: any) => c.specialty))).slice(0, 6);
  
  // 2. جلب أحدث العيادات (آخر 3 تم إضافتهم)
  const featuredClinics = data.clinics.slice(-3).reverse();
  
  // 3. جلب أحدث المقالات (آخر 3 مقالات)
  const latestArticles = data.articles.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-blue-600 py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                ابحث عن أفضل <span className="text-blue-200">العيادات الطبية</span> في مصر
              </h1>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                دليل شامل يضم أفضل المراكز الطبية والعيادات المتخصصة، مع تقييمات حقيقية وتفاصيل كاملة لمساعدتك في اختيار الرعاية الصحية الأنسب.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/clinics" 
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  استعرض العيادات
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </Link>
                <Link 
                  href="/specialties" 
                  className="bg-blue-500 text-white border border-blue-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-400 transition flex items-center justify-center"
                >
                  تصفح التخصصات
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Clinics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">عيادات مميزة</h2>
                <p className="text-gray-600">نخبة من أفضل العيادات والمراكز الطبية المختارة بعناية</p>
              </div>
              <Link href="/clinics" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                عرض الكل
                <ChevronRight className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredClinics.length > 0 ? (
                featuredClinics.map((clinic: any) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-10">سيتم إضافة العيادات قريباً</p>
              )}
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">أحدث المقالات الطبية</h2>
                <p className="text-gray-600">نصائح ومعلومات طبية موثوقة من خبراء التجميل والصحة</p>
              </div>
              <Link href="/articles" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                كل المقالات
                <ChevronRight className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.length > 0 ? (
                latestArticles.map((article: any, index: number) => {
                  const slug = (article.slug || article.id || `article-${index}`).replace('.html', '');
                  return (
                    <Link 
                      key={slug}
                      href={`/articles/${encodeURIComponent(slug)}`}
                      className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-8">
                        <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {article.description || "اقرأ المزيد عن هذا الموضوع الطبي المتخصص وتعرف على أحدث التقنيات والنصائح."}
                        </p>
                        <div className="flex items-center text-blue-600 font-bold">
                          اقرأ المزيد
                          <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform rotate-180" />
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="col-span-full text-center text-gray-500 py-10">سيتم إضافة المقالات قريباً</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
