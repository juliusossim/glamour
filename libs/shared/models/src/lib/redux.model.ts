import { Product, ProductFilter } from "./product.model.js";

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  filters: ProductFilter;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

