import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  parsePositiveInt,
  updateSearchParams,
} from './search-params';

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
  const pageSize = parsePositiveInt(
    searchParams.get('pageSize'),
    DEFAULT_PAGE_SIZE
  );

  const setPage = useCallback(
    (nextPage: number) => {
      updateSearchParams(setSearchParams, (params) => {
        const safePage = Math.max(DEFAULT_PAGE, nextPage);

        if (safePage === DEFAULT_PAGE) {
          params.delete('page');
          return;
        }

        params.set('page', String(safePage));
      });
    },
    [setSearchParams]
  );

  const setPageSize = useCallback(
    (nextPageSize: number) => {
      updateSearchParams(setSearchParams, (params) => {
        const safePageSize = Math.max(DEFAULT_PAGE, nextPageSize);

        params.delete('page');

        if (safePageSize === DEFAULT_PAGE_SIZE) {
          params.delete('pageSize');
          return;
        }

        params.set('pageSize', String(safePageSize));
      });
    },
    [setSearchParams]
  );

  const goToNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const goToPreviousPage = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    goToNextPage,
    goToPreviousPage,
  };
}
