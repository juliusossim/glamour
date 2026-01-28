import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarSeparator } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarSeparator,
  title: 'SidebarSeparator',
} satisfies Meta<typeof SidebarSeparator>;
export default meta;

type Story = StoryObj<typeof SidebarSeparator>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarSeparator/gi)).toBeTruthy();
  },
} satisfies Story;
