import React from 'react';
import styles from './TimelineCards.module.css';
import ItemCardTimeline, {
  TDataTimelineCard,
  TTitleTimelineCard,
} from '../itemCardTimeline/ItemCardTimeline';
import { PendingStatuses } from '../../globals/types';
import { CircularProgress } from '@mui/material';

type TProps = {
  title: string;
  typeLine?: number;
  dataLst: TDataTimelineCard[];
  onSelect?: (itemID: number) => void;
  status_id: string;
  titlesCard: TTitleTimelineCard[];
  isLoading?: PendingStatuses;
};

function GetContentTimeline(props: TProps) {
  if (props.isLoading) {
    return (
      <div className={styles.loadingMsg}>
        <CircularProgress color="inherit" />
        <p>Загрузка</p>
      </div>
    );
  }

  const dataLst = props.dataLst.filter((it) => it.statusID === props.status_id);
  if (dataLst.length === 0) {
    return (
      <div className={styles.errMsg}>
        <p>Нет заявок</p>
      </div>
    );
  }

  return dataLst.map((it) => (
    <ItemCardTimeline
      key={it.itemID}
      data={it}
      onSelect={props.onSelect}
      titles={props.titlesCard}
    />
  ));
}

function TimelineCards(props: TProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.content}>{GetContentTimeline(props)}</div>
    </div>
  );
}

export default TimelineCards;
