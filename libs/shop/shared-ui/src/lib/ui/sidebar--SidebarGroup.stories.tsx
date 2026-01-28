import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarGroup } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarGroup,
  title: 'SidebarGroup',
} satisfies Meta<typeof SidebarGroup>;
export default meta;

type Story = StoryObj<typeof SidebarGroup>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarGroup/gi)).toBeTruthy();
  },
} satisfies Story;
