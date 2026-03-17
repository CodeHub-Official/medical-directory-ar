'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">🏥</div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">دليل العيادات</h1>
              <p className="text-xs text-gray-500">Medical Directory</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/clinics/cairo"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              العيادات
            </Link>
            <Link
              href="/specialties"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              التخصصات
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              عن الموقع
            </Link>
            <Link
              href="/admin"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              🎛️ لوحة التحكم
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              البحث
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              الرئيسية
            </Link>
            <Link
              href="/clinics/cairo"
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              العيادات
            </Link>
            <Link
              href="/specialties"
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              التخصصات
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              عن الموقع
            </Link>
            <Link
              href="/admin"
              className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              🎛️ لوحة التحكم
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
