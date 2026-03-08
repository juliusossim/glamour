import z from 'zod';

export const productFilterSchema = z
  .object({
    search: z.string().optional(),
    category: z.string().optional(),
    inStock: z.boolean().default(false),
    minPrice: z.number().positive('Minimum price must be positive').optional(),
    maxPrice: z.number().positive('Maximum price must be positive').optional(),
    sortBy: z.enum(['price-asc', 'price-desc', 'name', 'newest']).optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: 'Maximum price must be greater than minimum price',
      path: ['maxPrice'],
    }
  );

export type ProductFilterFormData = z.infer<typeof productFilterSchema>;
