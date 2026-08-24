import type { ProductCharacteristicDto } from '@/src/entities/product';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/client';
import { Table } from '@/src/shared/ui/common';
import { PRODUCT_TABS } from '../model/constants';
import { ProductDescription } from './product-description/product-description';

export const ProductTabsContent = ({
  title,
  description,
  characteristics,
  reviews,
}: {
  title: string;
  description: string | null;
  characteristics: ProductCharacteristicDto[];
  reviews: React.ReactNode;
}) => {
  return (
    <Tabs defaultValue={PRODUCT_TABS.DESC.value}>
      <TabsList>
        {Object.values(PRODUCT_TABS).map(({ label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={PRODUCT_TABS.DESC.value}>
        <ProductDescription
          title={title}
          description={description}
        />
      </TabsContent>

      <TabsContent value={PRODUCT_TABS.CHARS.value}>
        <Table
          title={`Характеристики «${title}»`}
          items={characteristics}
        />
      </TabsContent>

      <TabsContent value={PRODUCT_TABS.REVIEWS.value}>{reviews}</TabsContent>
    </Tabs>
  );
};
