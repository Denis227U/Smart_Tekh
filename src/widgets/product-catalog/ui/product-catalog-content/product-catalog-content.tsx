import { ProductCard } from '@/src/entities/product';
import type { ProductDto } from '@/src/entities/product';
import { Button } from '@/src/shared/ui/client';
import { Grid, Icon } from '@/src/shared/ui/common';
import s from './product-catalog-content.module.scss';

export const ProductCatalogContent = ({
  products,
}: {
  products: ProductDto[];
}) => {
  return (
    <Grid
      columns={3}
      gap={0}
      className={s.list}
    >
      {products.map((p, index) => (
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
            <Button variant='main'>
              <Icon name='Cart' />
            </Button>
          }
        />
      ))}
    </Grid>
  );
};
