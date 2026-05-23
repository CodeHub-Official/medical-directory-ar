import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

async function getSyncedData() {
  try {
    const publicDir = join(process.cwd(), 'public');
    // البحث عن أي ملف ينتهي بـ .json في المجلد
    const files = readdirSync(publicDir);
    const jsonFile = files.find(file => file.endsWith('.json'));

    if (!jsonFile) return null;

    const filePath = join(publicDir, jsonFile);
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Data sync failed, falling back to static...');
    return null;
  }
}
