import React from 'react';
import styles from './PrcessesClaims.module.css';
import { Typography } from '@mui/material';

class ProcessesClaims extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <Typography variant={'h1'}>Процессы заявок</Typography>
        </div>
        <div className={styles.toolbar}></div>
        <div className={styles.content}></div>
      </div>
    );
  }
}

export default ProcessesClaims;
