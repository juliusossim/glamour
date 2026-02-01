import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  JSON: { input: Record<string, unknown>; output: Record<string, unknown> };
};

export type CreateOrderInput = {
  items: Array<OrderItemInput>;
  shippingAddress: ShippingAddressInput;
};

export type CreateProductInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  inStock: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Order;
  createProduct: Product;
  deleteProduct: Scalars['Boolean']['output'];
  toggleLike: SocialInteractions;
  toggleReglam: SocialInteractions;
  toggleShare: SocialInteractions;
  updateProduct?: Maybe<Product>;
};

export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};

export type MutationToggleLikeArgs = {
  productId: Scalars['ID']['input'];
};

export type MutationToggleReglamArgs = {
  productId: Scalars['ID']['input'];
};

export type MutationToggleShareArgs = {
  productId: Scalars['ID']['input'];
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  shippingAddress?: Maybe<ShippingAddress>;
  status: Scalars['String']['output'];
  total: Scalars['Float']['output'];
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  items: Array<Order>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  inStock: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  items: Array<Product>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ProductFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Scalars['String']['output']>;
  interactions: SocialInteractions;
  order?: Maybe<Order>;
  orders: OrderConnection;
  product?: Maybe<Product>;
  products: ProductConnection;
};

export type QueryInteractionsArgs = {
  productId: Scalars['ID']['input'];
};

export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};

export type QueryOrdersArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type ShippingAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type SocialInteractions = {
  __typename?: 'SocialInteractions';
  likes: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  reglams: Scalars['Int']['output'];
  shares: Scalars['Int']['output'];
  userLiked: Scalars['Boolean']['output'];
  userReglammed: Scalars['Boolean']['output'];
  userShared: Scalars['Boolean']['output'];
};

export type UpdateProductInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type OrderItemFieldsFragment = {
  __typename?: 'OrderItem';
  productId: string;
  quantity: number;
  price: number;
};

export type OrderItemWithProductFieldsFragment = {
  __typename?: 'OrderItem';
  productId: string;
  quantity: number;
  price: number;
  product?: {
    __typename?: 'Product';
    id: string;
    name: string;
    imageUrl: string;
  } | null;
};

export type ShippingAddressFieldsFragment = {
  __typename?: 'ShippingAddress';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type OrderBasicFieldsFragment = {
  __typename?: 'Order';
  id: string;
  status: string;
  total: number;
  createdAt: string;
};

export type OrderListFieldsFragment = {
  __typename?: 'Order';
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{
    __typename?: 'OrderItem';
    productId: string;
    quantity: number;
    price: number;
  }>;
};

export type OrderDetailFieldsFragment = {
  __typename?: 'Order';
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{
    __typename?: 'OrderItem';
    productId: string;
    quantity: number;
    price: number;
    product?: {
      __typename?: 'Product';
      id: string;
      name: string;
      imageUrl: string;
    } | null;
  }>;
  shippingAddress?: {
    __typename?: 'ShippingAddress';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;
};

export type ProductFieldsFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
};

export type ProductBasicFieldsFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
};

export type SocialInteractionsFieldsFragment = {
  __typename?: 'SocialInteractions';
  productId: string;
  likes: number;
  shares: number;
  reglams: number;
  userLiked: boolean;
  userShared: boolean;
  userReglammed: boolean;
};

export type ToggleLikeMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type ToggleLikeMutation = {
  __typename?: 'Mutation';
  toggleLike: {
    __typename?: 'SocialInteractions';
    productId: string;
    likes: number;
    shares: number;
    reglams: number;
    userLiked: boolean;
    userShared: boolean;
    userReglammed: boolean;
  };
};

export type ToggleShareMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type ToggleShareMutation = {
  __typename?: 'Mutation';
  toggleShare: {
    __typename?: 'SocialInteractions';
    productId: string;
    likes: number;
    shares: number;
    reglams: number;
    userLiked: boolean;
    userShared: boolean;
    userReglammed: boolean;
  };
};

export type ToggleReglamMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type ToggleReglamMutation = {
  __typename?: 'Mutation';
  toggleReglam: {
    __typename?: 'SocialInteractions';
    productId: string;
    likes: number;
    shares: number;
    reglams: number;
    userLiked: boolean;
    userShared: boolean;
    userReglammed: boolean;
  };
};

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder: {
    __typename?: 'Order';
    id: string;
    status: string;
    total: number;
    createdAt: string;
  };
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    inStock: boolean;
  };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct?: {
    __typename?: 'Product';
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    inStock: boolean;
  } | null;
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct: boolean;
};

