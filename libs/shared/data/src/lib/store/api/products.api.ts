import type {
  ApiResponse,
  DisplayProduct,
  PaginatedResponse,
} from '@org/models';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { getRestApiUrl } from '../../config/runtime-config';
import { ProductsQueryArgs } from './types';

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({ baseUrl: getRestApiUrl() });
  return baseQuery(args, api, extraOptions);
};

export function buildProductsSearchParams({
  page = 1,
  pageSize = 10,
  filters = {},
}: ProductsQueryArgs): URLSearchParams {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('pageSize', String(pageSize));

  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice !== undefined)
    params.append('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.append('maxPrice', String(filters.maxPrice));
  if (filters.inStock !== undefined)
    params.append('inStock', String(filters.inStock));
  if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);

  return params;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Products', 'Product', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedResponse<DisplayProduct>,
      ProductsQueryArgs
    >({
      query: (args) =>
        `/products?${buildProductsSearchParams(args).toString()}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: builder.query<DisplayProduct, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: ApiResponse<DisplayProduct>) => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to load product');
        }

        return response.data;
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    getCategories: builder.query<string[], void>({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
} = productsApi;
