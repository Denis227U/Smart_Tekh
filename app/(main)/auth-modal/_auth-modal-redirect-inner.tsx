import { ROUTES } from '@/src/shared/routes';
import { redirect } from 'next/navigation';

export const AuthModalRedirectInner = async ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) => {
  const sParams = await searchParams;
  const mode = sParams.mode === 'register' ? 'register' : 'signin';
  redirect(ROUTES.AUTH.PAGE(mode));
};
