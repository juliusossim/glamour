import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandSeparator } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandSeparator,
  title: 'CommandSeparator',
} satisfies Meta<typeof CommandSeparator>;
export default meta;

type Story = StoryObj<typeof CommandSeparator>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandSeparator/gi)).toBeTruthy();
  },
} satisfies Story;
