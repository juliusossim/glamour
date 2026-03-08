import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './Search';
import { expect } from 'storybook/test';
import { FormProvider, useForm } from 'react-hook-form';
import { timezones } from '../forms/utils/formMocks';

const meta = {
  component: SearchInput,
  title: 'SearchInput',
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          search: '',
        },
      });
      return (
        <FormProvider {...form}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof SearchInput>;
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Primary = {
  args: {
    options: timezones,
    placeholder: 'Select a timezone',
    name: 'search',
    label: 'Search',
    showClear: true,
  },
} satisfies Story;

export const Heading = {
  args: {
    ...Primary.args,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/SearchInput/gi)).toBeTruthy();
  },
} satisfies Story;
