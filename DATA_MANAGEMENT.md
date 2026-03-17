# دليل إدارة البيانات - Data Management Guide

## مقدمة

هذا الدليل يشرح كيفية إدارة بيانات العيادات والمدن والتخصصات في الموقع.

## 1. هيكل البيانات

### 1.1 ملف البيانات الرئيسي

```
src/data/clinics.json
```

يحتوي على ثلاث مصفوفات رئيسية:
- `clinics`: بيانات العيادات
- `specialties`: بيانات التخصصات
- `cities`: بيانات المدن

### 1.2 مثال على الهيكل

```json
{
  "clinics": [...],
  "specialties": [...],
  "cities": [...]
}
```

## 2. إدارة العيادات

### 2.1 إضافة عيادة جديدة

```json
{
  "id": "clinic-unique-id",
  "name": "اسم العيادة",
  "nameEn": "Clinic Name",
  "specialty": "التخصص",
  "specialtyEn": "specialty-en",
  "city": "المدينة",
  "cityEn": "city-en",
  "district": "الحي",
  "address": "العنوان الكامل",
  "phone": "الهاتف الأساسي",
  "phone2": "الهاتف الثاني (اختياري)",
  "website": "رابط الموقع (اختياري)",
  "googleRating": 4.5,
  "googleReviews": 100,
  "description": "وصف العيادة",
  "services": ["الخدمة 1", "الخدمة 2", "الخدمة 3"],
  "socialMedia": {
    "facebook": "رابط Facebook",
    "instagram": "رابط Instagram",
    "whatsapp": "رقم WhatsApp",
    "youtube": "رابط YouTube"
  },
  "category": "A",
  "image": "رابط الصورة"
}
```

### 2.2 حقول العيادة

| الحقل | النوع | الوصف | مثال |
|------|------|-------|------|
| `id` | string | معرّف فريد | `clinic-001` |
| `name` | string | اسم العيادة بالعربية | `عيادة نور` |
| `nameEn` | string | اسم العيادة بالإنجليزية | `Nour Clinic` |
| `specialty` | string | التخصص | `تجميل` |
| `specialtyEn` | string | التخصص بالإنجليزية | `cosmetics` |
| `city` | string | المدينة | `القاهرة` |
| `cityEn` | string | المدينة بالإنجليزية | `cairo` |
| `district` | string | الحي | `التجمع الخامس` |
| `address` | string | العنوان الكامل | `التجمع الخامس، القاهرة` |
| `phone` | string | الهاتف الأساسي | `16226` |
| `phone2` | string | الهاتف الثاني | `01009355539` |
| `website` | string | رابط الموقع | `https://example.com` |
| `googleRating` | number | التقييم من 1-5 | `4.8` |
| `googleReviews` | number | عدد التقييمات | `150` |
| `description` | string | وصف العيادة | `عيادة متخصصة...` |
| `services` | array | قائمة الخدمات | `["جراحات تجميل", "ليزر"]` |
| `socialMedia` | object | وسائل التواصل | `{facebook: "...", ...}` |
| `category` | string | الفئة (A, B, C) | `A` |
| `image` | string | رابط الصورة | `https://...` |

### 2.3 تحديث عيادة موجودة

1. افتح `src/data/clinics.json`
2. ابحث عن العيادة بـ `id`
3. عدّل البيانات المطلوبة
4. احفظ الملف

### 2.4 حذف عيادة

1. افتح `src/data/clinics.json`
2. ابحث عن العيادة بـ `id`
3. احذف الكائن من المصفوفة
4. احفظ الملف

## 3. إدارة التخصصات

### 3.1 إضافة تخصص جديد

```json
{
  "id": "specialty-unique-id",
  "name": "اسم التخصص",
  "nameEn": "Specialty Name",
  "slug": "specialty-slug",
  "description": "وصف التخصص",
  "descriptionEn": "Specialty description",
  "icon": "🏥",
  "relatedServices": ["الخدمة 1", "الخدمة 2"]
}
```

### 3.2 حقول التخصص

| الحقل | النوع | الوصف | مثال |
|------|------|-------|------|
| `id` | string | معرّف فريد | `specialty-001` |
| `name` | string | اسم التخصص | `تجميل` |
| `nameEn` | string | اسم التخصص بالإنجليزية | `Cosmetics` |
| `slug` | string | الـ URL slug | `cosmetics` |
| `description` | string | وصف التخصص | `تخصص جراحات التجميل...` |
| `descriptionEn` | string | الوصف بالإنجليزية | `Cosmetic surgery...` |
| `icon` | string | رمز Emoji | `✨` |
| `relatedServices` | array | الخدمات المرتبطة | `["جراحات تجميل", "ليزر"]` |

