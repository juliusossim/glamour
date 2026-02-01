import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { H4 } from './Typography';

const meta = {
  component: H4,
  title: 'H4',
} satisfies Meta<typeof H4>;
export default meta;

type Story = StoryObj<typeof H4>;

export const Primary = {
  args: { children: 'Primary H4' },
} satisfies Story;

export const Heading = {
  args: { children: 'Heading H4' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/H4/gi)).toBeTruthy();
  },
} satisfies Story;
