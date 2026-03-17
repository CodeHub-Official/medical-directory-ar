import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
  title: 'لوحة التحكم الإدارية - دليل العيادات الطبي',
  description: 'إدارة ونشر وتصدير المقالات بسهولة',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AdminDashboard />
    </main>
  );
}
