import CustomForm from '@/components/auth/CustomForm';
import GithubLoginButton from '@/components/auth/GithubLoginButton';
import { getCurrentUser } from '@/libs/auth';
// import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
// import { Suspense } from 'react';

export default async function SignIn() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/');
  }
  // const providers = await getProviders();

  return (
    <div className="flex h-max w-full flex-col items-center justify-center rounded-lg p-16 shadow-lg">
      <h2 className="mb-8 flex flex-col items-center justify-center gap-2 text-2xl font-medium">
        登陆页面
      </h2>
      <div className="divide-x"></div>
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        {/* {providers ? (
          <Suspense fallback={'加载中...'}>
            <LoginOptions providers={providers} />
          </Suspense>
        ) : null} */}
        <CustomForm />
        <p>OR</p>
        <GithubLoginButton />
      </div>
    </div>
  );
}
