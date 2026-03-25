# دليل العيادات الطبي - Medical Directory

## نظرة عامة

مشروع **دليل العيادات الطبي** هو موقع ويب حديث يعتمد على تقنية **Programmatic SEO** لتوليد آلاف الصفحات تلقائياً من قاعدة بيانات JSON. يوفر الموقع دليلاً شاملاً للعيادات والمراكز الطبية في مصر مع تحسين كامل لمحركات البحث.

## الميزات الرئيسية

### 1. **توليد الصفحات التلقائي (Programmatic SEO)**
- توليد صفحات العيادات تلقائياً من قاعدة البيانات
- توليد صفحات المدن والتخصصات
- توليد صفحات الدمج (تخصص + مدينة)
- دعم آلاف الصفحات بدون الحاجة لكتابة كود لكل صفحة

### 2. **تحسين محركات البحث (SEO)**
- **Meta Tags**: عناوين وأوصاف محسّنة لكل صفحة
- **Schema.org Markup**: بيانات منظمة للعيادات والمدن والتخصصات
- **Sitemap.xml**: خريطة الموقع التلقائية
- **Robots.txt**: ملف التحكم بالزحف
- **Open Graph Tags**: مشاركة محسّنة على وسائل التواصل
- **Breadcrumbs**: روابط التنقل الهرمية
- **Internal Linking**: شبكة روابط داخلية قوية

### 3. **الأداء العالي**
- **Static Generation**: توليد صفحات ثابتة للأداء الأقصى
- **Image Optimization**: تحسين الصور التلقائي
- **Caching**: استراتيجيات تخزين مؤقت فعالة
- **Mobile Responsive**: تصميم متجاوب لجميع الأجهزة

### 4. **سهولة الاستخدام**
- واجهة مستخدم بديهية وسهلة
- بحث متقدم عن العيادات
- تصفية حسب المدينة والتخصص
- عرض التقييمات والتعليقات

## البنية الهندسية

### المجلدات الرئيسية

```
medical-directory-ar/
├── src/
│   ├── app/                    # صفحات Next.js
│   │   ├── clinic/[id]/       # صفحة تفاصيل العيادة
│   │   ├── clinics/[slug]/    # صفحة المدينة
│   │   ├── specialty/[slug]/  # صفحة التخصص
│   │   ├── layout.tsx         # التخطيط الرئيسي
│   │   ├── page.tsx           # الصفحة الرئيسية
│   │   └── sitemap.ts         # خريطة الموقع
│   ├── components/            # المكونات المعاد استخدامها
│   │   ├── Header.tsx         # رأس الصفحة
│   │   ├── Footer.tsx         # تذييل الصفحة
│   │   ├── ClinicCard.tsx     # بطاقة العيادة
│   │   └── SEOHead.tsx        # مكون SEO
│   ├── data/                  # قاعدة البيانات
│   │   └── clinics.json       # بيانات العيادات والمدن والتخصصات
│   ├── styles/                # الأنماط
│   │   └── globals.css        # الأنماط العامة
│   └── utils/                 # الدوال المساعدة
│       ├── data.ts            # دوال الوصول للبيانات
│       └── seo.ts             # دوال SEO
├── public/                    # الملفات الثابتة
│   └── robots.txt            # ملف التحكم بالزحف
├── next.config.js            # إعدادات Next.js
├── tailwind.config.js        # إعدادات Tailwind CSS
├── package.json              # المتطلبات والنصوص
└── README.md                 # هذا الملف
```

## التقنيات المستخدمة

| التقنية | الإصدار | الوصف |
|---------|---------|-------|
| **Next.js** | 15.1.0 | إطار عمل React للتطبيقات الحديثة |
| **React** | 19.2.4 | مكتبة JavaScript لبناء الواجهات |
| **TypeScript** | - | لغة برمجة قوية مع نوع آمن |
| **Tailwind CSS** | 4.2.1 | إطار عمل CSS للتصميم السريع |
| **Sharp** | 0.34.5 | معالجة الصور والتحسين |

## البيانات

### هيكل قاعدة البيانات

```json
{
  "clinics": [
    {
      "id": "clinic-001",
      "name": "عيادة نور",
      "specialty": "تجميل",
      "city": "القاهرة",
      "district": "التجمع الخامس",
      "address": "...",
      "phone": "...",
      "googleRating": 4.8,
      "googleReviews": 150,
      "description": "...",
      "services": ["..."],
      "socialMedia": {},
      "category": "A",
      "image": "..."
    }
  ],
  "specialties": [...],
  "cities": [...]
}
```

## الصفحات المتوفرة

### الصفحات الثابتة
- **الرئيسية** (`/`): عرض أفضل العيادات والتصنيفات
- **حول الموقع** (`/about`): معلومات عن الموقع
- **اتصل بنا** (`/contact`): نموذج التواصل

