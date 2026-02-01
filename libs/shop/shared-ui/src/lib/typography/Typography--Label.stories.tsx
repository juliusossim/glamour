import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Label } from './Typography';

const meta = {
  component: Label,
  title: 'Label',
} satisfies Meta<typeof Label>;
export default meta;

type Story = StoryObj<typeof Label>;

export const Primary = {
  args: { children: 'Primary Label' },
} satisfies Story;

export const Heading = {
  args: { children: 'Label Text' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Label/gi)).toBeTruthy();
  },
} satisfies Story;
