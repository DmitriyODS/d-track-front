import React from 'react';
import styles from './ItemCardTimeline.module.css';

export type TDataTimelineCard = {
  itemID: number;
  statusID: string;
  value: any;
};

export type TTitleTimelineCard = {
  title: string;
  name: string;
};

type TProps = {
  titles: TTitleTimelineCard[];
  data: TDataTimelineCard;
  onSelect?: (itemID: number) => void;
};

function ItemCardTimeline(props: TProps) {
  return (
    <div className={styles.root} onClick={() => props.onSelect?.(props.data.itemID)}>
      {props.titles.map((title, index) => (
        <div key={index}>
          <span className={styles.title}>{title.title}</span>
          <br />
          {props.data.value[title.name]}
        </div>
      ))}
    </div>
  );
}

export default ItemCardTimeline;
