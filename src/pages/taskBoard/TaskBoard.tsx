import React from 'react';
import styles from './TaskBoard.module.css';
import { Typography } from '@mui/material';
import TimelineCards from '../../components/timelineCards/TimelineCards';

class TaskBoard extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <Typography variant={'h1'}>Доска задач</Typography>
        </div>
        <div className={styles.content}>
          <TimelineCards
            dataLst={[
              {
                itemID: 1,
                role: 'Мастер',
                executor: 'Рыбников Артём',
                date: '20.20.2012',
                info: 'Сломался упор в плите',
                creator: 'Угольников Семён Андреевич',
                number: '17982032-1',
              },
            ]}
            title={'Открыта'}
          />
          <TimelineCards dataLst={[]} title={'В работе'} />
          <TimelineCards dataLst={[]} title={'Оценка'} />
          <TimelineCards dataLst={[]} title={'Готово'} />
        </div>
      </div>
    );
  }
}

export default TaskBoard;
