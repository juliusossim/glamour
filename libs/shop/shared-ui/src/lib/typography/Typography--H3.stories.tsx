import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { H3 } from './Typography';

const meta = {
  component: H3,
  title: 'H3',
} satisfies Meta<typeof H3>;
export default meta;

type Story = StoryObj<typeof H3>;

export const Primary = {
  args: { children: 'Primary H3' },
} satisfies Story;

export const Heading = {
  args: { children: 'Heading H3' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/H3/gi)).toBeTruthy();
  },
} satisfies Story;
