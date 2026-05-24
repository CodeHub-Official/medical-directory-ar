import { notFound } from 'next/navigation';
import { getSyncedData } from '@/utils/data';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replace('.html', '');
  
  // جلب كل البيانات المدمجة من كل الملفات
  const data = await getSyncedData();
  
  // البحث عن المقالة في المصفوفة المدمجة
  const article = data.articles.find((a: any) => 
    a.slug === decodedSlug || a.id === `${decodedSlug}.html` || a.id === decodedSlug
  );

  if (!article || !article.full_html) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
      <div 
        className="prose prose-lg max-w-none dynamic-content"
        dangerouslySetInnerHTML={{ __html: article.full_html }} 
      />
    </article>
  );
}

// توليد الروابط الثابتة تلقائياً لكل المقالات الموجودة في ملفات الـ JSON
export async function generateStaticParams() {
  const data = await getSyncedData();
  return data.articles.map((a: any) => ({
    slug: (a.slug || a.id).replace('.html', ''),
  }));
}
