import {
  Button,
  Form,
  FormCheckbox,
  FormInput,
  FormSelect,
  useZodForm,
} from '@org/shared-ui';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ProductFilterFormData, productFilterSchema } from './schema';

interface ProductFiltersFormProps {
  initialValues?: Partial<ProductFilterFormData>;
  categories: string[];
  onFiltersChange?: (filters: ProductFilterFormData) => void;
}

/**
 * Product filters form component using React Hook Form and Zod validation
 * Demonstrates enterprise-grade form implementation with type safety
 */
export function ProductFiltersForm({
  initialValues,
  categories,
  onFiltersChange,
}: ProductFiltersFormProps) {
  const navigate = useNavigate();

  // Initialize form with Zod schema validation
  const form = useZodForm(productFilterSchema, {
    defaultValues: {
      search: initialValues?.search || '',
      category: initialValues?.category || '',
      inStock: initialValues?.inStock || false,
      minPrice: initialValues?.minPrice,
      maxPrice: initialValues?.maxPrice,
      sortBy: initialValues?.sortBy || 'newest',
    },
  });

  // Handle form submission
  const onSubmit = useCallback(
    (data: ProductFilterFormData) => {
      // Build query parameters
      const params = new URLSearchParams();

      if (data.search) params.set('search', data.search);
      if (data.category) params.set('category', data.category);
      if (data.inStock) params.set('inStock', 'true');
      if (data.minPrice) params.set('minPrice', String(data.minPrice));
      if (data.maxPrice) params.set('maxPrice', String(data.maxPrice));
      if (data.sortBy) params.set('sortBy', data.sortBy);

      // Update URL with filters
      navigate(`?${params.toString()}`, { replace: true });

      // Call the optional callback
      onFiltersChange?.(data);
    },
    [navigate, onFiltersChange]
  );

  // Handle form reset
  const handleReset = useCallback(() => {
    form.reset({
      search: '',
      category: '',
      inStock: false,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: 'newest',
    });
    navigate('', { replace: true });
  }, [form, navigate]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name' },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-6 space-y-4 rounded-lg border border-border bg-card p-4 shadow-sm"
      >
        {/* Search Input */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <FormInput
              name="search"
              placeholder="Search products..."
              description="Search by product name or description"
            />
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormSelect
            name="category"
            label="Category"
            options={categoryOptions}
            placeholder="Select category"
          />

          <FormSelect name="sortBy" label="Sort By" options={sortOptions} />

          <FormInput
            name="minPrice"
            label="Min Price"
            type="number"
            placeholder="0"
            min={0}
            step="0.01"
          />

          <FormInput
            name="maxPrice"
            label="Max Price"
            type="number"
            placeholder="1000"
            min={0}
            step="0.01"
          />
        </div>

        {/* Checkbox Filter */}
        <div className="flex items-center justify-between">
          <FormCheckbox name="inStock" label="Show only in-stock items" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>

        {/* Form Errors */}
        {form.formState.errors.root && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}
      </form>
    </Form>
  );
}
