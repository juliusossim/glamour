import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandList } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandList,
  title: 'CommandList',
} satisfies Meta<typeof CommandList>;
export default meta;

type Story = StoryObj<typeof CommandList>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandList/gi)).toBeTruthy();
  },
} satisfies Story;
