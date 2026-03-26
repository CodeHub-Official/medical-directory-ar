import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';

const articlesDir = join(process.cwd(), 'public/articles');

export async function generateStaticParams() {
  const files = readdirSync(articlesDir).filter(f => f.endsWith('.html'));
  return files.map(f => ({ slug: f.replace('.html', '') }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    const content = readFileSync(join(articlesDir, `${params.slug}.html`), 'utf-8');
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  } catch {
    notFound();
  }
}
