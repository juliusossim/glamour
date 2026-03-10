// Redux Toolkit Store
export {
  StoreProvider,
  store,
  useAppDispatch,
  useAppSelector,
  useAppStore,
} from './lib/store';
export type { AppDispatch, RootState } from './lib/store';

// Products slice actions
export {
  clearError,
  clearFilters,
  setFilters,
  setPage,
  setSelectedProduct,
  updateFilter,
} from './lib/store';

// Cart slice actions & selectors
export {
  addToCart,
  clearCart,
  closeCart,
  decrementQuantity,
  incrementQuantity,
  openCart,
  removeFromCart,
  selectCartIsOpen,
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
  toggleCart,
  updateQuantity,
} from './lib/store';

// RTK Query API hooks
export {
  productsApi,
  useGetCategoriesQuery,
  useGetProductQuery,
  useGetProductsQuery,
} from './lib/store';

// Apollo Client (GraphQL)
export * from './lib/graphql';

// TanStack Query (HTTP/REST)
export { QueryProvider, httpClient, queryClient } from './lib/http';

// Auth hooks and types
export {
  authApi,
  authKeys,
  tokenStorage,
  useChangePassword,
  useCurrentUser,
  useForgotPassword,
  useLogin,
  useLogout,
  useRefreshToken,
  useRegister,
  useResendVerification,
  useResetPassword,
  useUpdateProfile,
  useVerifyEmail,
} from './lib/http';
export type {
  AuthResponse,
  AuthTokens,
  ChangePasswordRequest,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordConfirm,
  ResetPasswordRequest,
  UpdateProfileRequest,
  User,
} from './lib/http';

// Type-safe Router
export * from './lib/router';
