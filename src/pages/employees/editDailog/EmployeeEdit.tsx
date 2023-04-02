import React, { useCallback, useEffect, useReducer, useState } from 'react';
import styles from './EmployeeEdit.module.css';
import InputSelect from '../../../components/inputSelect/InputSelect';
import BaseDialog from '../../../components/baseDialog/BaseDialog';
import { EditModes } from '../../../globals/types';
import { CircularProgress, DialogActions, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import IconClose from '@mui/icons-material/Close';
import IconSave from '@mui/icons-material/SaveOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { GetEmployeeByID } from '../../../api/employee/methods';
import { enqueueSnackbar } from 'notistack';
import IEmployeeData from '../../../models/employee/EmployeeData';
import { EditEmployeeReducer, NameFields } from './reducer';
import { GetInitStateFieldsData } from './data';
import { GetListFreedomTypes, GetListLevelAccess, GetListPositions } from '../../../api/lists/methods';

type Props = {
  onClose: () => void;
  onSave?: (data: IEmployeeData) => void;
  isOpen: boolean;
  editMode: EditModes;
  selectID: number;
};

function EmployeeEdit(props: Props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const [state, dispatch] = useReducer(EditEmployeeReducer, GetInitStateFieldsData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCreateMode || props.selectID === 0) {
      return;
    }

    setLoading(true);
    const result = GetEmployeeByID(props.selectID);
    result.then(
      (employee) => {
        dispatch({ type: NameFields.init, payload: GetInitStateFieldsData(employee) });
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, []);

  const onChangeFio = useCallback((event: any) => {
    dispatch({ type: NameFields.fio, payload: event.target.value });
  }, []);

  const onChangeDateAppointments = useCallback((value: any) => {
    dispatch({ type: NameFields.dateAppointments, payload: value });
  }, []);

  const onChangeFreedomType = useCallback((event: SelectChangeEvent) => {
    dispatch({ type: NameFields.freedomType, payload: event.target.value });
  }, []);

  const onChangeDateOfDismissal = useCallback((value: any) => {
    dispatch({ type: NameFields.dateOfDismissal, payload: value });
  }, []);

  const onChangePosition = useCallback((event: SelectChangeEvent) => {
    dispatch({ type: NameFields.position, payload: event.target.value });
  }, []);

  const onChangePhoneNumber = useCallback((event: any) => {
    dispatch({ type: NameFields.phoneNumber, payload: event.target.value });
  }, []);

  const onChangeEmailAddress = useCallback((event: any) => {
    dispatch({ type: NameFields.emailAddress, payload: event.target.value });
  }, []);

  const onChangeAddressOfResidence = useCallback((event: any) => {
    dispatch({ type: NameFields.addressOfResidence, payload: event.target.value });
  }, []);

  const onChangeLevelAccess = useCallback((event: SelectChangeEvent) => {
    dispatch({ type: NameFields.levelAccess, payload: event.target.value });
  }, []);

  const onChangePassword = useCallback((event: any) => {
    dispatch({ type: NameFields.password, payload: event.target.value });
  }, []);

  const onChangeLogin = useCallback((event: any) => {
    dispatch({ type: NameFields.login, payload: event.target.value });
  }, []);

  return (
    <BaseDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={'Сотрудник'}
      className={styles.root}
      disableEscapeKeyDown
      maxWidth={'md'}
    >
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress color="inherit" />
          <p>Загрузка</p>
        </div>
      ) : (
        <Grid container spacing={4} mt={1} mb={1}>
          <Grid xs={6}>
            <TextField
              fullWidth
              label="ФИО"
              variant="outlined"
              disabled={isViewMode}
              value={state.fio}
              onChange={onChangeFio}
            />
          </Grid>
          <Grid xs={6}>
            <DatePicker
              sx={{ width: '100%' }}
              label="Дата назначения"
              disabled={isViewMode || isEditMode}
              format="DD.MM.YYYY"
              value={state.dateAppointments}
              onChange={onChangeDateAppointments}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              label="Логин"
              variant="outlined"
              disabled={isViewMode}
              value={state.login}
              onChange={onChangeLogin}
            />
          </Grid>
          <Grid xs={6}>
            {isCreateMode && (
              <TextField
                fullWidth
                label="Пароль"
                variant="outlined"
                disabled={isViewMode}
                value={state.password}
                onChange={onChangePassword}
              />
            )}
          </Grid>
          <Grid xs={6}>
            <InputSelect
              label={'Должность'}
              fullWidth
              disabled={isViewMode}
              value={state.position}
              onChange={onChangePosition}
              onLoadData={GetListPositions}
            />
          </Grid>
          <Grid xs={6}>
            <InputSelect
              label={'Доступ'}
              fullWidth
              disabled={isViewMode}
              value={state.levelAccess}
              onChange={onChangeLevelAccess}
              onLoadData={GetListLevelAccess}
            />
          </Grid>
          <Grid xs={6}>
            <InputSelect
              label={'Доступность'}
              fullWidth
              disabled={isViewMode}
              value={state.freedomType}
              onChange={onChangeFreedomType}
              onLoadData={GetListFreedomTypes}
            />
          </Grid>
          <Grid xs={6}>
            <DatePicker
              sx={{ width: '100%' }}
              label="Дата увольнения"
              disabled
              format="DD.MM.YYYY"
              value={state.dateOfDismissal}
              onChange={onChangeDateOfDismissal}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              label="Телефон"
              variant="outlined"
              disabled={isViewMode}
              value={state.phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label={'Email'}
              fullWidth
              variant="outlined"
              disabled={isViewMode}
              value={state.emailAddress}
              onChange={onChangeEmailAddress}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Адрес проживания"
              variant="outlined"
              multiline
              maxRows={2}
              disabled={isViewMode}
              value={state.addressOfResidence}
              onChange={onChangeAddressOfResidence}
            />
          </Grid>
        </Grid>
      )}
      {!loading && (
        <DialogActions className={styles.spacing}>
          <Button variant={'contained'} color={'tertiary'} disableElevation startIcon={<IconClose />} onClick={props.onClose}>
            Закрыть
          </Button>
          {!isViewMode && (
            <Button variant={'contained'} color={'secondary'} disableElevation startIcon={<IconSave />}>
              Сохранить
            </Button>
          )}
        </DialogActions>
      )}
    </BaseDialog>
  );
}

export default EmployeeEdit;
