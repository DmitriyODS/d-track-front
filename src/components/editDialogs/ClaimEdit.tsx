import React from 'react';
import styles from './ClaimEdit.module.css';
import BaseDialog from '../baseDialog/BaseDialog';
import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconSave from '@mui/icons-material/SaveOutlined';
import IconClose from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import InputSelect, { ItemSelect } from '../inputSelect/InputSelect';

export enum EditModes {
  Create,
  Edit,
  View,
}

type Props = {
  onClose: () => void;
  onSave: (data: any) => void;
  isOpen: boolean;
  initData?: any;
  editMode: EditModes;
};

function ClaimEdit(props: Props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;

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
      title={'Заявка'}
      className={styles.root}
      disableEscapeKeyDown
      maxWidth={'md'}
    >
      <Grid container spacing={4} mt={1} mb={1}>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Номер заявки"
            variant="outlined"
            disabled={isViewMode || isEditMode}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Дата открытия"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid xs={6}>
          <InputSelect
            label={'Клиент'}
            fullWidth
            disabled={isViewMode || isEditMode}
            initData={getTestingData(12)}
          />
        </Grid>
        <Grid xs={6}>
          <InputSelect
            label={'Вид услуги'}
            fullWidth
            disabled={isViewMode || isEditMode}
            initData={getTestingData(12)}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Предмет заявки"
            variant="outlined"
            disabled={isViewMode || isEditMode}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Описание"
            variant="outlined"
            multiline
            maxRows={4}
            disabled={isViewMode}
          />
        </Grid>
        <Grid xs={6}>
          <InputSelect
            label={'Статус'}
            fullWidth
            disabled={isViewMode}
            initData={getTestingData(4)}
          />
        </Grid>
        <Grid xs={6}>
          <InputSelect
            label={'Исполнитель'}
            fullWidth
            disabled={isViewMode}
            initData={getTestingData(4)}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Ориентировочная дата закрытия"
            variant="outlined"
            disabled={isViewMode}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Дата закрытия"
            variant="outlined"
            disabled
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

export default ClaimEdit;
