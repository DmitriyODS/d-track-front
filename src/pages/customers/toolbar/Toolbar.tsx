import React from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconArrow from '@mui/icons-material/Shortcut';
import { ViewModes } from '../../../globals/types';
import { Collapse, useMediaQuery } from '@mui/material';

type Props = {
  viewMode?: ViewModes;
  isSelected?: boolean;
};

function CustomersToolbar({ isSelected }: Props) {
  const matches = useMediaQuery('(min-width: 1650px)');

  return (
    <Paper className={styles.root}>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'secondary'}
      >
        <IconAdd />
        <Collapse in={matches} orientation={'horizontal'}>
          <p>Добавить</p>
        </Collapse>
      </Button>
      <div className={styles.btnGroup}>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          disabled={!isSelected}
        >
          <IconOpen />
          <Collapse in={matches} orientation={'horizontal'}>
            <p>Просмотреть</p>
          </Collapse>
        </Button>
        <Button
          className={styles.btn}
          variant={'contained'}
          color={'primary'}
          disabled={!isSelected}
        >
          <IconEdit />
          <Collapse in={matches} orientation={'horizontal'}>
            <p>Изменить</p>
          </Collapse>
        </Button>
      </div>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'tertiary'}
        disabled={!isSelected}
      >
        <IconArrow />
        <Collapse in={matches} orientation={'horizontal'}>
          <p>К заявкам</p>
        </Collapse>
      </Button>
    </Paper>
  );
}

export default CustomersToolbar;
