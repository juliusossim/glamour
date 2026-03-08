# @org/shared/hooks

This library contains **generic, reusable React hooks** that can be used across multiple
applications in the monorepo. These hooks are decoupled from specific implementations through
dependency injection.

## Architecture

The hooks in this library follow a **dependency injection pattern** to remain framework and
implementation-agnostic. This allows them to be used with different data fetching libraries (Apollo,
React Query, etc.) and across different domains.

## Hooks

### `useInteractions`

A generic hook for managing social interactions (likes, shares, reglams) on any entity. It accepts
all data fetching and mutation functions as parameters, making it completely decoupled from GraphQL
or any specific data layer.

**Generic Interface:**

```typescript
function useInteractions<TInteractions>(config: UseInteractionsConfig<TInteractions>);
```

**Domain-Specific Wrappers:** For actual usage, create domain-specific wrappers that inject the
appropriate implementations:

- `@org/shop-data` exports `useInteractions` which wraps the generic hook with Apollo GraphQL
  operations

**Example Implementation:**

```typescript
// In your domain library (e.g., libs/shop/data)
export function useShopInteractions(productId: string) {
  return useInteractions<SocialInteractionsFieldsFragment>({
    productId,
    useGetQuery: useGetInteractionsQuery,
    useToggleLikeMutation,
    useToggleShareMutation,
    useToggleReglamMutation,
    getBaseState: (interactions, productId) => ({
      // ... create base state
    }),
    // ... other factory functions
  });
}
```

## Design Principles

1. **Dependency Injection**: All external dependencies are passed as parameters
2. **Generic Types**: Uses TypeScript generics to work with any data shape
3. **No Framework Lock-in**: Not tied to Apollo, React Query, or any specific library
4. **Reusability**: Can be used across different apps and contexts

## Running unit tests

Run `nx test @org/shared/hooks` to execute the unit tests via [Vitest](https://vitest.dev/).
