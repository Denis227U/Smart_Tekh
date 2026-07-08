import { Suspense } from 'react';
import { AuthGuardAndRedirect } from './_auth-guard-and-redirect';

export default function AuthModalRedirect({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <AuthGuardAndRedirect searchParams={searchParams} />
    </Suspense>
  );
}
