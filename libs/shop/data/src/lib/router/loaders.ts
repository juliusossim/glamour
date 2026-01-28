/**
 * Route Loaders
 *
 * Data loaders for React Router data APIs.
 * These run before components render and provide type-safe data loading.
 */

import { ApiResponse, PaginatedResponse, Product, ProductFilter } from '@org/models';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { tokenStorage } from '../http/auth/token-storage';

const API_URL = 'http://localhost:3333/api';

// Loader response types
export interface ProductsLoaderData {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  filter: ProductFilter;
}

export interface ProductDetailLoaderData {
  product: Product;
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
}: LoaderFunctionArgs): Promise<ProductsLoaderData> {
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

  // Build query params
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (filter.category) params.append('category', filter.category);
  if (filter.minPrice !== undefined)
    params.append('minPrice', filter.minPrice.toString());
  if (filter.maxPrice !== undefined)
    params.append('maxPrice', filter.maxPrice.toString());
  if (filter.inStock !== undefined)
    params.append('inStock', filter.inStock.toString());
  if (filter.searchTerm) params.append('searchTerm', filter.searchTerm);

  const response = await fetch(`${API_URL}/products?${params}`, {
    signal: request.signal,
  });

  if (!response.ok) {
    throw new LoaderError(
      'Failed to load products',
      response.status,
      response.statusText
    );
  }

  const data = (await response.json()) as ApiResponse<PaginatedResponse<Product>>;

  if (!data.success) {
    throw new LoaderError(data.error || 'Failed to load products', 400);
  }

  return {
    products: data.data.items,
    totalProducts: data.data.total,
    totalPages: data.data.totalPages,
    currentPage: page,
    filter,
  };
}

/**
 * Product detail loader
 * Fetches a single product by ID from route params
 */
export async function productDetailLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<ProductDetailLoaderData> {
  const { id } = params;

  if (!id) {
    throw new LoaderError('Product ID is required', 400, 'Bad Request');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    signal: request.signal,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new LoaderError('Product not found', 404, 'Not Found');
    }
    throw new LoaderError(
      'Failed to load product',
      response.status,
      response.statusText
    );
  }

  const data = (await response.json()) as ApiResponse<Product>;

  if (!data.success) {
    throw new LoaderError(data.error || 'Failed to load product', 400);
  }

  return {
    product: data.data,
  };
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
