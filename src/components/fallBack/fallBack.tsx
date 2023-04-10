import React from 'react';
import { CircularProgress } from '@mui/material';
import styles from './fallBack.module.css';

function FallBack() {
  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  );
}

export default FallBack;
