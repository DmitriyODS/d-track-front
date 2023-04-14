import React, { useCallback, useEffect, useState } from 'react';
import styles from './ClaimEdit.module.css';
import BaseDialog from '../../../components/baseDialog/BaseDialog';
import { CircularProgress, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconSave from '@mui/icons-material/SaveOutlined';
import IconClose from '@mui/icons-material/Close';
import { EditModes } from '../../../globals/types';
import IClaimData from '../../../models/claim/ClaimData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetClaimDataFromFields, GetInitStateFieldsData, TClaimState } from './data';
import { GetClaimValidation } from './validation';
import { enqueueSnackbar } from 'notistack';
import { GetClaimByID } from '../../../api/claim/methods';
import { FormClaim } from './form';

type Props = {
  onClose: () => void;
  onSave?: (data: IClaimData) => void;
  isOpen: boolean;
  editMode: EditModes;
  selectID: number;
  isLoading?: boolean;
};

function ClaimEdit(props: Props) {
  const isViewMode = props.editMode === EditModes.View;
  const isEditMode = props.editMode === EditModes.Edit;
  const isCreateMode = props.editMode === EditModes.Create;

  const [dataField, setDataField] = useState<TClaimState>(GetInitStateFieldsData());
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm<TClaimState>({
    resolver: yupResolver(GetClaimValidation(isCreateMode)),
    values: dataField,
  });

  useEffect(() => {
    if (isCreateMode || props.selectID === 0) {
      return;
    }

    setLoading(true);
    const result = GetClaimByID(props.selectID);
    result.then(
      (claim) => {
        setDataField(GetInitStateFieldsData(claim));
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );
    result.finally(() => setLoading(false));
  }, []);

  const onSubmit = useCallback((data: TClaimState) => {
    if (props.onSave !== undefined) {
      return props.onSave(GetClaimDataFromFields(data));
    }
  }, []);

  return (
    <BaseDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={'Заявка'}
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
        <FormClaim
          control={control}
          isEditMode={isEditMode}
          isCreateMode={isCreateMode}
          isViewMode={isViewMode}
          onSubmit={props.onSave}
          setValue={setValue}
        />
      )}
      {!loading && (
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

export default ClaimEdit;
