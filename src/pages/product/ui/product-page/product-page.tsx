import {
  ProductGallery,
  ProductGallerySkeleton,
} from '@/src/widgets/product-gallery';
import { cn } from '@/src/shared/lib';
import { Container, RoutePropsResolver } from '@/src/shared/ui/common';
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
        <RoutePropsResolver
          params={params}
          searchParams={searchParams}
          fallback={<ProductGallerySkeleton />}
        >
          {({ params: { productSlug } }) => (
            <ProductGallery productSlug={productSlug} />
          )}
        </RoutePropsResolver>

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
