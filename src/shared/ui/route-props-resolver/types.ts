import { ReactNode } from 'react';

export interface ResolverProps<
  P = Record<string, string | string[] | undefined>,
  S = Record<string, string | string[] | undefined>,
> {
  params: Promise<P>;
  searchParams: Promise<S>;
  fallback: ReactNode;
  children: (resolved: { params: P; searchParams: S }) => ReactNode;
}
