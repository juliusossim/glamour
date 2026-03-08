'use client';

import { InputGroupAddon } from '../../../../ui/input-group';
import { Button } from '../../../../ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '../../../../ui/combobox';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';

import { SelectItemType, SelectProps } from '../type';
import { useFormContext } from 'react-hook-form';
import FormSelectItem from './FormItem';

export function FormSearchableSelectBasic(props: Readonly<SelectProps>) {
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
                items={props.options}
                autoHighlight={props.highlight}
                itemToStringValue={(item?: SelectItemType) => item?.value ?? ''}
                disabled={props.disabled}
                aria-invalid={!!form.formState.errors[props.name]}
              >
                {!props.popup && (
                  <ComboboxInput
                    placeholder={props.placeholder}
                    showTrigger={false}
                    showClear={props.showClear}
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
                        className="w-full justify-between font-normal"
                      >
                        <ComboboxValue placeholder={props.placeholder} />
                      </Button>
                    }
                  />
                )}

                <ComboboxContent>
                  {props.popup && (
                    <ComboboxInput
                      placeholder={props.placeholder}
                      showTrigger={false}
                      showClear={props.showClear}
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
                    {(item: SelectItemType) => (
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
          </FormItem>
        );
      }}
    />
  );
}

export default FormSearchableSelectBasic;
