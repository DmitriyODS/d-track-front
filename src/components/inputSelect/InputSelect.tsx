import React, { useEffect, useState } from 'react';
import styles from './InputSelect.module.css';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TFilters } from '../../api/lists/types';
import { enqueueSnackbar } from 'notistack';
import IItemData from '../../models/item/ItemData';

export type TSelectItem = {
  id: number;
  value: string;
  label: string;
};

type TProps = {
  name?: string;
  label?: string;
  onChange?: (event: SelectChangeEvent) => void;
  value: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onLoadData?: (filters: TFilters) => Promise<IItemData[]>;
  filters?: TFilters;
  required?: boolean;
  refCom?: any;
  onBlur?: any;
  error?: boolean;
  helperText?: string;
};

function GetItems(isLoading: boolean, data: TSelectItem[]) {
  if (isLoading) {
    return <MenuItem value={''}>Загрузка</MenuItem>;
  }

  if (data.length === 0) {
    return <MenuItem value={''}>Нет элементов для выбора</MenuItem>;
  }

  return data.map((it) => (
    <MenuItem key={it.id} value={it.value}>
      {it.label}
    </MenuItem>
  ));
}

function InputSelect(props: TProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TSelectItem[]>([]);

  useEffect(() => {
    if (props.onLoadData === undefined) {
      return;
    }

    setLoading(true);
    const result = props.onLoadData(props.filters ?? {});
    result.then(
      (itemsData) => {
        setData(
          itemsData.map(
            (it): TSelectItem => ({ id: it.id, label: it.value, value: it.id.toString() })
          )
        );
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, [props.filters]);

  return (
    <FormControl
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      color={'textInput'}
      required={props.required}
      error={props.error}
    >
      <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.name}-label`}
        name={props.name}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        variant={'outlined'}
        className={styles.root}
        inputRef={props.refCom}
        onBlur={props.onBlur}
      >
        {GetItems(loading, data)}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}

export default InputSelect;
