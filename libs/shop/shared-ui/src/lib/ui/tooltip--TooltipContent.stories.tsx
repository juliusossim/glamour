import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipContent } from './tooltip';
import { expect } from 'storybook/test';

const meta = {
  component: TooltipContent,
  title: 'TooltipContent',
} satisfies Meta<typeof TooltipContent>;
export default meta;

type Story = StoryObj<typeof TooltipContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/TooltipContent/gi)).toBeTruthy();
  },
} satisfies Story;
