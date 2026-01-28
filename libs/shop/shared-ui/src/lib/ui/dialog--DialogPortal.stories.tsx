import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogPortal } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogPortal,
  title: 'DialogPortal',
} satisfies Meta<typeof DialogPortal>;
export default meta;

type Story = StoryObj<typeof DialogPortal>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogPortal/gi)).toBeTruthy();
  },
} satisfies Story;
