/**
 * Products Page Component
 *
 * Uses data router loader data instead of client-side fetching.
 * Uses Tailwind CSS for styling.
 */

import type { Product, ProductFilter } from '@org/models';
import {
    useCategories,
    useRouteNavigation,
    type ProductsLoaderData,
} from '@org/shop-data';
import { LoadingSpinner, ProductGrid } from '@org/shop-shared-ui';
import { useEffect, useState } from 'react';
import {
    useLoaderData,
    useNavigation,
    useSearchParams,
} from 'react-router-dom';

export function ProductsPage() {
  const loaderData = useLoaderData() as ProductsLoaderData;
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toProductDetail } = useRouteNavigation();
  const { categories } = useCategories();

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

  // Sync URL params with local state on navigation
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setInStockOnly(searchParams.get('inStock') === 'true');
  }, [searchParams]);

  const handleProductSelect = (product: Product) => {
    toProductDetail(product.id);
  };

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
    if (loaderData.currentPage < loaderData.totalPages) {
      updateFilters({ page: String(loaderData.currentPage + 1) });
    }
  };

  const handlePreviousPage = () => {
    if (loaderData.currentPage > 1) {
      updateFilters({ page: String(loaderData.currentPage - 1) });
    }
  };

  const isLoading = navigation.state === 'loading';

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
            className="w-full rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
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
            In Stock Only
          </label>
        </div>
      </form>

      {/* Results Info */}
      <div className="mb-4 text-sm text-slate-500">
        <span>
          {loaderData.totalProducts} products found
          {loaderData.totalPages > 1 &&
            ` • Page ${loaderData.currentPage} of ${loaderData.totalPages}`}
        </span>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductGrid
          products={loaderData.products}
          onProductSelect={handleProductSelect}
        />
      )}

      {/* Pagination */}
      {loaderData.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 border-t border-slate-200 pt-4">
          <button
            onClick={handlePreviousPage}
            disabled={loaderData.currentPage <= 1 || isLoading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-colors hover:border-indigo-500 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Previous
          </button>
          <span className="text-sm text-slate-600">
            Page {loaderData.currentPage} of {loaderData.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={
              loaderData.currentPage >= loaderData.totalPages || isLoading
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
