import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuSkeleton } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuSkeleton,
  title: 'SidebarMenuSkeleton',
} satisfies Meta<typeof SidebarMenuSkeleton>;
export default meta;

type Story = StoryObj<typeof SidebarMenuSkeleton>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuSkeleton/gi)).toBeTruthy();
  },
} satisfies Story;
