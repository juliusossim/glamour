import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Typography } from './Typography';

const meta = {
  component: Typography,
  title: 'Typography',
} satisfies Meta<typeof Typography>;
export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary = {
  args: {
    children: 'Primary Typography',
    variant: 'body1',
  },
} satisfies Story;

export const Heading = {
  args: {
    children: 'Typography Heading',
    variant: 'h1',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Typography/gi)).toBeTruthy();
  },
} satisfies Story;
