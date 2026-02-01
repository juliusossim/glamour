import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialInteractions } from './SocialInteractions';
import { expect } from 'storybook/test';

const meta = {
  component: SocialInteractions,
  title: 'SocialInteractions',
} satisfies Meta<typeof SocialInteractions>;
export default meta;

type Story = StoryObj<typeof SocialInteractions>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SocialInteractions/gi)).toBeTruthy();
  },
} satisfies Story;
