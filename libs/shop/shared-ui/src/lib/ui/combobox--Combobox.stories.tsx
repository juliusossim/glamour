import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './combobox';
import { expect } from 'storybook/test';

const meta = {
  component: Combobox,
  title: 'Combobox',
} satisfies Meta<typeof Combobox>;
export default meta;

type Story = StoryObj<typeof Combobox>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Combobox/gi)).toBeTruthy();
  },
} satisfies Story;
