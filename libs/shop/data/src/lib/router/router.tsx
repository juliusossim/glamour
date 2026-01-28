/**
 * Router Configuration
 *
 * Creates the data router with all routes, loaders, and actions.
 * 
 * Note: This provides the route configuration factory. The actual route
 * components are provided by the consuming app to avoid circular dependencies.
 */

import { createBrowserRouter, redirect, type RouteObject } from 'react-router-dom';
import {
    addToCartAction,
    loginAction,
    logoutAction,
    registerAction,
} from './actions';
import {
    authGuardLoader,
    productDetailLoader,
    productsLoader,
} from './loaders';
import { ROUTE_PATHS } from './routes';

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

/**
 * Create the data router with provided components
 */
export function createRouter(components: RouterComponents) {
  const {
    RootLayout,
    ProductsPage,
    ProductDetailPage,
    ErrorBoundary,
    CartPage,
    CheckoutPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
  } = components;

  const routes: RouteObject[] = [
    {
      id: 'root',
      path: ROUTE_PATHS.HOME,
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          loader: () => redirect(ROUTE_PATHS.PRODUCTS),
        },
        {
          id: 'products',
          path: 'products',
          element: <ProductsPage />,
          loader: productsLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          id: 'product-detail',
          path: 'products/:id',
          element: <ProductDetailPage />,
          loader: productDetailLoader,
          action: addToCartAction,
          errorElement: <ErrorBoundary />,
        },
        ...(CartPage
          ? [
              {
                path: 'cart',
                element: <CartPage />,
              },
            ]
          : []),
        ...(CheckoutPage
          ? [
              {
                path: 'checkout',
                element: <CheckoutPage />,
                loader: authGuardLoader,
              },
            ]
          : []),
        ...(LoginPage
          ? [
              {
                path: 'login',
                element: <LoginPage />,
                action: loginAction,
              },
            ]
          : []),
        ...(RegisterPage
          ? [
              {
                path: 'register',
                element: <RegisterPage />,
                action: registerAction,
              },
            ]
          : []),
        ...(ProfilePage
          ? [
              {
                path: 'profile',
                element: <ProfilePage />,
                loader: authGuardLoader,
              },
            ]
          : []),
        {
          path: 'logout',
          action: logoutAction,
          loader: () => redirect(ROUTE_PATHS.LOGIN),
        },
        {
          path: '*',
          element: <ErrorBoundary />,
        },
      ],
    },
  ];

  return createBrowserRouter(routes);
}

// Export types for loaders
export type { ProductDetailLoaderData, ProductsLoaderData } from './loaders';

