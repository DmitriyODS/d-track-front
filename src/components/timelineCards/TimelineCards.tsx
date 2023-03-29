import React from 'react';
import styles from './TimelineCards.module.css';
import ItemCardTimeline, {
  DataCard,
} from '../itemCardTimeline/ItemCardTimeline';

type Props = {
  title: string;
  typeLine?: number;
  dataLst: DataCard[];
  onSelect?: (itemID: number) => void;
};

function TimelineCards(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.content}>
        {props.dataLst.length === 0 ? (
          <div className={styles.errMsg}>
            <p>Нет заявок</p>
          </div>
        ) : (
          props.dataLst.map((it) => (
            <ItemCardTimeline data={it} onSelect={props.onSelect} />
          ))
        )}
      </div>
    </div>
  );
}

export default TimelineCards;
