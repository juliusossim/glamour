import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogOverlay } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogOverlay,
  title: 'DialogOverlay',
} satisfies Meta<typeof DialogOverlay>;
export default meta;

type Story = StoryObj<typeof DialogOverlay>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogOverlay/gi)).toBeTruthy();
  },
} satisfies Story;