## 4. إدارة المدن

### 4.1 إضافة مدينة جديدة

```json
{
  "id": "city-unique-id",
  "name": "اسم المدينة",
  "nameEn": "City Name",
  "slug": "city-slug",
  "description": "وصف المدينة",
  "descriptionEn": "City description",
  "population": 5000000,
  "clinicCount": 50,
  "image": "رابط الصورة"
}
```

### 4.2 حقول المدينة

| الحقل | النوع | الوصف | مثال |
|------|------|-------|------|
| `id` | string | معرّف فريد | `city-001` |
| `name` | string | اسم المدينة | `القاهرة` |
| `nameEn` | string | اسم المدينة بالإنجليزية | `Cairo` |
| `slug` | string | الـ URL slug | `cairo` |
| `description` | string | وصف المدينة | `العاصمة المصرية...` |
| `descriptionEn` | string | الوصف بالإنجليزية | `The capital of Egypt...` |
| `population` | number | عدد السكان | `20000000` |
| `clinicCount` | number | عدد العيادات | `50` |
| `image` | string | رابط الصورة | `https://...` |

## 5. أفضل الممارسات

### 5.1 معرّفات فريدة
```
✅ clinic-001, clinic-002, clinic-nour
❌ 1, 2, clinic
```

### 5.2 الأسماء
```
✅ عيادة نور, Nour Clinic
❌ عيادة, clinic
```

### 5.3 الـ Slugs
```
✅ cosmetics, dermatology, cairo
❌ Cosmetics, DERMATOLOGY, Cairo
```

### 5.4 الصور
```
✅ https://via.placeholder.com/400x300?text=Clinic
❌ /images/clinic.jpg (إذا لم تكن موجودة)
```

### 5.5 الأرقام
```
✅ 4.8, 150
❌ "4.8", "150"
```

## 6. التحقق من البيانات

### 6.1 أدوات التحقق

استخدم أداة JSON Validator:
- https://jsonlint.com
- https://www.jsonschemavalidator.net

### 6.2 الأخطاء الشائعة

```
❌ فاصلة مفقودة
❌ علامات اقتباس غير متطابقة
❌ أقواس غير متطابقة
❌ قيم فارغة
```

## 7. الاستيراد والتصدير

### 7.1 استيراد من CSV

```bash
# تحويل CSV إلى JSON
npm install csvtojson

# الأمر
csvtojson clinics.csv > clinics.json
```

### 7.2 تصدير إلى CSV

```bash
# تحويل JSON إلى CSV
npm install json2csv

# الأمر
json2csv -i clinics.json -o clinics.csv
```

## 8. النسخ الاحتياطية

### 8.1 إنشاء نسخة احتياطية

```bash
# نسخ الملف
cp src/data/clinics.json src/data/clinics.backup.json

# أو استخدم Git
git commit -m "Backup: clinics data"
```

### 8.2 استعادة من نسخة احتياطية

```bash
# استعادة الملف
cp src/data/clinics.backup.json src/data/clinics.json
```

## 9. الأداء والحجم

### 9.1 حد أقصى للبيانات
- العيادات: 100,000+
- التخصصات: 100+
- المدن: 50+

### 9.2 تحسين الأداء
- استخدم IDs قصيرة
- تجنب النصوص الطويلة جداً
- استخدم صور مضغوطة

## 10. التحديثات المستقبلية

### 10.1 إضافة حقول جديدة

```json
{
  "id": "clinic-001",
  "name": "عيادة نور",
  // حقول جديدة
  "hours": "9:00-18:00",
  "latitude": 30.0444,
  "longitude": 31.2357,
  "tags": ["موثوقة", "متقدمة"]
}
```

### 10.2 إضافة علاقات

```json
{
  "id": "clinic-001",
  "name": "عيادة نور",
  "relatedClinics": ["clinic-002", "clinic-003"],
  "relatedArticles": ["article-001"]
}
```

## 11. أدوات مفيدة

| الأداة | الاستخدام |
|------|----------|
| JSON Lint | التحقق من صحة JSON |
| VS Code | تحرير الملفات |
| Git | إدارة الإصدارات |
| Postman | اختبار API |

## 12. الدعم والمساعدة

للمساعدة:
- تحقق من الأمثلة في هذا الدليل
- استخدم JSON Validator
- اقرأ رسائل الخطأ بعناية

---

**ملاحظة**: تأكد من صحة JSON قبل الحفظ.

**آخر تحديث**: مارس 2024
