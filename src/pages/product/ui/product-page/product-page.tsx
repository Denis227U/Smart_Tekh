import { cn } from '@/src/shared/lib';
import { Container } from '@/src/shared/ui/common';
import s from './product-page.module.scss';

export const ProductPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <>
      <Container
        tag='section'
        className={cn(s.wrapper, s.section)}
      >
        <div className={s.gallery}>ProductGallery</div>

        <div className={s.details}>ProductDetails</div>
      </Container>

      <Container
        tag='section'
        className={s.section}
      >
        <div className={s.tabs}>ProductTabs</div>
      </Container>

      <Container
        tag='section'
        className={s.section}
      >
        <div className={s.recommended}>ProductRecommendedList</div>
      </Container>
    </>
  );
};
