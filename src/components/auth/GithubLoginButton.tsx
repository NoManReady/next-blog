'use client';

import { signIn } from 'next-auth/react';

export default function GithubLoginButton() {
  function onLogin() {
    signIn('github');
  }
  return (
    <button
      onClick={onLogin}
      className="w-full rounded-md border border-pink-500 px-16 py-3 transition-all hover:bg-pink-400"
    >
      Github登录
    </button>
  );
}
