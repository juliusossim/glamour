/**
 * Type-safe Route Definitions
 * for paths, params, search params, and loaders.
 */

import { RouteMeta, RoutePath } from './types';

// Route path constants
export const ROUTE_PATHS = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  NOT_FOUND: '*',
} as const;

// Route meta information
export const ROUTE_META: Partial<Record<RoutePath, RouteMeta>> = {
  [ROUTE_PATHS.HOME]: { title: 'Home' },
  [ROUTE_PATHS.PRODUCTS]: { title: 'Products' },
  [ROUTE_PATHS.PRODUCT_DETAILS]: { title: 'Product Details' },
  [ROUTE_PATHS.CART]: { title: 'Shopping Cart' },
  [ROUTE_PATHS.CHECKOUT]: { title: 'Checkout', requiresAuth: true },
  [ROUTE_PATHS.LOGIN]: { title: 'Login' },
  [ROUTE_PATHS.REGISTER]: { title: 'Register' },
  [ROUTE_PATHS.PROFILE]: { title: 'Profile', requiresAuth: true },
};
