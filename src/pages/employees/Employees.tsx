import React from 'react';
import styles from './Employees.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import EmployeesToolbar from './toolbar/Toolbar';
import Switcher from '../../components/switcher/Switcher';
import Table, { TDataTableItem } from '../../components/table/Table';
import { ColumnTable } from './table/columnTable';
import { EditModes, PendingStatuses } from '../../globals/types';
import EmployeeEdit from './editDailog/EmployeeEdit';
import { PendingContext } from '../../providers/PendingProvider';
import { CreateEmployee, EditEmployee, GetEmployees } from '../../api/employee/methods';
import { enqueueSnackbar } from 'notistack';
import { GetItemsFromData } from './table/dataConvert';
import IEmployeeData from '../../models/employee/EmployeeData';
import { TEmployeeDataTable } from './table/EmployeeDataItem';

type State = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  dataList: TDataTableItem<TEmployeeDataTable>[];
};

class Employee extends React.Component<any, State> {
  context!: React.ContextType<typeof PendingContext>;

  constructor(props: any) {
    super(props);

    this.state = {
      isArchive: false,
      curItemID: 0,
      isOpenEditDialog: false,
      editMode: EditModes.Create,
      dataList: [],
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

  onSaveEditDialogHandler = (data: IEmployeeData) => {
    this.context.ToPending?.();

    let result: Promise<number>;
    if (this.state.editMode === EditModes.Create) {
      result = CreateEmployee(data);
    } else if (this.state.editMode === EditModes.Edit) {
      result = EditEmployee(data);
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

  onOpenEditDialogHandler = (editMode: EditModes) => {
    this.setState({
      ...this.state,
      editMode: editMode,
      isOpenEditDialog: true,
    });
  };

  getTableData = () => {
    this.context.ToPending?.();

    const result = GetEmployees({});
    result.then(
      (employee) => {
        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetItemsFromData(employee),
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

  render() {
    return (
      <div className={styles.root}>
        {this.state.isOpenEditDialog && (
          <EmployeeEdit
            onClose={this.onCloseEditDialogHandler}
            onSave={this.onSaveEditDialogHandler}
            isOpen={this.state.isOpenEditDialog}
            editMode={this.state.editMode}
            selectID={this.state.curItemID}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
        )}
        <div className={styles.header}>
          <Typography variant={'h1'}>Сотрудники</Typography>
          <SearchField placeholder={'Фильтрация по ФИО сотрудника'} />
        </div>
        <div className={styles.toolbar}>
          <EmployeesToolbar
            isArchive={this.state.isArchive}
            isSelected={this.state.curItemID !== 0}
            onOpenEditDialog={this.onOpenEditDialogHandler}
          />
          <Switcher
            isArchive={this.state.isArchive}
            onClickOne={this.onSwitchToActiveHandler}
            onClickTwo={this.onSwitchToArchiveHandler}
            textOne={'Штат'}
            textTwo={'Уволенные'}
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

Employee.contextType = PendingContext;

export default Employee;
