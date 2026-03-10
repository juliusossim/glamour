import type { ProductFilter } from '@org/models';
import { useGetCategoriesQuery, useGetProductsQuery } from '@org/shared-data';
import { useFiltering, usePagination, useSearch } from '@org/shared-hooks';
import { useCallback } from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';

export const useProductsPage = () => {
  const navigation = useNavigation();
  const [, setSearchParams] = useSearchParams();
  const search = useSearch();
  const filtering = useFiltering();
  const pagination = usePagination();

  const filters: ProductFilter = {
    ...filtering.apiFilters,
    ...(search.searchTerm ? { searchTerm: search.searchTerm } : {}),
  };

  const productsQuery = useGetProductsQuery({
    page: pagination.page,
    pageSize: pagination.pageSize,
    filters,
  });
  const categoriesQuery = useGetCategoriesQuery();

  const productsData = productsQuery.data;
  const products = productsData?.data ?? [];

  const clearAll = useCallback(() => {
    setSearchParams(
      (currentParams) => {
        const params = new URLSearchParams(currentParams);
        params.delete('search');
        params.delete('category');
        params.delete('inStock');
        params.delete('minPrice');
        params.delete('maxPrice');
        params.delete('sortBy');
        params.delete('page');
        return params;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const isLoading =
    navigation.state === 'loading' ||
    (productsQuery.isLoading && productsData === undefined);

  return {
    categories: categoriesQuery.data ?? [],
    clearAll,
    filters,
    filtering,
    hasActiveQuery: Boolean(search.searchTerm) || filtering.hasActiveFilters,
    isEmpty: !isLoading && products.length === 0,
    isFetching: navigation.state === 'loading' || productsQuery.isFetching,
    isLoading,
    pagination,
    products,
    productsData,
    productsQuery,
    search,
    total: productsData?.total ?? 0,
    totalPages: productsData?.totalPages ?? 0,
  };
};

export default useProductsPage;
