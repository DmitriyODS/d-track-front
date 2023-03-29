import React from 'react';
import styles from './ItemCardTimeline.module.css';

export type DataCard = {
  itemID: number;
  number: string;
  date: string;
  executor: string;
  creator: string;
  info: string;
  role: string;
};

type Props = {
  data: DataCard;
  onSelect?: (itemID: number) => void;
};

function ItemCardTimeline(props: Props) {
  return (
    <div
      className={styles.root}
      onClick={() => props.onSelect?.(props.data.itemID)}
    >
      <div className={styles.title}>{props.data.number}</div>
      <div>
        <span className={styles.title}>Клиент:</span>
        <br />
        {props.data.creator}
      </div>
      <div>
        <span className={styles.title}>Описание:</span>
        <br /> {props.data.info}
      </div>
      <div>
        <span className={styles.title}>Дата:</span>
        <br /> {props.data.date}
      </div>
      <div>
        <span className={styles.title}>Исполнитель:</span>
        <br /> {props.data.executor} - {props.data.role}
      </div>
    </div>
  );
}

export default ItemCardTimeline;
