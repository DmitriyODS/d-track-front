import React from 'react';
import styles from './Employees.module.css';
import { Typography } from '@mui/material';
import SearchField from '../../components/searchField/SearchField';
import EmployeesToolbar from './toolbar/Toolbar';
import Switcher from '../../components/switcher/Switcher';
import Table, { DataItem } from '../../components/table/Table';
import { ColumnTable } from './table/columnTable';
import { EditModes } from '../../globals/types';
import EmployeeEdit from '../../components/editDialogs/EmployeeEdit';
import { PendingContext } from '../../providers/PendingProvider';
import { GetEmployees } from '../../api/employees';
import { enqueueSnackbar } from 'notistack';
import { EmployeeDataItem } from './table/EmployeeDataItem';
import { GetItemsFromData } from './table/dataConvert';
import EmployeeData from '../../models/employee/EmployeeData';

type State = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  dataList: DataItem<EmployeeDataItem>[];
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

  handleSwitchToArchive = () => {
    this.setState((s) => ({ ...s, isArchive: true, curItemID: 0 }));
  };

  handleSwitchToMain = () => {
    this.setState((s) => ({ ...s, isArchive: false, curItemID: 0 }));
  };

  handleSelectItem = (itemID: number) => {
    this.setState((s) => ({ ...s, curItemID: itemID }));
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

  handleOnSaveEditDialog = (data: EmployeeData) => {
    this.handleOnCloseEditDialog();
  };

  handleOnOpenEditDialog = (editMode: EditModes) => {
    this.setState({
      ...this.state,
      editMode: editMode,
      isOpenEditDialog: true,
    });
  };

  componentDidMount() {
    this.context?.ToPending();

    const result = GetEmployees();
    result.then(
      (value) => {
        if (!value.ok) {
          enqueueSnackbar(`Ошибка: ${value.description}`, { variant: 'error' });
          return;
        }

        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetItemsFromData(value.data!),
        }));
      },
      () => {
        enqueueSnackbar('Не удалось загрузить данные', { variant: 'error' });
      }
    );

    result.finally(() => this.context?.ToReady());
  }

  render() {
    return (
      <div className={styles.root}>
        {this.state.isOpenEditDialog && (
          <EmployeeEdit
            onClose={this.handleOnCloseEditDialog}
            onSave={this.handleOnSaveEditDialog}
            isOpen={this.state.isOpenEditDialog}
            editMode={this.state.editMode}
            selectID={this.state.curItemID}
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
            onOpenEditDialog={this.handleOnOpenEditDialog}
          />
          <Switcher
            isArchive={this.state.isArchive}
            onClickOne={this.handleSwitchToMain}
            onClickTwo={this.handleSwitchToArchive}
            textOne={'Штат'}
            textTwo={'Уволенные'}
          />
        </div>
        <div className={styles.content}>
          <Table
            column={ColumnTable}
            data={this.state.dataList}
            onSelect={this.handleSelectItem}
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
