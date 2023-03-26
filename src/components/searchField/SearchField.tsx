import React from 'react';
import styles from './SearchField.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconSearch from '@mui/icons-material/ManageSearchSharp';

type SearchProps = {
  placeholder: string;
};

function SearchField(props: SearchProps) {
  return (
    <OutlinedInput
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
      }}
      color={'primaryInvert'}
      className={styles.root}
      placeholder={props.placeholder}
      startAdornment={
        <InputAdornment position={'start'}>
          <IconSearch
            sx={{ color: 'text.primary', fontSize: '2rem' }}
            className={styles.icon}
          />
        </InputAdornment>
      }
    ></OutlinedInput>
  );
}

export default SearchField;
