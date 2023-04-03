import React, { useEffect } from 'react';
import { TFilters } from '../../api/lists/types';
import IItemData from '../../models/item/ItemData';
import InputSelect from '../inputSelect/InputSelect';
import { Control, useController } from 'react-hook-form';

type TProps = {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onLoadData?: (filters: TFilters) => Promise<IItemData[]>;
  filters?: TFilters;
  onChangeValue?: (value: any) => void;
};

function CInputSelect(props: TProps) {
  const { field, fieldState } = useController({ name: props.name, control: props.control });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <InputSelect
      name={field.name}
      value={field.value}
      label={props.label}
      disabled={props.disabled}
      onChange={field.onChange}
      onLoadData={props.onLoadData}
      fullWidth={props.fullWidth}
      filters={props.filters}
      required={props.required}
      refCom={field.ref}
      onBlur={field.onBlur}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
    />
  );
}

export default CInputSelect;
