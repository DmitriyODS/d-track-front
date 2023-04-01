import React from 'react';
import styles from './Tasks.module.css';
import { Typography } from '@mui/material';
import Table, { TDataTableItem } from '../../components/table/Table';
import SearchField from '../../components/searchField/SearchField';
import Switcher from '../../components/switcher/Switcher';
import { ColumnTable } from './table/columnTable';
import TasksToolbar from './toolbar/Toolbar';

type State = {
  isArchive: boolean;
  curItemID: number;
};

class Tasks extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    // todo: временная заглушка до ReduxToolkit
    this.state = { isArchive: false, curItemID: 0 };
  }

  handleSwitchToArchive = () => {
    this.setState({ isArchive: true, curItemID: 0 });
  };

  handleSwitchToMain = () => {
    this.setState({ isArchive: false, curItemID: 0 });
  };

  handleSelectItem = (itemID: number) => {
    this.setState((s) => ({ ...s, curItemID: itemID }));
  };

  // todo: временная заглушка до API
  getDataTable = (count: number) => {
    const dataItems: TDataTableItem<any>[] = [];

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
          <Typography variant={'h1'}>Задачи</Typography>
          <SearchField placeholder={'Фильтрация по номеру задачи'} />
        </div>
        <div className={styles.toolbar}>
          <TasksToolbar isArchive={this.state.isArchive} isSelected={this.state.curItemID !== 0} />
          <Switcher
            isArchive={this.state.isArchive}
            onClickOne={this.handleSwitchToMain}
            onClickTwo={this.handleSwitchToArchive}
            textOne={'Открытые'}
            textTwo={'Закрытые'}
          />
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

export default Tasks;
