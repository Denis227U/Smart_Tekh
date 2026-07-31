import { CatalogPage } from '@/src/pages/catalog';

export default async function CatalogPageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <CatalogPage
      params={params}
      searchParams={searchParams}
    />
  );
}
