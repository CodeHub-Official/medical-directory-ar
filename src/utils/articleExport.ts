/**
 * Article Export Utilities
 * Handles exporting articles in various formats
 */

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  images: string[];
  pageType: 'clinic' | 'specialty' | 'city' | 'general';
  pageId?: string;
  status: 'draft' | 'published';
  seoTitle: string;
  seoDescription: string;
}

/**
 * Export article as HTML
 */
export function exportAsHTML(article: Article): string {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHTML(article.seoDescription)}">
  <meta property="og:title" content="${escapeHTML(article.seoTitle)}">
  <meta property="og:description" content="${escapeHTML(article.seoDescription)}">
  <meta property="og:type" content="article">
  <title>${escapeHTML(article.seoTitle || article.title)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { 
      font-family: 'Cairo', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.8;
      color: #333;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .container { 
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 2.5em;
      color: #0066cc;
      margin-bottom: 20px;
      border-bottom: 4px solid #0066cc;
      padding-bottom: 15px;
      line-height: 1.3;
    }
    h2 {
      font-size: 1.8em;
      color: #0066cc;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      color: #666;
      font-size: 0.95em;
      margin-bottom: 30px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .meta span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .content {
      margin: 30px 0;
      line-height: 1.9;
      font-size: 1.05em;
    }
    .content p {
      margin-bottom: 15px;
    }
    .images {
      margin: 40px 0;
    }
    .images h2 {
      margin-top: 0;
    }
    .image-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .image-gallery img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.3s ease;
    }
    .image-gallery img:hover {
      transform: scale(1.02);
    }
    .seo-info {
      background: linear-gradient(135deg, #f0f4f8 0%, #e8f1f9 100%);
      padding: 25px;
      border-radius: 12px;
      margin-top: 40px;
      border-left: 4px solid #0066cc;
    }
    .seo-info h3 {
      color: #0066cc;
      margin-bottom: 15px;
      font-size: 1.3em;
    }
    .seo-info p {
      margin-bottom: 10px;
      color: #555;
    }
    .seo-info strong {
      color: #0066cc;
    }
    footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #ddd;
      color: #666;
      font-size: 0.9em;
      text-align: center;
    }
    @media print {
      body { background: white; }
      .container { box-shadow: none; border-radius: 0; }
      footer { page-break-before: avoid; }
    }
    @media (max-width: 768px) {
      h1 { font-size: 1.8em; }
      .container { padding: 20px; }
      .meta { flex-direction: column; gap: 10px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${escapeHTML(article.title)}</h1>
    
    <div class="meta">
      <span>✍️ الكاتب: ${escapeHTML(article.author)}</span>
      <span>📅 التاريخ: ${formatDate(article.createdAt)}</span>
      <span>📂 النوع: ${getPageTypeName(article.pageType)}</span>
      <span>📌 الحالة: ${article.status === 'published' ? '✅ منشور' : '📝 مسودة'}</span>
    </div>
    
    <div class="content">
      <p>${article.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
    </div>

    ${article.images.length > 0 ? `
    <div class="images">
      <h2>📸 الصور المرفقة</h2>
      <div class="image-gallery">
        ${article.images.map((img, i) => `<img src="${img}" alt="صورة من المقال - ${i + 1}" loading="lazy" />`).join('')}
      </div>
    </div>
    ` : ''}

    <div class="seo-info">
      <h3>🔍 معلومات تحسين محركات البحث (SEO)</h3>
      <p><strong>العنوان:</strong> ${escapeHTML(article.seoTitle)}</p>
      <p><strong>الوصف:</strong> ${escapeHTML(article.seoDescription)}</p>
      <p><strong>نوع الصفحة:</strong> ${getPageTypeName(article.pageType)}</p>
      <p><strong>معرّف المقال:</strong> ${escapeHTML(article.id)}</p>
    </div>

    <footer>
      <p>✅ تم إنشاء هذا المقال من لوحة التحكم الإدارية</p>
      <p>📱 دليل العيادات الطبي - منصة Programmatic SEO</p>
      <p>© ${new Date().getFullYear()} جميع الحقوق محفوظة</p>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Export article as Markdown
 */
export function exportAsMarkdown(article: Article): string {
  return `# ${article.title}

---

## 📋 معلومات المقال

| المعلومة | القيمة |
|---------|--------|
| **الكاتب** | ${article.author} |
| **التاريخ** | ${formatDate(article.createdAt)} |
| **النوع** | ${getPageTypeName(article.pageType)} |
| **الحالة** | ${article.status === 'published' ? '✅ منشور' : '📝 مسودة'} |
| **معرّف المقال** | \`${article.id}\` |

---

## 📝 المحتوى

${article.content}

---

${article.images.length > 0 ? `
## 📸 الصور المرفقة

${article.images.map((img, i) => `
### صورة ${i + 1}
![صورة من المقال - ${i + 1}](${img})
`).join('\n')}

---
` : ''}

## 🔍 معلومات SEO

### العنوان المحسّن
\`\`\`
${article.seoTitle}
\`\`\`

### الوصف المحسّن
\`\`\`
${article.seoDescription}
\`\`\`

---

## 📊 الإحصائيات

- **عدد الكلمات:** ${article.content.split(/\\s+/).length}
- **عدد الأحرف:** ${article.content.length}
- **عدد الصور:** ${article.images.length}

---

*تم إنشاء هذا المقال من لوحة التحكم الإدارية - دليل العيادات الطبي*

*آخر تحديث: ${new Date().toLocaleDateString('ar-EG')}*
`;
}

/**
 * Export article as JSON
 */
export function exportAsJSON(article: Article): string {
  return JSON.stringify(article, null, 2);
}

/**
 * Export article as PDF-ready HTML
 */
export function exportAsPDF(article: Article): string {
  // Return the same as HTML - user can print to PDF
  return exportAsHTML(article);
}

/**
 * Helper function to escape HTML special characters
 */
function escapeHTML(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Helper function to format date in Arabic
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Helper function to get page type name in Arabic
 */
function getPageTypeName(type: string): string {
  const names: { [key: string]: string } = {
    'clinic': 'عيادة',
    'specialty': 'تخصص طبي',
    'city': 'مدينة',
    'general': 'عام'
  };
  return names[type] || type;
}

/**
 * Download file helper
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Batch export multiple articles
 */
export function batchExportArticles(articles: Article[], format: 'html' | 'markdown' | 'json'): void {
  articles.forEach(article => {
    let content = '';
    let filename = `${article.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}`;

    switch (format) {
      case 'html':
        content = exportAsHTML(article);
        filename += '.html';
        break;
      case 'markdown':
        content = exportAsMarkdown(article);
        filename += '.md';
        break;
      case 'json':
        content = exportAsJSON(article);
        filename += '.json';
        break;
    }

    downloadFile(content, filename);
  });
}
