# Type-Safe React Router Implementation

This document describes the type-safe routing system implemented using React Router v6's Data Router APIs.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Route Definitions](#route-definitions)
- [Router Utilities](#router-utilities)
- [Data Loaders](#data-loaders)
- [Form Actions](#form-actions)
- [Route Components](#route-components)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

---

## Overview

The type-safe router provides:

- **Compile-time route safety**: Catch invalid routes and params at build time
- **Data Router APIs**: Loaders fetch data before render, actions handle mutations
- **Type-safe navigation**: Full TypeScript support for paths, params, and search params
- **Centralized route config**: Single source of truth for all routes
- **Code splitting**: Lazy-loaded route components

## Architecture

```
libs/shop/data/src/lib/router/
├── routes.ts          # Route path constants and type definitions
├── router-utils.ts    # Navigation hooks and path utilities
├── loaders.ts         # Data loader functions
├── actions.ts         # Form action handlers
├── router.tsx         # Router factory function
└── index.ts           # Public exports

apps/shop/src/app/routes/
├── root-layout.tsx           # Main app layout
├── products-page.tsx         # Products listing page
├── product-detail-page.tsx   # Product detail page
├── error-boundary.tsx        # Route error handler
└── index.ts                  # Component exports
```

---

## Route Definitions

### Path Constants

All routes are defined as constants in `routes.ts`:

```typescript
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
```

### Route Param Types

Each route has associated param types:

```typescript
export interface RouteParams {
  [ROUTE_PATHS.HOME]: Record<string, never>;
  [ROUTE_PATHS.PRODUCTS]: Record<string, never>;
  [ROUTE_PATHS.PRODUCT_DETAIL]: { id: string };
  [ROUTE_PATHS.CART]: Record<string, never>;
  // ...
}
```

### Search Param Types

Routes that accept search params have typed definitions:

```typescript
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
}
```

### Type Helpers

```typescript
// Get params for a specific route
type ProductDetailParams = ParamsFor<typeof ROUTE_PATHS.PRODUCT_DETAIL>;
// Result: { id: string }

// Get search params for a specific route
type ProductsSearchParams = SearchParamsFor<typeof ROUTE_PATHS.PRODUCTS>;
// Result: { search?: string; category?: string; ... }
```

---

## Router Utilities

### `buildPath<T>(path, params)`

Build a URL path with type-safe param substitution:

```typescript
import { buildPath, ROUTE_PATHS } from '@org/shop-data';

// Simple path
buildPath(ROUTE_PATHS.PRODUCTS);
// Result: '/products'

// Path with params
buildPath(ROUTE_PATHS.PRODUCT_DETAIL, { id: 'abc-123' });
// Result: '/products/abc-123'
```

### `buildUrl<T>(path, params, searchParams)`

Build a complete URL with search params:

```typescript
import { buildUrl, ROUTE_PATHS } from '@org/shop-data';

buildUrl(ROUTE_PATHS.PRODUCTS, undefined, {
  category: 'shoes',
  page: '2',
  inStock: 'true',
});
// Result: '/products?category=shoes&page=2&inStock=true'
```

### `useTypedNavigate()`

Type-safe navigation hook:

```typescript
import { useTypedNavigate, ROUTE_PATHS } from '@org/shop-data';

function MyComponent() {
  const navigate = useTypedNavigate();

  // Navigate to products with search params
  navigate(ROUTE_PATHS.PRODUCTS, {
    searchParams: { category: 'shirts', page: '1' },
  });

  // Navigate to product detail with params
  navigate(ROUTE_PATHS.PRODUCT_DETAIL, {
    params: { id: 'product-123' },
  });

  // Navigate with replace (no history entry)
  navigate(ROUTE_PATHS.HOME, { replace: true });
}
```

### `useTypedParams<T>(path)`

Type-safe route params extraction:

```typescript
import { useTypedParams, ROUTE_PATHS } from '@org/shop-data';

function ProductDetail() {
  const { id } = useTypedParams(ROUTE_PATHS.PRODUCT_DETAIL);
  // TypeScript knows `id` is string
}
```

### `useTypedSearchParams<T>(path)`

Type-safe search params with getters and setters:

```typescript
import { useTypedSearchParams, ROUTE_PATHS } from '@org/shop-data';

function ProductList() {
  const { searchParams, setSearchParams, getParam } = useTypedSearchParams(
    ROUTE_PATHS.PRODUCTS
  );

  // Read current category
  const category = getParam('category');

  // Update search params (merges with existing)
  setSearchParams({ page: '2' });

  // Clear a param
  setSearchParams({ category: undefined });
}
```

### `useRouteNavigation()`

Pre-built navigation helpers for common routes:

```typescript
import { useRouteNavigation } from '@org/shop-data';

function Header() {
  const {
    toHome,
    toProducts,
    toProductDetail,
    toCart,
    toCheckout,
    toLogin,
    toRegister,
    toProfile,
    back,
  } = useRouteNavigation();

  return (
    <nav>
      <button onClick={toHome}>Home</button>
      <button onClick={() => toProducts({ category: 'new' })}>New Arrivals</button>
      <button onClick={() => toProductDetail('abc-123')}>View Product</button>
      <button onClick={() => toLogin('/checkout')}>Login</button>
      <button onClick={back}>Go Back</button>
    </nav>
  );
}
```

---

## Data Loaders

Loaders fetch data before the route renders, enabling:
- Parallel data fetching
- Loading states via `useNavigation()`
- Automatic error handling
- Request cancellation via AbortSignal

### `productsLoader`

Fetches paginated product list with filters:

```typescript
// libs/shop/data/src/lib/router/loaders.ts

export interface ProductsLoaderData {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  filter: ProductFilter;
}

export async function productsLoader({
  request,
}: LoaderFunctionArgs): Promise<ProductsLoaderData> {
  const url = new URL(request.url);
  // Extract filters from URL search params
  const search = url.searchParams.get('search');
  const category = url.searchParams.get('category');
  // ... fetch and return data
}
```

### `productDetailLoader`

Fetches a single product by ID:

```typescript
export interface ProductDetailLoaderData {
  product: Product;
}

export async function productDetailLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<ProductDetailLoaderData> {
  const { id } = params;
  // Fetch product by ID
}
```

### `authGuardLoader`

Protects routes that require authentication:

```typescript
export async function authGuardLoader({
  request,
}: LoaderFunctionArgs): Promise<null> {
  if (!tokenStorage.isAuthenticated()) {
    const url = new URL(request.url);
    throw redirect(`/login?redirect=${encodeURIComponent(url.pathname)}`);
  }
  return null;
}
```

### `composeLoaders`

Combine multiple loaders:

```typescript
import { composeLoaders, authGuardLoader, profileLoader } from '@org/shop-data';

// In route config:
{
  path: 'profile',
  loader: composeLoaders(authGuardLoader, profileLoader),
}
```

### Using Loader Data in Components

```typescript
import { useLoaderData, useNavigation } from 'react-router-dom';
import type { ProductsLoaderData } from '@org/shop-data';

function ProductsPage() {
  const data = useLoaderData() as ProductsLoaderData;
  const navigation = useNavigation();
  
  const isLoading = navigation.state === 'loading';

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <ProductGrid products={data.products} />
      <Pagination 
        current={data.currentPage} 
        total={data.totalPages} 
      />
    </div>
  );
}
```

---

## Form Actions

Actions handle form submissions and mutations using React Router's `useFetcher` or native `<Form>`.

### `loginAction`

Handles user login:

```typescript
export async function loginAction({
  request,
}: ActionFunctionArgs): Promise<ActionResponse | Response> {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') === 'true';

  // Validate, authenticate, store tokens
  // Return redirect on success or error response
}
```

### `addToCartAction`

Handles adding items to cart:

```typescript
export async function addToCartAction({
  request,
}: ActionFunctionArgs): Promise<ActionResponse> {
  const formData = await request.formData();
  const productId = formData.get('productId') as string;
  const quantity = Number.parseInt(formData.get('quantity') as string, 10);

  return { success: true, data: { productId, quantity } };
}
```

### Using Actions in Components

**With `useFetcher` (non-navigating):**

```typescript
import { useFetcher } from 'react-router-dom';

function AddToCartButton({ productId }: { productId: string }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <button
      onClick={() => {
        fetcher.submit(
          { productId, quantity: '1' },
          { method: 'post' }
        );
      }}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

**With `<Form>` (navigating):**

```typescript
import { Form, useActionData, useNavigation } from 'react-router-dom';
import type { ActionResponse } from '@org/shop-data';

function LoginPage() {
  const actionData = useActionData() as ActionResponse | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post">
      {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}
      
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <label>
        <input name="rememberMe" type="checkbox" value="true" />
        Remember me
      </label>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </Form>
  );
}
```

---

## Route Components

### Router Setup

The router is created using the `createRouter` factory:

```typescript
// apps/shop/src/main.tsx
import { createRouter } from '@org/shop-data';
import { RouterProvider } from 'react-router-dom';
import {
  RootLayout,
  ProductsPage,
  ProductDetailPage,
  RouteErrorBoundary,
} from './app/routes';

const router = createRouter({
  RootLayout,
  ProductsPage,
  ProductDetailPage,
  ErrorBoundary: RouteErrorBoundary,
  // Optional: CartPage, LoginPage, etc.
});

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
```

### RootLayout

The root layout provides the app shell:

```typescript
import { Outlet, useNavigation, ScrollRestoration } from 'react-router-dom';

export function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <div className="app">
      <Header />
      <main>
        {isNavigating && <NavigationProgress />}
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  );
}
```

### Error Boundary

Handles route errors gracefully:

```typescript
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Handle HTTP errors (404, 401, 500, etc.)
    return <HttpErrorPage status={error.status} />;
  }

  // Handle JavaScript errors
  return <GenericErrorPage error={error} />;
}
```

---

## Usage Examples

### Navigate to Product Detail

```typescript
const { toProductDetail } = useRouteNavigation();

