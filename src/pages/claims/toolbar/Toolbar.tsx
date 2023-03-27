import React from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconChange from '@mui/icons-material/PublishedWithChanges';
import IconArrow from '@mui/icons-material/Shortcut';

type Props = {
  isArchive?: boolean;
};

function ClaimsToolbar({ isArchive }: Props) {
  return (
    <Paper className={styles.root}>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'secondary'}
        startIcon={<IconAdd />}
      >
        Создать
      </Button>
      <div className={styles.btnGroup}>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          startIcon={<IconOpen />}
        >
          Открыть
        </Button>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          startIcon={<IconEdit />}
        >
          Изменить
        </Button>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          startIcon={<IconChange />}
        >
          Поменять статус
        </Button>
      </div>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'tertiary'}
        startIcon={<IconArrow />}
      >
        К клиенту
      </Button>
    </Paper>
  );
}

export default ClaimsToolbar;
