import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';
import { expect } from 'storybook/test';

const meta = {
  component: Skeleton,
  title: 'Skeleton',
} satisfies Meta<typeof Skeleton>;
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Skeleton/gi)).toBeTruthy();
  },
} satisfies Story;
