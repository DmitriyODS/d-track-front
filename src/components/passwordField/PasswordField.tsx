import React, { useCallback } from 'react';
import styles from './PasswordField.module.css';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type TProps = {
  name: string;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  refCom?: any;
  onBlur?: any;
  error?: boolean;
  helperText?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function PasswordField(props: TProps) {
  const [isShow, setShow] = React.useState(false);

  const onSwitchShowPasswordHandler = useCallback(() => {
    setShow((curVal) => !curVal);
  }, []);

  return (
    <FormControl
      variant={'outlined'}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      required={props.required}
      error={props.error}
      color={'textInput'}
    >
      <InputLabel htmlFor={`${props.name}-password-filed`}>{props.label}</InputLabel>
      <OutlinedInput
        className={styles.root}
        name={props.name}
        id={`${props.name}-password-filed`}
        type={isShow ? 'text' : 'password'}
        inputRef={props.refCom}
        onBlur={props.onBlur}
        value={props.value}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onSwitchShowPasswordHandler}
              edge="end"
            >
              {isShow ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
      />
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
