import type { Meta, StoryObj } from '@storybook/react-vite';
import { defaultBrands } from './mock';
import { expect } from 'storybook/test';

const meta = {
  component: defaultBrands,
  title: 'defaultBrands',
} satisfies Meta<typeof defaultBrands>;
export default meta;

type Story = StoryObj<typeof defaultBrands>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/defaultBrands/gi)).toBeTruthy();
  },
} satisfies Story;
