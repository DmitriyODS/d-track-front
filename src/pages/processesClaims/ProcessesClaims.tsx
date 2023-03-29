import React from 'react';
import styles from './PrcessesClaims.module.css';
import { Collapse, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconAdd from '@mui/icons-material/Add';
import TimelineCards from '../../components/timelineCards/TimelineCards';

class ProcessesClaims extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant={'h1'}>Процессы заявок</Typography>
          <Button
            className={`${styles.btn} ${styles.btnMini}`}
            variant={'contained'}
            color={'secondary'}
            startIcon={<IconAdd />}
          >
            <p>Создать</p>
          </Button>
        </div>
        <div className={styles.content}>
          <TimelineCards dataLst={[]} title={'Выезд'} />
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
            title={'Приёмка'}
          />
          <TimelineCards dataLst={[]} title={'Тестирование'} />
          <TimelineCards dataLst={[]} title={'Ремонт'} />
          <TimelineCards dataLst={[]} title={'Выдача'} />
          <TimelineCards dataLst={[]} title={'Закрыта'} />
        </div>
      </div>
    );
  }
}

export default ProcessesClaims;
