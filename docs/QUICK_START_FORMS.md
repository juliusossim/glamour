# Quick Start - React Hook Form Implementation

## 🚀 Ready to Use!

All form utilities, components, and examples have been implemented. Here's how to start using them
immediately.

## 1. Basic Form (5 minutes)

Create a simple form in your app:

```tsx
// Example: apps/shop/src/app/routes/example-form.tsx
import { useZodForm, Form, FormInput, Button } from '@org/shared-components';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
});

export function ExampleForm() {
  const form = useZodForm(schema);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form data:', data);
    // Handle submission
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput name="name" label="Name" required />
          <FormInput name="email" label="Email" type="email" required />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
```

## 2. Use Pre-built Forms

We've already created working examples:

### Product Filters Form

```tsx
import { ProductFiltersForm } from '@org/shop-feature-products';

// In your products page:
<ProductFiltersForm
  initialValues={{ search: '', category: '' }}
  categories={['Electronics', 'Fashion', 'Home']}
  onFiltersChange={(filters) => console.log(filters)}
/>;
```

### Contact Form

```tsx
import { ContactForm } from '@org/shop-feature-products';

// In your contact page:
<ContactForm />;
```

## 3. Use Pre-built Schemas

Import and use existing validation schemas:

```tsx
import {
  userRegistrationSchema,
  contactFormSchema,
  productReviewSchema,
  addressFormSchema,
} from '@org/shop-data';

// Use directly with useZodForm:
const form = useZodForm(userRegistrationSchema);
```

## 4. Available Form Components

All components are exported from `@org/shared-components`:

- `<FormInput>` - Text, email, number, password inputs
- `<FormTextarea>` - Multi-line text
- `<FormSelect>` - Dropdown select
- `<FormCheckbox>` - Checkbox with label

## 5. Available Hooks

```tsx
import {
  useZodForm, // Main form hook
  useAsyncFormSubmit, // Handle async submissions
  useFormAutoSave, // Auto-save functionality
  useMultiStepForm, // Multi-step wizards
  useDebouncedValidation, // Async validation
} from '@org/shared-components';
```

## 6. Common Validation Schemas

```tsx
import { CommonSchemas } from '@org/shared-components';

const mySchema = z.object({
  email: CommonSchemas.email(),
  password: CommonSchemas.strongPassword(),
  phone: CommonSchemas.phoneNumber(),
  website: CommonSchemas.url().optional(),
  age: CommonSchemas.positiveNumber('Age'),
});
```

## 📁 Key Files to Reference

### Documentation

- **Complete Guide**: `docs/REACT_HOOK_FORM_GUIDE.md`
- **Summary**: `docs/REACT_HOOK_FORM_SUMMARY.md`

### Examples

- **Product Filters**: `libs/shop/feature-products/src/lib/ProductFiltersForm.tsx`
- **Contact Form**: `libs/shop/feature-products/src/lib/ContactForm.tsx`
- **Refactored Page**: `apps/shop/src/app/routes/products-page-refactored.tsx`

### Schemas

- **Form Schemas**: `libs/shop/data/src/lib/schemas/form-schemas.ts`
- **Common Schemas**: `libs/shared/components/src/lib/forms/form-utils.ts`

### Components

- **Form Components**: `libs/shared/components/src/lib/forms/`
- **UI Components**: `libs/shared/components/src/lib/ui/form.tsx`

### Tests

- **Test Examples**: `libs/shared/components/src/lib/forms/__tests__/form.test.tsx`

## 🎯 Next Steps

### Replace Existing Forms

1. Find a form in your app (like `products-page.tsx`)
2. Create the schema with Zod
3. Replace manual inputs with Form components
4. Remove manual validation logic

### Example Migration:

**Before:**

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email.includes('@')) {
    setError('Invalid email');
    return;
  }
  // submit
};

return (
  <form onSubmit={handleSubmit}>
    <input value={email} onChange={(e) => setEmail(e.target.value)} />
    {error && <span>{error}</span>}
  </form>
);
```

**After:**

```tsx
const schema = z.object({
  email: z.string().email('Invalid email'),
});

const form = useZodForm(schema);

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      <FormInput name="email" label="Email" />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
);
```

## 🔧 Common Patterns

### Loading State

```tsx
<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

### Success Message

```tsx
{
  form.formState.isSubmitSuccessful && <div className="text-green-600">Success!</div>;
}
```

### Reset Form

```tsx
<Button type="button" onClick={() => form.reset()}>
  Clear
</Button>
```

### Conditional Fields

```tsx
const watchType = form.watch('type');

{
  watchType === 'business' && <FormInput name="companyName" label="Company Name" />;
}
```

## 💡 Tips

1. **Always wrap forms** with `<Form {...form}>`
2. **Use type inference**: `type FormData = z.infer<typeof schema>`
3. **Validate on blur** for better UX (default)
4. **Use CommonSchemas** for consistency
5. **Check the examples** when in doubt

## 🐛 Troubleshooting

**Form not validating?**

- Make sure you wrapped with `<Form {...form}>`

**TypeScript errors?**

- Ensure you're inferring types: `z.infer<typeof schema>`

**Field not updating?**

- Check the `name` prop matches your schema

**Need help?**

- Read: `docs/REACT_HOOK_FORM_GUIDE.md`
- Check examples in `libs/shop/feature-products/src/lib/`

## ✅ You're All Set!

Everything is configured and ready to use. Start with a simple form and gradually migrate your
existing forms as needed.

**Have questions?** Check the comprehensive guide at `docs/REACT_HOOK_FORM_GUIDE.md`
