/**
 * Type-safe Router Utilities
 *
 * Provides type-safe navigation, path generation, and param extraction.
 */

import { useCallback, useMemo } from 'react';
import {
    NavigateOptions,
    generatePath,
    useNavigate as useRRNavigate,
    useParams as useRRParams,
    useSearchParams as useRRSearchParams,
} from 'react-router-dom';
import {
    ParamsFor,
    ROUTE_PATHS,
    RoutePath,
    RouteSearchParams,
    SearchParamsFor,
} from './routes';

/**
 * Type-safe path builder with params substitution
 */
export function buildPath<T extends RoutePath>(
  path: T,
  params?: ParamsFor<T>
): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return generatePath(path, params as any);
}

/**
 * Build URL with search params
 */
export function buildUrl<T extends RoutePath>(
  path: T,
  params?: ParamsFor<T>,
  searchParams?: T extends keyof RouteSearchParams ? SearchParamsFor<T> : never
): string {
  const basePath = buildPath(path, params);

  if (!searchParams || Object.keys(searchParams).length === 0) {
    return basePath;
  }

  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      urlSearchParams.set(key, String(value));
    }
  });

  const queryString = urlSearchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Type-safe navigation hook
 */
export function useTypedNavigate() {
  const navigate = useRRNavigate();

  return useCallback(
    <T extends RoutePath>(
      path: T,
      options?: {
        params?: ParamsFor<T>;
        searchParams?: T extends keyof RouteSearchParams
          ? SearchParamsFor<T>
          : never;
        replace?: boolean;
        state?: unknown;
      }
    ) => {
      const url = buildUrl(
        path,
        options?.params,
        options?.searchParams as T extends keyof RouteSearchParams
          ? SearchParamsFor<T>
          : never
      );

      const navOptions: NavigateOptions = {
        replace: options?.replace,
        state: options?.state,
      };

      navigate(url, navOptions);
    },
    [navigate]
  );
}

/**
 * Type-safe params hook for a specific route
 */
export function useTypedParams<T extends RoutePath>(
  _path: T
): ParamsFor<T> {
  const params = useRRParams();
  return params as ParamsFor<T>;
}

/**
 * Type-safe search params hook with getters and setters
 */
export function useTypedSearchParams<T extends RoutePath>(
  _path: T
): T extends keyof RouteSearchParams
  ? {
      searchParams: SearchParamsFor<T>;
      setSearchParams: (
        params: Partial<SearchParamsFor<T>>,
        options?: { replace?: boolean }
      ) => void;
      getParam: <K extends keyof SearchParamsFor<T>>(
        key: K
      ) => SearchParamsFor<T>[K] | undefined;
    }
  : {
      searchParams: Record<string, never>;
      setSearchParams: () => void;
      getParam: () => undefined;
    } {
  const [urlSearchParams, setUrlSearchParams] = useRRSearchParams();

  const searchParams = useMemo(() => {
    const result: Record<string, string> = {};
    urlSearchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [urlSearchParams]);

  const setSearchParams = useCallback(
    (
      params: Partial<Record<string, string | undefined>>,
      options?: { replace?: boolean }
    ) => {
      setUrlSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        Object.entries(params).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            newParams.delete(key);
          } else {
            newParams.set(key, String(value));
          }
        });
        return newParams;
      }, options);
    },
    [setUrlSearchParams]
  );

  const getParam = useCallback(
    (key: string) => urlSearchParams.get(key) ?? undefined,
    [urlSearchParams]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { searchParams, setSearchParams, getParam } as any;
}

/**
 * Pre-built navigation helpers for common routes
 */
export function useRouteNavigation() {
  const navigate = useTypedNavigate();

  return useMemo(
    () => ({
      toHome: () => navigate(ROUTE_PATHS.HOME),
      toProducts: (searchParams?: SearchParamsFor<typeof ROUTE_PATHS.PRODUCTS>) =>
        navigate(ROUTE_PATHS.PRODUCTS, { searchParams }),
      toProductDetail: (id: string) =>
        navigate(ROUTE_PATHS.PRODUCT_DETAIL, { params: { id } }),
      toCart: () => navigate(ROUTE_PATHS.CART),
      toCheckout: () => navigate(ROUTE_PATHS.CHECKOUT),
      toLogin: (redirect?: string) =>
        navigate(ROUTE_PATHS.LOGIN, {
          searchParams: redirect ? { redirect } : undefined,
        }),
      toRegister: (redirect?: string) =>
        navigate(ROUTE_PATHS.REGISTER, {
          searchParams: redirect ? { redirect } : undefined,
        }),
      toProfile: () => navigate(ROUTE_PATHS.PROFILE),
      back: () => globalThis.history.back(),
    }),
    [navigate]
  );
}

// Re-export route paths for convenience
export { ROUTE_PATHS, type ParamsFor, type RoutePath, type SearchParamsFor } from './routes';

