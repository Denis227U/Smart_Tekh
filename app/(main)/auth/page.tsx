import { Suspense } from 'react';
import { AuthPageLoader } from '@/src/pages/auth';
import { AuthGuard } from './_auth-guard';

export default function AuthPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) {
  return (
    <Suspense fallback={<AuthPageLoader />}>
      <AuthGuard searchParams={searchParams} />
    </Suspense>
  );
}
