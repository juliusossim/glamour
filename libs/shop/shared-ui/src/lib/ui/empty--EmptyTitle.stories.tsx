import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyTitle } from './empty';
import { expect } from 'storybook/test';

const meta = {
  component: EmptyTitle,
  title: 'EmptyTitle',
} satisfies Meta<typeof EmptyTitle>;
export default meta;

type Story = StoryObj<typeof EmptyTitle>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/EmptyTitle/gi)).toBeTruthy();
  },
} satisfies Story;
