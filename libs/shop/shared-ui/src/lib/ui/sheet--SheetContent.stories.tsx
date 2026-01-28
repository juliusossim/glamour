import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetContent } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetContent,
  title: 'SheetContent',
} satisfies Meta<typeof SheetContent>;
export default meta;

type Story = StoryObj<typeof SheetContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetContent/gi)).toBeTruthy();
  },
} satisfies Story;
