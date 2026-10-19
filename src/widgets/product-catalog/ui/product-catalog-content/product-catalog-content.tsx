import { AddToCartButton } from '@/src/features/add-to-cart';
import { ProductPagination } from '@/src/features/product-pagination';
import { ProductCard, type ProductDto } from '@/src/entities/product';
import { Button } from '@/src/shared/ui/client';
import { Grid, Icon } from '@/src/shared/ui/common';
import s from './product-catalog-content.module.scss';

export const ProductCatalogContent = ({
  products,
  totalPages,
  userId,
}: {
  products: ProductDto[];
  totalPages: number;
  userId: string | undefined;
}) => {
  return (
    <>
      <Grid
        columns={3}
        gap={0}
        className={s.list}
      >
        {products.map((p, index) => {
          // Preparing data object for Zustand
          const cartProductData = {
            id: p.id,
            title: p.title,
            slug: p.slug,
            price: p.price,
            oldPrice: p.oldPrice,
            stock: p.stock,
            coverThumbnail: p.coverThumbnail,
            coverImageAlt: p.coverImageAlt,
          };

          return (
            <ProductCard
              key={p.id}
              {...p}
              titleTag='h3'
              preload={index < 3}
              addToFavoriteBtn={
                <Button variant='outline-gray'>
                  <Icon name='Like' />
                </Button>
              }
              addToCompareBtn={
                <Button variant='outline-gray'>
                  <Icon name='Chart' />
                </Button>
              }
              quickBuyBtn={<Button variant='outline'>Купить в 1 клик</Button>}
              buyBtn={
                <AddToCartButton
                  productId={p.id}
                  userId={userId}
                  productData={cartProductData}
                />
              }
            />
          );
        })}
      </Grid>

      <ProductPagination totalPages={totalPages} />
    </>
  );
};
