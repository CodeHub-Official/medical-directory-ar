'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">عن الموقع</h3>
            <p className="text-sm text-gray-400">
              دليل شامل للعيادات والمراكز الطبية في مصر. نساعدك في العثور على أفضل الأطباء والعيادات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/clinics/cairo"
                  className="hover:text-blue-400 transition-colors"
                >
                  العيادات
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties"
                  className="hover:text-blue-400 transition-colors"
                >
                  التخصصات
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  عن الموقع
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">التخصصات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/specialty/cosmetics"
                  className="hover:text-blue-400 transition-colors"
                >
                  تجميل
                </Link>
              </li>
              <li>
                <Link
                  href="/specialty/dermatology"
                  className="hover:text-blue-400 transition-colors"
                >
                  جلدية
                </Link>
              </li>
              <li>
                <Link
                  href="/specialty/laser"
                  className="hover:text-blue-400 transition-colors"
                >
                  ليزر
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm">
              <li>البريد: support@medicaldir.com</li>
              <li>الهاتف: +20 123 456 7890</li>
              <li className="mt-4">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Instagram
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} دليل العيادات الطبي. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
