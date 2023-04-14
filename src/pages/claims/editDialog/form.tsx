import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Control, UseFormSetValue } from 'react-hook-form';
import { TClaimState } from './data';
import CTextField from '../../../components/cTextField/CTextField';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';
import {
  GetListClaimStates,
  GetListCustomers,
  GetListEmployees,
  GetListServices,
} from '../../../api/lists/methods';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';
import { ClaimStates } from '../../../globals/types';
import dayjs from 'dayjs';

type TProps = {
  isViewMode: boolean;
  isEditMode: boolean;
  isCreateMode: boolean;
  control: Control<any>;
  onSubmit?: any;
  setValue: UseFormSetValue<TClaimState>;
};

export function FormClaim(props: TProps) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={6}>
        <CTextField
          fullWidth
          label="Номер заявки"
          disabled
          name={'number'}
          control={props.control}
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateCreated'}
          label={'Дата открытия'}
          disabled
          control={props.control}
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'customer'}
          label={'Клиент'}
          fullWidth
          onLoadData={GetListCustomers}
          required
          disabled={props.isViewMode || props.isEditMode}
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'serviceType'}
          label={'Тип услуги'}
          fullWidth
          onLoadData={GetListServices}
          required
          disabled={props.isViewMode || props.isEditMode}
        />
      </Grid>
      <Grid xs={12}>
        <CTextField
          fullWidth
          label="Предмет заявки"
          disabled={props.isViewMode || props.isEditMode}
          name={'subject'}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={12}>
        <CTextField
          fullWidth
          label="Описание"
          disabled={props.isViewMode}
          name={'description'}
          control={props.control}
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'status'}
          label={'Статус'}
          fullWidth
          required
          onLoadData={GetListClaimStates}
          disabled={props.isViewMode}
          onChangeValue={(value) => {
            if (value === ClaimStates.Close) {
              props.setValue('dateCompleted', dayjs());
            } else if (value !== '') {
              props.setValue('dateCompleted', null);
            }
          }}
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'executor'}
          label={'Исполнитель'}
          required
          fullWidth
          onLoadData={GetListEmployees}
          disabled={props.isViewMode}
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateEstimatedCompletion'}
          label={'Ор. дата закрытия'}
          disabled={props.isViewMode}
          control={props.control}
          required
        />
      </Grid>
      <Grid xs={6}>
        <CDatePicker
          name={'dateCompleted'}
          label={'Дата закрытия'}
          disabled
          control={props.control}
        />
      </Grid>
    </Grid>
  );
}
