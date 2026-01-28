import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetDescription } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: SheetDescription,
  title: 'SheetDescription',
} satisfies Meta<typeof SheetDescription>;
export default meta;

type Story = StoryObj<typeof SheetDescription>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SheetDescription/gi)).toBeTruthy();
  },
} satisfies Story;
