import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { TTaskState } from './data';
import Grid from '@mui/material/Unstable_Grid2';
import CTextField from '../../../components/cTextField/CTextField';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';
import { GetListEmployees, GetListTaskStates } from '../../../api/lists/methods';
import { TaskStates } from '../../../globals/types';
import dayjs from 'dayjs';

type TProps = {
  isViewMode: boolean;
  isEditMode: boolean;
  isCreateMode: boolean;
  control: Control<any>;
  onSubmit?: any;
  setValue: UseFormSetValue<TTaskState>;
};

export function FormTask(props: TProps) {
  return (
    <Grid container spacing={4} mt={1} mb={1}>
      <Grid xs={6}>
        <CTextField
          fullWidth
          label="Номер задачи"
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
      <Grid xs={12}>
        <CTextField
          fullWidth
          label="Заголовок"
          disabled={props.isViewMode || props.isEditMode}
          name={'name'}
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
      <Grid xs={12}>
        <CInputSelect
          control={props.control}
          name={'creator'}
          label={'Создатель'}
          fullWidth
          onLoadData={GetListEmployees}
          required
          disabled
        />
      </Grid>
      <Grid xs={6}>
        <CInputSelect
          control={props.control}
          name={'status'}
          label={'Статус'}
          fullWidth
          onLoadData={GetListTaskStates}
          disabled={props.isViewMode}
          required
          onChangeValue={(value) => {
            if (value === TaskStates.Close) {
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
