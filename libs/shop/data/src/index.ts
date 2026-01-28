// Legacy hooks (can be replaced with RTK Query hooks)
export { useProduct } from './lib/hooks/use-product';
export { useCategories, useProducts } from './lib/hooks/use-products';

// Redux Toolkit Store
export {
    StoreProvider, store, useAppDispatch,
    useAppSelector,
    useAppStore
} from './lib/store';
export type { AppDispatch, CartItem, RootState } from './lib/store';

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
export { ApolloProviderWrapper, apolloClient, gql } from './lib/graphql';
export * from './lib/graphql/operations';

// TanStack Query (HTTP/REST)
export { QueryProvider, httpClient, queryClient } from './lib/http';

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
    ActionError, LoaderError, ROUTE_META,
    // Route paths and types
    ROUTE_PATHS, addToCartAction, authGuardLoader,
    // Router utilities
    buildPath,
    buildUrl, composeLoaders,
    // Router factory
    createRouter,
    // Actions
    loginAction,
    logoutAction, productDetailLoader,
    // Loaders
    productsLoader, registerAction, useRouteNavigation, useTypedNavigate,
    useTypedParams,
    useTypedSearchParams
} from './lib/router';

export type {
    ActionResponse, ParamsFor, ProductDetailLoaderData, ProductsLoaderData, RouteMeta, RouteParams, RoutePath, RouteSearchParams, RouterComponents, SearchParamsFor
} from './lib/router';

