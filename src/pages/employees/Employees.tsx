import React from 'react';
import styles from './Employees.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import EmployeesToolbar from './toolbar/Toolbar';
import Switcher from '../../components/switcher/Switcher';
import Table, { TDataTableItem } from '../../components/table/Table';
import { ColumnTable } from './table/columnTable';
import { EditModes, FreedomTypes, PendingStatuses } from '../../globals/types';
import EmployeeEdit from './editDailog/EmployeeEdit';
import { PendingContext } from '../../providers/PendingProvider';
import {
  CreateEmployee,
  EditEmployee,
  GetEmployeeByID,
  GetEmployees,
} from '../../api/employee/methods';
import { enqueueSnackbar } from 'notistack';
import { GetItemsFromData } from './table/dataConvert';
import IEmployeeData from '../../models/employee/EmployeeData';
import { TEmployeeDataTable } from './table/EmployeeDataItem';
import dayjs from 'dayjs';

type TState = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  dataList: TDataTableItem<TEmployeeDataTable>[];
};

class Employee extends React.Component<any, TState> {
  context!: React.ContextType<typeof PendingContext>;
  searchFilterTimerID: any;
  searchFilterText: string;

  constructor(props: any) {
    super(props);

    this.searchFilterTimerID = 0;
    this.searchFilterText = '';

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

    const result = GetEmployees(this.searchFilterText, this.state.isArchive);
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

  onEmployeeToFired = () => {
    this.context.ToPending?.();

    const result = GetEmployeeByID(this.state.curItemID);
    result
      .then(
        (employeeData) => {
          return EditEmployee({
            ...employeeData,
            freedomType: { id: Number(FreedomTypes.Fired), value: '' },
            dateOfDismissal: dayjs().unix(),
          });
        },
        (error: string) => {
          enqueueSnackbar(error, { variant: 'error' });
        }
      )
      .then(
        () => {
          enqueueSnackbar('Сотрудник уволен', { variant: 'success' });
        },
        (error: string) => {
          enqueueSnackbar(error, { variant: 'error' });
        }
      )
      .finally(() => this.getTableData());
  };

  onEmployeeRestore = () => {
    this.context.ToPending?.();

    const result = GetEmployeeByID(this.state.curItemID);
    result
      .then(
        (employeeData) => {
          return EditEmployee({
            ...employeeData,
            freedomType: { id: Number(FreedomTypes.NotSet), value: '' },
            dateOfDismissal: 0,
          });
        },
        (error: string) => {
          enqueueSnackbar(error, { variant: 'error' });
        }
      )
      .then(
        () => {
          enqueueSnackbar('Сотрудник восстановлен', { variant: 'success' });
        },
        (error: string) => {
          enqueueSnackbar(error, { variant: 'error' });
        }
      )
      .finally(() => this.getTableData());
  };

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
          <SearchField
            onChange={this.onChangeFilter}
            placeholder={'Фильтрация по ФИО сотрудника'}
            disabled={this.context.Status === PendingStatuses.Loading}
          />
        </div>
        <div className={styles.toolbar}>
          <EmployeesToolbar
            isArchive={this.state.isArchive}
            isSelected={this.state.curItemID !== 0}
            onOpenEditDialog={this.onOpenEditDialogHandler}
            onEmployeeRestore={this.onEmployeeRestore}
            onEmployeeToFired={this.onEmployeeToFired}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
          <Switcher
            isArchive={this.state.isArchive}
            onClickOne={this.onSwitchToActiveHandler}
            onClickTwo={this.onSwitchToArchiveHandler}
            textOne={'Штат'}
            textTwo={'Уволенные'}
            isLoading={this.context.Status === PendingStatuses.Loading}
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
