import React from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconPersonOff from '@mui/icons-material/PersonOffOutlined';
import IconReplay from '@mui/icons-material/Replay';
import { EditModes, ViewModes } from '../../../globals/types';
import { Collapse, useMediaQuery } from '@mui/material';

type Props = {
  isArchive?: boolean;
  viewMode?: ViewModes;
  isSelected?: boolean;
  onOpenEditDialog: (editMode: EditModes) => void;
};

function EmployeesToolbar(props: Props) {
  const matches = useMediaQuery('(min-width: 1650px)');

  return (
    <Paper className={styles.root}>
      {!props.isArchive && (
        <Button
          className={`${styles.btn} ${styles.btnMini}`}
          variant={'contained'}
          color={'secondary'}
          onClick={() => props.onOpenEditDialog(EditModes.Create)}
        >
          <IconAdd />
          <Collapse in={matches} orientation={'horizontal'}>
            <p>Добавить</p>
          </Collapse>
        </Button>
      )}
      <div className={styles.btnGroup}>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          disabled={!props.isSelected}
          onClick={() => props.onOpenEditDialog(EditModes.View)}
        >
          <IconOpen />
          <Collapse in={matches} orientation={'horizontal'}>
            <p>Просмотреть</p>
          </Collapse>
        </Button>
        {!props.isArchive && (
          <Button
            className={styles.btn}
            variant={'contained'}
            color={'primary'}
            disabled={!props.isSelected}
            onClick={() => props.onOpenEditDialog(EditModes.Edit)}
          >
            <IconEdit />
            <Collapse in={matches} orientation={'horizontal'}>
              <p>Изменить</p>
            </Collapse>
          </Button>
        )}
      </div>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'tertiary'}
        disabled={!props.isSelected}
      >
        {props.isArchive ? <IconReplay /> : <IconPersonOff />}
        <Collapse in={matches} orientation={'horizontal'}>
          <p>{props.isArchive ? 'Восстановить' : 'Уволить'}</p>
        </Collapse>
      </Button>
    </Paper>
  );
}

export default EmployeesToolbar;
