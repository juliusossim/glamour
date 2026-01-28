import { gql } from '@apollo/client';

// ============= PRODUCT QUERIES =============

export const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $pagination: PaginationInput) {
    products(filter: $filter, pagination: $pagination) {
      items {
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
      total
      page
      pageSize
      totalPages
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

// ============= PRODUCT MUTATIONS =============

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      category
      imageUrl
      inStock
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      category
      imageUrl
      inStock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// ============= ORDER QUERIES & MUTATIONS =============

export const GET_ORDERS = gql`
  query GetOrders($pagination: PaginationInput) {
    orders(pagination: $pagination) {
      items {
        id
        status
        total
        createdAt
        items {
          productId
          quantity
          price
        }
      }
      total
      page
      pageSize
      totalPages
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      status
      total
      createdAt
      items {
        productId
        quantity
        price
        product {
          id
          name
          imageUrl
        }
      }
      shippingAddress {
        street
        city
        state
        zipCode
        country
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      status
      total
      createdAt
    }
  }
`;
