import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  resetPageParam,
  setOptionalParam,
  updateSearchParams,
} from './search-params';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search')?.trim() ?? '';

  const applySearch = useCallback(
    (value: string) => {
      updateSearchParams(setSearchParams, (params) => {
        setOptionalParam(params, 'search', value);
        resetPageParam(params);
      });
    },
    [setSearchParams]
  );

  const setSearch = useCallback(
    (value: string) => {
      applySearch(value.trim());
    },
    [applySearch]
  );

  const clearSearch = useCallback(() => {
    applySearch('');
  }, [applySearch]);

  return {
    searchTerm,
    setSearch,
    clearSearch,
  };
}
