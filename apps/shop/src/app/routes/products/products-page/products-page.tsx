import { Button, LoadingSpinner, ProductGrid } from '@org/shared-ui';
import {
  ProductsPageProvider,
  useProductsPageContext,
} from './products-page.context';

function ProductsPageContent() {
  const {
    clearAll,
    hasActiveQuery,
    isFetching,
    isLoading,
    pagination,
    products,
    total,
    totalPages,
  } = useProductsPageContext();

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Discover Products
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} products found
            {totalPages > 1
              ? ` • Page ${pagination.page} of ${totalPages}`
              : ''}
            {isFetching && !isLoading ? ' • Updating results...' : ''}
          </p>
        </div>

        {hasActiveQuery ? (
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear Search & Filters
          </Button>
        ) : null}
      </div>

      {isLoading ? (
        <div className="flex min-h-[320px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={pagination.goToPreviousPage}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={pagination.goToNextPage}
            disabled={pagination.page >= totalPages}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function ProductsPage() {
  return (
    <ProductsPageProvider>
      <ProductsPageContent />
    </ProductsPageProvider>
  );
}

export default ProductsPage;
