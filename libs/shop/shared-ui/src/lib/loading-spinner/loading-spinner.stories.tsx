import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner } from './loading-spinner';
import { expect } from 'storybook/test';

const meta = {
  component: LoadingSpinner,
  title: 'LoadingSpinner',
} satisfies Meta<typeof LoadingSpinner>;
export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/LoadingSpinner/gi)).toBeTruthy();
  },
} satisfies Story;
