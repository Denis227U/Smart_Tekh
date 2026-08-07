'use client';

import {
  CharacteristicFilter,
  PriceRangeFilter,
  type PriceRange,
  type ProductCharacteristicGroupDto,
} from '@/src/features/product-filter';
import { Accordion } from '@/src/shared/ui/client';
import s from './catalog-sidebar-content.module.scss';

export const CatalogSidebarContent = ({
  characteristicGroups,
  priceRange,
}: {
  characteristicGroups?: ProductCharacteristicGroupDto[];
  priceRange: PriceRange;
}) => {
  return (
    <div>
      <Accordion
        type='multiple'
        defaultValue={['item-1', 'item-2', 'item-3', 'item-4']}
        className={s.accordion}
      >
        <div>
          <Accordion.Item value={'item-1'}>
            <Accordion.Trigger className={s.accordionTrigger}>
              Цена, ₽
            </Accordion.Trigger>

            <Accordion.Content>
              <PriceRangeFilter
                title='Цена, ₽'
                priceRange={priceRange}
                showTitle={false}
              />
            </Accordion.Content>
          </Accordion.Item>
        </div>
        {characteristicGroups && (
          <div>
            {characteristicGroups.map((group, index) => (
              <Accordion.Item
                key={group.title}
                value={`item-${index + 2}`}
                className={s.accordionItem}
              >
                <Accordion.Trigger className={s.accordionTrigger}>
                  {group.title}
                </Accordion.Trigger>

                <Accordion.Content>
                  <CharacteristicFilter
                    key={group.title}
                    title={group.title}
                    values={group.values}
                    showTitle={false}
                  />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </div>
        )}
      </Accordion>
    </div>
  );
};
