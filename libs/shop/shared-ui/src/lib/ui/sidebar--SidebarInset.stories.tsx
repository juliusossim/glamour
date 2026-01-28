import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarInset } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarInset,
  title: 'SidebarInset',
} satisfies Meta<typeof SidebarInset>;
export default meta;

type Story = StoryObj<typeof SidebarInset>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarInset/gi)).toBeTruthy();
  },
} satisfies Story;
