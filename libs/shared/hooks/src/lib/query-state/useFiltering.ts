import type { ProductFilter } from '@org/models';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  parseOptionalNumber,
  resetPageParam,
  setOptionalParam,
  type SortOption,
  updateSearchParams,
} from './search-params';

export interface FilterState {
  category?: string;
  inStock?: boolean;
  maxPrice?: number;
  minPrice?: number;
  sortBy?: SortOption;
}

export function useFiltering() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = {
    category: searchParams.get('category') || undefined,
    inStock: searchParams.get('inStock') === 'true' ? true : undefined,
    minPrice: parseOptionalNumber(searchParams.get('minPrice')),
    maxPrice: parseOptionalNumber(searchParams.get('maxPrice')),
    sortBy: (searchParams.get('sortBy') as SortOption | null) ?? undefined,
  };

  const apiFilters: ProductFilter = {};

  if (filters.category) {
    apiFilters.category = filters.category;
  }

  if (filters.inStock) {
    apiFilters.inStock = true;
  }

  if (filters.minPrice !== undefined) {
    apiFilters.minPrice = filters.minPrice;
  }

  if (filters.maxPrice !== undefined) {
    apiFilters.maxPrice = filters.maxPrice;
  }

  const setFilters = useCallback(
    (nextFilters: Partial<FilterState>) => {
      updateSearchParams(setSearchParams, (params) => {
        setOptionalParam(params, 'category', nextFilters.category);
        setOptionalParam(params, 'inStock', nextFilters.inStock);
        setOptionalParam(params, 'minPrice', nextFilters.minPrice);
        setOptionalParam(params, 'maxPrice', nextFilters.maxPrice);
        setOptionalParam(params, 'sortBy', nextFilters.sortBy);
        resetPageParam(params);
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    updateSearchParams(setSearchParams, (params) => {
      params.delete('category');
      params.delete('inStock');
      params.delete('minPrice');
      params.delete('maxPrice');
      params.delete('sortBy');
      resetPageParam(params);
    });
  }, [setSearchParams]);

  return {
    filters,
    apiFilters,
    hasActiveFilters: Object.values(filters).some(
      (value) => value !== undefined
    ),
    setFilters,
    clearFilters,
  };
}
