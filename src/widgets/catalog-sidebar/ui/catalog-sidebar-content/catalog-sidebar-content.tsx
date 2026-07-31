import {
  CharacteristicFilter,
  PriceRangeFilter,
  type PriceRange,
  type ProductCharacteristicGroupDto,
} from '@/src/features/product-filter';

export const CatalogSidebarContent = ({
  characteristicGroups,
  priceRange,
}: {
  characteristicGroups?: ProductCharacteristicGroupDto[];
  priceRange: PriceRange;
}) => {
  return (
    <div>
      <div>
        <PriceRangeFilter
          title='Цена'
          priceRange={priceRange}
        />
      </div>
      {characteristicGroups && (
        <div>
          {characteristicGroups.map((group) => (
            <CharacteristicFilter
              key={group.title}
              title={group.title}
              values={group.values}
            />
          ))}
        </div>
      )}
    </div>
  );
};
