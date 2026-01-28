import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetHeader } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetHeader,
  title: 'SheetHeader',
} satisfies Meta<typeof SheetHeader>;
export default meta;

type Story = StoryObj<typeof SheetHeader>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetHeader/gi)).toBeTruthy();
  },
} satisfies Story;
