import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip';
import { expect } from 'storybook/test';

const meta = {
  component: Tooltip,
  title: 'Tooltip',
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Tooltip/gi)).toBeTruthy();
  },
} satisfies Story;
