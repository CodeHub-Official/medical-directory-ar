# دليل البدء السريع - Quick Start Guide

## البدء في دقائق

### 1. التثبيت والتشغيل

```bash
# استنساخ المشروع
cd /home/ubuntu/medical-directory-ar

# تثبيت المتطلبات (مثبتة بالفعل)
npm install

# تشغيل بيئة التطوير
npm run dev

# فتح المتصفح على
# http://localhost:3000
```

### 2. هيكل المشروع

```
src/
├── app/                    # صفحات Next.js
│   ├── page.tsx           # الصفحة الرئيسية
│   ├── layout.tsx         # التخطيط الرئيسي
│   ├── sitemap.ts         # خريطة الموقع
│   ├── clinic/[id]/       # صفحة العيادة
│   ├── clinics/[slug]/    # صفحة المدينة
│   ├── specialty/[slug]/  # صفحة التخصص
│   ├── about/             # صفحة عن الموقع
│   ├── cities/            # صفحة المدن
│   └── specialties/       # صفحة التخصصات
├── components/            # المكونات
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ClinicCard.tsx
│   └── SEOHead.tsx
├── data/                  # البيانات
│   └── clinics.json       # قاعدة البيانات
├── utils/                 # الدوال المساعدة
│   ├── data.ts            # دوال الوصول للبيانات
│   └── seo.ts             # دوال SEO
└── styles/                # الأنماط
    └── globals.css
```

## المهام الشائعة

### إضافة عيادة جديدة

1. افتح `src/data/clinics.json`
2. أضف عيادة جديدة في مصفوفة `clinics`:

```json
{
  "id": "clinic-new",
  "name": "اسم العيادة",
  "nameEn": "Clinic Name",
  "specialty": "تجميل",
  "specialtyEn": "cosmetics",
  "city": "القاهرة",
  "cityEn": "cairo",
  "district": "الحي",
  "address": "العنوان",
  "phone": "الهاتف",
  "phone2": "",
  "website": "",
  "googleRating": 4.5,
  "googleReviews": 100,
  "description": "وصف العيادة",
  "services": ["الخدمة 1", "الخدمة 2"],
  "socialMedia": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/..."
  },
  "category": "A",
  "image": "https://via.placeholder.com/400x300?text=Clinic+Name"
}
```

3. احفظ الملف
4. الصفحة ستُنشأ تلقائياً عند البناء

### إضافة تخصص جديد

1. افتح `src/data/clinics.json`
2. أضف تخصص جديد في مصفوفة `specialties`:

```json
{
  "id": "specialty-new",
  "name": "اسم التخصص",
  "nameEn": "Specialty Name",
  "slug": "specialty-slug",
  "description": "وصف التخصص",
  "descriptionEn": "Specialty description",
  "icon": "🏥",
  "relatedServices": ["الخدمة 1", "الخدمة 2"]
}
```

### إضافة مدينة جديدة

1. افتح `src/data/clinics.json`
2. أضف مدينة جديدة في مصفوفة `cities`:

```json
{
  "id": "city-new",
  "name": "اسم المدينة",
  "nameEn": "City Name",
  "slug": "city-slug",
  "description": "وصف المدينة",
  "descriptionEn": "City description",
  "population": 1000000,
  "clinicCount": 10,
  "image": "https://via.placeholder.com/600x400?text=City"
}
```

## الأوامر المهمة

```bash
# تشغيل بيئة التطوير
npm run dev

# بناء المشروع
npm run build

# تشغيل الإنتاج
npm start

# فحص الأخطاء
npm run lint
```

## الملفات المهمة

| الملف | الوصف |
|------|-------|
| `src/data/clinics.json` | قاعدة البيانات الرئيسية |
| `src/app/page.tsx` | الصفحة الرئيسية |
| `src/components/Header.tsx` | رأس الصفحة |
| `src/components/Footer.tsx` | تذييل الصفحة |
| `src/utils/data.ts` | دوال الوصول للبيانات |
| `src/utils/seo.ts` | دوال SEO |
| `next.config.js` | إعدادات Next.js |
| `tailwind.config.js` | إعدادات Tailwind CSS |

## الصفحات المتاحة

| الصفحة | الرابط |
|-------|--------|
| الرئيسية | `/` |
| العيادات في مدينة | `/clinics/cairo` |
| التخصصات | `/specialties` |
| تخصص معين | `/specialty/cosmetics` |
| عيادة معينة | `/clinic/clinic-001` |
| المدن | `/cities` |
| عن الموقع | `/about` |

## نصائح مهمة

### 1. تحديث البيانات
- عدّل `src/data/clinics.json` مباشرة
- لا تحتاج لإعادة بناء المشروع في بيئة التطوير
- المتصفح سيُحدّث تلقائياً

### 2. إضافة صور
- استخدم روابط صور من الإنترنت
- أو ضع الصور في مجلد `public/images`
- استخدم روابط نسبية: `/images/clinic.jpg`

### 3. تحسين الأداء
- استخدم `npm run build` لاختبار الأداء
- تحقق من حجم الصور
- استخدم أدوات مثل PageSpeed Insights

### 4. الأمان
- لا تضع مفاتيح API في الكود
- استخدم متغيرات البيئة
- تحقق من `.env.example`

## استكشاف الأخطاء

### الصفحات لا تظهر
- تأكد من أن البيانات موجودة في `clinics.json`
- تحقق من الـ ID والـ slug
- أعد تشغيل خادم التطوير

### الصور لا تظهر
- تحقق من روابط الصور
- تأكد من أن الروابط صحيحة
- استخدم روابط HTTPS

### بطء الموقع
- استخدم `npm run build`
- تحقق من حجم الصور
- استخدم أداة PageSpeed Insights

## الخطوات التالية

1. **اقرأ الوثائق**
   - [README.md](./README.md) - معلومات شاملة
   - [SEO_GUIDE.md](./SEO_GUIDE.md) - تحسين SEO
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - النشر

2. **طور الموقع**
   - أضف عيادات جديدة
   - حسّن التصميم
   - أضف ميزات جديدة

3. **انشر الموقع**
   - اختر منصة استضافة
   - اتبع دليل النشر
   - راقب الأداء

## الدعم

للمساعدة:
- 📧 البريد: support@medicaldir.com
- 📖 اقرأ الوثائق
- 🐛 تحقق من الأخطاء

---

**ملاحظة**: هذا دليل سريع. للمزيد من المعلومات، اقرأ الملفات الأخرى.

**آخر تحديث**: مارس 2024
