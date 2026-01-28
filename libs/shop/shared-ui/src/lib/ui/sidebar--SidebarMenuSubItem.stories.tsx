import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuSubItem } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuSubItem,
  title: 'SidebarMenuSubItem',
} satisfies Meta<typeof SidebarMenuSubItem>;
export default meta;

type Story = StoryObj<typeof SidebarMenuSubItem>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuSubItem/gi)).toBeTruthy();
  },
} satisfies Story;
