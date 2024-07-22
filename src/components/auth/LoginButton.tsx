'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginButton() {
  const session = useSession();
  return (
    <div className="flex gap-4 text-sm">
      {session.status === 'authenticated' ? (
        <button
          className="flex items-center gap-1 rounded border border-pink-600 px-3 py-1 text-pink-500 hover:bg-pink-500 hover:text-white"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          {session.data.user ? (
            <Image
              src={session.data.user.picture!}
              alt={session.data.user.name!}
              width={24}
              height={24}
              unoptimized={true}
            />
          ) : null}
          注销
        </button>
      ) : session.status === 'loading' ? (
        ''
      ) : (
        <Link
          href="/auth/login"
          className="active::text-[--text-color-3] text-[--text-color-2] hover:text-[--text-color-1]"
        >
          登录
        </Link>
      )}
    </div>
  );
}
