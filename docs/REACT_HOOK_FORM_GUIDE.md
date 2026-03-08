# React Hook Form with Zod Integration Guide

## Overview

This guide demonstrates the enterprise-grade implementation of React Hook Form with Zod validation
in our application. The architecture provides type-safe forms with comprehensive validation,
reusable components, and excellent developer experience.

## Architecture

### Core Components

1. **Form Utilities** (`libs/shared/components/src/lib/forms/form-utils.ts`)

   - Common validation schemas
   - Validation message constants
   - Schema transformation helpers
   - Type utilities

2. **Form Hooks** (`libs/shared/components/src/lib/forms/form-hooks.ts`)

   - `useZodForm`: Main form hook with Zod integration
   - `useAsyncFormSubmit`: Handle async submissions
   - `useFormAutoSave`: Auto-save functionality
   - `useMultiStepForm`: Multi-step form management
   - `useDebouncedValidation`: Async field validation

3. **Form Components** (`libs/shared/components/src/lib/forms/`)

   - `FormInput`: Text input with validation
   - `FormTextarea`: Multi-line text input
   - `FormSelect`: Select dropdown
   - `FormCheckbox`: Checkbox input
   - All components include built-in error handling and accessibility

4. **Validation Schemas** (`libs/shop/data/src/lib/schemas/form-schemas.ts`)
   - Pre-built schemas for common forms
   - Type-safe form data types
   - Reusable validation patterns

## Getting Started

### Basic Form Example

```tsx
import { useZodForm, Form, FormInput, Button } from '@org/shared-components';
import { z } from 'zod';

// Define your schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const form = useZodForm(loginSchema);

  const onSubmit = (data: LoginFormData) => {
    console.log('Valid data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="Email" type="email" required />
        <FormInput name="password" label="Password" type="password" required />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
```

### Using Pre-built Schemas

```tsx
import { contactFormSchema, ContactFormData } from '@org/shop-data';
import { useZodForm, Form, FormInput, FormTextarea } from '@org/shared-components';

function ContactForm() {
  const form = useZodForm(contactFormSchema);

  const onSubmit = (data: ContactFormData) => {
    // Data is fully typed and validated
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="name" label="Name" required />
        <FormInput name="email" label="Email" type="email" required />
        <FormInput name="subject" label="Subject" required />
        <FormTextarea name="message" label="Message" required />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
```

### Async Form Submission

```tsx
import { useZodForm, useAsyncFormSubmit } from '@org/shared-components';

function MyForm() {
  const form = useZodForm(mySchema);

  const handleSubmit = async (data: FormData) => {
    // Simulate API call
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  const onSubmit = useAsyncFormSubmit(form, handleSubmit);

  return (
    <form onSubmit={onSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

### Multi-Step Form

```tsx
import { useZodForm, useMultiStepForm } from '@org/shared-components';

function MultiStepForm() {
  const form = useZodForm(mySchema);
  const steps = useMultiStepForm(form, ['personal', 'address', 'payment']);

  return (
    <div>
      <h3>
        Step {steps.currentStep + 1} of {steps.totalSteps}
      </h3>
      <p>Current: {steps.currentStepName}</p>

      {steps.currentStepName === 'personal' && <PersonalInfoStep />}
      {steps.currentStepName === 'address' && <AddressStep />}
      {steps.currentStepName === 'payment' && <PaymentStep />}

      <div>
        {!steps.isFirstStep && <Button onClick={steps.prevStep}>Previous</Button>}
        {!steps.isLastStep && <Button onClick={steps.nextStep}>Next</Button>}
        {steps.isLastStep && <Button type="submit">Submit</Button>}
      </div>
    </div>
  );
}
```

### Auto-Save Form

```tsx
import { useZodForm, useFormAutoSave } from '@org/shared-components';

