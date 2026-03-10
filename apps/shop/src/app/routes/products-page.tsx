/**
 * Products Page Component
 *
 * Uses RTK Query data, with the route loader priming the cache before render.
 * Uses Tailwind CSS for styling.
 */

import type { ProductFilter } from '@org/models';
import { useGetCategoriesQuery, useGetProductsQuery } from '@org/shared-data';
import { LoadingSpinner, ProductGrid } from '@org/shared-ui';
import { useEffect, useState } from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';

export function ProductsPage() {
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData ?? [];

  // Local state for controlled inputs
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get('inStock') === 'true'
  );

  const filters: ProductFilter = {};
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const inStock = searchParams.get('inStock');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  if (search) filters.searchTerm = search;
  if (category) filters.category = category;
  if (inStock === 'true') filters.inStock = true;
  if (minPrice) filters.minPrice = Number.parseFloat(minPrice);
  if (maxPrice) filters.maxPrice = Number.parseFloat(maxPrice);

  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const pageSize = Number.parseInt(searchParams.get('pageSize') || '12', 10);
  const { data: productsData } = useGetProductsQuery({
    page,
    pageSize,
    filters,
  });

  // Sync URL params with local state on navigation
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setInStockOnly(searchParams.get('inStock') === 'true');
  }, [searchParams]);

  const updateFilters = (
    updates: Partial<ProductFilter & { page?: string; search?: string }>
  ) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      // Reset to page 1 when filters change (unless page is explicitly set)
      if (!('page' in updates)) {
        newParams.delete('page');
      }

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          value === '' ||
          value === false
        ) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      return newParams;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm || undefined });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    updateFilters({ category: value || undefined });
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setInStockOnly(checked);
    updateFilters({ inStock: checked ? 'true' : undefined } as never);
  };

  const handleNextPage = () => {
    if (productsData && productsData.page < productsData.totalPages) {
      updateFilters({ page: String(productsData.page + 1) });
    }
  };

  const handlePreviousPage = () => {
    if (productsData && productsData.page > 1) {
      updateFilters({ page: String(productsData.page - 1) });
    }
  };

  const isLoading = navigation.state === 'loading' || !productsData;

  return (
    <div className="w-full">
      {/* Filters Form */}
      <form onSubmit={handleSearchSubmit} className="mb-6 flex flex-col gap-4">
        {/* Search Box */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm sm:w-auto"
          >
            <option value="">All Categories</option>
            {categories.map((category: string) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleInStockChange}
              className="size-4 cursor-pointer rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </form>

      {/* Results Info */}
      <div className="mb-4 text-sm text-slate-500">
        <span>
          {productsData?.total ?? 0} products found
          {(productsData?.totalPages ?? 0) > 1 &&
            ` • Page ${productsData?.page} of ${productsData?.totalPages}`}
        </span>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductGrid products={productsData.data} />
      )}

      {/* Pagination */}
      {(productsData?.totalPages ?? 0) > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 border-t border-slate-200 pt-4">
          <button
            onClick={handlePreviousPage}
            disabled={(productsData?.page ?? 1) <= 1 || isLoading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-colors hover:border-indigo-500 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Previous
          </button>
          <span className="text-sm text-slate-600">
            Page {productsData?.page} of {productsData?.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={
              (productsData?.page ?? 1) >= (productsData?.totalPages ?? 1) ||
              isLoading
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-colors hover:border-indigo-500 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
