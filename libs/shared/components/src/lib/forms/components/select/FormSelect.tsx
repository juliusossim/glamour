import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form';

/**
 * Enterprise-grade form select component with built-in validation
 */
export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      name,
      label,
      description,
      required,
      options,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const form = useFormContext();

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <select
                {...field}
                {...props}
                ref={ref}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  className || ''
                }`}
              >
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

FormSelect.displayName = 'FormSelect';
