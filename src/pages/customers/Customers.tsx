import React from 'react';
import styles from './Customers.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import Table, { TDataTableItem } from '../../components/table/Table';
import { ColumnTable } from './table/columnTable';
import CustomersToolbar from './toolbar/Toolbar';
import { EditModes, PendingStatuses } from '../../globals/types';
import { TCustomerDataTable } from './table/CustomerDataItem';
import { PendingContext } from '../../providers/PendingProvider';
import ICustomerData from '../../models/customer/CustomerData';
import { CreateCustomer, EditCustomer, GetCustomers } from '../../api/customer/methods';
import { enqueueSnackbar } from 'notistack';
import { GetItemsFromData } from './table/dataConvert';
import CustomerEdit from './editDialog/CustomerEdit';
import withRouterParams from '../../components/withRouterParams/WithRouterParams';

type TState = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  dataList: TDataTableItem<TCustomerDataTable>[];
  filterClaimID: number;
};

type TProps = {
  routerParams: {
    customerID: any;
  };
};

class Customers extends React.Component<TProps, TState> {
  context!: React.ContextType<typeof PendingContext>;
  searchFilterTimerID: any;
  searchFilterText: string;

  constructor(props: TProps) {
    super(props);

    this.searchFilterTimerID = 0;
    this.searchFilterText = '';

    let customerID = parseInt(this.props.routerParams.customerID);
    if (!Number.isInteger(customerID)) {
      customerID = 0;
    }

    this.state = {
      isArchive: false,
      curItemID: 0,
      isOpenEditDialog: false,
      editMode: EditModes.Create,
      dataList: [],
      filterClaimID: customerID,
    };
  }

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

  onSaveEditDialogHandler = (data: ICustomerData) => {
    this.context.ToPending?.();

    let result: Promise<number>;
    if (this.state.editMode === EditModes.Create) {
      result = CreateCustomer(data);
    } else if (this.state.editMode === EditModes.Edit) {
      result = EditCustomer(data);
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

    const result = GetCustomers(
      this.searchFilterText,
      this.state.isArchive,
      this.state.filterClaimID
    );
    result.then(
      (customer) => {
        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetItemsFromData(customer),
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
    return (
      <div className={styles.root}>
        {this.state.isOpenEditDialog && (
          <CustomerEdit
            onClose={this.onCloseEditDialogHandler}
            onSave={this.onSaveEditDialogHandler}
            isOpen={this.state.isOpenEditDialog}
            editMode={this.state.editMode}
            selectID={this.state.curItemID}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
        )}
        <div className={styles.header}>
          <Typography variant={'h1'}>Клиенты</Typography>
          <SearchField onChange={this.onChangeFilter} placeholder={'Фильтрация по ФИО клиента'} />
        </div>
        <div className={styles.toolbar}>
          <CustomersToolbar
            isArchive={this.state.isArchive}
            isSelected={this.state.curItemID !== 0}
            onOpenEditDialog={this.onOpenEditDialogHandler}
            curItemID={this.state.curItemID}
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

export default withRouterParams(Customers);
