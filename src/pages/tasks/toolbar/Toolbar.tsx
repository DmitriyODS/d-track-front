import React, { useRef, useState } from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconChange from '@mui/icons-material/PublishedWithChanges';
import { EditModes, TaskStates, ViewModes } from '../../../globals/types';
import { Collapse, useMediaQuery } from '@mui/material';
import { StatesMenu } from './StatesMenu';

type TProps = {
  isArchive?: boolean;
  viewMode?: ViewModes;
  isSelected?: boolean;
  onOpenEditDialog: (editMode: EditModes) => void;
  onChangeStatus: (newState: TaskStates) => void;
};

function TasksToolbar(props: TProps) {
  const [isOpenStateMenu, setOpenStateMenu] = useState(false);
  const btnRef = useRef<any>(null);
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
            <p>Создать</p>
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
        {!props.isArchive && (
          <Button
            className={styles.btn}
            variant={'contained'}
            color={'primary'}
            disabled={!props.isSelected}
            ref={btnRef}
            onClick={() => setOpenStateMenu(true)}
          >
            <IconChange />
            <Collapse in={matches} orientation={'horizontal'}>
              <p>Поменять статус</p>
            </Collapse>
          </Button>
        )}
        <StatesMenu
          isOpen={isOpenStateMenu}
          anchorEl={btnRef.current}
          onChangeState={(newState: TaskStates) => {
            props.onChangeStatus(newState);
            setOpenStateMenu(false);
          }}
          onClose={() => setOpenStateMenu(false)}
        />
      </div>
    </Paper>
  );
}

export default TasksToolbar;
