import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTPSeparator } from './input-otp';
import { expect } from 'storybook/test';

const meta = {
  component: InputOTPSeparator,
  title: 'InputOTPSeparator',
} satisfies Meta<typeof InputOTPSeparator>;
export default meta;

type Story = StoryObj<typeof InputOTPSeparator>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/InputOTPSeparator/gi)).toBeTruthy();
  },
} satisfies Story;
