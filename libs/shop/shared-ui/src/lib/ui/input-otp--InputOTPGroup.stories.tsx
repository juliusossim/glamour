import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTPGroup } from './input-otp';
import { expect } from 'storybook/test';

const meta = {
  component: InputOTPGroup,
  title: 'InputOTPGroup',
} satisfies Meta<typeof InputOTPGroup>;
export default meta;

type Story = StoryObj<typeof InputOTPGroup>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/InputOTPGroup/gi)).toBeTruthy();
  },
} satisfies Story;
