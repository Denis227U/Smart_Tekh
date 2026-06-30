import { OAuthButtons, SignInTrigger } from '@/src/features/auth';

export const AuthPageRouteInner = async ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) => {
  const sParams = await searchParams;

  const mode = sParams.mode === 'signin' ? 'signin' : 'register';

  return (
    <div>
      <h1>Вход в интернет-магазин ({mode})</h1>
      <OAuthButtons />

      <div>
        <SignInTrigger />
      </div>
    </div>
  );
};
