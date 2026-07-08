import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/src/entities/user/server';
import { ROUTES } from '@/src/shared/routes';

export const AuthGuardAndRedirect = async ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) => {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (user) {
    redirect(params.callbackUrl || ROUTES.MAIN);
  }

  const sParams = await searchParams;
  const mode = sParams.mode === 'register' ? 'register' : 'signin';

  redirect(ROUTES.AUTH.PAGE(mode));
};
