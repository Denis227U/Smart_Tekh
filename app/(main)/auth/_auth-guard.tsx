import { redirect } from 'next/navigation';
import { AuthPage } from '@/src/pages/auth';
import { getCurrentUser } from '@/src/entities/user/server';
import { ROUTES } from '@/src/shared/routes';

export async function AuthGuard({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (user) {
    redirect(params.callbackUrl || ROUTES.MAIN);
  }

  return <AuthPage searchParams={searchParams} />;
}
