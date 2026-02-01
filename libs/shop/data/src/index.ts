// Legacy hooks (can be replaced with RTK Query hooks)
export { useInteractions } from './lib/hooks/use-interactions';
export { useProduct } from './lib/hooks/use-product';
export { useCategories, useProducts } from './lib/hooks/use-products';

// Redux Toolkit Store
export {
    store, StoreProvider, useAppDispatch,
    useAppSelector,
    useAppStore
} from './lib/store';
export type { AppDispatch, RootState } from './lib/store';

// Products slice actions
export {
    clearError, clearFilters, setFilters, setPage,
    setSelectedProduct, updateFilter
} from './lib/store';

// Cart slice actions & selectors
export {
    addToCart, clearCart, closeCart, decrementQuantity, incrementQuantity, openCart, removeFromCart, selectCartIsOpen,
    selectCartItemCount, selectCartItems, selectCartTotal, toggleCart, updateQuantity
} from './lib/store';

// RTK Query API hooks
export {
    productsApi, useGetCategoriesQuery, useGetProductQuery, useGetProductsQuery
} from './lib/store';

// Apollo Client (GraphQL)
export { apolloClient, ApolloProviderWrapper, gql } from './lib/graphql';
export * from './lib/graphql/generated';

// TanStack Query (HTTP/REST)
export { httpClient, queryClient, QueryProvider } from './lib/http';

// Auth hooks and types
export {
    authApi,
    authKeys, tokenStorage, useChangePassword, useCurrentUser, useForgotPassword, useLogin, useLogout, useRefreshToken, useRegister, useResendVerification, useResetPassword, useUpdateProfile,
    useVerifyEmail
} from './lib/http';
export type {
    AuthResponse, AuthTokens, ChangePasswordRequest, LoginCredentials,
    RegisterCredentials, ResetPasswordConfirm, ResetPasswordRequest, UpdateProfileRequest, User
} from './lib/http';

// Type-safe Router
export {
    ActionError, addToCartAction, authGuardLoader,
    // Router utilities
    buildPath,
    buildUrl, composeLoaders,
    // Router factory
    createRouter, LoaderError,
    // Actions
    loginAction,
    logoutAction, productDetailLoader,
    // Loaders
    productsLoader, registerAction, ROUTE_META,
    // Route paths and types
    ROUTE_PATHS, useRouteNavigation, useTypedNavigate,
    useTypedParams,
    useTypedSearchParams
} from './lib/router';

export type {
    ActionResponse, ParamsFor, ProductDetailLoaderData, ProductsLoaderData, RouteMeta, RouteParams, RoutePath, RouterComponents, RouteSearchParams, SearchParamsFor
} from './lib/router';

