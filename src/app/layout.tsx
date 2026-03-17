import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'دليل العيادات الطبي - أفضل العيادات والمراكز الطبية',
  description:
    'دليل شامل للعيادات والمراكز الطبية في مصر. اعثر على أفضل الأطباء والعيادات المتخصصة بسهولة.',
  keywords: [
    'عيادات',
    'أطباء',
    'مراكز طبية',
    'تجميل',
    'جلدية',
    'ليزر',
    'مصر',
    'القاهرة',
  ],
  authors: [{ name: 'Medical Directory' }],
  creator: 'Medical Directory',
  publisher: 'Medical Directory',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://medical-directory.example.com',
    title: 'دليل العيادات الطبي',
    description:
      'دليل شامل للعيادات والمراكز الطبية في مصر',
    siteName: 'دليل العيادات الطبي',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دليل العيادات الطبي',
    description:
      'دليل شامل للعيادات والمراكز الطبية في مصر',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://medical-directory.example.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