export type GetInteractionsQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type GetInteractionsQuery = {
  __typename?: 'Query';
  interactions: {
    __typename?: 'SocialInteractions';
    productId: string;
    likes: number;
    shares: number;
    reglams: number;
    userLiked: boolean;
    userShared: boolean;
    userReglammed: boolean;
  };
};

export type GetOrdersQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;

export type GetOrdersQuery = {
  __typename?: 'Query';
  orders: {
    __typename?: 'OrderConnection';
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    items: Array<{
      __typename?: 'Order';
      id: string;
      status: string;
      total: number;
      createdAt: string;
      items: Array<{
        __typename?: 'OrderItem';
        productId: string;
        quantity: number;
        price: number;
      }>;
    }>;
  };
};

export type GetOrderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetOrderQuery = {
  __typename?: 'Query';
  order?: {
    __typename?: 'Order';
    id: string;
    status: string;
    total: number;
    createdAt: string;
    items: Array<{
      __typename?: 'OrderItem';
      productId: string;
      quantity: number;
      price: number;
      product?: {
        __typename?: 'Product';
        id: string;
        name: string;
        imageUrl: string;
      } | null;
    }>;
    shippingAddress?: {
      __typename?: 'ShippingAddress';
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    } | null;
  } | null;
};

export type GetProductsQueryVariables = Exact<{
  filter?: InputMaybe<ProductFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductConnection';
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    items: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      imageUrl: string;
      inStock: boolean;
      rating: number;
      reviewCount: number;
    }>;
  };
};

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product?: {
    __typename?: 'Product';
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    inStock: boolean;
    rating: number;
    reviewCount: number;
  } | null;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<string>;
};

export const OrderBasicFieldsFragmentDoc = gql`
  fragment OrderBasicFields on Order {
    id
    status
    total
    createdAt
  }
`;
export const OrderItemFieldsFragmentDoc = gql`
  fragment OrderItemFields on OrderItem {
    productId
    quantity
    price
  }
`;
export const OrderListFieldsFragmentDoc = gql`
  fragment OrderListFields on Order {
    ...OrderBasicFields
    items {
      ...OrderItemFields
    }
  }
`;
export const OrderItemWithProductFieldsFragmentDoc = gql`
  fragment OrderItemWithProductFields on OrderItem {
    productId
    quantity
    price
    product {
      id
      name
      imageUrl
    }
  }
`;
export const ShippingAddressFieldsFragmentDoc = gql`
  fragment ShippingAddressFields on ShippingAddress {
    street
    city
    state
    zipCode
    country
  }
`;
export const OrderDetailFieldsFragmentDoc = gql`
  fragment OrderDetailFields on Order {
    ...OrderBasicFields
    items {
      ...OrderItemWithProductFields
    }
    shippingAddress {
      ...ShippingAddressFields
    }
  }
`;
export const ProductFieldsFragmentDoc = gql`
  fragment ProductFields on Product {
    id
    name
    description
    price
    category
    imageUrl
    inStock
    rating
    reviewCount
  }
`;
export const ProductBasicFieldsFragmentDoc = gql`
  fragment ProductBasicFields on Product {
    id
    name
    description
    price
    category
    imageUrl
    inStock
  }
`;
export const SocialInteractionsFieldsFragmentDoc = gql`
  fragment SocialInteractionsFields on SocialInteractions {
    productId
    likes
    shares
    reglams
    userLiked
    userShared
    userReglammed
  }
`;
export const ToggleLikeDocument = gql`
  mutation ToggleLike($productId: ID!) {
    toggleLike(productId: $productId) {
      ...SocialInteractionsFields
    }
  }
  ${SocialInteractionsFieldsFragmentDoc}
`;
export type ToggleLikeMutationFn = Apollo.MutationFunction<
  ToggleLikeMutation,
  ToggleLikeMutationVariables
>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useToggleLikeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >(ToggleLikeDocument, options);
}
export type ToggleLikeMutationHookResult = ReturnType<
  typeof useToggleLikeMutation
>;
export type ToggleLikeMutationResult =
  Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<
  ToggleLikeMutation,
  ToggleLikeMutationVariables
