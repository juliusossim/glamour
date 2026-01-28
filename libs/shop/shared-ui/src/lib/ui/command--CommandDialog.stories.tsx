import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandDialog } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandDialog,
  title: 'CommandDialog',
} satisfies Meta<typeof CommandDialog>;
export default meta;

type Story = StoryObj<typeof CommandDialog>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandDialog/gi)).toBeTruthy();
  },
} satisfies Story;
