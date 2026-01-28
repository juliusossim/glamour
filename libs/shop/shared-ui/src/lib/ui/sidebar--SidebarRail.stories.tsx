import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarRail } from './sidebar';
import { expect } from 'storybook/test';

const meta = {
  component: SidebarRail,
  title: 'SidebarRail',
} satisfies Meta<typeof SidebarRail>;
export default meta;

type Story = StoryObj<typeof SidebarRail>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SidebarRail/gi)).toBeTruthy();
  },
} satisfies Story;
