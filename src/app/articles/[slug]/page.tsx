import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';

async function getArticleFromJSON(slug: string) {
  try {
    const filePath = join(process.cwd(), 'public', 'data_sync.json');
    const fileContent = readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const articles = data.articles || [];
    return articles.find((a: any) => 
      a.slug === slug || a.id === `${slug}.html` || a.id === slug
    );
  } catch (e) {
    return null;
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug).replace('.html', '');
  
  const jsonArticle = await getArticleFromJSON(decodedSlug);
  if (jsonArticle && jsonArticle.full_html) {
    return (
      <div 
        className="dynamic-article" 
        dangerouslySetInnerHTML={{ __html: jsonArticle.full_html }} 
      />
    );
  }

  try {
    const articlesDir = join(process.cwd(), 'public/articles');
    const filePath = join(articlesDir, `${decodedSlug}.html`);
    const content = readFileSync(filePath, 'utf8');
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const articlesDir = join(process.cwd(), 'public/articles');
    const files = readdirSync(articlesDir);
    return files
      .filter(file => file.endsWith('.html'))
      .map(file => ({
        slug: file.replace('.html', ''),
      }));
  } catch (e) {
    return [];
  }
}
