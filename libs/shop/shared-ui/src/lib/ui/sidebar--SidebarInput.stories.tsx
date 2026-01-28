import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarInput } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarInput,
  title: 'SidebarInput',
} satisfies Meta<typeof SidebarInput>;
export default meta;

type Story = StoryObj<typeof SidebarInput>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarInput/gi)).toBeTruthy();
  },
} satisfies Story;
