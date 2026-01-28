/**
 * Type-safe Route Definitions
 *
 * Centralized route configuration with full TypeScript support
 * for paths, params, search params, and loaders.
 */

// Route path constants
export const ROUTE_PATHS = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  NOT_FOUND: '*',
} as const;

// Extract path types
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

// Route param types for each route
export interface RouteParams {
  [ROUTE_PATHS.HOME]: Record<string, never>;
  [ROUTE_PATHS.PRODUCTS]: Record<string, never>;
  [ROUTE_PATHS.PRODUCT_DETAIL]: { id: string };
  [ROUTE_PATHS.CART]: Record<string, never>;
  [ROUTE_PATHS.CHECKOUT]: Record<string, never>;
  [ROUTE_PATHS.LOGIN]: Record<string, never>;
  [ROUTE_PATHS.REGISTER]: Record<string, never>;
  [ROUTE_PATHS.PROFILE]: Record<string, never>;
  [ROUTE_PATHS.NOT_FOUND]: Record<string, never>;
}

// Search param types for routes that accept them
export interface RouteSearchParams {
  [ROUTE_PATHS.PRODUCTS]: {
    search?: string;
    category?: string;
    inStock?: 'true' | 'false';
    page?: string;
    sort?: 'price-asc' | 'price-desc' | 'name' | 'rating';
  };
  [ROUTE_PATHS.LOGIN]: {
    redirect?: string;
  };
  [ROUTE_PATHS.REGISTER]: {
    redirect?: string;
  };
}

// Type helper to get params for a specific route
export type ParamsFor<T extends RoutePath> = T extends keyof RouteParams
  ? RouteParams[T]
  : Record<string, never>;

// Type helper to get search params for a specific route
export type SearchParamsFor<T extends RoutePath> = T extends keyof RouteSearchParams
  ? RouteSearchParams[T]
  : Record<string, never>;

// Route meta information
export interface RouteMeta {
  title: string;
  requiresAuth?: boolean;
  roles?: string[];
}

export const ROUTE_META: Partial<Record<RoutePath, RouteMeta>> = {
  [ROUTE_PATHS.HOME]: { title: 'Home' },
  [ROUTE_PATHS.PRODUCTS]: { title: 'Products' },
  [ROUTE_PATHS.PRODUCT_DETAIL]: { title: 'Product Details' },
  [ROUTE_PATHS.CART]: { title: 'Shopping Cart' },
  [ROUTE_PATHS.CHECKOUT]: { title: 'Checkout', requiresAuth: true },
  [ROUTE_PATHS.LOGIN]: { title: 'Login' },
  [ROUTE_PATHS.REGISTER]: { title: 'Register' },
  [ROUTE_PATHS.PROFILE]: { title: 'Profile', requiresAuth: true },
};
