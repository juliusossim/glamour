import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyHeader } from './empty';
import { expect } from 'storybook/test';

const meta = {
  component: EmptyHeader,
  title: 'EmptyHeader',
} satisfies Meta<typeof EmptyHeader>;
export default meta;

type Story = StoryObj<typeof EmptyHeader>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/EmptyHeader/gi)).toBeTruthy();
  },
} satisfies Story;
