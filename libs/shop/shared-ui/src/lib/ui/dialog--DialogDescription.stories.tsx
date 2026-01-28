import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogDescription } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogDescription,
  title: 'DialogDescription',
} satisfies Meta<typeof DialogDescription>;
export default meta;

type Story = StoryObj<typeof DialogDescription>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogDescription/gi)).toBeTruthy();
  },
} satisfies Story;
