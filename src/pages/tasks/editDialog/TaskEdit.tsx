import React, { useCallback, useEffect, useState } from 'react';
import { EditModes } from '../../../globals/types';
import ITaskData from '../../../models/task/TaskData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { GetInitStateFieldsData, GetTaskDataFromFields, TTaskState } from './data';
import { GetTaskValidation } from './validation';
import { GetTaskByID } from '../../../api/task/methods';
import { useUser } from '../../../providers/UserProvider';
import BaseDialog from '../../../components/baseDialog/BaseDialog';
import styles from '../../claims/editDialog/ClaimEdit.module.css';
import { CircularProgress, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconClose from '@mui/icons-material/Close';
import IconSave from '@mui/icons-material/SaveOutlined';
import { FormTask } from './form';

type TProps = {
  onClose: () => void;
  onSave?: (data: ITaskData) => void;
  isOpen: boolean;
  editMode: EditModes;
  selectID: number;
  isLoading?: boolean;
};

function TaskEdit(props: TProps) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const user = useUser();
  const [dataField, setDataField] = useState<TTaskState>(
    GetInitStateFieldsData(user.User.userId.toString())
  );
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm<TTaskState>({
    resolver: yupResolver(GetTaskValidation(isCreateMode)),
    values: dataField,
  });

  useEffect(() => {
    if (isCreateMode || props.selectID === 0) {
      return;
    }

    setLoading(true);
    const result = GetTaskByID(props.selectID);
    result.then(
      (task) => {
        setDataField(GetInitStateFieldsData(user.User.userId.toString(), task));
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, []);

  const onSubmit = useCallback((data: TTaskState) => {
    if (props.onSave !== undefined) {
      return props.onSave(GetTaskDataFromFields(data));
    }
  }, []);

  return (
    <BaseDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={'Задача'}
      className={styles.root}
      disableEscapeKeyDown
      maxWidth={'md'}
    >
      {loading || props.isLoading ? (
        <div className={styles.loading}>
          <CircularProgress color="inherit" />
          <p>Загрузка</p>
        </div>
      ) : (
        <FormTask
          control={control}
          isEditMode={isEditMode}
          isCreateMode={isCreateMode}
          isViewMode={isViewMode}
          onSubmit={props.onSave}
          setValue={setValue}
        />
      )}
      {!loading && !props.isLoading && (
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
              onClick={handleSubmit(onSubmit)}
            >
              Сохранить
            </Button>
          )}
        </DialogActions>
      )}
    </BaseDialog>
  );
}

export default TaskEdit;
