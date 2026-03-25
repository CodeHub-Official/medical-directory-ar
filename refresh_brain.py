import pickle, os

# تأكد من وجود ملف قاعدة البيانات
if os.path.exists("titan_matrix_brain.pkl"):
    with open("titan_matrix_brain.pkl", "rb") as f:
        brain = pickle.load(f)
    
    # تنظيف وتجهيز البيانات للعرض
    for entry in brain:
        if 'type' not in entry:
            entry['type'] = 'clinic' if 'Name' in str(entry) else 'article'
            
    with open("titan_matrix_brain.pkl", "wb") as f:
        pickle.dump(brain, f)
    print("✅ تم تنشيط العقل العصبي بنجاح!")
else:
    print("❌ ملف titan_matrix_brain.pkl غير موجود.")
