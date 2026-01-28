import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: Command,
  title: 'Command',
} satisfies Meta<typeof Command>;
export default meta;

type Story = StoryObj<typeof Command>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Command/gi)).toBeTruthy();
  },
} satisfies Story;