### الصفحات الديناميكية
- **صفحة العيادة** (`/clinic/[id]`): تفاصيل العيادة الكاملة
- **صفحة المدينة** (`/clinics/[slug]`): عيادات في مدينة معينة
- **صفحة التخصص** (`/specialty/[slug]`): عيادات متخصصة
- **صفحة التخصص + المدينة** (`/[specialty]-clinics-[city]`): عيادات متخصصة في مدينة

## الإعدادات

### ملف البيئة (.env.local)

```env
NEXT_PUBLIC_SITE_URL=https://medical-directory.example.com
NEXT_PUBLIC_SITE_NAME=دليل العيادات الطبي
NEXT_PUBLIC_SITE_DESCRIPTION=دليل شامل للعيادات والمراكز الطبية
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## التثبيت والتشغيل

### المتطلبات
- Node.js 18+ و npm أو pnpm
- Git

### خطوات التثبيت

```bash
# استنساخ المشروع
git clone <repository-url>
cd medical-directory-ar

# تثبيت المتطلبات
npm install
# أو
pnpm install

# التشغيل في بيئة التطوير
npm run dev
# أو
pnpm dev

# فتح المتصفح على
# http://localhost:3000
```

### البناء للإنتاج

```bash
# بناء المشروع
npm run build

# التشغيل في بيئة الإنتاج
npm run start
```

## النشر

### النشر على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

### النشر على Netlify

```bash
# تثبيت Netlify CLI
npm i -g netlify-cli

# النشر
netlify deploy --prod --dir=.next
```

### النشر على Cloudflare Pages

```bash
# تثبيت Wrangler CLI
npm i -g wrangler

# النشر
wrangler pages deploy .next
```

## تحسين SEO

### 1. إضافة عيادات جديدة
عدّل ملف `src/data/clinics.json` وأضف العيادات الجديدة:

```json
{
  "id": "clinic-new",
  "name": "اسم العيادة",
  "specialty": "التخصص",
  "city": "المدينة",
  "district": "الحي",
  "address": "العنوان",
  "phone": "الهاتف",
  "googleRating": 4.5,
  "googleReviews": 100,
  "description": "وصف العيادة",
  "services": ["الخدمة 1", "الخدمة 2"],
  "socialMedia": {},
  "category": "A",
  "image": "رابط الصورة"
}
```

### 2. تحسين Meta Tags
تُولّد Meta Tags تلقائياً من بيانات العيادة. تأكد من أن البيانات دقيقة وكاملة.

### 3. Schema.org Markup
يتم إنشاء Schema.org تلقائياً لكل صفحة:
- `MedicalClinic` للعيادات
- `LocalBusiness` للمعلومات المحلية
- `BreadcrumbList` للتنقل
- `Organization` للموقع

### 4. الروابط الداخلية
تُنشأ شبكة روابط داخلية قوية تربط:
- العيادات بالمدن والتخصصات
- المدن بالتخصصات
- التخصصات بالمدن

## الأداء

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### التحسينات
- ✅ Static Generation للأداء الأقصى
- ✅ Image Optimization مع Next.js Image
- ✅ CSS Minification مع Tailwind
- ✅ Code Splitting التلقائي
- ✅ Lazy Loading للصور والمكونات

## الأمان

### الإجراءات الأمنية
- ✅ HTTPS الإجباري
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options للحماية من Clickjacking
- ✅ X-Content-Type-Options لمنع MIME Sniffing

## المراقبة والتحليل

### Google Analytics
أضف معرّف Google Analytics في ملف البيئة:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Google Search Console
- تحقق من ملكية الموقع
- أرسل Sitemap.xml
- راقب الأخطاء والتحذيرات

## التطوير المستقبلي

### المميزات المخطط إضافتها
- [ ] نظام حجز المواعيد
- [ ] لوحة تحكم للعيادات
- [ ] نظام التقييمات والتعليقات
- [ ] البحث المتقدم والفلترة
- [ ] خريطة تفاعلية
- [ ] نظام الإشعارات
- [ ] دعم اللغة الإنجليزية
- [ ] تطبيق موبايل

## استكشاف الأخطاء

### المشكلة: الصفحات لا تظهر
**الحل**: تأكد من أن البيانات موجودة في `src/data/clinics.json`

### المشكلة: الصور لا تظهر
**الحل**: تحقق من روابط الصور وتأكد من أنها صحيحة

### المشكلة: بطء الموقع
**الحل**: 
- استخدم `npm run build` للبناء الأمثل
- تحقق من حجم الصور
- استخدم CDN للصور

## الدعم والمساعدة

للحصول على الدعم أو الإبلاغ عن مشاكل:
- 📧 البريد: support@medicaldir.com
- 💬 WhatsApp: +20 123 456 7890
- 🐛 Issues: تقرير الأخطاء على GitHub

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## المساهمة

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push للفرع
5. فتح Pull Request

## الشكر والتقدير

شكراً لاستخدامك دليل العيادات الطبي!

---

**آخر تحديث**: مارس 2024
**الإصدار**: 1.0.0
