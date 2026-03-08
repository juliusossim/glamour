import { ProductGrid } from '@org/shared-ui';
import { useProducts } from '@org/shop-data';

export function ProductList() {
  const { products } = useProducts();

  return (
    <section className="p-4">
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductList;
