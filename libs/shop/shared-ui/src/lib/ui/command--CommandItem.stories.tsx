import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandItem } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandItem,
  title: 'CommandItem',
} satisfies Meta<typeof CommandItem>;
export default meta;

type Story = StoryObj<typeof CommandItem>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandItem/gi)).toBeTruthy();
  },
} satisfies Story;
