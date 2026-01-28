import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetTitle } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetTitle,
  title: 'SheetTitle',
} satisfies Meta<typeof SheetTitle>;
export default meta;

type Story = StoryObj<typeof SheetTitle>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetTitle/gi)).toBeTruthy();
  },
} satisfies Story;
