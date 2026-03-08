import type { Config } from 'tailwindcss';

export default {
  content: [
    './apps/shop/src/**/*.{js,ts,jsx,tsx}',
    './libs/shared/components/src/**/*.{js,ts,jsx,tsx}',
    './libs/shop/feature-products/src/**/*.{js,ts,jsx,tsx}',
    './libs/shop/feature-product-detail/src/**/*.{js,ts,jsx,tsx}',
    './libs/shop/data/src/**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config;
