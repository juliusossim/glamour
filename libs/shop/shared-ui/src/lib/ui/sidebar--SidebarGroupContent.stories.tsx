import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarGroupContent } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarGroupContent,
  title: 'SidebarGroupContent',
} satisfies Meta<typeof SidebarGroupContent>;
export default meta;

type Story = StoryObj<typeof SidebarGroupContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarGroupContent/gi)).toBeTruthy();
  },
} satisfies Story;
