import React from 'react';
import styles from './Claims.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import Switcher from '../../components/switcher/Switcher';
import Table, { TDataTableItem } from '../../components/table/Table';
import ClaimsToolbar from './toolbar/Toolbar';
import { ColumnTable } from './table/columnTable';
import ClaimEdit from './editDialog/ClaimEdit';
import { EditModes } from '../../globals/types';

type State = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  curSelectData?: any;
};

class Claims extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isArchive: false,
      curItemID: 0,
      isOpenEditDialog: false,
      editMode: EditModes.Create,
      curSelectData: undefined,
    };
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

  handleOnCloseEditDialog = (e?: any, r?: string) => {
    // нельзя закрывать форму при нажатии на пустое место - вдруг юзер ошибся?
    if (r === 'backdropClick') {
      return;
    }

    this.setState({
      ...this.state,
      isOpenEditDialog: false,
    });
  };

  handleOnSaveEditDialog = (data: any) => {
    this.handleOnCloseEditDialog();
  };

  handleOnOpenEditDialog = (editMode: EditModes) => {
    this.setState({
      ...this.state,
      editMode: editMode,
      isOpenEditDialog: true,
    });
  };

  render() {
    return (
      <div className={styles.root}>
        <ClaimEdit
          onClose={this.handleOnCloseEditDialog}
          onSave={this.handleOnSaveEditDialog}
          isOpen={this.state.isOpenEditDialog}
          editMode={this.state.editMode}
          initData={this.state.curSelectData}
        />
        <div className={styles.header}>
          <Typography variant={'h1'}>Заявки</Typography>
          <SearchField placeholder={'Фильтрация по номеру заявки'} />
        </div>
        <div className={styles.toolbar}>
          <ClaimsToolbar
            isArchive={this.state.isArchive}
            isSelected={this.state.curItemID !== 0}
            onOpenEditDialog={this.handleOnOpenEditDialog}
          />
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

export default Claims;
