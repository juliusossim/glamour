// import { LoadingSpinner, ProductGrid } from '@org/shared-ui';
// import {
//   ProductsLoaderData,
//   useTypedNavigate,
//   useTypedSearchParams,
// } from '@org/shop-data';
// import { useLoaderData, useNavigation } from 'react-router-dom';

// import type { ProductFilterFormData } from '@org/shop-feature-products';

// /**
//  * Refactored Products Page using React Hook Form
//  *
//  * This version demonstrates:
//  * - Type-safe form handling with Zod validation
//  * - Cleaner separation of concerns
//  * - Reusable form component
//  * - Better maintainability
//  */
// export function ProductsPageRefactored() {
//   const loaderData = useLoaderData() as ProductsLoaderData;
//   const navigation = useNavigation();
//   const navigate = useTypedNavigate();
//   const [searchParams] = useTypedSearchParams('products');

//   // Extract current filters from URL
//   const currentFilters: Partial<ProductFilterFormData> = {
//     search: searchParams.search,
//     category: searchParams.category,
//     inStock: searchParams.inStock === 'true',
//   };

//   const handleProductSelect = (productId: string) => {
//     navigate('productDetail', { id: productId });
//   };

//   const handleFiltersChange = (filters: ProductFilterFormData) => {
//     console.log('Filters applied:', filters);
//     // Additional filter change handling if needed
//   };

//   const isLoading = navigation.state === 'loading';

//   return (
//     <div className="w-full">
//       <div className="mb-8">
//         <h1 className="mb-2 text-3xl font-bold text-foreground">
//           Discover Our Products
//         </h1>
//         <p className="text-muted-foreground">
//           Browse our curated collection of premium fashion items
//         </p>
//       </div>

//       {/* Filters Form - Now using React Hook Form */}
//       <ProductFiltersForm
//         initialValues={currentFilters}
//         categories={loaderData.categories || []}
//         onFiltersChange={handleFiltersChange}
//       />

//       {/* Results Info */}
//       <div className="mb-4 flex items-center justify-between">
//         <span className="text-sm text-muted-foreground">
//           {loaderData.totalProducts} products found
//           {loaderData.totalPages > 1 &&
//             ` • Page ${loaderData.currentPage} of ${loaderData.totalPages}`}
//         </span>

//         {isLoading && (
//           <span className="text-sm text-muted-foreground">
//             Loading...
//           </span>
//         )}
//       </div>

//       {/* Product Grid */}
//       {isLoading ? (
//         <div className="flex min-h-[400px] items-center justify-center">
//           <LoadingSpinner />
//         </div>
//       ) : loaderData.products.length === 0 ? (
//         <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8">
//           <p className="text-lg font-medium text-muted-foreground">
//             No products found
//           </p>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Try adjusting your filters or search terms
//           </p>
//         </div>
//       ) : (
//         <ProductGrid
//           products={loaderData.products}
//           onProductSelect={handleProductSelect}
//         />
//       )}

//       {/* Pagination - Could be extracted to a separate component */}
//       {loaderData.totalPages > 1 && !isLoading && (
//         <div className="mt-8 flex items-center justify-center gap-2">
//           <button
//             onClick={() => {
//               const newParams = new URLSearchParams(window.location.search);
//               newParams.set('page', String(loaderData.currentPage - 1));
//               navigate(`?${newParams.toString()}` as any, { replace: true });
//             }}
//             disabled={loaderData.currentPage === 1}
//             className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Previous
//           </button>

//           <span className="px-4 text-sm text-muted-foreground">
//             Page {loaderData.currentPage} of {loaderData.totalPages}
//           </span>

//           <button
//             onClick={() => {
//               const newParams = new URLSearchParams(window.location.search);
//               newParams.set('page', String(loaderData.currentPage + 1));
//               navigate(`?${newParams.toString()}` as any, { replace: true });
//             }}
//             disabled={loaderData.currentPage === loaderData.totalPages}
//             className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
