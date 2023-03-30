import React from 'react';
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

type Props = {
  onClose: () => void;
  onSave: (data: any) => void;
  isOpen: boolean;
  initData?: any;
  editMode: EditModes;
};

function EmployeeEdit(props: Props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

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
      <Grid container spacing={4} mt={1} mb={1}>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="ФИО"
            variant="outlined"
            disabled={isViewMode}
          />
        </Grid>
        <Grid xs={6}>
          <DatePicker
            sx={{ width: '100%' }}
            label="Дата назначения"
            disabled={isViewMode || isEditMode}
            format="DD.MM.YYYY"
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Логин"
            variant="outlined"
            disabled={isViewMode}
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
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Телефон"
            variant="outlined"
            disabled={isViewMode}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            label={'Email'}
            fullWidth
            variant="outlined"
            disabled={isViewMode}
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
          />
        </Grid>
      </Grid>
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
