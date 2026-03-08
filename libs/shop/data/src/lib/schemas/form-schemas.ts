// import { CommonSchemas } from '@org/shared-ui';
// import { z } from 'zod';

// /**
//  * Product search and filter schema
//  * Used in the products page for filtering and searching products
//  */

// /**
//  * User registration schema
//  * Comprehensive example with password confirmation and validation
//  */
// export const userRegistrationSchema = z
//   .object({
//     firstName: CommonSchemas.requiredString('First name', { min: 2, max: 50 }),
//     lastName: CommonSchemas.requiredString('Last name', { min: 2, max: 50 }),
//     email: CommonSchemas.email(),
//     phone: CommonSchemas.phoneNumber().optional().or(z.literal('')),
//     password: CommonSchemas.strongPassword(),
//     confirmPassword: z.string().min(1, 'Please confirm your password'),
//     acceptTerms: z.boolean().refine((val) => val === true, {
//       message: 'You must accept the terms and conditions',
//     }),
//     newsletter: z.boolean().default(false),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword'],
//   });

// export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;

// /**
//  * Contact form schema
//  * Simple contact form example
//  */

// /**
//  * Product review schema
//  * Example with rating validation
//  */
// export const productReviewSchema = z.object({
//   rating: z
//     .number({ message: 'Please select a rating' })
//     .min(1, 'Rating must be at least 1')
//     .max(5, 'Rating cannot exceed 5'),
//   title: CommonSchemas.requiredString('Review title', { min: 5, max: 100 }),
//   comment: CommonSchemas.requiredString('Review comment', { min: 20, max: 1000 }),
//   wouldRecommend: z.boolean().default(false),
//   userName: CommonSchemas.requiredString('Your name', { min: 2, max: 50 }),
//   email: CommonSchemas.email(),
// });

// export type ProductReviewFormData = z.infer<typeof productReviewSchema>;

// /**
//  * Address form schema
//  * Comprehensive address validation
//  */
// export const addressFormSchema = z.object({
//   fullName: CommonSchemas.requiredString('Full name', { min: 2, max: 100 }),
//   addressLine1: CommonSchemas.requiredString('Address line 1', { min: 5, max: 200 }),
//   addressLine2: z.string().max(200, 'Address line 2 is too long').optional(),
//   city: CommonSchemas.requiredString('City', { min: 2, max: 100 }),
//   state: CommonSchemas.requiredString('State/Province', { min: 2, max: 100 }),
//   postalCode: CommonSchemas.requiredString('Postal code', { min: 3, max: 20 }),
//   country: CommonSchemas.requiredString('Country', { min: 2, max: 100 }),
//   phone: CommonSchemas.phoneNumber(),
//   isDefault: z.boolean().default(false),
// });

// export type AddressFormData = z.infer<typeof addressFormSchema>;

// /**
//  * Newsletter subscription schema
//  * Simple email subscription example
//  */
// export const newsletterSchema = z.object({
//   email: CommonSchemas.email(),
//   frequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
//   topics: z.array(z.string()).min(1, 'Please select at least one topic'),
// });

// export type NewsletterFormData = z.infer<typeof newsletterSchema>;