function AutoSaveForm() {
  const form = useZodForm(mySchema);

  const handleSave = async (data: FormData) => {
    await fetch('/api/autosave', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  useFormAutoSave(form, handleSave, {
    debounceMs: 2000,
    enabled: true,
  });

  return (
    <form>
      {/* Form fields */}
      <p className="text-sm text-muted-foreground">Changes are saved automatically</p>
    </form>
  );
}
```

## Creating Custom Validation Schemas

### Using Common Schemas

```tsx
import { CommonSchemas } from '@org/shared-components';
import { z } from 'zod';

const userSchema = z.object({
  firstName: CommonSchemas.requiredString('First name', { min: 2, max: 50 }),
  lastName: CommonSchemas.requiredString('Last name', { min: 2, max: 50 }),
  email: CommonSchemas.email(),
  phone: CommonSchemas.phoneNumber(),
  website: CommonSchemas.url().optional(),
  age: CommonSchemas.positiveNumber('Age'),
});
```

### Custom Validation Rules

```tsx
import { z } from 'zod';

const customSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not exceed 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

    // Cross-field validation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
```

### Async Validation

```tsx
import { useDebouncedValidation } from '@org/shared-components';

function UsernameField() {
  const form = useZodForm(mySchema);

  const checkUsernameAvailability = async (username: string) => {
    const response = await fetch(`/api/check-username?username=${username}`);
    const { available } = await response.json();
    return available ? true : 'Username is already taken';
  };

  useDebouncedValidation(form, 'username', checkUsernameAvailability, 500);

  return <FormInput name="username" label="Username" />;
}
```

## Form Components Reference

### FormInput

```tsx
<FormInput
  name="email"
  label="Email Address"
  type="email"
  placeholder="user@example.com"
  description="We'll never share your email"
  required
  disabled={false}
/>
```

### FormTextarea

```tsx
<FormTextarea
  name="message"
  label="Your Message"
  placeholder="Enter your message..."
  rows={6}
  description="Minimum 10 characters"
  required
/>
```

### FormSelect

```tsx
<FormSelect
  name="country"
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  placeholder="Select a country"
  required
/>
```

### FormCheckbox

```tsx
<FormCheckbox
  name="acceptTerms"
  label="I accept the terms and conditions"
  description="You must accept to continue"
/>
```

## Best Practices

### 1. Keep Schemas Close to Their Usage

Define schemas in the appropriate library (`libs/shop/data/src/lib/schemas/`) for reusability.

### 2. Use Type Inference

Always use `z.infer<typeof schema>` for type-safe form data:

```tsx
const mySchema = z.object({ ... });
type MyFormData = z.infer<typeof mySchema>;
```

### 3. Validate on Blur, Re-validate on Change

This is the default behavior with `useZodForm` for the best UX.

### 4. Handle Async Errors

Use `useAsyncFormSubmit` to automatically handle submission errors:

```tsx
const onSubmit = useAsyncFormSubmit(form, async (data) => {
  // If this throws, the error will be set on form.formState.errors.root
  await submitToAPI(data);
});
```

### 5. Provide Clear Error Messages

Use `ValidationMessages` constants for consistent error messaging:

```tsx
import { ValidationMessages } from '@org/shared-components';

const schema = z.object({
  email: z.string().email(ValidationMessages.email),
});
```

### 6. Use Form Description for Help Text

Add descriptions to guide users:

```tsx
<FormInput
  name="password"
  label="Password"
  type="password"
  description="Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
  required
/>
```

### 7. Disable Submit on Invalid Forms

```tsx
<Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
  Submit
</Button>
```

## Accessibility

All form components include:

- Proper ARIA labels and descriptions
- Error announcements for screen readers
- Keyboard navigation support
- Focus management
- Disabled state handling

## Examples in the Codebase

1. **Product Filters Form**: `libs/shop/feature-products/src/lib/ProductFiltersForm.tsx`

   - Complex filtering with multiple field types
   - URL-based state management
   - Dynamic options

2. **Contact Form**: `libs/shop/feature-products/src/lib/ContactForm.tsx`
   - Async submission with loading states
   - Success/error feedback
   - Form reset functionality

## Troubleshooting

### Form Not Validating

Ensure you've wrapped your form with the `<Form>` component:

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>
</Form>
```

### TypeScript Errors

Make sure to install and import types:

```tsx
import type { z } from 'zod';
import type { UseFormReturn } from 'react-hook-form';
```

### Fields Not Registering

All custom form components must be wrapped in `FormField` and use `FormControl`.

## Additional Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Form Documentation](https://ui.shadcn.com/docs/components/form)
