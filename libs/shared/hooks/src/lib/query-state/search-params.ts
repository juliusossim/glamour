import { type SetURLSearchParams } from 'react-router-dom';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 12;

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export function parsePositiveInt(value: string | null, fallback: number) {
  const parsedValue = Number.parseInt(value ?? '', 10);

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

export function parseOptionalNumber(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsedValue = Number.parseFloat(value);

  if (Number.isNaN(parsedValue)) {
    return undefined;
  }

  return parsedValue;
}

export function updateSearchParams(
  setSearchParams: SetURLSearchParams,
  update: (params: URLSearchParams) => void
) {
  setSearchParams(
    (currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      update(nextParams);
      return nextParams;
    },
    { replace: true }
  );
}

export function setOptionalParam(
  params: URLSearchParams,
  key: string,
  value: boolean | number | string | undefined
) {
  if (
    value === undefined ||
    value === '' ||
    value === false ||
    value === null
  ) {
    params.delete(key);
    return;
  }

  params.set(key, String(value));
}

export function resetPageParam(params: URLSearchParams) {
  params.delete('page');
}
