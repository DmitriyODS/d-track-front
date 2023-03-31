import React from 'react';
import styles from './Table.module.css';
import { CircularProgress } from '@mui/material';
import { PendingStatuses } from '../../globals/types';

export enum TypeDataTable {
  NumericStr,
  TextStr,
  DateStr,
  DateTimeStr,
  BooleanStr,
}

export type ColumnItem = {
  name: string;
  typeData: TypeDataTable;
  indexKey: string;
};

export type DataItem<T> = {
  id: number;
  value: T;
};

type Props<T> = {
  column: ColumnItem[];
  data: DataItem<T>[];
  curSelectedID?: number;
  onSelect: (itemID: number) => void;
  isLoading?: PendingStatuses;
};

function Table(props: Props<any>) {
  let tableData: React.ReactNode[] = [];

  if (props.isLoading) {
    tableData.push(
      <tr className={styles.itemNotData}>
        <td colSpan={props.column.length}>
          <CircularProgress color="inherit" />
          <p>Загрузка</p>
        </td>
      </tr>
    );
  } else if (props.data.length === 0) {
    tableData.push(
      <tr className={styles.itemNotData}>
        <td colSpan={props.column.length}>Список пуст</td>
      </tr>
    );
  } else {
    tableData = props.data.map((item) => (
      <tr
        key={item.id}
        className={props.curSelectedID === item.id ? styles.selectedItem : ''}
        onClick={() => props.onSelect(item.id)}
      >
        {props.column.map((colItem, index) => (
          <td key={index}>{item.value[colItem.indexKey]}</td>
        ))}
      </tr>
    ));
  }

  return (
    <div className={styles.root}>
      <table className={styles.table} cellPadding={8}>
        <thead>
          <tr>
            {props.column.map((value, index) => (
              <th key={index}>{value.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}

export default Table;
