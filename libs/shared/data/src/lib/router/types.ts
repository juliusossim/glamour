import { ROUTE_PATHS } from './routes';

// Param types for each route
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
// Extract path types
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
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
export type SearchParamsFor<T extends RoutePath> =
  T extends keyof RouteSearchParams
    ? RouteSearchParams[T]
    : Record<string, never>;

// Route meta information
export interface RouteMeta {
  title: string;
  requiresAuth?: boolean;
  roles?: string[];
}

export interface RouterComponents {
  RootLayout: React.ComponentType;
  ProductsPage: React.ComponentType;
  ProductDetailPage: React.ComponentType;
  ErrorBoundary: React.ComponentType;
  CartPage?: React.ComponentType;
  CheckoutPage?: React.ComponentType;
  LoginPage?: React.ComponentType;
  RegisterPage?: React.ComponentType;
  ProfilePage?: React.ComponentType;
}
