import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipTrigger } from './tooltip';
import { expect } from 'storybook/test';

const meta = {
  component: TooltipTrigger,
  title: 'TooltipTrigger',
} satisfies Meta<typeof TooltipTrigger>;
export default meta;

type Story = StoryObj<typeof TooltipTrigger>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/TooltipTrigger/gi)).toBeTruthy();
  },
} satisfies Story;
