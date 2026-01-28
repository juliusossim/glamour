import type { Meta, StoryObj } from '@storybook/react-vite';
import { Empty } from './empty';
import { expect } from 'storybook/test';

const meta = {
  component: Empty,
  title: 'Empty',
} satisfies Meta<typeof Empty>;
export default meta;

type Story = StoryObj<typeof Empty>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Empty/gi)).toBeTruthy();
  },
} satisfies Story;
