import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandEmpty } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandEmpty,
  title: 'CommandEmpty',
} satisfies Meta<typeof CommandEmpty>;
export default meta;

type Story = StoryObj<typeof CommandEmpty>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandEmpty/gi)).toBeTruthy();
  },
} satisfies Story;
