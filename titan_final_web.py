import os, pickle, re
from flask import Flask, request, render_template_string, send_from_directory

app = Flask(__name__)

# 🧠 منظف النصوص الفائق: تنظيف المشاكل الظاهرة في image_6.png
def super_cleaner(text, is_title=False):
    if not text: return ""
    text = str(text)
    if is_title:
        # تنظيف العناوين المشوهة في image_0.png
        text = text.replace('.html', '').replace('_', ' ').replace('-', ' ')
        return re.sub(r'^[0-9\s\-_]+', '', text).strip().title()
    
    # حذف الستايلات والسكريبتات (حل مشكلة image_0.png)
    text = re.sub(r'<(style|script)[^>]*>.*?</\1>', '', text, flags=re.DOTALL)
    # حذف undefined المتكررة في image_6.png
    text = re.sub(r'(undefined|null|none|true|false|>)+', ' ', text)
    text = re.sub(r'<[^>]+?>', '', text)
    return re.sub(r'\s+', ' ', text).strip()

def titan_neural_inference(query):
    articles, clinics = [], []
    if not query: return [], []
    try:
        if not os.path.exists("titan_matrix_brain.pkl"): return [], []
        with open("titan_matrix_brain.pkl", "rb") as f:
            brain = pickle.load(f)
    except: return [], []

    # تفعيل البحث المجزّأ (حل مشكلة image_12.png)
    query_raw = query.lower().strip()
    query_words = query_raw.split() # تجزيء الجملة لكلمات
    seen_names = set()
    
    for entry in brain:
        source = str(entry.get('source', '')).lower()
        content = str(entry.get('full_content', '')).lower()
        
        score = 0
        # 1. بحث عن الجملة بالكامل (وزن ثقيل)
        if query_raw in content or query_raw in source:
            score += 2000
            
        # 2. بحث عن الكلمات منفردة (وزن متوسط) - هذا هو الحل!
        for word in query_words:
            if word in content: score += 500
            if word in source: score += 1000

        if score > 0:
            if entry.get('type') == 'article' or source.endswith('.html'):
                articles.append({
                    'title': super_cleaner(source, is_title=True),
                    'summary': super_cleaner(content)[:200],
                    'filename': source,
                    'score': score
                })
            else:
                data = entry.get('raw_data', {})
                name = data.get('Name') or data.get('اسم العيادة') or "مركز طبي"
                if name not in seen_names:
                    clinics.append({'data': data, 'score': score})
                    seen_names.add(name)

    # ترتيب النتائج حسب الأهمية (Score)
    articles.sort(key=lambda x: x['score'], reverse=True)
    clinics.sort(key=lambda x: x['score'], reverse=True)
    return articles[:3], clinics[:10]

# ✅ واجهة العرض الاحترافية المستوحاة من صورك
HTML_V5_8 = """
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        :root { --main: #00f2fe; --bg: #0d1117; --card: #161b22; --border: #30363d; --success: #238636; }
        body { background: var(--bg); color: #c9d1d9; font-family: 'Cairo', sans-serif; margin: 0; padding: 15px; }
        .container { max-width: 500px; margin: auto; }
        .search-box { display: flex; gap: 10px; background: var(--card); padding: 10px; border-radius: 50px; border: 2px solid var(--border); margin-bottom: 25px; }
        input { flex: 1; border: none; background: transparent; color: white; font-size: 16px; outline: none; padding-right: 15px; }
        button { background: var(--main); border: none; padding: 8px 20px; border-radius: 50px; font-weight: 900; cursor: pointer; color:#000; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 15px; padding: 20px; margin-bottom: 15px; border-top: 4px solid var(--main); animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .btn { display: block; text-align: center; padding: 12px; border-radius: 10px; font-weight: bold; text-decoration: none; margin-top: 15px; border: 1px solid var(--main); color: var(--main); }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="text-align:center; color:var(--main);">TITAN NEURAL v5.8</h2>
        <form method="POST" class="search-box">
            <input type="text" name="query" placeholder="ابحث عن (تجميل، شفط، عيادة)..." value="{{ query }}" required>
            <button type="submit">تحليل</button>
        </form>

        {% if query and not articles and not clinics %}
            <div style="text-align:center; padding:20px; color:#f85149;">
                 لم يتم العثور على نتائج دقيقة لـ "{{ query }}". تم تفعيل البحث الذكي، حاول بكلمات مفردة.
            </div>
        {% endif %}

        {% for art in articles %}
        <div class="card">
            <span style="font-weight:900;color:white;display:block;margin-bottom:10px;">📄 {{ art.title }}</span>
            <p style="font-size:13px; color:#8b949e;">{{ art.summary }}...</p>
            <a href="/view/{{ art.filename }}" class="btn" target="_blank">إقرأ التقرير بالكامل</a>
        </div>
        {% endfor %}

        {% for c in clinics %}
        <div class="card" style="border-top:none; border-right:4px solid var(--success);">
            <span style="font-weight:900;color:white;display:block;">{{ c.data.get('Name') or c.data.get('اسم العيادة') }}</span>
            <div style="font-size:12px;color:#8b949e;">📍 {{ c.data.get('Address') or c.data.get('العنوان') }}</div>
            <a href="tel:{{ c.data.get('phone') or c.data.get('رقم الهاتف') }}" style="color:var(--success); text-decoration:none; font-weight:bold; display:block; margin-top:10px;">📞 اتصال فوري</a>
        </div>
        {% endfor %}
    </div>
</body>
</html>
"""

@app.route('/view/<path:filename>')
def view_article(filename):
    try:
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        # تنظيف المحتوى عند العرض (حل مشكلة image_0.png)
        clean_content = re.sub(r'<(style|script)[^>]*>.*?</\1>', '', content, flags=re.DOTALL)
        return render_template_string("<html><body style='background:#0d1117;color:white;padding:20px;'>{{ c|safe }}</body></html>", c=clean_content)
    except: return "❌ الملف غير موجود على السيرفر الحالي."

@app.route('/', methods=['GET', 'POST'])
def home():
    articles, clinics, query = [], [], ""
    if request.method == 'POST':
        query = request.form.get('query', '')
        articles, clinics = titan_neural_inference(query)
    return render_template_string(HTML_V5_8, articles=articles, clinics=clinics, query=query)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
