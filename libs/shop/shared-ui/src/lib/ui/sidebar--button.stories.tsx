import type { Meta, StoryObj } from '@storybook/react-vite';
import { button } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: button,
  title: 'button',
} satisfies Meta<typeof button>;
export default meta;

type Story = StoryObj<typeof button>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/button/gi)).toBeTruthy();
  },
} satisfies Story;
