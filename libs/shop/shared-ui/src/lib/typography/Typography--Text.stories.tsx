import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Text } from './Typography';

const meta = {
  component: Text,
  title: 'Text',
} satisfies Meta<typeof Text>;
export default meta;

type Story = StoryObj<typeof Text>;

export const Primary = {
  args: { children: 'Primary Text' },
} satisfies Story;

export const Heading = {
  args: { children: 'Sample Text' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Text/gi)).toBeTruthy();
  },
} satisfies Story;
