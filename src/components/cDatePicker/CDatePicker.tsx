import React, { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Control, useController } from 'react-hook-form';

type TProps = {
  name: string;
  control: Control<any>;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChangeValue?: (value: any) => void;
};

function CDatePicker(props: TProps) {
  const { field, fieldState } = useController({ name: props.name, control: props.control });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <DatePicker
      sx={{ width: '100%' }}
      label={props.label}
      disabled={props.disabled}
      format="DD.MM.YYYY"
      value={field.value}
      inputRef={field.ref}
      onChange={field.onChange}
      slotProps={{
        textField: {
          required: props.required,
          name: field.name,
          onBlur: field.onBlur,
          error: fieldState.invalid,
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
}

export default CDatePicker;
