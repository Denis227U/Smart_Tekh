import type { ProductCharacteristicDto } from '@/src/entities/product';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/client';
import { Heading, Table } from '@/src/shared/ui/common';
import { PRODUCT_TABS } from '../model/constants';
import { ProductDescription } from './product-description/product-description';

export const ProductTabsContent = ({
  title,
  description,
  characteristics,
}: {
  title: string;
  description: string | null;
  characteristics: ProductCharacteristicDto[];
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

      <TabsContent value={PRODUCT_TABS.REVIEWS.value}>
        <div aria-labelledby='product-tabs-comments'>
          <Heading
            tag='h2'
            variant='h3'
            id='product-tabs-comments'
          >
            Отзывы на «{title}»
          </Heading>

          <div>Отзывы</div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
