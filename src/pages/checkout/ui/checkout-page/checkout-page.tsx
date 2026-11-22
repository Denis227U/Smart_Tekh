import {
  CHECKOUT_STEPS,
  CheckoutWizard,
  type CheckoutStep,
} from '@/src/widgets/checkout-wizard';
import { PageHeader } from '@/src/widgets/page-header';
import { Container, RoutePropsResolver } from '@/src/shared/ui/common';

export const CheckoutPage = ({
  params,
  searchParams,
}: {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <Container>
      <PageHeader title='Оформление заказа' />

      <RoutePropsResolver
        params={params}
        searchParams={searchParams}
        fallback={<div>Loading...</div>}
      >
        {({ searchParams: { step } }) => {
          const currentStep: CheckoutStep = CHECKOUT_STEPS.includes(
            step as CheckoutStep,
          )
            ? (step as CheckoutStep)
            : 'cart';

          return <CheckoutWizard step={currentStep} />;
        }}
      </RoutePropsResolver>
    </Container>
  );
};
