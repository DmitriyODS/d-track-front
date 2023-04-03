import React, { useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import PasswordField from '../passwordField/PasswordField';

type TProps = {
  name: string;
  control: Control<any>;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChangeValue?: (value: any) => void;
};

function CPasswordField(props: TProps) {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
  });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <PasswordField
      fullWidth={props.fullWidth}
      label={props.label}
      disabled={props.disabled}
      value={field.value}
      refCom={field.ref}
      onBlur={field.onBlur}
      onChange={field.onChange}
      name={field.name}
      required={props.required}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
    />
  );
}

export default CPasswordField;
