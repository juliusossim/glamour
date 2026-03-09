// Route definitions and types
export * from './routes';
export * from './types';

// Router utilities
export {
  buildPath,
  buildUrl,
  useRouteNavigation,
  useTypedNavigate,
  useTypedParams,
  useTypedSearchParams,
} from './router-utils';

// Router configuration
export {
  createRouter,
  type ProductDetailLoaderData,
  type ProductsLoaderData,
  type RouterComponents,
} from './router';

// Loaders
export {
  LoaderError,
  authGuardLoader,
  composeLoaders,
  productDetailLoader,
  productsLoader,
} from './loaders';

// Actions
export {
  ActionError,
  addToCartAction,
  loginAction,
  logoutAction,
  registerAction,
  type ActionResponse,
} from './actions';
