import { createRouter } from '@org/shared-data';
import { lazy } from 'react';

const RootLayout = lazy(() => import('./RootLayout'));

const ProductsPage = lazy(
  () => import('./products/products-page/ProductsPage')
);
const ProductDetailsPage = lazy(
  () => import('./products/product-detail/ProductDetailsPage')
);
const ErrorBoundary = lazy(() => import('./ErrorBoundary'));

const router: ReturnType<typeof createRouter> = createRouter({
  RootLayout,
  ProductsPage,
  ProductDetailsPage,
  ErrorBoundary,
});

export default router;
