import {
    useGetInteractionsQuery,
    useToggleLikeMutation,
    useToggleReglamMutation,
    useToggleShareMutation,
    type SocialInteractionsFieldsFragment,
} from '../graphql';

/**
 * Hook for managing social interactions (like, share, reglam) on products.
 *
 * Uses Apollo's automatic cache normalization via `keyFields: ['productId']`
 * on SocialInteractions type, so mutations automatically update the cache
 * without manual `cache.writeQuery` calls.
 */
export function useInteractions(productId: string) {
  const { data, loading, error, refetch } = useGetInteractionsQuery({
    variables: { productId },
    skip: !productId,
  });

  const interactions = data?.interactions;

  // Base interaction state for optimistic responses
  const getBaseState = (): SocialInteractionsFieldsFragment => ({
    __typename: 'SocialInteractions',
    productId,
    likes: interactions?.likes ?? 0,
    shares: interactions?.shares ?? 0,
    reglams: interactions?.reglams ?? 0,
    userLiked: interactions?.userLiked ?? false,
    userShared: interactions?.userShared ?? false,
    userReglammed: interactions?.userReglammed ?? false,
  });

  const [toggleLikeMutation, { loading: likeLoading }] = useToggleLikeMutation({
    optimisticResponse: () => {
      const base = getBaseState();
      return {
        toggleLike: {
          ...base,
          userLiked: !base.userLiked,
          likes: base.likes + (base.userLiked ? -1 : 1),
        },
      };
    },
  });

  const [toggleShareMutation, { loading: shareLoading }] =
    useToggleShareMutation({
      optimisticResponse: () => {
        const base = getBaseState();
        return {
          toggleShare: {
            ...base,
            userShared: !base.userShared,
            shares: base.shares + (base.userShared ? -1 : 1),
          },
        };
      },
    });

  const [toggleReglamMutation, { loading: reglamLoading }] =
    useToggleReglamMutation({
      optimisticResponse: () => {
        const base = getBaseState();
        return {
          toggleReglam: {
            ...base,
            userReglammed: !base.userReglammed,
            reglams: base.reglams + (base.userReglammed ? -1 : 1),
          },
        };
      },
    });

  const toggleLike = () => toggleLikeMutation({ variables: { productId } });
  const toggleShare = () => toggleShareMutation({ variables: { productId } });
  const toggleReglam = () => toggleReglamMutation({ variables: { productId } });

  const defaultInteractions: SocialInteractionsFieldsFragment = {
    __typename: 'SocialInteractions',
    productId,
    likes: 0,
    shares: 0,
    reglams: 0,
    userLiked: false,
    userShared: false,
    userReglammed: false,
  };

  return {
    interactions: interactions ?? defaultInteractions,
    loading,
    error,
    refetch,
    toggleLike,
    toggleShare,
    toggleReglam,
    isLiking: likeLoading,
    isSharing: shareLoading,
    isReglaming: reglamLoading,
  };
}
