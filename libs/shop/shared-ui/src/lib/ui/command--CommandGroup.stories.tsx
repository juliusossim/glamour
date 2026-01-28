import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandGroup } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandGroup,
  title: 'CommandGroup',
} satisfies Meta<typeof CommandGroup>;
export default meta;

type Story = StoryObj<typeof CommandGroup>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandGroup/gi)).toBeTruthy();
  },
} satisfies Story;
