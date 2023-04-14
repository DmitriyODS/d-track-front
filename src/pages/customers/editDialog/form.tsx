import { Control, UseFormSetValue } from 'react-hook-form';
import { TCustomerState } from './data';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CTextField from '../../../components/cTextField/CTextField';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';

type TProps = {
  isViewMode: boolean;
  isEditMode: boolean;
  isCreateMode: boolean;
  control: Control<any>;
  onSubmit?: any;
  setValue: UseFormSetValue<TCustomerState>;
};

export function FormCustomer(props: TProps) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={6}>
        <CTextField
          fullWidth
          label="ФИО"
          disabled={props.isViewMode}
          name={'fio'}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateCreated'}
          label={'Дата создания'}
          disabled
          control={props.control}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          fullWidth
          label="Телефон"
          disabled={props.isViewMode}
          name={'phone'}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          fullWidth
          label="Email"
          disabled={props.isViewMode}
          name={'email'}
          control={props.control}
          typeField={'email'}
          required
        />
      </Grid>
      <Grid xs={12}>
        <CTextField
          fullWidth
          label="Адрес"
          disabled={props.isViewMode}
          name={'address'}
          control={props.control}
          required
        />
      </Grid>
    </Grid>
  );
}
