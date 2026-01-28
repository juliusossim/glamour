import { Product } from '@org/models';
import { ProductCard } from '../product-card/product-card';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 px-4 text-muted-foreground text-lg">
        <p>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductSelect}
        />
      ))}
    </div>
  );
}

export default ProductGrid;