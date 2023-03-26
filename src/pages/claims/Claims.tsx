import React from 'react';
import styles from './Claims.module.css';
import { Typography } from '@mui/material';

class Claims extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <Typography variant={'h1'}>Заявки</Typography>
        </div>
        <div className={styles.toolbar}></div>
        <div className={styles.content}></div>
      </div>
    );
  }
}

export default Claims;
