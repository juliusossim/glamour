import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetTrigger } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetTrigger,
  title: 'SheetTrigger',
} satisfies Meta<typeof SheetTrigger>;
export default meta;

type Story = StoryObj<typeof SheetTrigger>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetTrigger/gi)).toBeTruthy();
  },
} satisfies Story;
