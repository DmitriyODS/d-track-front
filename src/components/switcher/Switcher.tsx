import React from 'react';
import styles from './Switcher.module.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

type Props = {
  children?: React.ReactNode;
  isArchive?: boolean;
  textOne: string;
  textTwo: string;
  onClickOne: any;
  onClickTwo: any;
};

function Switcher(props: Props) {
  return (
    <Paper className={styles.root}>
      <Button
        sx={{ mr: '1rem' }}
        className={styles.btn}
        variant={props.isArchive ? 'text' : 'contained'}
        color={'tertiary'}
        onClick={props.onClickOne}
      >
        {props.textOne}
      </Button>
      <Button
        className={styles.btn}
        variant={props.isArchive ? 'contained' : 'text'}
        color={'tertiary'}
        onClick={props.onClickTwo}
      >
        {props.textTwo}
      </Button>
    </Paper>
  );
}

export default Switcher;
