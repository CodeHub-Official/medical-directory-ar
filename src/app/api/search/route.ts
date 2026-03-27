import { NextRequest, NextResponse } from 'next/server';
import { getAllClinics } from '@/utils/data';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const words = query.trim().split(/\s+/).filter(w => w.length > 1);

  if (!words.length) {
    return NextResponse.json({ clinics: [], articles: [], message: 'اكتب كلمة للبحث' });
  }

  const clinics = getAllClinics().filter(c => {
    const text = `${c.name} ${c.specialty} ${c.city} ${c.district} ${c.description}`.toLowerCase();
    return words.some(w => text.includes(w));
  }).slice(0, 10);

  let articles: any[] = [];
  try {
    const articlesDir = join(process.cwd(), 'public/articles');
    const files = readdirSync(articlesDir).filter(f => f.endsWith('.html'));
    articles = files.filter(f => {
      const slug = decodeURIComponent(f.replace('.html', ''));
      return words.some(w => slug.includes(w));
    }).slice(0, 5).map(f => ({
      slug: f.replace('.html', ''),
      title: decodeURIComponent(f.replace('.html', '').replace(/-/g, ' '))
    }));
  } catch {}

  return NextResponse.json({
    clinics,
    articles,
    message: clinics.length || articles.length
      ? `لقيت ${clinics.length} عيادة و${articles.length} مقال`
      : 'مش لاقي نتايج'
  });
}
