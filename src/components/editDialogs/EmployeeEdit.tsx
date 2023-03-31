import React, { useEffect, useState } from 'react';
import styles from './EmployeeEdit.module.css';
import InputSelect, { ItemSelect } from '../inputSelect/InputSelect';
import BaseDialog from '../baseDialog/BaseDialog';
import { EditModes } from '../../globals/types';
import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconClose from '@mui/icons-material/Close';
import IconSave from '@mui/icons-material/SaveOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import EmployeeData, {
  CreateEmptyEmployee,
} from '../../models/employee/EmployeeData';
import { GetEmployeeByID } from '../../api/employees';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';

type Props = {
  onClose: () => void;
  onSave?: (data: EmployeeData) => void;
  isOpen: boolean;
  editMode: EditModes;
  selectID?: number;
};

function EmployeeEdit(props: Props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const [data, setData] = useState<EmployeeData>(CreateEmptyEmployee());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      props.editMode === EditModes.Create ||
      props.selectID === undefined ||
      props.selectID === 0
    ) {
      return;
    }

    setLoading(true);
    const result = GetEmployeeByID(props.selectID);
    result.then(
      (value) => {
        if (!value.ok) {
          enqueueSnackbar(`Ошибка: ${value.description}`, { variant: 'error' });
          return;
        }

        setData(value.data!);
      },
      () => {
        enqueueSnackbar('Сервер не доступен', { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, []);

  const getTestingData = (count: number) => {
    const testData: ItemSelect[] = [];

    for (let i = 0; i < count; ++i) {
      testData.push({ id: i + 1, value: `${i + 1}`, label: `Item ${i + 1}` });
    }

    return testData;
  };

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
        <div>Loading</div>
      ) : (
        <Grid container spacing={4} mt={1} mb={1}>
          <Grid xs={6}>
            <TextField
              fullWidth
              label="ФИО"
              variant="outlined"
              disabled={isViewMode}
              value={data.fio}
              onChange={(e) => {
                setData((prev) => ({ ...prev, fio: e.target.value }));
              }}
            />
          </Grid>
          <Grid xs={6}>
            <DatePicker
              sx={{ width: '100%' }}
              label="Дата назначения"
              disabled={isViewMode || isEditMode}
              format="DD.MM.YYYY"
              value={
                data.date_appointments !== 0
                  ? dayjs.unix(data.date_appointments)
                  : undefined
              }
              onChange={(value) => {
                setData((prev) => ({
                  ...prev,
                  date_appointments: 1424,
                }));
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              label="Логин"
              variant="outlined"
              disabled={isViewMode}
              value={data.login}
              onChange={(e) => {
                setData((prev) => ({ ...prev, login: e.target.value }));
              }}
            />
          </Grid>
          <Grid xs={6}>
            {isCreateMode && (
              <TextField
                fullWidth
                label="Пароль"
                variant="outlined"
                disabled={isViewMode}
              />
            )}
          </Grid>
          <Grid xs={6}>
            <InputSelect
              label={'Должность'}
              fullWidth
              disabled={isViewMode}
              initData={getTestingData(12)}
            />
          </Grid>
          <Grid xs={6}>
            <InputSelect
              label={'Доступ'}
              fullWidth
              disabled={isViewMode}
              initData={getTestingData(12)}
            />
          </Grid>
          <Grid xs={6}>
            <InputSelect
              label={'Доступность'}
              fullWidth
              disabled={isViewMode}
              initData={getTestingData(12)}
            />
          </Grid>
          <Grid xs={6}>
            <DatePicker
              sx={{ width: '100%' }}
              label="Дата увольнения"
              disabled
              format="DD.MM.YYYY"
              value={
                data.date_of_dismissal === 0
                  ? undefined
                  : dayjs.unix(data.date_of_dismissal)
              }
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              label="Телефон"
              variant="outlined"
              disabled={isViewMode}
              value={data.phone_number}
              onChange={(e) => {
                setData((prev) => ({ ...prev, phone_number: e.target.value }));
              }}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label={'Email'}
              fullWidth
              variant="outlined"
              disabled={isViewMode}
              value={data.email_address}
              onChange={(e) => {
                setData((prev) => ({ ...prev, email_address: e.target.value }));
              }}
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
              value={data.address_of_residence}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  address_of_residence: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
      )}
      <DialogActions className={styles.spacing}>
        <Button
          variant={'contained'}
          color={'tertiary'}
          disableElevation
          startIcon={<IconClose />}
          onClick={props.onClose}
        >
          Закрыть
        </Button>
        {!isViewMode && (
          <Button
            variant={'contained'}
            color={'secondary'}
            disableElevation
            startIcon={<IconSave />}
          >
            Сохранить
          </Button>
        )}
      </DialogActions>
    </BaseDialog>
  );
}

export default EmployeeEdit;
