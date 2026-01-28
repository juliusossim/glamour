import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogClose } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogClose,
  title: 'DialogClose',
} satisfies Meta<typeof DialogClose>;
export default meta;

type Story = StoryObj<typeof DialogClose>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogClose/gi)).toBeTruthy();
  },
} satisfies Story;
