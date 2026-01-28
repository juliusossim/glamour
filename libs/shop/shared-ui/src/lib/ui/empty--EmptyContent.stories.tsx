import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyContent } from './empty';
import { expect } from 'storybook/test';

const meta = {
  component: EmptyContent,
  title: 'EmptyContent',
} satisfies Meta<typeof EmptyContent>;
export default meta;

type Story = StoryObj<typeof EmptyContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/EmptyContent/gi)).toBeTruthy();
  },
} satisfies Story;
