import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuAction } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuAction,
  title: 'SidebarMenuAction',
} satisfies Meta<typeof SidebarMenuAction>;
export default meta;

type Story = StoryObj<typeof SidebarMenuAction>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuAction/gi)).toBeTruthy();
  },
} satisfies Story;
