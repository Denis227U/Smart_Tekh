import { Suspense } from 'react';
import {
  CatalogSidebar,
  CatalogSidebarSkeleton,
} from '@/src/widgets/catalog-sidebar';
import { PageHeader } from '@/src/widgets/page-header';
import {
  ProductCatalog,
  ProductCatalogSkeleton,
} from '@/src/widgets/product-catalog';
import { CatalogParamsProvider } from '@/src/entities/product';
import { Container, RoutePropsResolver } from '@/src/shared/ui/common';
import { getValidatedSort } from '../../lib/get-validated-sort';
import { CatalogPageSkeleton } from '../catalog-page-skeleton/catalog-page-skeleton';
import s from './catalog-page.module.scss';

export const CatalogPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <>
      <PageHeader title='Каталог' />

      <Container className={s.container}>
        <Suspense fallback={<CatalogPageSkeleton />}>
          <CatalogParamsProvider>
            <div className={s.inner}>
              <aside className={s.filters}>
                <RoutePropsResolver
                  params={params}
                  searchParams={searchParams}
                  fallback={<CatalogSidebarSkeleton />}
                >
                  {({ params: { categorySlug } }) => {
                    const slug = categorySlug?.[0];

                    return <CatalogSidebar categorySlug={slug} />;
                  }}
                </RoutePropsResolver>
              </aside>

              <div className={s.content}>
                <div className={s.topPanel}>TOP PANEL</div>

                <div className={s.grid}>
                  <RoutePropsResolver
                    params={params}
                    searchParams={searchParams}
                    fallback={<ProductCatalogSkeleton />}
                  >
                    {({ params: { categorySlug }, searchParams }) => {
                      const { page, priceMin, priceMax, characteristics } =
                        searchParams;

                      const slug = categorySlug?.[0];

                      return (
                        <ProductCatalog
                          key={JSON.stringify(searchParams)}
                          categorySlug={slug}
                          priceMin={priceMin ? Number(priceMin) : undefined}
                          priceMax={priceMax ? Number(priceMax) : undefined}
                          characteristics={
                            characteristics
                              ? JSON.parse(String(characteristics))
                              : undefined
                          }
                          page={Number(page) || undefined}
                        />
                      );
                    }}
                  </RoutePropsResolver>
                </div>
              </div>
            </div>
          </CatalogParamsProvider>
        </Suspense>
      </Container>
    </>
  );
};
