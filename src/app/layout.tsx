import type { Metadata } from 'next';
import { serif } from '@/fonts/fonts';
import './globals.css';
import Link from 'next/link';
import LoginButton from '@/components/auth/LoginButton';
import NextAuthProvider from '@/components/auth/NextAuthProvider';
import PostCreateButton from '@/components/blog-list/PostCreateButton';

export const metadata: Metadata = {
  title: {
    template: '%s | NoManReady Blog',
    default: 'NoManReady Blog',
  },
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
        <NextAuthProvider>
          <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-[--header-bg] px-6 backdrop-blur-md">
            <Link href="/">NoManReady Blog</Link>
            <div className="flex items-center justify-center gap-2">
              <PostCreateButton />
              <LoginButton />
            </div>
          </header>
          <main className="mx-auto my-5 max-w-4xl rounded-md bg-[--layer-1]">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
