import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandInput } from './command';
import { expect } from 'storybook/test';

const meta = {
  component: CommandInput,
  title: 'CommandInput',
} satisfies Meta<typeof CommandInput>;
export default meta;

type Story = StoryObj<typeof CommandInput>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/CommandInput/gi)).toBeTruthy();
  },
} satisfies Story;
