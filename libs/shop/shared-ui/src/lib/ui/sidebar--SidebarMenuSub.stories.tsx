import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuSub } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuSub,
  title: 'SidebarMenuSub',
} satisfies Meta<typeof SidebarMenuSub>;
export default meta;

type Story = StoryObj<typeof SidebarMenuSub>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuSub/gi)).toBeTruthy();
  },
} satisfies Story;
