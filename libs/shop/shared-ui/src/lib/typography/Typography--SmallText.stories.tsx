import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { SmallText } from './Typography';

const meta = {
  component: SmallText,
  title: 'SmallText',
} satisfies Meta<typeof SmallText>;
export default meta;

type Story = StoryObj<typeof SmallText>;

export const Primary = {
  args: { children: 'Primary SmallText' },
} satisfies Story;

export const Heading = {
  args: { children: 'SmallText Content' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SmallText/gi)).toBeTruthy();
  },
} satisfies Story;
