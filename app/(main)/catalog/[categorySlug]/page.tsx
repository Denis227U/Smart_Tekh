import { CatalogPage } from '@/src/pages/catalog';

export default async function CatalogPageRoute({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  return <CatalogPage params={params} />;
}
