import { PageHeader } from '@/src/widgets/page-header';
import { ProductCatalog } from '@/src/widgets/product-catalog';
import { Container } from '@/src/shared/ui/common';
import s from './catalog-page.module.scss';

export const CatalogPage = ({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) => {
  return (
    <>
      <PageHeader title='Каталог' />

      <Container className={s.container}>
        <div className={s.inner}>
          <aside className={s.filters}>FILTERS</aside>

          <div className={s.content}>
            <div className={s.topPanel}>TOP PANEL</div>

            <div className={s.grid}>
              <ProductCatalog />
            </div>

            <div className={s.pagination}>PAGINATION</div>
          </div>
        </div>
      </Container>
    </>
  );
};
