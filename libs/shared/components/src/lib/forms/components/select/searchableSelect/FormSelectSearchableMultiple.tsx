'use client';

import * as React from 'react';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '../../../../ui/combobox';
import type { SelectItemType, SelectProps } from '../type';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../ui/form';
import FormSelectItem from './FormItem';

export function FormSelectSearchableMultiple(props: Readonly<SelectProps>) {
  const anchor = useComboboxAnchor();
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => {
        return (
          <FormItem>
            {props.label && (
              <FormLabel>
                {props.label}
                {props.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </FormLabel>
            )}
            <FormControl>
              <Combobox
                multiple
                autoHighlight={props.highlight}
                disabled={props.disabled}
                required={props.required}
                items={props.options}
                defaultValue={[(props.options[0] as SelectItemType).value]}
              >
                <ComboboxChips ref={anchor} className="w-full">
                  <ComboboxValue placeholder={props.placeholder}>
                    {(values) => (
                      <React.Fragment>
                        {values.map((value: SelectItemType) => (
                          <ComboboxChip key={value.value}>
                            {value.label}
                          </ComboboxChip>
                        ))}
                        <ComboboxChipsInput
                          required={props.required}
                          placeholder={props.placeholder}
                          disabled={props.disabled}
                        />
                      </React.Fragment>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty>{props.emptyText}</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem
                        key={item.value}
                        value={item}
                        disabled={item.disabled}
                      >
                        <FormSelectItem item={item} />
                      </ComboboxItem>
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
        );
      }}
    />
  );
}

export default FormSelectSearchableMultiple;
