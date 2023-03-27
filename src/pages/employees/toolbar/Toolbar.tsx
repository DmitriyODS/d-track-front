import React from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconPersonOff from '@mui/icons-material/PersonOffOutlined';
import IconReplay from '@mui/icons-material/Replay';
import { ViewModes } from '../../../globals/types';

type Props = {
  isArchive?: boolean;
  viewMode?: ViewModes;
  isSelected?: boolean;
};

function EmployeesToolbar({ isArchive, isSelected }: Props) {
  return (
    <Paper className={styles.root}>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'secondary'}
        startIcon={<IconAdd />}
      >
        Добавить
      </Button>
      <div className={styles.btnGroup}>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          startIcon={<IconOpen />}
          disabled={!isSelected}
        >
          Открыть
        </Button>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          startIcon={<IconEdit />}
          disabled={!isSelected}
        >
          Изменить
        </Button>
      </div>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'tertiary'}
        disabled={!isSelected}
        startIcon={isArchive ? <IconReplay /> : <IconPersonOff />}
      >
        {isArchive ? 'Восстановить' : 'Уволить'}
      </Button>
    </Paper>
  );
}

export default EmployeesToolbar;
