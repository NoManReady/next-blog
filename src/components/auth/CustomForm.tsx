'use client';

import { encryptionAesPsd } from '@/utils/crypto';
import { signIn } from 'next-auth/react';
import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function CustomForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, dispatch] = useFormState(() => {
    signIn('credentials', {
      user_name: usernameRef.current?.value,
      password: encryptionAesPsd(passwordRef.current!.value),
      callbackUrl: 'https://next.131407.vip',
      redirect: true,
    });
  }, undefined);

  return (
    <form action={dispatch} className="flex w-full flex-col items-center gap-3">
      <input
        ref={usernameRef}
        type="text"
        name="user_name"
        placeholder="请输入账号"
        required
        className="block w-full rounded border px-10 py-3 text-sm text-black/80 focus:outline-pink-400"
      />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        placeholder="请输入密码"
        required
        className="block w-full rounded border px-10 py-3 text-sm text-black/80 focus:outline-pink-400"
      />
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button
      aria-disabled={pending}
      type="submit"
      onClick={handleClick}
      className="w-full rounded-md border border-blue-500 px-16 py-3 transition-all hover:bg-blue-400"
    >
      自定义登录
    </button>
  );
}
