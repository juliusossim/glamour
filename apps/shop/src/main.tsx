import { createConfig } from '@org/shared-config';
import {
  ApolloProviderWrapper,
  createRouter,
  QueryProvider,
  StoreProvider,
} from '@org/shop-data';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  ProductDetailPage,
  ProductsPage,
  RootLayout,
  RouteErrorBoundary,
} from './app/routes';
import './styles.css';

// Create the data router with type-safe routes
const router = createRouter({
  RootLayout,
  ProductsPage,
  ProductDetailPage,
  ErrorBoundary: RouteErrorBoundary,
});

// Initialize runtime config for the shop app (injected at bootstrap)
createConfig({
  apiBaseUrl: import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:3000',
  env: import.meta.env?.MODE ?? 'development',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryProvider>
      <ApolloProviderWrapper>
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </ApolloProviderWrapper>
    </QueryProvider>
  </StrictMode>
);
