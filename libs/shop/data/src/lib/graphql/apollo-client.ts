import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { tokenStorage } from '../http/auth/token-storage';

const GRAPHQL_URL = 'http://localhost:3000/graphql';

// HTTP Link
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
});

// Auth Link - adds authorization header
const authLink = new ApolloLink((operation, forward) => {
  const token = tokenStorage.getAccessToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

// Logging Link (for development)
const loggingLink = new ApolloLink((operation, forward) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GraphQL Request]: ${operation.operationName}`);
  }
  return forward(operation);
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([loggingLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ['filter', 'category'],
            merge(existing, incoming, { args }) {
              if (!args?.offset || args.offset === 0) {
                return incoming;
              }
              return {
                ...incoming,
                items: [...(existing?.items || []), ...incoming.items],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// Helper function to handle auth errors
export const handleAuthError = () => {
  tokenStorage.clearTokens();
  if (globalThis.window !== undefined) {
    globalThis.location.href = '/login';
  }
};

export { ApolloClient, InMemoryCache, gql } from '@apollo/client';
