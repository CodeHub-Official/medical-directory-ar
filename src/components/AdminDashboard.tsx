'use client';

import React, { useState, useRef } from 'react';
import { Download, Upload, Eye, Settings, Plus, Trash2, Edit2, FileText } from 'lucide-react';

interface Article {
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

interface ExportFormat {
  id: string;
  name: string;
  format: 'html' | 'pdf' | 'markdown' | 'json';
  icon: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showNewArticle, setShowNewArticle] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'articles' | 'settings' | 'export'>('articles');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    content: '',
    author: 'مسؤول الموقع',
    images: [],
    pageType: 'general',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
  });

  const exportFormats: ExportFormat[] = [
    { id: '1', name: 'HTML', format: 'html', icon: '📄' },
    { id: '2', name: 'PDF', format: 'pdf', icon: '📕' },
    { id: '3', name: 'Markdown', format: 'markdown', icon: '📝' },
    { id: '4', name: 'JSON', format: 'json', icon: '⚙️' },
  ];

  const handleAddArticle = () => {
    if (!formData.title || !formData.content) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newArticle: Article = {
      id: editingId || Date.now().toString(),
      title: formData.title || '',
      content: formData.content || '',
      author: formData.author || 'مسؤول الموقع',
      createdAt: new Date().toISOString(),
      images: formData.images || [],
      pageType: formData.pageType as any || 'general',
      pageId: formData.pageId,
      status: formData.status as any || 'draft',
      seoTitle: formData.seoTitle || '',
      seoDescription: formData.seoDescription || '',
    };

    if (editingId) {
      setArticles(articles.map(a => a.id === editingId ? newArticle : a));
      setEditingId(null);
    } else {
      setArticles([...articles, newArticle]);
    }

    resetForm();
    setShowNewArticle(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: 'مسؤول الموقع',
      images: [],
      pageType: 'general',
      status: 'draft',
      seoTitle: '',
      seoDescription: '',
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleEditArticle = (article: Article) => {
    setFormData(article);
    setEditingId(article.id);
    setShowNewArticle(true);
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => {
        const reader = new FileReader();
        return new Promise<string>(resolve => {
          reader.onload = (event) => {
            resolve(event.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then(images => {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), ...images]
        }));
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const exportArticle = (article: Article, format: ExportFormat) => {
    let content = '';
    let filename = `${article.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}`;

    switch (format.format) {
      case 'html':
        content = generateHTML(article);
        filename += '.html';
        break;
      case 'markdown':
        content = generateMarkdown(article);
        filename += '.md';
        break;
      case 'json':
        content = JSON.stringify(article, null, 2);
        filename += '.json';
        break;
      case 'pdf':
        // For PDF, we'll create a simple HTML that can be printed to PDF
        content = generateHTML(article);
        filename += '.html'; // User can print to PDF
        break;
    }

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateHTML = (article: Article): string => {
    return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.seoTitle || article.title}</title>
  <meta name="description" content="${article.seoDescription}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Cairo', 'Segoe UI', sans-serif; line-height: 1.8; color: #333; background: #f5f5f5; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; background: white; }
    h1 { font-size: 2.5em; color: #0066cc; margin-bottom: 20px; border-bottom: 3px solid #0066cc; padding-bottom: 15px; }
    .meta { color: #666; font-size: 0.95em; margin-bottom: 30px; }
    .meta span { margin-left: 20px; }
    .content { margin: 30px 0; line-height: 1.9; }
    .content p { margin-bottom: 15px; }
    .images { margin: 30px 0; }
    .images img { max-width: 100%; height: auto; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .seo-info { background: #f0f4f8; padding: 20px; border-radius: 8px; margin-top: 40px; }
    .seo-info h3 { color: #0066cc; margin-bottom: 10px; }
    footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
    @media print { body { background: white; } .container { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>${article.title}</h1>
    <div class="meta">
      <span>✍️ الكاتب: ${article.author}</span>
      <span>📅 التاريخ: ${new Date(article.createdAt).toLocaleDateString('ar-EG')}</span>
      <span>📂 النوع: ${article.pageType}</span>
      <span>📌 الحالة: ${article.status === 'published' ? 'منشور' : 'مسودة'}</span>
    </div>
    
    <div class="content">
      ${article.content.replace(/\n/g, '</p><p>')}
    </div>

    ${article.images.length > 0 ? `
    <div class="images">
      <h2>الصور المرفقة</h2>
      ${article.images.map(img => `<img src="${img}" alt="صورة من المقال" />`).join('')}
    </div>
    ` : ''}

    <div class="seo-info">
      <h3>معلومات SEO</h3>
      <p><strong>العنوان:</strong> ${article.seoTitle}</p>
      <p><strong>الوصف:</strong> ${article.seoDescription}</p>
    </div>

    <footer>
      <p>تم إنشاء هذا المقال من لوحة التحكم الإدارية - دليل العيادات الطبي</p>
      <p>© ${new Date().getFullYear()} جميع الحقوق محفوظة</p>
    </footer>
  </div>
</body>
</html>`;
  };

  const generateMarkdown = (article: Article): string => {
    return `# ${article.title}

**الكاتب:** ${article.author}  
**التاريخ:** ${new Date(article.createdAt).toLocaleDateString('ar-EG')}  
**النوع:** ${article.pageType}  
**الحالة:** ${article.status === 'published' ? 'منشور' : 'مسودة'}

---

## المحتوى

${article.content}

${article.images.length > 0 ? `
## الصور المرفقة

${article.images.map((img, i) => `![صورة ${i + 1}](${img})`).join('\n\n')}
` : ''}

---

## معلومات SEO

**العنوان:** ${article.seoTitle}

**الوصف:** ${article.seoDescription}

---

*تم إنشاء هذا المقال من لوحة التحكم الإدارية - دليل العيادات الطبي*
`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎛️ لوحة التحكم الإدارية</h1>
          <p className="text-gray-600">إدارة ونشر وتصدير المقالات بسهولة</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'articles'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="inline mr-2" size={20} />
            المقالات ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'export'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Download className="inline mr-2" size={20} />
            التصدير
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="inline mr-2" size={20} />
            الإعدادات
          </button>
        </div>

        {/* Content */}
        {activeTab === 'articles' && (
          <div>
            {/* Add Article Button */}
            <button
              onClick={() => {
                setShowNewArticle(!showNewArticle);
                if (!showNewArticle) resetForm();
              }}
              className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <Plus size={20} />
              {showNewArticle ? 'إلغاء' : 'إضافة مقال جديد'}
            </button>

            {/* New/Edit Article Form */}
            {showNewArticle && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  {editingId ? '✏️ تعديل المقال' : '✨ إضافة مقال جديد'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      عنوان المقال *
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="أدخل عنوان المقال"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      اسم الكاتب
                    </label>
                    <input
                      type="text"
                      value={formData.author || ''}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="اسم الكاتب"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      نوع الصفحة
                    </label>
                    <select
                      value={formData.pageType || 'general'}
                      onChange={(e) => setFormData({ ...formData, pageType: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">عام</option>
                      <option value="clinic">عيادة</option>
                      <option value="specialty">تخصص</option>
                      <option value="city">مدينة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      حالة المقال
                    </label>
                    <select
                      value={formData.status || 'draft'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">مسودة</option>
                      <option value="published">منشور</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    محتوى المقال *
                  </label>
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                    placeholder="أدخل محتوى المقال..."
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      عنوان SEO
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle || ''}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="عنوان محسّن لمحركات البحث"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(formData.seoTitle || '').length}/60
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      وصف SEO
                    </label>
                    <input
                      type="text"
                      value={formData.seoDescription || ''}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="وصف محسّن لمحركات البحث"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(formData.seoDescription || '').length}/160
                    </p>
                  </div>
                </div>

                {/* Images Section */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📸 الصور المرفقة
                  </label>
                  
                  <div className="mb-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleAddImage}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                    >
                      <Upload size={18} />
                      إضافة صور
                    </button>
                  </div>

                  {formData.images && formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`صورة ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleAddArticle}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    {editingId ? '💾 تحديث المقال' : '✅ إضافة المقال'}
                  </button>
                  <button
                    onClick={() => {
                      setShowNewArticle(false);
                      resetForm();
                      setEditingId(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    ❌ إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Articles List */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex-1">{article.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {article.status === 'published' ? '✅ منشور' : '📝 مسودة'}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.content}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span>✍️ {article.author}</span>
                      <span>📅 {new Date(article.createdAt).toLocaleDateString('ar-EG')}</span>
                    </div>

                    {article.images.length > 0 && (
                      <div className="mb-4 flex gap-2">
                        {article.images.slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`صورة ${i + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                        {article.images.length > 3 && (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-sm font-semibold">
                            +{article.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditArticle(article);
                        }}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition flex items-center justify-center gap-1"
                      >
                        <Edit2 size={16} />
                        تعديل
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteArticle(article.id);
                        }}
                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition flex items-center justify-center gap-1"
                      >
                        <Trash2 size={16} />
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">لا توجد مقالات حالياً</p>
                <p className="text-gray-400">ابدأ بإضافة مقال جديد</p>
              </div>
            )}
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div>
            {articles.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">لا توجد مقالات للتصدير</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <h3 className="font-bold text-lg text-gray-800 mb-4">{article.title}</h3>

                    <div className="grid grid-cols-2 gap-3">
                      {exportFormats.map((format) => (
                        <button
                          key={format.id}
                          onClick={() => exportArticle(article, format)}
                          className="px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-semibold text-sm flex flex-col items-center gap-2"
                        >
                          <span className="text-2xl">{format.icon}</span>
                          {format.name}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                      <p>📊 {article.images.length} صور</p>
                      <p>📝 {article.content.length} حرف</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ إعدادات لوحة التحكم</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 إحصائيات المقالات</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">إجمالي المقالات</p>
                    <p className="text-3xl font-bold text-blue-600">{articles.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">المنشورة</p>
                    <p className="text-3xl font-bold text-green-600">
                      {articles.filter(a => a.status === 'published').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">المسودات</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {articles.filter(a => a.status === 'draft').length}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">إجمالي الصور</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {articles.reduce((sum, a) => sum + (a.images?.length || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">💾 نسخ احتياطية</h3>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  📥 تصدير جميع المقالات (JSON)
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ℹ️ معلومات النظام</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>الإصدار:</strong> 1.0.0</p>
                  <p><strong>آخر تحديث:</strong> {new Date().toLocaleDateString('ar-EG')}</p>
                  <p><strong>الحالة:</strong> ✅ يعمل بشكل طبيعي</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
