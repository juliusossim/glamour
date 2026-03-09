import { useMutation, useQuery } from '@apollo/client/react';

import {
  GetInteractionsDocument,
  type GetInteractionsQuery,
  type GetInteractionsQueryVariables,
  type SocialInteractionsFieldsFragment,
  ToggleLikeDocument,
  ToggleLikeMutation,
  type ToggleLikeMutationVariables,
  ToggleReglamDocument,
  ToggleReglamMutation,
  type ToggleReglamMutationVariables,
  ToggleShareDocument,
  ToggleShareMutation,
  type ToggleShareMutationVariables,
} from './generated/graphql';

export function useInteractions(productId: string) {
  const { data, loading, error, refetch } = useQuery<
    GetInteractionsQuery,
    GetInteractionsQueryVariables
  >(GetInteractionsDocument, {
    variables: { productId },
    skip: !productId,
  });

  const interactions = data?.interactions;

  const getBaseState = (): SocialInteractionsFieldsFragment => ({
    productId,
    likes: interactions?.likes ?? 0,
    shares: interactions?.shares ?? 0,
    reglams: interactions?.reglams ?? 0,
    userLiked: interactions?.userLiked ?? false,
    userShared: interactions?.userShared ?? false,
    userReglammed: interactions?.userReglammed ?? false,
  });

  const [toggleLikeMutation, { loading: likeLoading }] = useMutation<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >(ToggleLikeDocument, {
    optimisticResponse: (): ToggleLikeMutation => {
      const base = getBaseState();
      return {
        __typename: 'Mutation',
        toggleLike: {
          __typename: 'SocialInteractions',
          ...base,
          userLiked: !base.userLiked,
          likes: base.likes + (base.userLiked ? -1 : 1),
        },
      };
    },
  });

  const [toggleShareMutation, { loading: shareLoading }] = useMutation<
    ToggleShareMutation,
    ToggleShareMutationVariables
  >(ToggleShareDocument, {
    optimisticResponse: (): ToggleShareMutation => {
      const base = getBaseState();
      return {
        __typename: 'Mutation',
        toggleShare: {
          __typename: 'SocialInteractions',
          ...base,
          userShared: !base.userShared,
          shares: base.shares + (base.userShared ? -1 : 1),
        },
      };
    },
  });

  const [toggleReglamMutation, { loading: reglamLoading }] = useMutation<
    ToggleReglamMutation,
    ToggleReglamMutationVariables
  >(ToggleReglamDocument, {
    optimisticResponse: (): ToggleReglamMutation => {
      const base = getBaseState();
      return {
        __typename: 'Mutation',
        toggleReglam: {
          __typename: 'SocialInteractions',
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
