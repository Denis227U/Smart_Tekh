import {
  ProductDetails,
  ProductDetailsSkeleton,
} from '@/src/widgets/product-details';
import {
  ProductGallery,
  ProductGallerySkeleton,
} from '@/src/widgets/product-gallery';
import { ProductReviews } from '@/src/widgets/product-reviews';
import { ProductTabs, ProductTabsSkeleton } from '@/src/widgets/product-tabs';
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

        <RoutePropsResolver
          params={params}
          searchParams={searchParams}
          fallback={<ProductDetailsSkeleton />}
        >
          {({ params: { productSlug } }) => (
            <ProductDetails productSlug={productSlug} />
          )}
        </RoutePropsResolver>
      </Container>

      <Container
        tag='section'
        className={s.section}
      >
        <RoutePropsResolver
          params={params}
          searchParams={searchParams}
          fallback={<ProductTabsSkeleton />}
        >
          {({ params: { productSlug } }) => (
            <ProductTabs
              productSlug={productSlug}
              reviews={<ProductReviews productSlug={productSlug} />}
            />
          )}
        </RoutePropsResolver>
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
