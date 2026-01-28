import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarHeader } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarHeader,
  title: 'SidebarHeader',
} satisfies Meta<typeof SidebarHeader>;
export default meta;

type Story = StoryObj<typeof SidebarHeader>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarHeader/gi)).toBeTruthy();
  },
} satisfies Story;
