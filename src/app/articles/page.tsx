import Link from 'next/link';
import { readdirSync } from 'fs';
import { join } from 'path';

export const metadata = {
  title: 'المقالات الطبية | دليل العيادات',
  description: 'مقالات طبية موثوقة في التجميل والجلدية',
};

export default function ArticlesPage() {
  const articlesDir = join(process.cwd(), 'public/articles');
  const files = readdirSync(articlesDir).filter(f => f.endsWith('.html'));

  return (
    <div className="container mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">المقالات الطبية</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => {
          const slug = file.replace('.html', '');
          const title = decodeURIComponent(slug).replace(/-/g, ' ');
          return (
            <Link
              key={slug}
              href={`/articles/${encodeURIComponent(slug)}`}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="font-bold text-gray-800 text-lg leading-relaxed">
                {title}
              </h2>
              <span className="text-blue-600 text-sm mt-2 block">اقرأ المزيد ←</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
