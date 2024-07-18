import type { Metadata } from 'next';
import { serif } from '@/fonts/fonts';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NoManReady Blog',
  description: '记录生活、记录精彩',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={serif.className}>
      <body>
        <header className="h-16 sticky z-10 top-0 flex items-center px-6 w-full bg-[--layer-1] justify-between">
          <Link href="/">NoManReady Blog</Link>
          <Link
            className="text-purple-500 px-3 py-1 border border-purple-600 rounded hover:text-white hover:bg-purple-500"
            href={'/editor/drafts/'}
          >
            新建
          </Link>
        </header>
        <main className="max-w-4xl mx-auto bg-[--layer-1] rounded-md my-5">
          {children}
        </main>
      </body>
    </html>
  );
}
