import type { Product, ProductFilter, ProductsState } from '@org/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  filters: {},
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  total: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilter>) => {
      state.filters = action.payload;
      state.page = 1; // Reset to first page when filters change
    },
    updateFilter: (
      state,
      action: PayloadAction<{ key: keyof ProductFilter; value: unknown }>
    ) => {
      const { key, value } = action.payload;
      (state.filters as Record<string, unknown>)[key] = value;
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setFilters,
  updateFilter,
  clearFilters,
  setPage,
  setSelectedProduct,
  clearError,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
