import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarFooter } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarFooter,
  title: 'SidebarFooter',
} satisfies Meta<typeof SidebarFooter>;
export default meta;

type Story = StoryObj<typeof SidebarFooter>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarFooter/gi)).toBeTruthy();
  },
} satisfies Story;
