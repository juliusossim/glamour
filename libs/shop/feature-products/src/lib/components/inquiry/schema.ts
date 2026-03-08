import { CommonSchemas } from '@org/shared-ui';
import z from 'zod';

export const contactFormSchema = z.object({
  name: CommonSchemas.requiredString('Name', { min: 2, max: 100 }),
  email: CommonSchemas.email(),
  subject: CommonSchemas.requiredString('Subject', { min: 5, max: 200 }),
  message: CommonSchemas.requiredString('Message', { min: 10, max: 1000 }),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
