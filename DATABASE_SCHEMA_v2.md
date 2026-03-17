# 🗄️ مخطط قاعدة البيانات المحدّث - الإصدار 2.0
## Updated Database Schema v2.0 with Images, Slugs & Full Text Search

---

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [جداول قاعدة البيانات](#جداول-قاعدة-البيانات)
3. [Full Text Search](#full-text-search)
4. [Slug URLs](#slug-urls)
5. [Clinic Images Table](#clinic-images-table)
6. [Scripts SQL](#scripts-sql)

---

## 🎯 نظرة عامة

### التحسينات الجديدة

```
✅ جدول منفصل للصور (clinic_images)
✅ Slug URLs للـ SEO
✅ Full Text Search في PostgreSQL
✅ Indexes محسّنة للأداء
✅ Constraints قوية للبيانات
```

### الفوائد

```
SEO:
├── Slug URLs ودية
├── Full Text Search
├── أداء بحث أفضل
└── Ranking أفضل

الأداء:
├── صور متعددة بدون مشاكل
├── بحث سريع جداً
├── استعلامات محسّنة
└── استهلاك أقل للذاكرة

المرونة:
├── صور غير محدودة لكل عيادة
├── تحديث الصور بسهولة
├── حذف الصور بسهولة
└── صورة غلاف منفصلة
```

---

## 🗄️ جداول قاعدة البيانات

### 1. جدول Clinics (محدّث)

```sql
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- المعلومات الأساسية
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,  -- ✨ جديد
  description TEXT,
  
  -- التصنيف
  specialty_id UUID REFERENCES specialties(id),
  city_id UUID REFERENCES cities(id),
  
  -- الاتصال
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  
  -- الموقع
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- التقييمات
  average_rating DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  
  -- الاشتراك
  subscription_type VARCHAR(50) DEFAULT 'free',
  subscription_start_date TIMESTAMP,
  subscription_end_date TIMESTAMP,
  
  -- البحث الكامل
  search_vector tsvector,  -- ✨ جديد
  
  -- البيانات الوصفية
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Indexes
  CONSTRAINT clinic_name_not_empty CHECK (length(name) > 0),
  CONSTRAINT clinic_slug_not_empty CHECK (length(slug) > 0)
);

-- ✨ Indexes للأداء
CREATE INDEX idx_clinics_slug ON clinics(slug);
CREATE INDEX idx_clinics_city ON clinics(city_id);
CREATE INDEX idx_clinics_specialty ON clinics(specialty_id);
CREATE INDEX idx_clinics_search ON clinics USING GIN(search_vector);
CREATE INDEX idx_clinics_rating ON clinics(average_rating DESC);
CREATE INDEX idx_clinics_active ON clinics(is_active);
```

### 2. جدول Clinic Images (جديد) ⭐

```sql
CREATE TABLE clinic_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- الربط
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  
  -- الصورة
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  
  -- الترتيب والحالة
  display_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT FALSE,  -- صورة الغلاف
  is_active BOOLEAN DEFAULT TRUE,
  
  -- البيانات الوصفية
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT image_url_not_empty CHECK (length(image_url) > 0)
);

-- ✨ Indexes للأداء
CREATE INDEX idx_clinic_images_clinic ON clinic_images(clinic_id);
CREATE INDEX idx_clinic_images_cover ON clinic_images(clinic_id, is_cover);
CREATE INDEX idx_clinic_images_order ON clinic_images(clinic_id, display_order);
```

### 3. جدول Specialties (محدّث)

```sql
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,  -- ✨ جديد
  description TEXT,
  
  -- البحث الكامل
  search_vector tsvector,  -- ✨ جديد
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_specialties_slug ON specialties(slug);
CREATE INDEX idx_specialties_search ON specialties USING GIN(search_vector);
```

### 4. جدول Cities (محدّث)

```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,  -- ✨ جديد
  description TEXT,
  
  -- البحث الكامل
  search_vector tsvector,  -- ✨ جديد
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_search ON cities USING GIN(search_vector);
```

### 5. جدول Ratings

```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  
  -- التقييم
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- المستخدم
  user_email VARCHAR(255),
  user_name VARCHAR(255),
  
  -- الحالة
  status VARCHAR(50) DEFAULT 'pending',  -- pending, approved, rejected
  
  -- البحث
  search_vector tsvector,  -- ✨ جديد
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ratings_clinic ON ratings(clinic_id);
CREATE INDEX idx_ratings_status ON ratings(status);
CREATE INDEX idx_ratings_search ON ratings USING GIN(search_vector);
```

### 6. جدول Payments

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  
  -- الدفع
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- نوع الاشتراك
  subscription_type VARCHAR(50) NOT NULL,
  
  -- Stripe
  stripe_payment_id VARCHAR(255) UNIQUE,
  
  -- الحالة
  status VARCHAR(50) DEFAULT 'pending',  -- pending, completed, failed
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_clinic ON payments(clinic_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe ON payments(stripe_payment_id);
```

---

## 🔍 Full Text Search

### إعداد Full Text Search

```sql
-- ✨ Function لتحديث search_vector للعيادات
CREATE OR REPLACE FUNCTION update_clinic_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.address, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger لتحديث البحث تلقائياً
CREATE TRIGGER clinic_search_update
BEFORE INSERT OR UPDATE ON clinics
FOR EACH ROW
EXECUTE FUNCTION update_clinic_search_vector();

-- ✨ Function لتحديث search_vector للتخصصات
CREATE OR REPLACE FUNCTION update_specialty_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER specialty_search_update
BEFORE INSERT OR UPDATE ON specialties
FOR EACH ROW
EXECUTE FUNCTION update_specialty_search_vector();

-- ✨ Function لتحديث search_vector للمدن
CREATE OR REPLACE FUNCTION update_city_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER city_search_update
BEFORE INSERT OR UPDATE ON cities
FOR EACH ROW
EXECUTE FUNCTION update_city_search_vector();

-- ✨ Function لتحديث search_vector للتقييمات
CREATE OR REPLACE FUNCTION update_rating_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.comment, '')), 'A');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rating_search_update
BEFORE INSERT OR UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_rating_search_vector();
```

### دوال البحث

```sql
-- ✨ البحث عن العيادات
CREATE OR REPLACE FUNCTION search_clinics(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  average_rating DECIMAL,
  rating_count INTEGER,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.slug,
    c.average_rating,
    c.rating_count,
    ts_rank(c.search_vector, plainto_tsquery('arabic', search_query))::REAL as rank
  FROM clinics c
  WHERE c.search_vector @@ plainto_tsquery('arabic', search_query)
    AND c.is_active = TRUE
  ORDER BY rank DESC, c.average_rating DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- ✨ البحث عن التخصصات
CREATE OR REPLACE FUNCTION search_specialties(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.slug,
    ts_rank(s.search_vector, plainto_tsquery('arabic', search_query))::REAL as rank
  FROM specialties s
  WHERE s.search_vector @@ plainto_tsquery('arabic', search_query)
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- ✨ البحث عن المدن
CREATE OR REPLACE FUNCTION search_cities(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.slug,
    ts_rank(c.search_vector, plainto_tsquery('arabic', search_query))::REAL as rank
  FROM cities c
  WHERE c.search_vector @@ plainto_tsquery('arabic', search_query)
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
```

---

## 🔗 Slug URLs

### معايير Slug

```
✅ حروف صغيرة فقط
✅ بدون مسافات (استخدام -)
✅ بدون أحرف خاصة
✅ فريد لكل سجل
✅ قصير وواضح
```

### أمثلة Slugs

```
العيادة: "عيادة الأسنان المتقدمة بالقاهرة"
Slug: "dental-clinic-cairo"
URL: /clinic/dental-clinic-cairo

التخصص: "طب الأسنان"
Slug: "dentistry"
URL: /specialty/dentistry

المدينة: "القاهرة"
Slug: "cairo"
URL: /clinics/cairo
```

### Function لإنشاء Slug

```sql
-- ✨ Function لإنشاء slug من النص
CREATE OR REPLACE FUNCTION generate_slug(text_input TEXT)
RETURNS VARCHAR AS $$
DECLARE
  slug VARCHAR;
BEGIN
  -- تحويل إلى أحرف صغيرة
  slug := LOWER(text_input);
  
  -- إزالة المسافات الزائدة
  slug := TRIM(slug);
  
  -- استبدال المسافات بـ -
  slug := REGEXP_REPLACE(slug, '\s+', '-', 'g');
  
  -- إزالة الأحرف الخاصة (الاحتفاظ بـ - و الأرقام والحروف)
  slug := REGEXP_REPLACE(slug, '[^a-z0-9\-]', '', 'g');
  
  -- إزالة - المتكررة
  slug := REGEXP_REPLACE(slug, '-+', '-', 'g');
  
  -- إزالة - من البداية والنهاية
  slug := TRIM(slug, '-');
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- ✨ Function لإنشاء slug فريد
CREATE OR REPLACE FUNCTION generate_unique_slug(text_input TEXT, table_name TEXT)
RETURNS VARCHAR AS $$
DECLARE
  base_slug VARCHAR;
  new_slug VARCHAR;
  counter INTEGER := 1;
BEGIN
  base_slug := generate_slug(text_input);
  new_slug := base_slug;
  
  -- التحقق من الفرادة
  WHILE EXISTS (
    SELECT 1 FROM (
      SELECT slug FROM clinics WHERE slug = new_slug
      UNION
      SELECT slug FROM specialties WHERE slug = new_slug
      UNION
      SELECT slug FROM cities WHERE slug = new_slug
    ) t
  ) LOOP
    new_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;
```

---

## 📸 Clinic Images Table

### مثال الاستخدام

```sql
-- إضافة عيادة
INSERT INTO clinics (name, slug, specialty_id, city_id)
VALUES ('عيادة الأسنان المتقدمة', 'dental-clinic-cairo', 1, 1);

-- إضافة صور للعيادة
INSERT INTO clinic_images (clinic_id, image_url, alt_text, is_cover, display_order)
VALUES 
  ('clinic-id-1', 'https://example.com/image1.jpg', 'الواجهة الأمامية', TRUE, 1),
  ('clinic-id-1', 'https://example.com/image2.jpg', 'غرفة الانتظار', FALSE, 2),
  ('clinic-id-1', 'https://example.com/image3.jpg', 'عيادة الأسنان', FALSE, 3),
  ('clinic-id-1', 'https://example.com/image4.jpg', 'الفريق الطبي', FALSE, 4);

-- الحصول على جميع صور العيادة
SELECT * FROM clinic_images 
WHERE clinic_id = 'clinic-id-1' 
ORDER BY display_order;

-- الحصول على صورة الغلاف فقط
SELECT * FROM clinic_images 
WHERE clinic_id = 'clinic-id-1' AND is_cover = TRUE;
```

---

## 🔧 Scripts SQL الكاملة

### 1. إنشاء جميع الجداول

```sql
-- ✨ تشغيل هذا Script لإنشاء قاعدة البيانات من الصفر

-- 1. إنشاء جدول التخصصات
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  search_vector tsvector,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_specialties_slug ON specialties(slug);
CREATE INDEX idx_specialties_search ON specialties USING GIN(search_vector);

-- 2. إنشاء جدول المدن
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  search_vector tsvector,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_search ON cities USING GIN(search_vector);

-- 3. إنشاء جدول العيادات
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  specialty_id UUID REFERENCES specialties(id),
  city_id UUID REFERENCES cities(id),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  average_rating DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  subscription_type VARCHAR(50) DEFAULT 'free',
  subscription_start_date TIMESTAMP,
  subscription_end_date TIMESTAMP,
  search_vector tsvector,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  CONSTRAINT clinic_name_not_empty CHECK (length(name) > 0),
  CONSTRAINT clinic_slug_not_empty CHECK (length(slug) > 0)
);

CREATE INDEX idx_clinics_slug ON clinics(slug);
CREATE INDEX idx_clinics_city ON clinics(city_id);
CREATE INDEX idx_clinics_specialty ON clinics(specialty_id);
CREATE INDEX idx_clinics_search ON clinics USING GIN(search_vector);
CREATE INDEX idx_clinics_rating ON clinics(average_rating DESC);
CREATE INDEX idx_clinics_active ON clinics(is_active);

-- 4. إنشاء جدول صور العيادات
CREATE TABLE clinic_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT image_url_not_empty CHECK (length(image_url) > 0)
);

CREATE INDEX idx_clinic_images_clinic ON clinic_images(clinic_id);
CREATE INDEX idx_clinic_images_cover ON clinic_images(clinic_id, is_cover);
CREATE INDEX idx_clinic_images_order ON clinic_images(clinic_id, display_order);

-- 5. إنشاء جدول التقييمات
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  user_email VARCHAR(255),
  user_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  search_vector tsvector,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ratings_clinic ON ratings(clinic_id);
CREATE INDEX idx_ratings_status ON ratings(status);
CREATE INDEX idx_ratings_search ON ratings USING GIN(search_vector);

-- 6. إنشاء جدول الدفعات
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  subscription_type VARCHAR(50) NOT NULL,
  stripe_payment_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_clinic ON payments(clinic_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe ON payments(stripe_payment_id);
```

### 2. إضافة Functions و Triggers

```sql
-- ✨ إضافة Functions للـ Full Text Search

-- Function لتحديث search_vector للعيادات
CREATE OR REPLACE FUNCTION update_clinic_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.address, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clinic_search_update
BEFORE INSERT OR UPDATE ON clinics
FOR EACH ROW
EXECUTE FUNCTION update_clinic_search_vector();

-- Function لتحديث search_vector للتخصصات
CREATE OR REPLACE FUNCTION update_specialty_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER specialty_search_update
BEFORE INSERT OR UPDATE ON specialties
FOR EACH ROW
EXECUTE FUNCTION update_specialty_search_vector();

-- Function لتحديث search_vector للمدن
CREATE OR REPLACE FUNCTION update_city_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('arabic', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER city_search_update
BEFORE INSERT OR UPDATE ON cities
FOR EACH ROW
EXECUTE FUNCTION update_city_search_vector();

-- Function لتحديث search_vector للتقييمات
CREATE OR REPLACE FUNCTION update_rating_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('arabic', COALESCE(NEW.comment, '')), 'A');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rating_search_update
BEFORE INSERT OR UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_rating_search_vector();
```

### 3. دوال البحث

```sql
-- ✨ دوال البحث المتقدمة

-- البحث عن العيادات
CREATE OR REPLACE FUNCTION search_clinics(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  average_rating DECIMAL,
  rating_count INTEGER,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.slug,
    c.average_rating,
    c.rating_count,
    ts_rank(c.search_vector, plainto_tsquery('arabic', search_query))::REAL as rank
  FROM clinics c
  WHERE c.search_vector @@ plainto_tsquery('arabic', search_query)
    AND c.is_active = TRUE
  ORDER BY rank DESC, c.average_rating DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- البحث عن التخصصات
CREATE OR REPLACE FUNCTION search_specialties(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.slug,
    ts_rank(s.search_vector, plainto_tsquery('arabic', search_query))::REAL as rank
  FROM specialties s
  WHERE s.search_vector @@ plainto_tsquery('arabic', search_query)
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- البحث عن المدن
CREATE OR REPLACE FUNCTION search_cities(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.slug,
    ts_rank(c.search_vector, plainto_tsquery('arabic', search_query))::REAL as rank
  FROM cities c
  WHERE c.search_vector @@ plainto_tsquery('arabic', search_query)
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
```

---

## 📊 مثال البيانات

```sql
-- إضافة تخصصات
INSERT INTO specialties (name, slug, description)
VALUES 
  ('طب الأسنان', 'dentistry', 'خدمات طب الأسنان الشاملة'),
  ('طب العيون', 'ophthalmology', 'خدمات طب العيون'),
  ('طب الجلدية', 'dermatology', 'خدمات طب الجلدية');

-- إضافة مدن
INSERT INTO cities (name, slug, description)
VALUES 
  ('القاهرة', 'cairo', 'عاصمة مصر'),
  ('الجيزة', 'giza', 'محافظة الجيزة'),
  ('الإسكندرية', 'alexandria', 'محافظة الإسكندرية');

-- إضافة عيادات
INSERT INTO clinics (name, slug, specialty_id, city_id, description, phone, address)
VALUES 
  ('عيادة الأسنان المتقدمة', 'dental-clinic-cairo', 1, 1, 'عيادة متخصصة في طب الأسنان', '+201001234567', 'شارع النيل، القاهرة');

-- إضافة صور للعيادة
INSERT INTO clinic_images (clinic_id, image_url, alt_text, is_cover, display_order)
SELECT id, 'https://example.com/clinic1.jpg', 'الواجهة الأمامية', TRUE, 1
FROM clinics WHERE slug = 'dental-clinic-cairo';

-- البحث عن عيادات
SELECT * FROM search_clinics('دكتور أسنان القاهرة');
```

---

## ✅ قائمة التحقق

قبل الاستخدام:

- [ ] إنشاء جميع الجداول
- [ ] إضافة Functions
- [ ] إضافة Triggers
- [ ] إضافة Indexes
- [ ] اختبار Full Text Search
- [ ] اختبار Slug URLs
- [ ] اختبار صور متعددة
- [ ] اختبار الأداء

---

**آخر تحديث**: مارس 2024  
**الإصدار**: 2.0  
**الحالة**: ✅ جاهز للاستخدام
