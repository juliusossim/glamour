import { createConfig } from '@org/shared-config';
import {
  ApolloProviderWrapper,
  createRouter,
  QueryProvider,
  StoreProvider,
} from '@org/shared-data';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  ProductDetailPage,
  ProductsPage,
  RootLayout,
  RouteErrorBoundary,
} from './app/routes';
import { shopEnv } from './env';
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
  apiBaseUrl: shopEnv.apiBaseUrl,
  mode: shopEnv.mode,
  buildNumber: shopEnv.buildNumber,
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
