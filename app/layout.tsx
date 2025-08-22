import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LVT Nextjs APP',
  description: 'Giải pháp tối ưu',
  icons: {
    icon: '/favicon_v2.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
