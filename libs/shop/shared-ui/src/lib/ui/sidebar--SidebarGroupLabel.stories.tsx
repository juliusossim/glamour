import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarGroupLabel } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarGroupLabel,
  title: 'SidebarGroupLabel',
} satisfies Meta<typeof SidebarGroupLabel>;
export default meta;

type Story = StoryObj<typeof SidebarGroupLabel>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarGroupLabel/gi)).toBeTruthy();
  },
} satisfies Story;
