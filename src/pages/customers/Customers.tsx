import React from 'react';
import styles from './Customers.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import Table, { DataItem } from '../../components/table/Table';
import { ColumnTable } from '../employees/table/columnTable';
import CustomersToolbar from './toolbar/Toolbar';

type State = {
  curItemID: number;
};

class Customers extends React.Component<any, State> {

  constructor(props: any) {
    super(props);

    // todo: временная заглушка до ReduxToolkit
    this.state = {  curItemID: 0 };
  }

  handleSelectItem = (itemID: number) => {
    this.setState((s) => ({ ...s, curItemID: itemID }));
  };

  // todo: временная заглушка до API
  getDataTable = (count: number) => {
    const dataItems: DataItem<any>[] = [];

    for (let i = 0; i < count; i++) {
      dataItems.push({
        id: i + 1,
        value: {
          t1: `Item ${i + 1}`,
          t2: `Item ${i + 1}`,
          t3: `Item ${i + 1}`,
          t4: `Item ${i + 1}`,
          t5: `Item ${i + 1}`,
        },
      });
    }

    return dataItems;
  };
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant={'h1'}>Клиенты</Typography>
          <SearchField placeholder={'Фильтрация по ФИО клиента'} />
        </div>
        <div className={styles.toolbar}>
          <CustomersToolbar/>

        </div>
        <div className={styles.content}>
          <Table
            column={ColumnTable}
            data={this.getDataTable(33)}
            onSelect={this.handleSelectItem}
            curSelectedID={this.state.curItemID}
          />
        </div>
      </div>
    );
  }
}

export default Customers;
