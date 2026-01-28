import { Product, ProductFilter } from '@org/models';
import { useCategories, useProducts } from '@org/shop-data';
import {
    Button,
    ErrorMessage,
    Input,
    LoadingSpinner,
    ProductGrid,
} from '@org/shop-shared-ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProductList() {
  const navigate = useNavigate();

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<ProductFilter>({});

  // Fetch data
  const { products, totalProducts, totalPages, loading, error } = useProducts(
    filter,
    currentPage,
    12
  );
  const { categories } = useCategories();

  // Update filter when filter inputs change
  useEffect(() => {
    const newFilter: ProductFilter = {};

    if (searchTerm) {
      newFilter.searchTerm = searchTerm;
    }
    if (selectedCategory) {
      newFilter.category = selectedCategory;
    }
    if (inStockOnly) {
      newFilter.inStock = true;
    }

    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, selectedCategory, inStockOnly]);

  const handleProductSelect = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInStockOnly(e.target.checked);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRetry = () => {
    // Force re-fetch by updating a dummy state
    setFilter({ ...filter });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Explore our wide selection of high-quality products
        </p>
      </header>

      <div className="bg-muted/50 p-6 rounded-lg mb-8">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 text-base border border-input rounded-md bg-background cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer text-base">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleInStockChange}
              className="w-4 h-4 cursor-pointer accent-primary"
            />
            In Stock Only
          </label>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : (
        <>
          <div className="text-muted-foreground mb-4 text-sm">
            Showing {products.length} of {totalProducts} products
          </div>

          <ProductGrid products={products} onProductSelect={handleProductSelect} />

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-border">
              <Button
                variant="secondary"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>
              <span className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
