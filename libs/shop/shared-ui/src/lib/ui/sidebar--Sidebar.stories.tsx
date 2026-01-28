import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: Sidebar,
  title: 'Sidebar',
} satisfies Meta<typeof Sidebar>;
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Sidebar/gi)).toBeTruthy();
  },
} satisfies Story;