>;
export const ToggleShareDocument = gql`
  mutation ToggleShare($productId: ID!) {
    toggleShare(productId: $productId) {
      ...SocialInteractionsFields
    }
  }
  ${SocialInteractionsFieldsFragmentDoc}
`;
export type ToggleShareMutationFn = Apollo.MutationFunction<
  ToggleShareMutation,
  ToggleShareMutationVariables
>;

/**
 * __useToggleShareMutation__
 *
 * To run a mutation, you first call `useToggleShareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleShareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleShareMutation, { data, loading, error }] = useToggleShareMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useToggleShareMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleShareMutation,
    ToggleShareMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ToggleShareMutation,
    ToggleShareMutationVariables
  >(ToggleShareDocument, options);
}
export type ToggleShareMutationHookResult = ReturnType<
  typeof useToggleShareMutation
>;
export type ToggleShareMutationResult =
  Apollo.MutationResult<ToggleShareMutation>;
export type ToggleShareMutationOptions = Apollo.BaseMutationOptions<
  ToggleShareMutation,
  ToggleShareMutationVariables
>;
export const ToggleReglamDocument = gql`
  mutation ToggleReglam($productId: ID!) {
    toggleReglam(productId: $productId) {
      ...SocialInteractionsFields
    }
  }
  ${SocialInteractionsFieldsFragmentDoc}
`;
export type ToggleReglamMutationFn = Apollo.MutationFunction<
  ToggleReglamMutation,
  ToggleReglamMutationVariables
>;

/**
 * __useToggleReglamMutation__
 *
 * To run a mutation, you first call `useToggleReglamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleReglamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleReglamMutation, { data, loading, error }] = useToggleReglamMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useToggleReglamMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleReglamMutation,
    ToggleReglamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ToggleReglamMutation,
    ToggleReglamMutationVariables
  >(ToggleReglamDocument, options);
}
export type ToggleReglamMutationHookResult = ReturnType<
  typeof useToggleReglamMutation
>;
export type ToggleReglamMutationResult =
  Apollo.MutationResult<ToggleReglamMutation>;
export type ToggleReglamMutationOptions = Apollo.BaseMutationOptions<
  ToggleReglamMutation,
  ToggleReglamMutationVariables
>;
export const CreateOrderDocument = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ...OrderBasicFields
    }
  }
  ${OrderBasicFieldsFragmentDoc}
`;
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CreateOrderDocument, options);
}
export type CreateOrderMutationHookResult = ReturnType<
  typeof useCreateOrderMutation
>;
export type CreateOrderMutationResult =
  Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      ...ProductBasicFields
    }
  }
  ${ProductBasicFieldsFragmentDoc}
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const UpdateProductDocument = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      ...ProductBasicFields
    }
  }
  ${ProductBasicFieldsFragmentDoc}
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const DeleteProductDocument = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const GetInteractionsDocument = gql`
  query GetInteractions($productId: ID!) {
    interactions(productId: $productId) {
      ...SocialInteractionsFields
    }
  }
  ${SocialInteractionsFieldsFragmentDoc}
`;

/**
 * __useGetInteractionsQuery__
 *
 * To run a query within a React component, call `useGetInteractionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInteractionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInteractionsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetInteractionsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  > &
    (
      | { variables: GetInteractionsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  >(GetInteractionsDocument, options);
}
export function useGetInteractionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  >(GetInteractionsDocument, options);
}
export function useGetInteractionsSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetInteractionsQuery,
  GetInteractionsQueryVariables
>;
export function useGetInteractionsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetInteractionsQuery,
        GetInteractionsQueryVariables
      >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetInteractionsQuery | undefined,
  GetInteractionsQueryVariables
>;
export function useGetInteractionsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetInteractionsQuery,
        GetInteractionsQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  >(GetInteractionsDocument, options);
}
export type GetInteractionsQueryHookResult = ReturnType<
  typeof useGetInteractionsQuery
>;
export type GetInteractionsLazyQueryHookResult = ReturnType<
  typeof useGetInteractionsLazyQuery
>;
export type GetInteractionsSuspenseQueryHookResult = ReturnType<
  typeof useGetInteractionsSuspenseQuery
>;
export type GetInteractionsQueryResult = Apollo.QueryResult<
  GetInteractionsQuery,
  GetInteractionsQueryVariables
>;
export const GetOrdersDocument = gql`
  query GetOrders($pagination: PaginationInput) {
    orders(pagination: $pagination) {
      items {
        ...OrderListFields
      }
      total
      page
      pageSize
      totalPages
    }
  }
  ${OrderListFieldsFragmentDoc}
  ${OrderBasicFieldsFragmentDoc}
  ${OrderItemFieldsFragmentDoc}
`;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetOrdersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GetOrdersDocument,
    options
  );
}
export function useGetOrdersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GetOrdersDocument,
    options
  );
}
// @ts-expect-error
export function useGetOrdersSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetOrdersQuery,
  GetOrdersQueryVariables
>;
export function useGetOrdersSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetOrdersQuery,
        GetOrdersQueryVariables
      >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetOrdersQuery | undefined,
  GetOrdersQueryVariables
>;
export function useGetOrdersSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetOrdersQuery,
        GetOrdersQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetOrdersQuery,
    GetOrdersQueryVariables
  >(GetOrdersDocument, options);
}
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<
  typeof useGetOrdersLazyQuery
>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<
  typeof useGetOrdersSuspenseQuery
>;
export type GetOrdersQueryResult = Apollo.QueryResult<
  GetOrdersQuery,
  GetOrdersQueryVariables
>;
export const GetOrderDocument = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      ...OrderDetailFields
    }
  }
  ${OrderDetailFieldsFragmentDoc}
  ${OrderBasicFieldsFragmentDoc}
  ${OrderItemWithProductFieldsFragmentDoc}
  ${ShippingAddressFieldsFragmentDoc}
`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetOrderQuery,
    GetOrderQueryVariables
  > &
    ({ variables: GetOrderQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options
  );
}
export function useGetOrderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOrderQuery,
    GetOrderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(
    GetOrderDocument,
    options
  );
}
// @ts-ignore
export function useGetOrderSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetOrderQuery,
    GetOrderQueryVariables
  >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetOrderQuery,
  GetOrderQueryVariables
>;
export function useGetOrderSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetOrderQuery,
        GetOrderQueryVariables
      >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetOrderQuery | undefined,
  GetOrderQueryVariables
>;
export function useGetOrderSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetOrderQuery,
        GetOrderQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetOrderQuery,
    GetOrderQueryVariables
  >(GetOrderDocument, options);
}
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<
  typeof useGetOrderLazyQuery
>;
export type GetOrderSuspenseQueryHookResult = ReturnType<
  typeof useGetOrderSuspenseQuery
>;
export type GetOrderQueryResult = Apollo.QueryResult<
  GetOrderQuery,
  GetOrderQueryVariables
>;
export const GetProductsDocument = gql`
  query GetProducts($filter: ProductFilterInput, $pagination: PaginationInput) {
    products(filter: $filter, pagination: $pagination) {
      items {
        ...ProductFields
      }
      total
      page
      pageSize
      totalPages
    }
  }
  ${ProductFieldsFragmentDoc}
`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProductsDocument, options);
}
// @ts-ignore
export function useGetProductsSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export function useGetProductsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetProductsQuery,
        GetProductsQueryVariables
      >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetProductsQuery | undefined,
  GetProductsQueryVariables
>;
export function useGetProductsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetProductsQuery,
        GetProductsQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProductsDocument, options);
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsSuspenseQueryHookResult = ReturnType<
  typeof useGetProductsSuspenseQuery
>;
export type GetProductsQueryResult = Apollo.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export const GetProductDocument = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
  ${ProductFieldsFragmentDoc}
`;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  > &
    (
      | { variables: GetProductQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    options
  );
}
export function useGetProductLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(GetProductDocument, options);
}
// @ts-ignore
export function useGetProductSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetProductQuery,
  GetProductQueryVariables
>;
export function useGetProductSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetProductQuery,
        GetProductQueryVariables
      >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetProductQuery | undefined,
  GetProductQueryVariables
>;
export function useGetProductSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetProductQuery,
        GetProductQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(GetProductDocument, options);
}
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<
  typeof useGetProductLazyQuery
>;
export type GetProductSuspenseQueryHookResult = ReturnType<
  typeof useGetProductSuspenseQuery
>;
export type GetProductQueryResult = Apollo.QueryResult<
  GetProductQuery,
  GetProductQueryVariables
>;
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
// @ts-ignore
export function useGetCategoriesSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export function useGetCategoriesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
      >
): ApolloReactHooks.UseSuspenseQueryResult<
  GetCategoriesQuery | undefined,
  GetCategoriesQueryVariables
>;
export function useGetCategoriesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
      >
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>;
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useGetCategoriesSuspenseQuery
>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
