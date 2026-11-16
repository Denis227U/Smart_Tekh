import { OrderDetailsPage } from '@/src/pages/order-details';

export default async function OrderDetailsPageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ created: string | undefined }>;
}) {
  return (
    <OrderDetailsPage
      params={params}
      searchParams={searchParams}
    />
  );
}
