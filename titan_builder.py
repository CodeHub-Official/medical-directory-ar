import os, pickle, re, pandas as pd
from bs4 import BeautifulSoup
import glob

def build_integrated_index():
    index_data = []
    # تحديد المجلد اللي جمعنا فيه البيانات
    target_dir = "./data_source"
    
    if not os.path.exists(target_dir):
        print("❌ مجلد data_source غير موجود!")
        return

    # --- 1. فحص الإكسيل ---
    excel_files = glob.glob(f"{target_dir}/*.xlsx") + glob.glob(f"{target_dir}/*.xls")
    print(f"📊 جاري فحص {len(excel_files)} ملف إكسيل حقيقي...")
    
    for excel in excel_files:
        try:
            df = pd.read_excel(excel).fillna('')
            for _, row in df.iterrows():
                clinic_info = row.to_dict()
                name = clinic_info.get('Name') or clinic_info.get('اسم العيادة') or "مركز طبي"
                index_data.append({
                    'type': 'clinic',
                    'title': str(name).strip(),
                    'full_content': f"{list(clinic_info.values())}",
                    'raw_data': clinic_info,
                    'source': os.path.basename(excel)
                })
            print(f"✅ تمت فهرسة عيادات من: {os.path.basename(excel)}")
        except Exception as e: print(f"❌ خطأ إكسيل: {e}")

    # --- 2. فحص الـ HTML ---
    html_files = glob.glob(f"{target_dir}/*.html")
    print(f"📄 جاري معالجة {len(html_files)} مقال طبي...")
    
    for html in html_files:
        if any(x in html.lower() for x in ['tslib', 'next', 'bundle', '404']): continue # تخطي الملفات التقنية
        try:
            with open(html, 'r', encoding='utf-8', errors='ignore') as f:
                soup = BeautifulSoup(f, 'html.parser')
                title = soup.title.string if soup.title else (soup.find('h1').text if soup.find('h1') else os.path.basename(html))
                content = soup.get_text()
                index_data.append({
                    'type': 'article',
                    'title': str(title).strip(),
                    'full_content': re.sub(r'\s+', ' ', content).strip(),
                    'source': os.path.basename(html)
                })
            print(f"✅ تمت فهرسة مقال: {str(title)[:30]}...")
        except Exception as e: print(f"❌ خطأ HTML: {e}")

    if index_data:
        with open("titan_matrix_brain.pkl", "wb") as f:
            pickle.dump(index_data, f)
        print(f"\n💎 تايتن استعاد ذاكرته! الإجمالي: {len(index_data)} عنصر.")
    else:
        print("\n⚠️ لم نجد بيانات طبية حقيقية بعد.")

if __name__ == "__main__":
    build_integrated_index()
