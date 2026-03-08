import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from './FormInput';

const meta = {
  component: FormInput,
  title: 'FormInput',
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          email: '',
          username: '',
          password: '',
          description: '',
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof FormInput>;
export default meta;

type Story = StoryObj<typeof FormInput>;

export const Primary = {
  args: {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
} satisfies Story;

export const WithDescription = {
  args: {
    name: 'username',
    label: 'Username',
    description: 'Choose a unique username for your account',
    placeholder: 'johndoe',
  },
} satisfies Story;

export const Required = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    name: 'description',
    label: 'Description',
    placeholder: 'This field is disabled',
    disabled: true,
  },
} satisfies Story;
