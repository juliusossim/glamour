import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarTrigger } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarTrigger,
  title: 'SidebarTrigger',
} satisfies Meta<typeof SidebarTrigger>;
export default meta;

type Story = StoryObj<typeof SidebarTrigger>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarTrigger/gi)).toBeTruthy();
  },
} satisfies Story;
