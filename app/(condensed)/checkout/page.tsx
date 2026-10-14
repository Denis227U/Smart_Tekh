import { CheckoutPage } from '@/src/pages/checkout';

export default async function CheckoutPageRoute({
  params,
  searchParams,
}: {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <CheckoutPage
      params={params}
      searchParams={searchParams}
    />
  );
}
