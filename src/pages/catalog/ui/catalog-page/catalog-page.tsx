import { PageHeader } from '@/src/widgets/page-header';
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

            <div className={s.grid}>PRODUCT GRID</div>

            <div className={s.pagination}>PAGINATION</div>
          </div>
        </div>
      </Container>
    </>
  );
};
