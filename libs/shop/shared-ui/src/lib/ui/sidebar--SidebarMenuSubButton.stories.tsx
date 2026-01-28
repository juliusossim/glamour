import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenuSubButton } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenuSubButton,
  title: 'SidebarMenuSubButton',
} satisfies Meta<typeof SidebarMenuSubButton>;
export default meta;

type Story = StoryObj<typeof SidebarMenuSubButton>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenuSubButton/gi)).toBeTruthy();
  },
} satisfies Story;
