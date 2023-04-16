import React from 'react';
import styles from './Toolbar.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import IconOpen from '@mui/icons-material/OpenInNew';
import IconEdit from '@mui/icons-material/Edit';
import IconChange from '@mui/icons-material/PublishedWithChanges';
import IconArrow from '@mui/icons-material/Shortcut';
import { EditModes, ViewModes } from '../../../globals/types';
import { Collapse, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UrlPages } from '../../../globals/urlPages';

type TProps = {
  isArchive?: boolean;
  viewMode?: ViewModes;
  isSelected?: boolean;
  onOpenEditDialog: (editMode: EditModes) => void;
  curItemID?: number;
};

function ClaimsToolbar(props: TProps) {
  const matches = useMediaQuery('(min-width: 1650px)');
  const navigate = useNavigate();

  const onGoToCustomerHandler = () => {
    navigate(`${UrlPages.Customers}/${props.curItemID}`);
  };

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
          >
            <IconChange />
            <Collapse in={matches} orientation={'horizontal'}>
              <p>Поменять статус</p>
            </Collapse>
          </Button>
        )}
      </div>
      <Button
        className={`${styles.btn} ${styles.btnMini}`}
        variant={'contained'}
        color={'tertiary'}
        disabled={!props.isSelected || props.curItemID === undefined}
        onClick={onGoToCustomerHandler}
      >
        <IconArrow />
        <Collapse in={matches} orientation={'horizontal'}>
          <p>К клиенту</p>
        </Collapse>
      </Button>
    </Paper>
  );
}

export default ClaimsToolbar;
