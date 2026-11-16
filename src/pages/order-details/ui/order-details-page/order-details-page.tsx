import {
  OrderDetails,
  OrderDetailsSkeleton,
} from '@/src/widgets/order-details';
import { Container, RoutePropsResolver } from '@/src/shared/ui/common';

export const OrderDetailsPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ created: string | undefined }>;
}) => {
  return (
    <Container>
      <RoutePropsResolver
        params={params}
        searchParams={searchParams}
        fallback={<OrderDetailsSkeleton />}
      >
        {({ params: { orderId }, searchParams: { created } }) => (
          <OrderDetails
            orderId={orderId}
            created={created}
          />
        )}
      </RoutePropsResolver>
    </Container>
  );
};
