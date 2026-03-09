import { useGetProductsQuery } from '@org/shared-data';
import { ProductGrid } from '@org/shared-ui';

export function ProductList() {
  const { data } = useGetProductsQuery({ page: 1, pageSize: 12, filters: {} });
  const products = (data?.data ?? []).map((product) => ({
    ...product,
    rating: 0,
    reviewCount: 0,
  }));

  return (
    <section className="p-4">
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductList;
