import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TruncatedText } from './Typography';

const meta = {
  component: TruncatedText,
  title: 'TruncatedText',
} satisfies Meta<typeof TruncatedText>;
export default meta;

type Story = StoryObj<typeof TruncatedText>;

export const Primary = {
  args: {
    children: 'This is a very long text that will be truncated when it exceeds the container width',
    maxWidth: 200,
  },
} satisfies Story;

export const Heading = {
  args: {
    children: 'TruncatedText with tooltip on hover',
    maxWidth: 150,
    showTooltip: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/TruncatedText/gi)).toBeTruthy();
  },
} satisfies Story;
