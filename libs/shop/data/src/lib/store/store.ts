import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products.slice';
import { cartReducer } from './slices/cart.slice';
import { productsApi } from './api/products.api';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
