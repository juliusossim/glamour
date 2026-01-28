import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetClose } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetClose,
  title: 'SheetClose',
} satisfies Meta<typeof SheetClose>;
export default meta;

type Story = StoryObj<typeof SheetClose>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetClose/gi)).toBeTruthy();
  },
} satisfies Story;
