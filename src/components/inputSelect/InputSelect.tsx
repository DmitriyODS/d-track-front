import React from 'react';
import styles from './InputSelect.module.css';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export type TSelectItem = {
  id: number;
  value: string;
  label: string;
};

type Props = {
  id?: string;
  label?: string;
  onChange?: (event: SelectChangeEvent) => void;
  value?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  initData: TSelectItem[];
};

function InputSelect(props: Props) {
  return (
    <FormControl fullWidth={props.fullWidth} disabled={props.disabled} color={'textInput'}>
      <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.id}-label`}
        id={props.id}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        variant={'outlined'}
        className={styles.root}
      >
        {props.initData.length === 0 ? (
          <MenuItem value={''}>Нет элементов для выбора</MenuItem>
        ) : (
          props.initData.map((it) => (
            <MenuItem key={it.id} value={it.value}>
              {it.label}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}

export default InputSelect;
