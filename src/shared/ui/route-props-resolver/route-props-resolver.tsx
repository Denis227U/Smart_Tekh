import { Suspense } from 'react';
import type { ResolverProps } from './types';

const ResolverInner = async <P, S>({
  params,
  searchParams,
  children,
}: Omit<ResolverProps<P, S>, 'fallback'>) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <>
      {children({ params: resolvedParams, searchParams: resolvedSearchParams })}
    </>
  );
};

export const RoutePropsResolver = <
  P = Record<string, string | string[] | undefined>,
  S = Record<string, string | string[] | undefined>,
>({
  fallback,
  ...props
}: ResolverProps<P, S>) => {
  return (
    <Suspense fallback={fallback}>
      <ResolverInner {...props} />
    </Suspense>
  );
};
