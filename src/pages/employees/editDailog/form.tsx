import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CTextField from '../../../components/cTextField/CTextField';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';
import { Control, UseFormSetValue } from 'react-hook-form';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';
import {
  GetListFreedomTypes,
  GetListLevelAccess,
  GetListPositions,
} from '../../../api/lists/methods';
import CPasswordField from '../../../components/cPasswordField/CPasswordField';
import { TEmployeeState } from './data';
import { FreedomTypes } from '../../../globals/types';
import dayjs from 'dayjs';

type TProps = {
  isViewMode: boolean;
  isEditMode: boolean;
  isCreateMode: boolean;
  control: Control<any>;
  onSubmit?: any;
  setValue: UseFormSetValue<TEmployeeState>;
};

export function FormEmployee(props: TProps) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={6}>
        <CTextField
          name={'fio'}
          label={'ФИО'}
          fullWidth
          disabled={props.isViewMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateAppointments'}
          label={'Дата назначения'}
          disabled={props.isViewMode || props.isEditMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'login'}
          label={'Логин'}
          fullWidth
          disabled={props.isViewMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        {props.isCreateMode && (
          <CPasswordField
            name={'password'}
            control={props.control}
            label={'Пароль'}
            fullWidth
            disabled={props.isViewMode}
            required
          />
        )}
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'position'}
          label={'Должность'}
          fullWidth
          onLoadData={GetListPositions}
          required
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'levelAccess'}
          label={'Доступ'}
          fullWidth
          onLoadData={GetListLevelAccess}
          required
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'freedomType'}
          label={'Доступность'}
          fullWidth
          onLoadData={GetListFreedomTypes}
          required
          disabled={props.isViewMode}
          onChangeValue={(value) => {
            if (value === FreedomTypes.Fired) {
              props.setValue('dateOfDismissal', dayjs());
            } else if (value !== '') {
              props.setValue('dateOfDismissal', null);
            }
          }}
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateOfDismissal'}
          label={'Дата увольнения'}
          disabled
          control={props.control}
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'phoneNumber'}
          label={'Телефон'}
          fullWidth
          disabled={props.isViewMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CTextField
          name={'emailAddress'}
          label={'Email'}
          fullWidth
          disabled={props.isViewMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={12}>
        <CTextField
          name={'addressOfResidence'}
          control={props.control}
          label={'Адрес проживания'}
          fullWidth
          multiline
          maxRows={2}
          required
          disabled={props.isViewMode}
        />
      </Grid>
    </Grid>
  );
}
