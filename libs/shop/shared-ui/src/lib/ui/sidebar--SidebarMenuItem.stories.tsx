import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuItem } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuItem,
  title: 'SidebarMenuItem',
} satisfies Meta<typeof SidebarMenuItem>;
export default meta;

type Story = StoryObj<typeof SidebarMenuItem>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuItem/gi)).toBeTruthy();
  },
} satisfies Story;
