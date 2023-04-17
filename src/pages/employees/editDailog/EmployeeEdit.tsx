import React, { useCallback, useEffect, useState } from 'react';
import styles from './EmployeeEdit.module.css';
import BaseDialog from '../../../components/baseDialog/BaseDialog';
import { EditModes } from '../../../globals/types';
import { CircularProgress, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconClose from '@mui/icons-material/Close';
import IconSave from '@mui/icons-material/SaveOutlined';
import { GetEmployeeByID } from '../../../api/employee/methods';
import { enqueueSnackbar } from 'notistack';
import IEmployeeData from '../../../models/employee/EmployeeData';
import { FormEmployee } from './form';
import { GetEmployeeDataFromFields, GetInitStateFieldsData, TEmployeeState } from './data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetEmployeeValidation } from './validation';

type Props = {
  onClose: () => void;
  onSave?: (data: IEmployeeData) => void;
  isOpen: boolean;
  editMode: EditModes;
  selectID: number;
  isLoading?: boolean;
};

function EmployeeEdit(props: Props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const [dataField, setDataField] = useState<TEmployeeState>(GetInitStateFieldsData());
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm<TEmployeeState>({
    resolver: yupResolver(GetEmployeeValidation(isCreateMode)),
    values: dataField,
  });

  useEffect(() => {
    if (isCreateMode || props.selectID === 0) {
      return;
    }

    setLoading(true);
    const result = GetEmployeeByID(props.selectID);
    result.then(
      (employee) => {
        setDataField(GetInitStateFieldsData(employee));
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, []);

  const onSubmit = useCallback((data: TEmployeeState) => {
    if (props.onSave !== undefined) {
      return props.onSave(GetEmployeeDataFromFields(data));
    }
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
      {loading || props.isLoading ? (
        <div className={styles.loading}>
          <CircularProgress color="inherit" />
          <p>Загрузка</p>
        </div>
      ) : (
        <FormEmployee
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

export default EmployeeEdit;
