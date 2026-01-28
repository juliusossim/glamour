import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogHeader } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogHeader,
  title: 'DialogHeader',
} satisfies Meta<typeof DialogHeader>;
export default meta;

type Story = StoryObj<typeof DialogHeader>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogHeader/gi)).toBeTruthy();
  },
} satisfies Story;