function handleProductClick(product: Product) {
  toProductDetail(product.id);
}
```

### Filter Products via URL

```typescript
const { setSearchParams } = useTypedSearchParams(ROUTE_PATHS.PRODUCTS);

function handleFilterChange(category: string) {
  setSearchParams({ category, page: '1' }); // Reset to page 1
}
```

### Protected Route with Redirect

```typescript
const { toLogin } = useRouteNavigation();

function handleCheckout() {
  if (!isAuthenticated) {
    toLogin('/checkout'); // Redirect back after login
    return;
  }
  // Proceed to checkout
}
```

### Optimistic UI with Actions

```typescript
function CartItem({ item }: { item: CartItem }) {
  const fetcher = useFetcher();
  
  // Optimistic update
  const quantity = fetcher.formData
    ? Number(fetcher.formData.get('quantity'))
    : item.quantity;

  return (
    <div>
      <span>{item.name}</span>
      <span>Qty: {quantity}</span>
      <button
        onClick={() => {
          fetcher.submit(
            { itemId: item.id, quantity: String(quantity + 1) },
            { method: 'post', action: '/cart/update' }
          );
        }}
      >
        +
      </button>
    </div>
  );
}
```

---

## Best Practices

### 1. Always Use Route Constants

```typescript
// ✅ Good
navigate(ROUTE_PATHS.PRODUCTS);

