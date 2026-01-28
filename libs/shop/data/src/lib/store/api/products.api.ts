import type { PaginatedResponse, Product, ProductFilter } from '@org/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://localhost:3000/api';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Products', 'Product', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedResponse<Product>,
      { page?: number; pageSize?: number; filters?: ProductFilter }
    >({
      query: ({ page = 1, pageSize = 10, filters = {} }) => {
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
        if (filters.searchTerm) params.append('search', filters.searchTerm);

        return `/products?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
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
