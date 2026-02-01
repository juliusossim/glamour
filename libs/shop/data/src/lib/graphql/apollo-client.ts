import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { tokenStorage } from '../http/auth/token-storage';

const GRAPHQL_URL = 'http://localhost:3000/graphql';

// Helper function to handle auth errors (defined early for use in errorLink)
const handleAuthError = () => {
  tokenStorage.clearTokens();
  if (globalThis.window !== undefined) {
    globalThis.location.href = '/login';
  }
};

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

// Error Link - centralized error handling using ErrorLink class
const errorLink = new ErrorLink(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Handle authentication errors
      if (
        err.extensions?.code === 'UNAUTHENTICATED' ||
        err.extensions?.code === 'FORBIDDEN'
      ) {
        handleAuthError();
        return;
      }

      // Log GraphQL errors (integrate with monitoring service in production)
      console.error(`[GraphQL Error]: ${err.message}`, {
        path: err.path,
        operation: operation.operationName,
        extensions: err.extensions,
      });
    }
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`, {
      operation: operation.operationName,
    });
  }
});

// Retry Link - automatic retry for failed requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) => {
      // Retry on network errors, not on GraphQL errors
      return !!error && !error.result;
    },
  },
});

// Logging Link (for development)
const loggingLink = new ApolloLink((operation, forward) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GraphQL Request]: ${operation.operationName}`);
  }
  return forward(operation);
});

// Create Apollo Client
// Link chain order: error → retry → logging → auth → http
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, loggingLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      // Normalize SocialInteractions by productId for automatic cache updates
      SocialInteractions: {
        keyFields: ['productId'],
      },
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

export { ApolloClient, gql, InMemoryCache } from '@apollo/client';
export { handleAuthError };

