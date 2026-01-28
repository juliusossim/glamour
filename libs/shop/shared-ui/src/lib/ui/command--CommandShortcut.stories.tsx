import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandShortcut } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandShortcut,
  title: 'CommandShortcut',
} satisfies Meta<typeof CommandShortcut>;
export default meta;

type Story = StoryObj<typeof CommandShortcut>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandShortcut/gi)).toBeTruthy();
  },
} satisfies Story;
