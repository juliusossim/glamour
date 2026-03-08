import type { Meta, StoryObj } from '@storybook/react-vite';
import { FashionCarousel } from './FashionCarousel';
import { expect } from 'storybook/test';
import { defaultProduct } from '../utils/mock';

const meta = {
  component: FashionCarousel,
  title: 'FashionCarousel',
} satisfies Meta<typeof FashionCarousel>;
export default meta;

type Story = StoryObj<typeof FashionCarousel>;

export const Primary = {
  args: { product: defaultProduct },
} satisfies Story;

export const Heading = {
  args: { product: defaultProduct },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/FashionCarousel/gi)).toBeTruthy();
  },
} satisfies Story;
