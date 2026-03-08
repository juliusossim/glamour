import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './product-card';
import { expect } from 'storybook/test';

const meta = {
  component: ProductCard,
  title: 'ProductCard',
  argTypes: {
    onProductClick: { action: 'onProductClick executed!' },
  },
} satisfies Meta<typeof ProductCard>;
export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Primary = {
  args: {
    product: '',
  },
} satisfies Story;

export const Heading = {
  args: {
    product: '',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ProductCard/gi)).toBeTruthy();
  },
} satisfies Story;
