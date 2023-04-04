import React from 'react';
import styles from './SearchField.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconSearch from '@mui/icons-material/ManageSearchSharp';

type TProps = {
  placeholder: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

function SearchField(props: TProps) {
  return (
    <OutlinedInput
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
      }}
      onChange={(e) => props.onChange?.(e.target.value)}
      color={'primaryInvert'}
      className={styles.root}
      placeholder={props.placeholder}
      disabled={props.disabled}
      startAdornment={
        <InputAdornment position={'start'}>
          <IconSearch sx={{ color: 'text.primary', fontSize: '2rem' }} className={styles.icon} />
        </InputAdornment>
      }
    ></OutlinedInput>
  );
}

export default SearchField;
