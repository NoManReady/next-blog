'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PostCreateButton() {
  const session = useSession();
  return session.status === 'authenticated' ? (
    <Link
      className="rounded border border-purple-600 px-3 py-1 text-purple-500 hover:bg-purple-500 hover:text-white"
      href={'/editor/drafts/'}
    >
      新建
    </Link>
  ) : null;
}
