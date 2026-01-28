import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogContent } from './dialog';
import { expect } from 'storybook/test';

const meta = {
  component: DialogContent,
  title: 'DialogContent',
} satisfies Meta<typeof DialogContent>;
export default meta;

type Story = StoryObj<typeof DialogContent>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/DialogContent/gi)).toBeTruthy();
  },
} satisfies Story;
