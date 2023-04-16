import React from 'react';
import styles from './TimelineCards.module.css';
import ItemCardTimeline, {
  TDataTimelineCard,
  TTitleTimelineCard,
} from '../itemCardTimeline/ItemCardTimeline';

type TProps = {
  title: string;
  typeLine?: number;
  dataLst: TDataTimelineCard[];
  onSelect?: (itemID: number) => void;
  status_id: string;
  titlesCard: TTitleTimelineCard[];
};

function TimelineCards(props: TProps) {
  const dataLst = props.dataLst.filter((it) => it.statusID === props.status_id);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.content}>
        {dataLst.length === 0 ? (
          <div className={styles.errMsg}>
            <p>Нет заявок</p>
          </div>
        ) : (
          dataLst.map((it) => (
            <ItemCardTimeline
              key={it.itemID}
              data={it}
              onSelect={props.onSelect}
              titles={props.titlesCard}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TimelineCards;
