import React from 'react';
import styles from './Tasks.module.css';
import { Typography } from '@mui/material';

class Tasks extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <Typography variant={'h1'}>Задачи</Typography>
        </div>
        <div className={styles.toolbar}></div>
        <div className={styles.content}></div>
      </div>
    );
  }
}

export default Tasks;
