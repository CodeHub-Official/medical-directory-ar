# دليل النشر - Medical Directory

## نظرة عامة

هذا الدليل يشرح كيفية نشر مشروع دليل العيادات الطبي على منصات الاستضافة المختلفة.

## المتطلبات الأساسية

- Node.js 18+ و npm أو pnpm
- حساب على منصة الاستضافة المختارة
- Git (اختياري)

## 1. النشر على Vercel (الموصى به)

Vercel هي أفضل خيار لنشر تطبيقات Next.js.

### الخطوات:

#### أ) النشر من GitHub

1. **دفع الكود إلى GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/medical-directory-ar.git
git push -u origin main
```

2. **الذهاب إلى Vercel**
   - زر https://vercel.com
   - انقر على "New Project"
   - اختر المستودع من GitHub

3. **إعدادات المشروع**
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **متغيرات البيئة**
   - أضف المتغيرات من `.env.example`
   - NEXT_PUBLIC_SITE_URL: https://your-domain.com

5. **النشر**
   - انقر على "Deploy"
   - انتظر انتهاء البناء

#### ب) النشر من سطر الأوامر

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# النشر للإنتاج
vercel --prod
```

### ربط نطاق مخصص

1. اذهب إلى إعدادات المشروع في Vercel
2. انقر على "Domains"
3. أضف نطاقك المخصص
4. اتبع التعليمات لتحديث سجلات DNS

## 2. النشر على Netlify

### الخطوات:

1. **تثبيت Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **البناء المحلي**
```bash
npm run build
```

3. **النشر**
```bash
netlify deploy --prod --dir=.next
```

4. **أو استخدام واجهة الويب**
   - اذهب إلى https://app.netlify.com
   - انقر على "New site from Git"
   - اختر المستودع
   - اتبع التعليمات

### إعدادات Netlify

في ملف `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[functions]
  directory = "functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 3. النشر على Cloudflare Pages

### الخطوات:

1. **تثبيت Wrangler CLI**
```bash
npm i -g wrangler
```

2. **البناء**
```bash
npm run build
```

3. **النشر**
```bash
wrangler pages deploy .next
```

4. **أو استخدام واجهة الويب**
   - اذهب إلى https://dash.cloudflare.com
   - انقر على "Pages"
   - اختر "Create a project"
   - اختر المستودع من GitHub

## 4. النشر على AWS Amplify

### الخطوات:

1. **تثبيت AWS CLI**
```bash
npm i -g @aws-amplify/cli
```

2. **تهيئة Amplify**
```bash
amplify init
```

3. **إضافة Hosting**
```bash
amplify add hosting
```

4. **النشر**
```bash
amplify publish
```

## 5. النشر على DigitalOcean App Platform

### الخطوات:

1. اذهب إلى https://cloud.digitalocean.com
2. انقر على "Create" ثم "Apps"
3. اختر المستودع من GitHub
4. اختر الفرع الذي تريد نشره
5. اتبع التعليمات

## 6. النشر على Heroku

### الخطوات:

1. **تثبيت Heroku CLI**
```bash
npm i -g heroku
```

2. **تسجيل الدخول**
```bash
heroku login
```

3. **إنشاء تطبيق**
```bash
heroku create your-app-name
```

4. **إضافة buildpack**
```bash
heroku buildpacks:add heroku/nodejs
```

5. **النشر**
```bash
git push heroku main
```

## إعدادات ما بعد النشر

### 1. إعداد Google Analytics

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. إعداد Google Search Console

1. اذهب إلى https://search.google.com/search-console
2. أضف الموقع
3. تحقق من الملكية
4. أرسل Sitemap.xml

### 3. إعداد Google My Business

1. أضف عيادتك على Google My Business
2. تحقق من الملكية
3. أضف معلومات كاملة

### 4. إعداد SSL/TLS

معظم منصات الاستضافة توفر SSL مجاني:
- Vercel: تلقائي
- Netlify: تلقائي
- Cloudflare: تلقائي
- AWS: استخدم ACM

### 5. إعداد CDN

```javascript
// في next.config.js
images: {
  domains: ['cdn.example.com'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.example.com',
    },
  ],
}
```

## مراقبة الأداء

### 1. Vercel Analytics
```bash
npm install @vercel/analytics
```

### 2. Google PageSpeed Insights
- اذهب إلى https://pagespeed.web.dev
- أدخل URL موقعك

### 3. GTmetrix
- اذهب إلى https://gtmetrix.com
- أدخل URL موقعك

## استكشاف الأخطاء

### المشكلة: خطأ 404 في الصفحات الديناميكية
**الحل**: تأكد من أن الصفحات تم توليدها بشكل صحيح في البناء

### المشكلة: الصور لا تظهر
**الحل**: تحقق من إعدادات الصور في next.config.js

### المشكلة: بطء الموقع
**الحل**: 
- استخدم CDN للصور
- فعّل الضغط
- استخدم caching

### المشكلة: خطأ في البناء
**الحل**: تحقق من السجلات وتأكد من أن جميع المتطلبات مثبتة

## التحديثات والصيانة

### تحديث المتطلبات

```bash
npm update
npm audit fix
```

### نشر تحديث جديد

```bash
git add .
git commit -m "Update: description"
git push origin main
```

التحديث سيتم نشره تلقائياً على Vercel/Netlify.

## الأمان

### 1. متغيرات البيئة
- لا تضع مفاتيح API في الكود
- استخدم متغيرات البيئة الآمنة

### 2. HTTPS
- تأكد من استخدام HTTPS دائماً
- أعد توجيه HTTP إلى HTTPS

### 3. Headers الأمنية
```javascript
// في next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

## الخطوات التالية

1. **مراقبة الأداء**: استخدم أدوات المراقبة
2. **تحديث المحتوى**: أضف عيادات جديدة بانتظام
3. **تحسين SEO**: راقب ترتيبك في محركات البحث
4. **جمع التعليقات**: استمع لآراء المستخدمين

---

**آخر تحديث**: مارس 2024
