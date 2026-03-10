/**
 * Route Loaders
 *
 * Data loaders for React Router data APIs.
 * These run before components render and provide type-safe data loading.
 */

import { ProductFilter } from '@org/models';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { tokenStorage } from '../http/auth/token-storage';
import { productsApi } from '../store/api/products.api';
import { store } from '../store/store';

function bindAbort(signal: AbortSignal, abort: () => void) {
  signal.addEventListener('abort', abort, { once: true });

  return () => signal.removeEventListener('abort', abort);
}

// Error types for loaders
export class LoaderError extends Error {
  constructor(
    message: string,
    public status = 500,
    public statusText = 'Internal Server Error'
  ) {
    super(message);
    this.name = 'LoaderError';
  }
}

/**
 * Products list loader
 * Extracts search params and fetches paginated products
 */
export async function productsLoader({
  request,
}: LoaderFunctionArgs): Promise<null> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // Extract filter params from URL
  const filter: ProductFilter = {};
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const inStock = searchParams.get('inStock');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  if (search) filter.searchTerm = search;
  if (category) filter.category = category;
  if (inStock === 'true') filter.inStock = true;
  if (minPrice) filter.minPrice = Number.parseFloat(minPrice);
  if (maxPrice) filter.maxPrice = Number.parseFloat(maxPrice);

  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const pageSize = Number.parseInt(searchParams.get('pageSize') || '12', 10);

  const productsQuery = store.dispatch(
    productsApi.endpoints.getProducts.initiate(
      {
        page,
        pageSize,
        filters: filter,
      },
      {
        subscribe: false,
        forceRefetch: true,
      }
    )
  );
  const releaseAbort = bindAbort(request.signal, () => productsQuery.abort());

  try {
    await productsQuery.unwrap();
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'error' in error
    ) {
      throw new LoaderError('Failed to load products');
    }

    throw error;
  } finally {
    releaseAbort();
  }

  return null;
}

/**
 * Product detail loader
 * Fetches a single product by ID from route params
 */
export async function productDetailLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<null> {
  const { id } = params;

  if (!id) {
    throw new LoaderError('Product ID is required', 400, 'Bad Request');
  }

  const productQuery = store.dispatch(
    productsApi.endpoints.getProduct.initiate(id, {
      subscribe: false,
      forceRefetch: true,
    })
  );
  const releaseAbort = bindAbort(request.signal, () => productQuery.abort());

  try {
    await productQuery.unwrap();
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      (error.status === 404 || error.status === '404')
    ) {
      throw new LoaderError('Product not found', 404, 'Not Found');
    }

    throw new LoaderError('Failed to load product');
  } finally {
    releaseAbort();
  }

  return null;
}

/**
 * Auth guard loader
 * Use this to protect routes that require authentication
 */
export async function authGuardLoader({
  request,
}: LoaderFunctionArgs): Promise<null> {
  const isAuthenticated = tokenStorage.isAuthenticated();

  if (!isAuthenticated) {
    const url = new URL(request.url);
    const redirectUrl = `/login?redirect=${encodeURIComponent(url.pathname)}`;
    throw new Response('Unauthorized', {
      status: 302,
      headers: { Location: redirectUrl },
    });
  }

  return null;
}

/**
 * Compose multiple loaders
 * Useful for combining auth guard with data loader
 */
export function composeLoaders(
  ...loaders: Array<(args: LoaderFunctionArgs) => Promise<unknown>>
) {
  return async (args: LoaderFunctionArgs) => {
    const results: Record<string, unknown> = {};
    for (const loader of loaders) {
      const result = await loader(args);
      if (result !== null && typeof result === 'object') {
        Object.assign(results, result);
      }
    }
    return results;
  };
}
