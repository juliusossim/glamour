import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorMessage } from './error-message';
import { expect } from 'storybook/test';

const meta = {
  component: ErrorMessage,
  title: 'ErrorMessage',
  argTypes: {
    onRetry: { action: 'onRetry executed!' },
  },
} satisfies Meta<typeof ErrorMessage>;
export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Primary = {
  args: {
    message: '',
  },
} satisfies Story;

export const Heading = {
  args: {
    message: '',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ErrorMessage/gi)).toBeTruthy();
  },
} satisfies Story;
