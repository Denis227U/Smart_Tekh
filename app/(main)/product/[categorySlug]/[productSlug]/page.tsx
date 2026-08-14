import { ProductPage } from '@/src/pages/product';

export default async function ProductPageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <ProductPage
      params={params}
      searchParams={searchParams}
    />
  );
}
