/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment OrderItemFields on OrderItem {\n  productId\n  quantity\n  price\n}\n\nfragment OrderItemWithProductFields on OrderItem {\n  productId\n  quantity\n  price\n  product {\n    id\n    name\n    imageUrls\n  }\n}\n\nfragment ShippingAddressFields on ShippingAddress {\n  street\n  city\n  state\n  zipCode\n  country\n}\n\nfragment OrderBasicFields on Order {\n  id\n  status\n  total\n  createdAt\n}\n\nfragment OrderListFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemFields\n  }\n}\n\nfragment OrderDetailFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemWithProductFields\n  }\n  shippingAddress {\n    ...ShippingAddressFields\n  }\n}": typeof types.OrderItemFieldsFragmentDoc,
    "fragment ProductFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n  rating\n  reviewCount\n}\n\nfragment ProductBasicFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n}": typeof types.ProductFieldsFragmentDoc,
    "fragment SocialInteractionsFields on SocialInteractions {\n  productId\n  likes\n  shares\n  reglams\n  userLiked\n  userShared\n  userReglammed\n}": typeof types.SocialInteractionsFieldsFragmentDoc,
    "mutation ToggleLike($productId: ID!) {\n  toggleLike(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleShare($productId: ID!) {\n  toggleShare(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleReglam($productId: ID!) {\n  toggleReglam(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}": typeof types.ToggleLikeDocument,
    "mutation CreateOrder($input: CreateOrderInput!) {\n  createOrder(input: $input) {\n    ...OrderBasicFields\n  }\n}": typeof types.CreateOrderDocument,
    "mutation CreateProduct($input: CreateProductInput!) {\n  createProduct(input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n  updateProduct(id: $id, input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation DeleteProduct($id: ID!) {\n  deleteProduct(id: $id)\n}": typeof types.CreateProductDocument,
    "query GetInteractions($productId: ID!) {\n  interactions(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}": typeof types.GetInteractionsDocument,
    "query GetOrders($pagination: PaginationInput) {\n  orders(pagination: $pagination) {\n    items {\n      ...OrderListFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetOrder($id: ID!) {\n  order(id: $id) {\n    ...OrderDetailFields\n  }\n}": typeof types.GetOrdersDocument,
    "query GetProducts($filter: ProductFilterInput, $pagination: PaginationInput) {\n  products(filter: $filter, pagination: $pagination) {\n    items {\n      ...ProductFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetProduct($id: ID!) {\n  product(id: $id) {\n    ...ProductFields\n  }\n}\n\nquery GetCategories {\n  categories\n}": typeof types.GetProductsDocument,
};
const documents: Documents = {
    "fragment OrderItemFields on OrderItem {\n  productId\n  quantity\n  price\n}\n\nfragment OrderItemWithProductFields on OrderItem {\n  productId\n  quantity\n  price\n  product {\n    id\n    name\n    imageUrls\n  }\n}\n\nfragment ShippingAddressFields on ShippingAddress {\n  street\n  city\n  state\n  zipCode\n  country\n}\n\nfragment OrderBasicFields on Order {\n  id\n  status\n  total\n  createdAt\n}\n\nfragment OrderListFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemFields\n  }\n}\n\nfragment OrderDetailFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemWithProductFields\n  }\n  shippingAddress {\n    ...ShippingAddressFields\n  }\n}": types.OrderItemFieldsFragmentDoc,
    "fragment ProductFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n  rating\n  reviewCount\n}\n\nfragment ProductBasicFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n}": types.ProductFieldsFragmentDoc,
    "fragment SocialInteractionsFields on SocialInteractions {\n  productId\n  likes\n  shares\n  reglams\n  userLiked\n  userShared\n  userReglammed\n}": types.SocialInteractionsFieldsFragmentDoc,
    "mutation ToggleLike($productId: ID!) {\n  toggleLike(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleShare($productId: ID!) {\n  toggleShare(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleReglam($productId: ID!) {\n  toggleReglam(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}": types.ToggleLikeDocument,
    "mutation CreateOrder($input: CreateOrderInput!) {\n  createOrder(input: $input) {\n    ...OrderBasicFields\n  }\n}": types.CreateOrderDocument,
    "mutation CreateProduct($input: CreateProductInput!) {\n  createProduct(input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n  updateProduct(id: $id, input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation DeleteProduct($id: ID!) {\n  deleteProduct(id: $id)\n}": types.CreateProductDocument,
    "query GetInteractions($productId: ID!) {\n  interactions(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}": types.GetInteractionsDocument,
    "query GetOrders($pagination: PaginationInput) {\n  orders(pagination: $pagination) {\n    items {\n      ...OrderListFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetOrder($id: ID!) {\n  order(id: $id) {\n    ...OrderDetailFields\n  }\n}": types.GetOrdersDocument,
    "query GetProducts($filter: ProductFilterInput, $pagination: PaginationInput) {\n  products(filter: $filter, pagination: $pagination) {\n    items {\n      ...ProductFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetProduct($id: ID!) {\n  product(id: $id) {\n    ...ProductFields\n  }\n}\n\nquery GetCategories {\n  categories\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment OrderItemFields on OrderItem {\n  productId\n  quantity\n  price\n}\n\nfragment OrderItemWithProductFields on OrderItem {\n  productId\n  quantity\n  price\n  product {\n    id\n    name\n    imageUrls\n  }\n}\n\nfragment ShippingAddressFields on ShippingAddress {\n  street\n  city\n  state\n  zipCode\n  country\n}\n\nfragment OrderBasicFields on Order {\n  id\n  status\n  total\n  createdAt\n}\n\nfragment OrderListFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemFields\n  }\n}\n\nfragment OrderDetailFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemWithProductFields\n  }\n  shippingAddress {\n    ...ShippingAddressFields\n  }\n}"): (typeof documents)["fragment OrderItemFields on OrderItem {\n  productId\n  quantity\n  price\n}\n\nfragment OrderItemWithProductFields on OrderItem {\n  productId\n  quantity\n  price\n  product {\n    id\n    name\n    imageUrls\n  }\n}\n\nfragment ShippingAddressFields on ShippingAddress {\n  street\n  city\n  state\n  zipCode\n  country\n}\n\nfragment OrderBasicFields on Order {\n  id\n  status\n  total\n  createdAt\n}\n\nfragment OrderListFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemFields\n  }\n}\n\nfragment OrderDetailFields on Order {\n  ...OrderBasicFields\n  items {\n    ...OrderItemWithProductFields\n  }\n  shippingAddress {\n    ...ShippingAddressFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n  rating\n  reviewCount\n}\n\nfragment ProductBasicFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n}"): (typeof documents)["fragment ProductFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n  rating\n  reviewCount\n}\n\nfragment ProductBasicFields on Product {\n  id\n  name\n  description\n  price\n  category\n  imageUrls\n  inStock\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SocialInteractionsFields on SocialInteractions {\n  productId\n  likes\n  shares\n  reglams\n  userLiked\n  userShared\n  userReglammed\n}"): (typeof documents)["fragment SocialInteractionsFields on SocialInteractions {\n  productId\n  likes\n  shares\n  reglams\n  userLiked\n  userShared\n  userReglammed\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ToggleLike($productId: ID!) {\n  toggleLike(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleShare($productId: ID!) {\n  toggleShare(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleReglam($productId: ID!) {\n  toggleReglam(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}"): (typeof documents)["mutation ToggleLike($productId: ID!) {\n  toggleLike(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleShare($productId: ID!) {\n  toggleShare(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}\n\nmutation ToggleReglam($productId: ID!) {\n  toggleReglam(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrder($input: CreateOrderInput!) {\n  createOrder(input: $input) {\n    ...OrderBasicFields\n  }\n}"): (typeof documents)["mutation CreateOrder($input: CreateOrderInput!) {\n  createOrder(input: $input) {\n    ...OrderBasicFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProduct($input: CreateProductInput!) {\n  createProduct(input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n  updateProduct(id: $id, input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation DeleteProduct($id: ID!) {\n  deleteProduct(id: $id)\n}"): (typeof documents)["mutation CreateProduct($input: CreateProductInput!) {\n  createProduct(input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n  updateProduct(id: $id, input: $input) {\n    ...ProductBasicFields\n  }\n}\n\nmutation DeleteProduct($id: ID!) {\n  deleteProduct(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetInteractions($productId: ID!) {\n  interactions(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}"): (typeof documents)["query GetInteractions($productId: ID!) {\n  interactions(productId: $productId) {\n    ...SocialInteractionsFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrders($pagination: PaginationInput) {\n  orders(pagination: $pagination) {\n    items {\n      ...OrderListFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetOrder($id: ID!) {\n  order(id: $id) {\n    ...OrderDetailFields\n  }\n}"): (typeof documents)["query GetOrders($pagination: PaginationInput) {\n  orders(pagination: $pagination) {\n    items {\n      ...OrderListFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetOrder($id: ID!) {\n  order(id: $id) {\n    ...OrderDetailFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts($filter: ProductFilterInput, $pagination: PaginationInput) {\n  products(filter: $filter, pagination: $pagination) {\n    items {\n      ...ProductFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetProduct($id: ID!) {\n  product(id: $id) {\n    ...ProductFields\n  }\n}\n\nquery GetCategories {\n  categories\n}"): (typeof documents)["query GetProducts($filter: ProductFilterInput, $pagination: PaginationInput) {\n  products(filter: $filter, pagination: $pagination) {\n    items {\n      ...ProductFields\n    }\n    total\n    page\n    pageSize\n    totalPages\n  }\n}\n\nquery GetProduct($id: ID!) {\n  product(id: $id) {\n    ...ProductFields\n  }\n}\n\nquery GetCategories {\n  categories\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;