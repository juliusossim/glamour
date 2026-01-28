import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarGroupAction } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarGroupAction,
  title: 'SidebarGroupAction',
} satisfies Meta<typeof SidebarGroupAction>;
export default meta;

type Story = StoryObj<typeof SidebarGroupAction>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarGroupAction/gi)).toBeTruthy();
  },
} satisfies Story;
