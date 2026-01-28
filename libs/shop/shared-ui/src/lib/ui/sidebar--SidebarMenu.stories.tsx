import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarMenu } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarMenu,
  title: 'SidebarMenu',
} satisfies Meta<typeof SidebarMenu>;
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarMenu/gi)).toBeTruthy();
  },
} satisfies Story;
