import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuButton } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuButton,
  title: 'SidebarMenuButton',
} satisfies Meta<typeof SidebarMenuButton>;
export default meta;

type Story = StoryObj<typeof SidebarMenuButton>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuButton/gi)).toBeTruthy();
  },
} satisfies Story;
