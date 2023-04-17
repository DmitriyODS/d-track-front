import React, { useCallback, useEffect, useState } from 'react';
import styles from './CustomerEdit.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import BaseDialog from '../../../components/baseDialog/BaseDialog';
import { CircularProgress, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconClose from '@mui/icons-material/Close';
import IconSave from '@mui/icons-material/SaveOutlined';
import ICustomerData from '../../../models/customer/CustomerData';
import { EditModes } from '../../../globals/types';
import { GetCustomerDataFromFields, TCustomerState } from './data';
import { GetInitStateFieldsData } from './data';
import { GetCustomerValidation } from './validation';
import { GetCustomerByID } from '../../../api/customer/methods';
import { FormCustomer } from './form';

type TProps = {
  onClose: () => void;
  onSave?: (data: ICustomerData) => void;
  isOpen: boolean;
  editMode: EditModes;
  selectID: number;
  isLoading?: boolean;
};

function CustomerEdit(props: TProps) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const [dataField, setDataField] = useState<TCustomerState>(GetInitStateFieldsData());
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm<TCustomerState>({
    resolver: yupResolver(GetCustomerValidation(isCreateMode)),
    values: dataField,
  });

  useEffect(() => {
    if (isCreateMode || props.selectID === 0) {
      return;
    }

    setLoading(true);
    const result = GetCustomerByID(props.selectID);
    result.then(
      (customer) => {
        setDataField(GetInitStateFieldsData(customer));
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, []);

  const onSubmit = useCallback((data: TCustomerState) => {
    if (props.onSave !== undefined) {
      return props.onSave(GetCustomerDataFromFields(data));
    }
  }, []);

  return (
    <BaseDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={'Клиент'}
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
        <FormCustomer
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

export default CustomerEdit;
