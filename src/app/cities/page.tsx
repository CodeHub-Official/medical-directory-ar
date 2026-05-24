import { Search, MapPin, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClinicCard from '@/components/ClinicCard';
import { getSyncedData } from '@/utils/data';

export default async function ClinicsPage() {
  // جلب البيانات الديناميكية من ملفات الـ JSON المدمجة
  const data = await getSyncedData();
  const clinics = data.clinics || [];

  // استخراج المدن والتخصصات الفريدة للفلترة
  const cities = Array.from(new Set(clinics.map((c: any) => c.city)));
  const specialties = Array.from(new Set(clinics.map((c: any) => c.specialty)));

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-right">استكشف العيادات الطبية</h1>
            <p className="text-gray-600 text-right">ابحث عن أفضل الرعاية الطبية في منطقتك وبين التخصصات المختلفة</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="ابحث عن عيادة أو تخصص..."
                  className="w-full pr-12 pl-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-right"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-full pr-12 pl-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none text-right">
                  <option value="">كل المدن</option>
                  {cities.map((city: any) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-full pr-12 pl-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none text-right">
                  <option value="">كل التخصصات</option>
                  {specialties.map((spec: any) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Clinics Grid */}
          {clinics.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500">لا توجد عيادات مضافة حالياً في ملفات البيانات.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clinics.map((clinic: any) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
