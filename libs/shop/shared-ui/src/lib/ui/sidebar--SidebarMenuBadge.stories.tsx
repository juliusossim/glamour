import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuBadge } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuBadge,
  title: 'SidebarMenuBadge',
} satisfies Meta<typeof SidebarMenuBadge>;
export default meta;

type Story = StoryObj<typeof SidebarMenuBadge>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuBadge/gi)).toBeTruthy();
  },
} satisfies Story;
