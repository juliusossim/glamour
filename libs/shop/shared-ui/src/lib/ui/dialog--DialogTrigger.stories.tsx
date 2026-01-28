import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogTrigger } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogTrigger,
  title: 'DialogTrigger',
} satisfies Meta<typeof DialogTrigger>;
export default meta;

type Story = StoryObj<typeof DialogTrigger>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogTrigger/gi)).toBeTruthy();
  },
} satisfies Story;
