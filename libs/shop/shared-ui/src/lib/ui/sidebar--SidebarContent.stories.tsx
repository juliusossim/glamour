import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarContent } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarContent,
  title: 'SidebarContent',
} satisfies Meta<typeof SidebarContent>;
export default meta;

type Story = StoryObj<typeof SidebarContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarContent/gi)).toBeTruthy();
  },
} satisfies Story;
