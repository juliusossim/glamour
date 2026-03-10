import { ProductFilter } from '@org/models';

export interface ProductsQueryArgs {
  page?: number;
  pageSize?: number;
  filters?: ProductFilter;
}
