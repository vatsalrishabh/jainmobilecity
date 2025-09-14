import { Product } from "@/types/product";

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  ram: string[];
  storage: string[];
  os: string[];
  inStock: boolean;
}

export interface ProductFiltersProps {
  products: Product[];
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface BaseFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export interface SpecFilterProps extends BaseFilterProps {
  specType: 'ram' | 'storage' | 'os';
  uniqueValues: string[];
  icon: string;
  title: string;
  emoji: string;
}

export interface BrandFilterProps extends BaseFilterProps {
  uniqueBrands: string[];
  products: Product[];
}
