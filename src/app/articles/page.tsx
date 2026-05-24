import Link from 'next/link';
import { getSyncedData } from '@/utils/data';

export const metadata = {
  title: 'المقالات الطبية | دليل العيادات',
  description: 'مقالات طبية موثوقة في التجميل والجلدية',
};

export default async function ArticlesPage() {
  // جلب كل البيانات المدمجة من ملفات الـ JSON
  const data = await getSyncedData();
  const articles = data.articles || [];

  return (
    <div className="container mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-right">المقالات الطبية</h1>
      
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد مقالات متاحة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: any, index: number) => {
            // استخدام slug أو id كمعرف للرابط
            const slug = (article.slug || article.id || `article-${index}`).replace('.html', '');
            const title = article.title || decodeURIComponent(slug).replace(/-/g, ' ');
            
            return (
              <Link
                key={slug}
                href={`/articles/${encodeURIComponent(slug)}`}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-right flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-bold text-gray-800 text-lg leading-relaxed mb-4">
                    {title}
                  </h2>
                  {article.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                  )}
                </div>
                <span className="text-blue-600 text-sm font-medium">اقرأ المزيد ←</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
