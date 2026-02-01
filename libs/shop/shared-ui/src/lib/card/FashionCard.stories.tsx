import type { Meta, StoryObj } from '@storybook/react-vite';
import { FashionCard } from './FashionCard';
import { expect } from 'storybook/test';

const meta = {
  component: FashionCard,
  title: 'FashionCard',
} satisfies Meta<typeof FashionCard>;
export default meta;

type Story = StoryObj<typeof FashionCard>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/FashionCard/gi)).toBeTruthy();
  },
} satisfies Story;
