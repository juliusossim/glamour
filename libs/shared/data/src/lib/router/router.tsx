/**
 * Router Configuration
 *
 * Creates the data router with all routes, loaders, and actions.
 *
 * Note: This provides the route configuration factory. The actual route
 * components are provided by the consuming app to avoid circular dependencies.
 */

import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from 'react-router-dom';
import type { RouterComponents } from '.';
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

/**
 * Create the data router with provided components
 */
export function createRouter(
  components: RouterComponents
): ReturnType<typeof createBrowserRouter> {
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
          path: ROUTE_PATHS.PRODUCTS,
          element: <ProductsPage />,
          loader: productsLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          id: 'product-detail',
          path: `${ROUTE_PATHS.PRODUCTS}/:id`,
          element: <ProductDetailPage />,
          loader: productDetailLoader,
          action: addToCartAction,
          errorElement: <ErrorBoundary />,
        },
        ...(CartPage
          ? [
              {
                path: ROUTE_PATHS.CART,
                element: <CartPage />,
              },
            ]
          : []),
        ...(CheckoutPage
          ? [
              {
                path: ROUTE_PATHS.CHECKOUT,
                element: <CheckoutPage />,
                loader: authGuardLoader,
              },
            ]
          : []),
        ...(LoginPage
          ? [
              {
                path: ROUTE_PATHS.LOGIN,
                element: <LoginPage />,
                action: loginAction,
              },
            ]
          : []),
        ...(RegisterPage
          ? [
              {
                path: ROUTE_PATHS.REGISTER,
                element: <RegisterPage />,
                action: registerAction,
              },
            ]
          : []),
        ...(ProfilePage
          ? [
              {
                path: ROUTE_PATHS.PROFILE,
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
