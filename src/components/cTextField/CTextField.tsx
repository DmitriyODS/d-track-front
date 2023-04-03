import React, { useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type TProps = {
  name: string;
  control: Control<any>;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  maxRows?: number;
  typeField?: string;
  onChangeValue?: (value: any) => void;
};

function CTextField(props: TProps) {
  const { field, fieldState } = useController({ name: props.name, control: props.control });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      variant={'outlined'}
      disabled={props.disabled}
      value={field.value}
      inputRef={field.ref}
      onBlur={field.onBlur}
      onChange={field.onChange}
      name={field.name}
      required={props.required}
      multiline={props.multiline}
      maxRows={props.maxRows}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      type={props.typeField}
    />
  );
}

export default CTextField;
