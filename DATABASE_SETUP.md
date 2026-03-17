# 🗄️ إعداد قاعدة البيانات
## Database Setup Guide - Supabase/PostgreSQL

---

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [إعداد Supabase](#إعداد-supabase)
3. [مخطط قاعدة البيانات](#مخطط-قاعدة-البيانات)
4. [الجداول الرئيسية](#الجداول-الرئيسية)
5. [الاتصال والتكامل](#الاتصال-والتكامل)
6. [الأمان والحماية](#الأمان-والحماية)

---

## 🎯 نظرة عامة

### الانتقال من JSON إلى قاعدة بيانات حقيقية

**المرحلة الحالية:**
```
clinics.json (ملف ثابت)
└── جيد للبداية
└── محدود العدد
└── بطيء مع الآلاف من السجلات
```

**المرحلة الجديدة:**
```
Supabase (PostgreSQL)
├── قاعدة بيانات حقيقية
├── قابلة للتوسع إلى ملايين السجلات
├── سريعة جداً
├── آمنة وموثوقة
└── مع واجهة إدارية
```

### المميزات

```
✅ تخزين آلاف العيادات
✅ تخزين آلاف المقالات
✅ تخزين التقييمات والتعليقات
✅ تخزين بيانات الدفع
✅ سرعة عالية جداً
✅ نسخ احتياطية تلقائية
✅ أمان متقدم
```

---

## 🚀 إعداد Supabase

### الخطوة 1: إنشاء حساب Supabase

```
1. اذهب إلى https://supabase.com
2. انقر "Sign Up"
3. استخدم بريدك الإلكتروني
4. تحقق من البريد
5. أنشئ كلمة مرور قوية
```

### الخطوة 2: إنشاء مشروع جديد

```
1. انقر "New Project"
2. اختر اسم المشروع: "medical-directory-ar"
3. اختر كلمة مرور قوية
4. اختر المنطقة الأقرب
5. انقر "Create new project"
```

### الخطوة 3: الحصول على بيانات الاتصال

```
1. اذهب إلى Settings → API
2. انسخ:
   - Project URL
   - anon key (Public)
   - service_role key (Secret)
3. احفظها في ملف .env.local
```

### الخطوة 4: إعداد متغيرات البيئة

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📊 مخطط قاعدة البيانات

### الجداول الرئيسية

```
┌─────────────────────────────────────────────────────┐
│                    قاعدة البيانات                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │   Clinics    │  │   Articles   │  │ Ratings  │ │
│  │   (العيادات)  │  │  (المقالات)   │  │(التقييمات)│ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │   Comments   │  │  Payments    │  │  Users   │ │
│  │ (التعليقات)   │  │  (الدفعات)    │  │(المستخدمون)│ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │  Specialties │  │    Cities    │  │ Services │ │
│  │ (التخصصات)    │  │  (المدن)      │  │(الخدمات) │ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🗂️ الجداول الرئيسية

### 1. جدول Clinics (العيادات)

```sql
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  specialty_id UUID REFERENCES specialties(id),
  city_id UUID REFERENCES cities(id),
  district VARCHAR(255),
  address TEXT,
  phone VARCHAR(20),
  phone2 VARCHAR(20),
  website VARCHAR(255),
  email VARCHAR(255),
  google_rating DECIMAL(3,2),
  google_reviews INTEGER DEFAULT 0,
  description TEXT,
  image_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, active, inactive
  payment_status VARCHAR(50) DEFAULT 'unpaid', -- unpaid, paid, expired
  subscription_type VARCHAR(50), -- free, basic, premium
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  views_count INTEGER DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0
);

CREATE INDEX idx_clinics_specialty ON clinics(specialty_id);
CREATE INDEX idx_clinics_city ON clinics(city_id);
CREATE INDEX idx_clinics_status ON clinics(status);
CREATE INDEX idx_clinics_created_at ON clinics(created_at DESC);
```

### 2. جدول Articles (المقالات)

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  clinic_id UUID REFERENCES clinics(id),
  page_type VARCHAR(50), -- clinic, specialty, city, general
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  status VARCHAR(50) DEFAULT 'draft', -- draft, published
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);

CREATE INDEX idx_articles_clinic ON articles(clinic_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
```

### 3. جدول Ratings (التقييمات)

```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ratings_clinic ON ratings(clinic_id);
CREATE INDEX idx_ratings_status ON ratings(status);
CREATE INDEX idx_ratings_created_at ON ratings(created_at DESC);
```

### 4. جدول Comments (التعليقات)

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_status ON comments(status);
```

### 5. جدول Payments (الدفعات)

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50), -- stripe, paypal, bank_transfer
  transaction_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  subscription_type VARCHAR(50), -- basic, premium, annual
  subscription_duration_days INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE INDEX idx_payments_clinic ON payments(clinic_id);
CREATE INDEX idx_payments_status ON payments(status);
```

### 6. جدول Users (المستخدمون)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user', -- user, clinic_owner, admin
  status VARCHAR(50) DEFAULT 'active',
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 7. جدول Specialties (التخصصات)

```sql
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_specialties_slug ON specialties(slug);
```

### 8. جدول Cities (المدن)

```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  population INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cities_slug ON cities(slug);
```

---

## 🔗 الاتصال والتكامل

### تثبيت Supabase Client

```bash
npm install @supabase/supabase-js
```

### إنشاء ملف الاتصال

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### استخدام قاعدة البيانات

```typescript
// مثال: جلب جميع العيادات
import { supabase } from '@/lib/supabase'

export async function getClinics() {
  const { data, error } = await supabase
    .from('clinics')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// مثال: إضافة عيادة جديدة
export async function addClinic(clinicData: any) {
  const { data, error } = await supabase
    .from('clinics')
    .insert([clinicData])
    .select()

  if (error) throw error
  return data[0]
}

// مثال: جلب التقييمات
export async function getClinicRatings(clinicId: string) {
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
```

---

## 🔒 الأمان والحماية

### Row Level Security (RLS)

```sql
-- السماح بقراءة العيادات النشطة للجميع
CREATE POLICY "Allow public read active clinics"
  ON clinics FOR SELECT
  USING (status = 'active');

-- السماح لمالك العيادة بتعديل عيادته فقط
CREATE POLICY "Allow clinic owner to update own clinic"
  ON clinics FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- السماح بقراءة التقييمات المعتمدة فقط
CREATE POLICY "Allow public read approved ratings"
  ON ratings FOR SELECT
  USING (status = 'approved');

-- السماح للمستخدمين بإضافة تقييمات
CREATE POLICY "Allow users to insert ratings"
  ON ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### متغيرات البيئة الآمنة

```env
# .env.local (لا تشاركها أبداً!)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# للخادم فقط
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📈 الأداء والتحسينات

### الفهارس المهمة

```sql
-- فهارس للبحث السريع
CREATE INDEX idx_clinics_specialty_city 
  ON clinics(specialty_id, city_id);

CREATE INDEX idx_ratings_clinic_status 
  ON ratings(clinic_id, status);

CREATE INDEX idx_articles_clinic_status 
  ON articles(clinic_id, status);
```

### الاستعلامات المحسّنة

```typescript
// استعلام محسّن مع التجميع
const { data } = await supabase
  .from('clinics')
  .select(`
    *,
    specialties(name),
    cities(name),
    ratings(rating)
  `)
  .eq('status', 'active')
  .order('average_rating', { ascending: false })
  .limit(20)
```

---

## 🔄 الهجرة من JSON إلى Supabase

### الخطوة 1: تصدير البيانات

```typescript
// تصدير clinics.json
import clinicsData from '@/data/clinics.json'

export async function migrateClinicData() {
  const { data, error } = await supabase
    .from('clinics')
    .insert(clinicsData.map(clinic => ({
      name: clinic.name,
      name_en: clinic.nameEn,
      specialty_id: clinic.specialtyId,
      city_id: clinic.cityId,
      // ... باقي الحقول
    })))

  if (error) console.error('Migration error:', error)
  return data
}
```

### الخطوة 2: التحديث التدريجي

```
1. أبقِ clinics.json للبداية
2. أضف قراءة من Supabase
3. اختبر الاستعلامات
4. انتقل كلياً إلى Supabase
5. احذف clinics.json
```

---

## 📊 الإحصائيات والمراقبة

### عرض إحصائيات قاعدة البيانات

```typescript
// عدد العيادات
const { count: clinicsCount } = await supabase
  .from('clinics')
  .select('*', { count: 'exact', head: true })

// متوسط التقييم
const { data: avgRating } = await supabase
  .rpc('get_average_rating')

// عدد المقالات
const { count: articlesCount } = await supabase
  .from('articles')
  .select('*', { count: 'exact', head: true })
```

---

## 🆘 استكشاف الأخطاء

### المشكلة: خطأ الاتصال

```
الحل:
1. تحقق من متغيرات البيئة
2. تحقق من الاتصال بالإنترنت
3. تحقق من URL و API Key
4. أعد تشغيل الخادم
```

### المشكلة: بطء الاستعلامات

```
الحل:
1. أضف فهارس على الأعمدة المستخدمة
2. استخدم LIMIT
3. استخدم الاختيار المحدد (SELECT specific columns)
4. استخدم التخزين المؤقت
```

---

## 📚 الموارد الإضافية

### الروابط المفيدة

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### الأوامر المهمة

```bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# إنشاء مشروع محلي
supabase start

# إيقاف المشروع المحلي
supabase stop
```

---

## ✅ قائمة التحقق

قبل الانتقال إلى Supabase:

- [ ] إنشاء حساب Supabase
- [ ] إنشاء مشروع جديد
- [ ] نسخ بيانات الاتصال
- [ ] إضافة متغيرات البيئة
- [ ] إنشاء الجداول
- [ ] تثبيت Supabase Client
- [ ] اختبار الاتصال
- [ ] هجرة البيانات
- [ ] اختبار الاستعلامات
- [ ] تفعيل RLS

---

**آخر تحديث**: مارس 2024  
**الإصدار**: 1.2.0  
**الحالة**: ✅ جاهز للتطبيق
