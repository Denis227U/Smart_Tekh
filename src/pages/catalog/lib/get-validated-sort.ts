import { redirect } from 'next/navigation';
import { isValidSort, type ProductSort } from '@/src/entities/product';

export const getValidatedSort = ({
  categorySlug,
  searchParams,
}: {
  categorySlug?: string[];
  searchParams: Record<string, string | string[] | undefined>;
}): ProductSort => {
  const sort = searchParams.sort;

  if (sort && !isValidSort(sort)) {
    const query = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'sort' && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => query.append(key, v));
        } else {
          query.set(key, value);
        }
      }
    });

    const pathSegments = ['catalog', ...(categorySlug || [])];
    const basePath = `/${pathSegments.join('/')}`;

    const queryString = query.toString();
    const redirectUrl = queryString ? `${basePath}?${queryString}` : basePath;

    redirect(redirectUrl);
  }

  return isValidSort(sort) ? sort : 'newest';
};
