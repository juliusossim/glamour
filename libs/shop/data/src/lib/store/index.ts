export { useAppDispatch, useAppSelector, useAppStore } from './hooks';
export { store } from './store';
export type { AppDispatch, RootState } from './store';
export { StoreProvider } from './store-provider';

// Products slice
export {
    clearError, clearFilters, setFilters, setPage,
    setSelectedProduct, updateFilter
} from './slices/products.slice';

// Cart slice
export {
    addToCart, clearCart, closeCart, decrementQuantity, incrementQuantity, openCart, removeFromCart, selectCartIsOpen,
    selectCartItemCount, selectCartItems, selectCartTotal, toggleCart, updateQuantity
} from './slices/cart.slice';

// RTK Query API
export {
    productsApi, useGetCategoriesQuery, useGetProductQuery, useGetProductsQuery
} from './api/products.api';

