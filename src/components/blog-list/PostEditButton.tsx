'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PostEditButton({ slug }: { slug: string }) {
  const session = useSession();
  return session.status === 'authenticated' ? (
    <Link
      className="text-purple-500 underline-offset-4 hover:text-purple-400 hover:underline active:text-purple-600"
      href={`/editor/drafts/${slug}`}
    >
      编辑
    </Link>
  ) : null;
}
