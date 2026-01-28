import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTP } from './input-otp';
import { expect } from 'storybook/test';

const meta = {
  component: InputOTP,
  title: 'InputOTP',
} satisfies Meta<typeof InputOTP>;
export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/InputOTP/gi)).toBeTruthy();
  },
} satisfies Story;
