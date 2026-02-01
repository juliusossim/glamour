import { ElementType, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
export interface LoadingSpinnerProps {
  message?: string;
  title?: string;
  imageUrl?: string;
}

export interface ErrorMessageProps extends PropsWithChildren {
  message?: string;
  onRetry?: () => void;
}

export interface AmountProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  increment?: number;
  currency?: string; // ISO 4217 currency code (e.g., 'USD', 'EUR', 'NGN')
  locale?: string; // Override locale (e.g., 'en-US', 'en-NG')
  className?: string;
}
export interface SocialInteractions {
  productId: string;
  likes: number;
  shares: number;
  reglams: number;
  userLiked: boolean;
  userShared: boolean;
  userReglammed: boolean;
}

export interface SocialInteractionsProps {
  productId: string;
  initialData?: SocialInteractions;
}


export interface MediaRendererProps {
  /** Media source with URL and optional MIME type */
  readonly source: MediaSource;
  /** Alt text for images, used as aria-label for videos */
  readonly alt: string;
  /** Additional class names */
  readonly className?: string;
  /** Class names for the media element (img or video) */
  readonly mediaClassName?: string;
  /** Whether to autoplay videos (default: false) */
  readonly autoPlay?: boolean;
  /** Whether to loop videos (default: false) */
  readonly loop?: boolean;
  /** Whether to mute videos by default (default: true for autoplay) */
  readonly muted?: boolean;
  /** Whether to show video controls (default: true) */
  readonly showControls?: boolean;
  /** Poster image for videos */
  readonly poster?: string;
  /** Callback when media loads */
  readonly onLoad?: () => void;
  /** Callback when media fails to load */
  readonly onError?: (error: string) => void;
  /** Object fit style */
  readonly objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Caption track URL for video accessibility */
  readonly captionTrack?: string;
}

export type MediaType = 'image' | 'video' | 'unknown';

export interface MediaSource {
  url: string;
  mimeType?: string;
}

export interface MediaMetadata {
  type: MediaType;
  width: number | null;
  height: number | null;
  duration: number | null; // seconds (video only)
  aspectRatio: number | null;
  isLoaded: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export interface VideoControls {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  requestFullscreen: () => Promise<void>;
}

export interface VideoState {
  isPlaying: boolean;
  isPaused: boolean;
  isEnded: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  currentTime: number;
  duration: number;
  buffered: number; // percentage 0-100
  volume: number; // 0-1
  playbackRate: number;
}

export interface UseMediaResult {
  metadata: MediaMetadata;
  videoState: VideoState | null;
  controls: VideoControls | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
}
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'label';

export type TypographyWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'success'
  | 'warning'
  | 'error'
  | 'inherit';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Text variant determines the base styling */
  readonly variant?: TypographyVariant;
  /** HTML element to render (overrides variant default) */
  readonly as?: ElementType;
  /** Font weight */
  readonly weight?: TypographyWeight;
  /** Text alignment */
  readonly align?: TypographyAlign;
  /** Text color */
  readonly color?: TypographyColor;
  /** Enable single-line truncation with ellipsis */
  readonly truncate?: boolean;
  /** Enable multi-line truncation (number of lines to show) */
  readonly lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Disable text wrapping */
  readonly noWrap?: boolean;
  /** Additional class names */
  readonly className?: string;
  /** Content */
  readonly children?: ReactNode;
}

export interface TruncatedTextProps extends TypographyProps {
  /** The full text content (used for tooltip) */
  readonly text: string;
  /** Max width for the container */
  readonly maxWidth?: string;
  /** Whether to show tooltip on hover (default: true) */
  readonly showTooltip?: boolean;
  /** Tooltip position (default: 'top') */
  readonly tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
}


export interface Brand  {
  /** Unique identifier for the brand */
  id: string;
  /** Brand display name */
  name: string;
  /** Optional brand logo URL */
  logo?: string;
  /** Optional link to brand page */
  href?: string;
  description?: string;
  /** Badge variant for the brand */
  badgeVariant?: BadgeVariant;
  /** Additional class name for the brand item */
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
}

export interface BrandsCarouselProps {
  /** Array of brands to display */
  brands: Brand[];
  /** Autoplay delay in milliseconds (default: 3000) */
  autoplayDelay?: number;
  /** Stop autoplay when user interacts (default: false) */
  stopOnInteraction?: boolean;
  /** Pause autoplay on mouse hover (default: true) */
  pauseOnHover?: boolean;
  /** Show navigation arrows (default: true) */
  showNavigation?: boolean;
  /** Badge variant for brand items */
  badgeVariant?: BadgeVariant;
  /** Additional class name for the carousel container */
  className?: string;
  /** Callback when a brand is clicked */
  onBrandClick?: (brand: Brand) => void;
  /** Enable infinite loop (default: true) */
  loop?: boolean;
}

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'ghost';

export interface BrandBadgeProps {
  brand: Brand;
  variant: BadgeVariant;
  onClick: (brand: Brand) => void;
  onKeyDown: (event: React.KeyboardEvent, brand: Brand) => void;
  clickable: boolean;
}

export interface HoverCardProps extends PropsWithChildren {
  /** Delay in milliseconds before showing the card (default: 200) */
  openDelay?: number;
  /** Delay in milliseconds before hiding the card (default: 200) */
  closeDelay?: number;
  /** Additional class name for the hover card */
  className?: string;
  title: ReactNode;
  content?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}