import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipProvider } from './tooltip';
import { expect } from 'storybook/test';

const meta = {
  component: TooltipProvider,
  title: 'TooltipProvider',
} satisfies Meta<typeof TooltipProvider>;
export default meta;

type Story = StoryObj<typeof TooltipProvider>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/TooltipProvider/gi)).toBeTruthy();
  },
} satisfies Story;
