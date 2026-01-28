import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarProvider } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarProvider,
  title: 'SidebarProvider',
} satisfies Meta<typeof SidebarProvider>;
export default meta;

type Story = StoryObj<typeof SidebarProvider>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarProvider/gi)).toBeTruthy();
  },
} satisfies Story;
