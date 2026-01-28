import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTPSlot } from './input-otp';
import { expect } from 'storybook/test';

const meta = {
  component: InputOTPSlot,
  title: 'InputOTPSlot',
} satisfies Meta<typeof InputOTPSlot>;
export default meta;

type Story = StoryObj<typeof InputOTPSlot>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/InputOTPSlot/gi)).toBeTruthy();
  },
} satisfies Story;
