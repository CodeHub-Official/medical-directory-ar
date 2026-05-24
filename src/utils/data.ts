import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function getSyncedData() {
  try {
    const allArticles: any[] = [];
    const allClinics: any[] = [];
    
    // المسارات التي سنبحث فيها عن ملفات البيانات
    const searchPaths = [
      join(process.cwd(), 'data'),
      join(process.cwd(), 'public'),
      join(process.cwd(), 'src', 'data')
    ];

    for (const dir of searchPaths) {
      if (!existsSync(dir)) continue;
      
      const files = readdirSync(dir);
      // البحث عن كل ملفات الـ JSON (تجاهل ملفات النظام)
      const jsonFiles = files.filter(f => 
        f.endsWith('.json') && 
        !['package.json', 'tsconfig.json', 'next.config.json', 'project.json'].includes(f)
      );

      for (const file of jsonFiles) {
        try {
          const content = JSON.parse(readFileSync(join(dir, file), 'utf8'));
          if (content.articles) allArticles.push(...content.articles);
          if (content.clinics) allClinics.push(...content.clinics);
        } catch (e) {
          console.error(`Error parsing ${file}:`, e);
        }
      }
    }
    
    return {
      articles: allArticles,
      clinics: allClinics
    };
  } catch (err) {
    console.error('Data loading failed:', err);
    return { articles: [], clinics: [] };
  }
}
