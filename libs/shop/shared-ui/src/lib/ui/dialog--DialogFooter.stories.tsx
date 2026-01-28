import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogFooter } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogFooter,
  title: 'DialogFooter',
} satisfies Meta<typeof DialogFooter>;
export default meta;

type Story = StoryObj<typeof DialogFooter>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogFooter/gi)).toBeTruthy();
  },
} satisfies Story;
