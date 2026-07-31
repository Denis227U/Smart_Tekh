export interface ProductCharacteristicGroupDto {
  title: string;
  priority: number;
  values: { value: string; count: number }[];
}

export interface PriceRange {
  min: number;
  max: number;
}
