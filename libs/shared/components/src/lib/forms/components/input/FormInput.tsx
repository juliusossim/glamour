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
import { Input } from '../../../ui/input';

/**
 * Enterprise-grade form input component with built-in validation
 */
export interface FormInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'name'> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, description, required, ...props }, ref) => {
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
              <Input {...field} {...props} ref={ref} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

FormInput.displayName = 'FormInput';
