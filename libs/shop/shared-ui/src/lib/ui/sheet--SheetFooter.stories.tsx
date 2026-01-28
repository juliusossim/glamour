import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetFooter } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetFooter,
  title: 'SheetFooter',
} satisfies Meta<typeof SheetFooter>;
export default meta;

type Story = StoryObj<typeof SheetFooter>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetFooter/gi)).toBeTruthy();
  },
} satisfies Story;
