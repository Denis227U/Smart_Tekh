import { Suspense } from 'react';
import { getCategories } from '@/src/entities/category/server';
import { MobilePanelClient } from './mobile-panel-client';
import { MobilePanelSkeleton } from './mobile-panel-skeleton/mobile-panel-skeleton';

const MobilePanelAsync = async () => {
  const categories = await getCategories();

  return <MobilePanelClient categories={categories} />;
};

export const MobilePanel = () => {
  return (
    <Suspense fallback={<MobilePanelSkeleton />}>
      <MobilePanelAsync />
    </Suspense>
  );
};
