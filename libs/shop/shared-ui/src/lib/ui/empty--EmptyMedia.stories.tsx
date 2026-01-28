import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyMedia } from './empty';
import { expect } from 'storybook/test';

const meta = {
  component: EmptyMedia,
  title: 'EmptyMedia',
} satisfies Meta<typeof EmptyMedia>;
export default meta;

type Story = StoryObj<typeof EmptyMedia>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/EmptyMedia/gi)).toBeTruthy();
  },
} satisfies Story;
