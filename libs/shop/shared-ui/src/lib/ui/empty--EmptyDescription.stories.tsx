import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyDescription } from './empty';
import { expect } from 'storybook/test';

const meta = {
  component: EmptyDescription,
  title: 'EmptyDescription',
} satisfies Meta<typeof EmptyDescription>;
export default meta;

type Story = StoryObj<typeof EmptyDescription>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/EmptyDescription/gi)).toBeTruthy();
  },
} satisfies Story;
