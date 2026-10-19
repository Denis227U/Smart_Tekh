import { CartItems } from '@/src/widgets/cart-items';
import { PageHeader } from '@/src/widgets/page-header';
import { cn } from '@/src/shared/lib';
import { Container } from '@/src/shared/ui/common';
import s from './checkout-page.module.scss';

export const CheckoutPage = ({
  params,
  searchParams,
}: {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <Container className={cn(s.container, s.section)}>
      <PageHeader title='Оформление заказа' />

      <CartItems />
    </Container>
  );
};
