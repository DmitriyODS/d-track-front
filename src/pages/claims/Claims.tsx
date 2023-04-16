import React from 'react';
import styles from './Claims.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import Switcher from '../../components/switcher/Switcher';
import Table, { TDataTableItem } from '../../components/table/Table';
import ClaimsToolbar from './toolbar/Toolbar';
import { ColumnTable } from './table/columnTable';
import ClaimEdit from './editDialog/ClaimEdit';
import { EditModes, PendingStatuses } from '../../globals/types';
import { GetItemsFromData } from './table/dataConvert';
import { enqueueSnackbar } from 'notistack';
import { PendingContext } from '../../providers/PendingProvider';
import { TClaimDataTable } from './table/ClaimDataItem';
import { CreateClaim, EditClaim, GetClaims } from '../../api/claim/methods';
import IClaimData from '../../models/claim/ClaimData';
import withRouterParams from '../../components/withRouterParams/WithRouterParams';

type TState = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  dataList: TDataTableItem<TClaimDataTable>[];
  filterCustomerID: number;
};

type TProps = {
  routerParams: {
    claimID: any;
  };
};

class Claims extends React.Component<TProps, TState> {
  context!: React.ContextType<typeof PendingContext>;
  searchFilterTimerID: any;
  searchFilterText: string;

  constructor(props: TProps) {
    super(props);

    this.searchFilterTimerID = 0;
    this.searchFilterText = '';

    let claimID = parseInt(this.props.routerParams.claimID);
    if (!Number.isInteger(claimID)) {
      claimID = 0;
    }

    this.state = {
      isArchive: false,
      curItemID: 0,
      isOpenEditDialog: false,
      editMode: EditModes.Create,
      dataList: [],
      filterCustomerID: claimID,
    };
  }

  onSwitchToArchiveHandler = () => {
    this.setState((s) => ({ ...s, isArchive: true, curItemID: 0 }));
  };

  onSwitchToActiveHandler = () => {
    this.setState((s) => ({ ...s, isArchive: false, curItemID: 0 }));
  };

  onSelectItemHandler = (itemID: number) => {
    this.setState((s) => ({ ...s, curItemID: itemID }));
  };

  onCloseEditDialogHandler = (e?: any, r?: string) => {
    // нельзя закрывать форму при нажатии на пустое место - вдруг юзер ошибся?
    if (r === 'backdropClick') {
      return;
    }

    this.setState({
      ...this.state,
      isOpenEditDialog: false,
    });
  };

  onOpenEditDialogHandler = (editMode: EditModes) => {
    this.setState({
      ...this.state,
      editMode: editMode,
      isOpenEditDialog: true,
    });
  };

  onSaveEditDialogHandler = (data: IClaimData) => {
    this.context.ToPending?.();

    let result: Promise<number>;
    if (this.state.editMode === EditModes.Create) {
      result = CreateClaim(data);
    } else if (this.state.editMode === EditModes.Edit) {
      result = EditClaim(data);
    } else {
      return;
    }

    result.then(
      () => {
        enqueueSnackbar('Операция выполнена', { variant: 'success' });
        this.onCloseEditDialogHandler();
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );

    result.finally(() => {
      this.getTableData();
    });
  };

  getTableData = () => {
    this.context.ToPending?.();

    const result = GetClaims(
      this.searchFilterText,
      this.state.isArchive,
      this.state.filterCustomerID
    );
    result.then(
      (claim) => {
        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetItemsFromData(claim),
        }));
      },
      (error: string) => {
        enqueueSnackbar(error, { variant: 'error' });
      }
    );

    result.finally(() => this.context.ToReady?.());
  };

  componentDidMount() {
    this.getTableData();
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<TState>, snapshot?: any) {
    if (prevState.isArchive != this.state.isArchive) {
      this.getTableData();
    }
  }

  onChangeFilter = (value: string) => {
    clearTimeout(this.searchFilterTimerID);
    this.searchFilterTimerID = setTimeout(() => {
      this.searchFilterText = value;
      this.getTableData();
    }, 500);
  };

  render() {
    console.log(this.state.curItemID);
    return (
      <div className={styles.root}>
        {this.state.isOpenEditDialog && (
          <ClaimEdit
            onClose={this.onCloseEditDialogHandler}
            onSave={this.onSaveEditDialogHandler}
            isOpen={this.state.isOpenEditDialog}
            editMode={this.state.editMode}
            selectID={this.state.curItemID}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
        )}
        <div className={styles.header}>
          <Typography variant={'h1'}>Заявки</Typography>
          <SearchField onChange={this.onChangeFilter} placeholder={'Фильтрация по номеру заявки'} />
        </div>
        <div className={styles.toolbar}>
          <ClaimsToolbar
            isArchive={this.state.isArchive}
            isSelected={this.state.curItemID !== 0}
            onOpenEditDialog={this.onOpenEditDialogHandler}
            curItemID={this.state.curItemID}
          />
          <Switcher
            isArchive={this.state.isArchive}
            onClickOne={this.onSwitchToActiveHandler}
            onClickTwo={this.onSwitchToArchiveHandler}
            textOne={'Открытые'}
            textTwo={'Закрытые'}
          />
        </div>
        <div className={styles.content}>
          <Table
            column={ColumnTable}
            data={this.state.dataList}
            onSelect={this.onSelectItemHandler}
            curSelectedID={this.state.curItemID}
            isLoading={this.context?.Status}
          />
        </div>
      </div>
    );
  }
}

Claims.contextType = PendingContext;

const NewObj = withRouterParams(Claims);

export default NewObj;
