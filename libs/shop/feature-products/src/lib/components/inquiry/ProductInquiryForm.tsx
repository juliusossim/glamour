import {
  Button,
  Form,
  FormInput,
  FormTextarea,
  useAsyncFormSubmit,
  useZodForm,
} from '@org/shared-ui';
import { ContactFormData, contactFormSchema } from './schema';
import { useState } from 'react';

/**
 * Contact form example demonstrating:
 * - Form validation with Zod
 * - Async form submission with loading states
 * - Error handling
 * - Success feedback
 */
export function ProductInquiryForm() {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const form = useZodForm(contactFormSchema, {
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
    },
  });

  // Simulate async submission
  const handleSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Form submitted:', data);

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      setSubmitStatus('error');
      throw error;
    }
  };

  const onSubmit = useAsyncFormSubmit(form, handleSubmit);

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Contact Us</h2>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            name="name"
            label="Your Name"
            placeholder="John Doe"
            required
            disabled={form.formState.isSubmitting}
          />

          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            required
            disabled={form.formState.isSubmitting}
          />

          <FormInput
            name="subject"
            label="Subject"
            placeholder="What is this regarding?"
            required
            disabled={form.formState.isSubmitting}
          />

          <FormTextarea
            name="message"
            label="Message"
            placeholder="Tell us more about your inquiry..."
            required
            rows={6}
            disabled={form.formState.isSubmitting}
            description="Minimum 10 characters"
          />

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="rounded-md bg-green-50 p-4 text-green-800">
              <p className="font-medium">Thank you for your message!</p>
              <p className="text-sm">We'll get back to you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p className="font-medium">Something went wrong</p>
              <p className="text-sm">Please try again later.</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={form.formState.isSubmitting}
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
