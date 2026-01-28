import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet } from './sheet';
import { expect } from 'storybook/test';

const meta = {
  component: Sheet,
  title: 'Sheet',
} satisfies Meta<typeof Sheet>;
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Sheet/gi)).toBeTruthy();
  },
} satisfies Story;
