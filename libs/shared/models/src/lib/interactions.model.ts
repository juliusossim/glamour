export interface InteractionCounts {
  productId: string;
  likes: number;
  comments: number;
  reglams: number;
}

export interface SocialInteractions extends InteractionCounts {
  userLiked: boolean;
  userReglammed: boolean;
  userCommented: boolean;
}

export interface Interactions {
  productId: string;
  userId: string;
  type: InteractionType;
  timestamp: string; // ISO date string
}
export const InteractionTypes = {
  LIKE: 'like',
  COMMENT: 'comment',
  REGLAM: 'reglam',
} as const;
export type InteractionType =
  (typeof InteractionTypes)[keyof typeof InteractionTypes];
