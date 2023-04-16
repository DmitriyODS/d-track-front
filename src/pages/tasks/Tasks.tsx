import React from 'react';
import styles from './Tasks.module.css';
import { Typography } from '@mui/material';
import Table, { TDataTableItem } from '../../components/table/Table';
import SearchField from '../../components/searchField/SearchField';
import Switcher from '../../components/switcher/Switcher';
import { ColumnTable } from './table/columnTable';
import TasksToolbar from './toolbar/Toolbar';
import { EditModes, PendingStatuses, SectionPos, TaskStates, ViewModes } from '../../globals/types';
import { TTaskDataTable } from './table/TaskDataItem';
import { PendingContext } from '../../providers/PendingProvider';
import { enqueueSnackbar } from 'notistack';
import { GetItemsFromData } from './table/dataConvert';
import { CreateTask, EditTask, GetTask, GetTaskByID } from '../../api/task/methods';
import ITaskData from '../../models/task/TaskData';
import TaskEdit from './editDialog/TaskEdit';
import { GetViewModeByLevelAccess } from '../../globals/funcs';

type TState = {
  isArchive: boolean;
  curItemID: number;
  isOpenEditDialog: boolean;
  editMode: EditModes;
  dataList: TDataTableItem<TTaskDataTable>[];
  viewMode: ViewModes;
};

class Tasks extends React.Component<any, TState> {
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
      viewMode: GetViewModeByLevelAccess(SectionPos.Tasks),
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

  onSaveEditDialogHandler = (data: ITaskData) => {
    this.context.ToPending?.();

    let result: Promise<number>;
    if (this.state.editMode === EditModes.Create) {
      result = CreateTask(data);
    } else if (this.state.editMode === EditModes.Edit) {
      result = EditTask(data);
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

    const result = GetTask(this.searchFilterText, this.state.isArchive);
    result.then(
      (task) => {
        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetItemsFromData(task),
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

  onChangeStatus = (newTaskState: TaskStates) => {
    this.context.ToPending?.();

    const result = GetTaskByID(this.state.curItemID);
    result
      .then(
        (taskData) => {
          return EditTask({
            ...taskData,
            status: { id: parseInt(newTaskState), value: '' },
          });
        },
        (error: string) => {
          enqueueSnackbar(error, { variant: 'error' });
        }
      )
      .then(
        () => {
          enqueueSnackbar('Статус изменён', { variant: 'success' });
        },
        (error: string) => {
          enqueueSnackbar(error, { variant: 'error' });
        }
      )
      .finally(() => this.getTableData());
  };

  render() {
    if (this.state.viewMode === ViewModes.None) {
      return (
        <div className={styles.errorAccess}>
          Страницы не существует, или у вас нет к ней доступа
        </div>
      );
    }

    return (
      <div className={styles.root}>
        {this.state.isOpenEditDialog && (
          <TaskEdit
            onClose={this.onCloseEditDialogHandler}
            onSave={this.onSaveEditDialogHandler}
            isOpen={this.state.isOpenEditDialog}
            editMode={this.state.editMode}
            selectID={this.state.curItemID}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
        )}
        <div className={styles.header}>
          <Typography variant={'h1'}>Задачи</Typography>
          <SearchField onChange={this.onChangeFilter} placeholder={'Фильтрация по номеру задачи'} />
        </div>
        <div className={styles.toolbar}>
          <TasksToolbar
            isArchive={this.state.isArchive}
            isSelected={this.state.curItemID !== 0}
            onOpenEditDialog={this.onOpenEditDialogHandler}
            onChangeStatus={this.onChangeStatus}
            viewMode={this.state.viewMode}
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

export default Tasks;
