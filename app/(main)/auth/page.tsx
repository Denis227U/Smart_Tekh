import { Suspense } from 'react';
import { AuthPageRouteInner } from './_auth-page-route-inner';

export default async function AuthPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <AuthPageRouteInner searchParams={searchParams} />
    </Suspense>
  );
}
