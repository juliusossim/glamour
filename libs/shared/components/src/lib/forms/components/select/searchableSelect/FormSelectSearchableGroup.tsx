'use client';

import { Button } from '../../../../ui/button';
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '../../../../ui/combobox';
import { InputGroupAddon } from '../../../../ui/input-group';
import { SelectItemType, SelectProps } from '../type';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../ui/form';
import { useFormContext } from 'react-hook-form';
import FormSelectItem from './FormItem';

export function FormSelectSearchableGroup(props: SelectProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
          <FormControl>
            <Combobox
              items={props.options}
              autoHighlight={props.highlight}
              itemToStringValue={(item: SelectItemType) => item.value}
            >
              {!props.popup && (
                <ComboboxInput
                  placeholder={props.placeholder}
                  showTrigger={false}
                  disabled={props.disabled}
                  showClear={props.showClear}
                  required={props.required}
                  aria-invalid={!!form.formState.errors[props.name]}
                >
                  {props.icon && (
                    <InputGroupAddon align={props.iconPosition}>
                      {props.icon}
                    </InputGroupAddon>
                  )}
                </ComboboxInput>
              )}

              {props.popup && (
                <ComboboxTrigger
                  render={
                    <Button
                      variant="outline"
                      className=" w-full justify-between font-normal"
                    >
                      <ComboboxValue />
                    </Button>
                  }
                />
              )}

              <ComboboxContent alignOffset={-28} className="w-60">
                {props.popup && (
                  <ComboboxInput
                    placeholder={props.placeholder}
                    showTrigger={false}
                    disabled={props.disabled}
                    showClear={props.showClear}
                    aria-invalid={!!form.formState.errors[props.name]}
                    required={props.required}
                  >
                    {props.icon && (
                      <InputGroupAddon align={props.iconPosition}>
                        {props.icon}
                      </InputGroupAddon>
                    )}
                  </ComboboxInput>
                )}
                <ComboboxEmpty>{props.emptyText}</ComboboxEmpty>
                <ComboboxList>
                  {(group) => (
                    <ComboboxGroup key={group.label} items={group.items}>
                      <ComboboxLabel>{group.label}</ComboboxLabel>
                      <ComboboxCollection>
                        {(item) => (
                          <ComboboxItem
                            key={item.value}
                            value={item}
                            disabled={item.disabled}
                          >
                            <FormSelectItem item={item} />
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxGroup>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default FormSelectSearchableGroup;
