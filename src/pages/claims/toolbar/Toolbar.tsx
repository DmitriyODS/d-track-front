import React from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconChange from '@mui/icons-material/PublishedWithChanges';
import IconArrow from '@mui/icons-material/Shortcut';
import { ViewModes } from '../../../globals/types';

type Props = {
  isArchive?: boolean;
  viewMode?: ViewModes;
  isSelected?: boolean;
};

function ClaimsToolbar(props: Props) {
  return (
    <Paper className={styles.root}>
      {!props.isArchive && (
        <Button
          className={`${styles.btn} ${styles.btnMini}`}
          variant={'contained'}
          color={'secondary'}
          startIcon={<IconAdd />}
        >
          Создать
        </Button>
      )}
      <div className={styles.btnGroup}>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          startIcon={<IconOpen />}
          disabled={!props.isSelected}
        >
          Просмотреть
        </Button>
        {!props.isArchive && (
          <Button
            className={styles.btn}
            variant={'contained'}
            color={'primary'}
            startIcon={<IconEdit />}
            disabled={!props.isSelected}
          >
            Изменить
          </Button>
        )}
        {!props.isArchive && (
          <Button
            className={styles.btn}
            variant={'contained'}
            color={'primary'}
            startIcon={<IconChange />}
            disabled={!props.isSelected}
          >
            Поменять статус
          </Button>
        )}
      </div>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'tertiary'}
        startIcon={<IconArrow />}
        disabled={!props.isSelected}
      >
        К клиенту
      </Button>
    </Paper>
  );
}

export default ClaimsToolbar;