// ❌ Bad - magic strings
navigate('/products');
```

### 2. Type Your Loader Data

```typescript
// ✅ Good
const data = useLoaderData() as ProductsLoaderData;

// ❌ Bad - untyped
const data = useLoaderData();
```

### 3. Handle Loading States

```typescript
const navigation = useNavigation();

if (navigation.state === 'loading') {
  return <LoadingIndicator />;
}
```

### 4. Use `useFetcher` for Non-Navigation Mutations

```typescript
// ✅ Good - doesn't cause navigation
const fetcher = useFetcher();
fetcher.submit(data, { method: 'post' });

// ⚠️ Consider carefully - causes navigation
<Form method="post">
```

### 5. Validate in Loaders/Actions

```typescript
export async function productDetailLoader({ params }) {
  if (!params.id) {
    throw new LoaderError('Product ID required', 400);
  }
  // ...
}
```

### 6. Use Error Boundaries

Always provide error boundaries to handle failed loaders/actions gracefully.

---

## API Reference

### Exports from `@org/shop-data`

```typescript
// Route paths and types
ROUTE_PATHS
ROUTE_META
type RoutePath
type ParamsFor<T>
type SearchParamsFor<T>
type RouteParams
type RouteSearchParams
type RouteMeta

// Router utilities
buildPath()
buildUrl()
useTypedNavigate()
useTypedParams()
useTypedSearchParams()
useRouteNavigation()

// Router factory
createRouter()
type RouterComponents

// Loaders
productsLoader
productDetailLoader
authGuardLoader
composeLoaders
LoaderError
type ProductsLoaderData
type ProductDetailLoaderData

// Actions
loginAction
logoutAction
registerAction
addToCartAction
ActionError
type ActionResponse
```

---

## Migration Guide

### From `BrowserRouter` to Data Router

**Before:**

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="products" element={<Products />} />
    </Route>
  </Routes>
</BrowserRouter>
```

**After:**

```typescript
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@org/shop-data';

const router = createRouter({
  RootLayout: App,
  ProductsPage: Products,
  // ...
});

<RouterProvider router={router} />
```

### From `useNavigate` to `useTypedNavigate`

**Before:**

```typescript
const navigate = useNavigate();
navigate(`/products/${id}`);
```

**After:**

```typescript
const navigate = useTypedNavigate();
navigate(ROUTE_PATHS.PRODUCT_DETAIL, { params: { id } });
```

---

## Troubleshooting

### Loader Not Running

Ensure the route has a `loader` property in the route config and that you're using `<RouterProvider>` instead of `<BrowserRouter>`.

### Type Errors with Params

Make sure you're using the correct route path constant:

```typescript
// This won't work - wrong route
useTypedParams(ROUTE_PATHS.PRODUCTS); // No params on this route

// Correct
useTypedParams(ROUTE_PATHS.PRODUCT_DETAIL); // Has { id: string }
```

### Action Not Receiving Form Data

Ensure your form uses `method="post"` and field `name` attributes:

```tsx
<Form method="post">
  <input name="email" /> {/* name is required */}
</Form>
```
