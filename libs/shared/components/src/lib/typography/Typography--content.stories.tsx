import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Text } from './Typography';

const meta = {
  component: Text,
  title: 'Content',
} satisfies Meta<typeof Text>;
export default meta;

type Story = StoryObj<typeof Text>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Content/gi)).toBeTruthy();
  },
} satisfies Story;
