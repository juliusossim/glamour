import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopoverContent } from './popover';
import { expect } from 'storybook/test';

const meta = {
  component: PopoverContent,
  title: 'PopoverContent',
} satisfies Meta<typeof PopoverContent>;
export default meta;

type Story = StoryObj<typeof PopoverContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/PopoverContent/gi)).toBeTruthy();
  },
} satisfies Story;
