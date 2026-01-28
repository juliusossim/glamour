import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogTitle } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogTitle,
  title: 'DialogTitle',
} satisfies Meta<typeof DialogTitle>;
export default meta;

type Story = StoryObj<typeof DialogTitle>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogTitle/gi)).toBeTruthy();
  },
} satisfies Story;
