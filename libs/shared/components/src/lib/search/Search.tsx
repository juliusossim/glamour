import { Search, X } from 'lucide-react';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { ButtonGroup } from '../ui/button-group';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { SearchInputProps } from './type';

export function SearchInput(props: Readonly<SearchInputProps>) {
  const form = useFormContext();
  const handleClear = useCallback(() => {
    form.setValue('search', '');
    props.handleClear?.();
  }, [form, props]);
  return (
    <FormField
      control={form.control}
      name="search"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="search">Search</FormLabel>
          <FormControl>
            <InputGroup>
              <InputGroupInput
                placeholder={props.placeholder}
                className="focus-visible:shadow-none focus-visible:ring-0 focus-visible:outline-none"
                {...field}
              />
              <ButtonGroup>
                {field.value && (
                  <InputGroupButton
                    size="icon-sm"
                    className="border-0"
                    variant="outline"
                    onClick={handleClear}
                  >
                    <X />
                  </InputGroupButton>
                )}
                <InputGroupButton
                  size="icon-sm"
                  className="border-0"
                  variant="outline"
                >
                  <Search />
                </InputGroupButton>
              </ButtonGroup>
            </InputGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export default SearchInput;
