import { type TypographyWeight, type TypographyAlign, type TypographyColor, type TypographyVariant } from '@org/models';
import { type ElementType } from 'react';

  export const localeCurrencyMap: Record<string, string> = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-NG': 'NGN',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'de-DE': 'EUR',
    'fr-FR': 'EUR',
    'ja-JP': 'JPY',
    'zh-CN': 'CNY',
    'en-IN': 'INR',
  };

export const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff',
  'image/avif',
  'image/heic',
  'image/heif',
]);

export const VIDEO_MIME_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/mpeg',
  'video/3gpp',
  'video/x-m4v',
]);

export const IMAGE_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'avif', 'heic', 'heif',
]);

export const VIDEO_EXTENSIONS = new Set([
  'mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'mpeg', 'mpg', '3gp', 'm4v',
]);


export const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  subtitle1: 'text-lg font-medium',
  subtitle2: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wider',
  label: 'text-sm font-medium',
};

export const variantElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  label: 'label',
};

export const weightStyles: Record<TypographyWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const alignStyles: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export const colorStyles: Record<TypographyColor, string> = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  muted: 'text-muted-foreground',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-destructive',
  inherit: 'text-inherit',
};

export const lineClampStyles: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};
