import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Caption } from './Typography';

const meta = {
  component: Caption,
  title: 'Caption',
} satisfies Meta<typeof Caption>;
export default meta;

type Story = StoryObj<typeof Caption>;

export const Primary = {
  args: { children: 'Primary Caption' },
} satisfies Story;

export const Heading = {
  args: { children: 'Caption' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Caption/gi)).toBeTruthy();
  },
} satisfies Story;
