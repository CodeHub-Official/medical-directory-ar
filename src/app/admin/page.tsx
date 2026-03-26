'use client';
import { useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">لوحة التحكم</h1>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-right"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (password === 'admin2026') {
                  setAuth(true);
                } else {
                  setError('كلمة المرور غلط');
                }
              }
            }}
          />
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            onClick={() => {
              if (password === 'admin2026') {
                setAuth(true);
              } else {
                setError('كلمة المرور غلط');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
