'use client';

import dynamic from 'next/dynamic';
import { CategoryDto } from '@/src/entities/category';
import { MobilePanelSkeleton } from './mobile-panel-skeleton/mobile-panel-skeleton';

const MobilePanelContent = dynamic(
  () =>
    import('./mobile-panel-content/mobile-panel-content').then(
      (mod) => mod.MobilePanel,
    ),
  { ssr: false, loading: () => <MobilePanelSkeleton /> },
);

export const MobilePanelClient = ({
  categories,
}: {
  categories: CategoryDto[];
}) => {
  return <MobilePanelContent categories={categories} />;
};
