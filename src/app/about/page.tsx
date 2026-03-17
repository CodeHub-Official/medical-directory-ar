import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'عن الموقع - دليل العيادات الطبي',
  description: 'تعرف على دليل العيادات الطبي وأهدافنا',
};

export default function AboutPage() {
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
            <span className="text-gray-800 font-semibold">عن الموقع</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">عن دليل العيادات الطبي</h1>
          <p className="text-blue-100 text-lg">
            رسالتنا هي تسهيل البحث عن أفضل العيادات والمراكز الطبية
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="bg-white p-8 rounded-lg shadow mb-8">
              <h2 className="text-3xl font-bold mb-4">من نحن؟</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                دليل العيادات الطبي هو منصة رقمية شاملة تهدف إلى تسهيل البحث والوصول إلى أفضل
                العيادات والمراكز الطبية في مصر. نوفر معلومات دقيقة وموثوقة عن آلاف العيادات
                المتخصصة في مختلف المجالات الطبية.
              </p>
              <p className="text-gray-700 leading-relaxed">
                منذ تأسيسنا، التزمنا بتقديم خدمة عالية الجودة تساعد المرضى والعملاء على اتخاذ
                قرارات مستنيرة بشأن اختيار العيادة المناسبة لاحتياجاتهم الطبية.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white p-8 rounded-lg shadow mb-8">
              <h2 className="text-3xl font-bold mb-4">رسالتنا</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                نسعى إلى توفير منصة موثوقة وسهلة الاستخدام تربط بين المرضى والعيادات الطبية
                المتخصصة. هدفنا هو:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>توفير معلومات دقيقة وشاملة عن العيادات والمراكز الطبية</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>تسهيل البحث والمقارنة بين العيادات المختلفة</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>عرض تقييمات وآراء العملاء الحقيقية</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>توفير طرق تواصل سهلة مع العيادات</span>
                </li>
              </ul>
            </div>

            {/* Vision Section */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-3xl font-bold mb-4">رؤيتنا</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                نطمح إلى أن نصبح المنصة الأولى والموثوقة للبحث عن العيادات والمراكز الطبية في
                مصر والعالم العربي. نريد أن نجعل الحصول على الرعاية الطبية الجيدة أسهل وأكثر
                شفافية للجميع.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Stats */}
            <div className="bg-blue-50 p-6 rounded-lg shadow mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الإحصائيات</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-blue-600">1000+</p>
                  <p className="text-gray-600">عيادة مسجلة</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">50+</p>
                  <p className="text-gray-600">تخصص طبي</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">10+</p>
                  <p className="text-gray-600">مدن مصرية</p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">قيمنا</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>الشفافية:</strong> معلومات صادقة وموثوقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>الجودة:</strong> خدمة عالية الجودة دائماً</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>الابتكار:</strong> تقنيات حديثة وحلول جديدة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>الثقة:</strong> حماية بيانات المستخدمين</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">هل تملك عيادة؟</h2>
          <p className="text-blue-100 text-lg mb-6">
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
