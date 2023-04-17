import React from 'react';
import styles from './TaskBoard.module.css';
import { Typography } from '@mui/material';
import TimelineCards from '../../components/timelineCards/TimelineCards';
import { enqueueSnackbar } from 'notistack';
import { TDataTimelineCard } from '../../components/itemCardTimeline/ItemCardTimeline';
import { PendingContext } from '../../providers/PendingProvider';
import { EditModes, PendingStatuses, SectionPos, TaskStates, ViewModes } from '../../globals/types';
import { GetDataTimelineCard, TitlesCard } from './timeline/dataCard';
import { GetViewModeByLevelAccess } from '../../globals/funcs';
import { GetTasks } from '../../api/task/methods';
import TaskEdit from '../tasks/editDialog/TaskEdit';

type TState = {
  curItemID: number;
  isOpenEditDialog: boolean;
  dataList: TDataTimelineCard[];
  viewMode: ViewModes;
};

class TaskBoard extends React.Component<any, TState> {
  context!: React.ContextType<typeof PendingContext>;

  constructor(props: any) {
    super(props);

    this.state = {
      curItemID: 0,
      isOpenEditDialog: false,
      dataList: [],
      viewMode: GetViewModeByLevelAccess(SectionPos.Tasks),
    };
  }

  onCloseEditDialogHandler = () => {
    this.setState({
      ...this.state,
      curItemID: 0,
      isOpenEditDialog: false,
    });
  };

  onOpenEditDialogHandler = (itemID: number) => {
    this.setState({
      ...this.state,
      curItemID: itemID,
      isOpenEditDialog: true,
    });
  };

  getTableData = () => {
    this.context.ToPending?.();

    const result = GetTasks('', false);
    result.then(
      (tasks) => {
        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetDataTimelineCard(tasks),
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
            isOpen={this.state.isOpenEditDialog}
            editMode={EditModes.View}
            selectID={this.state.curItemID}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
        )}
        <div className={styles.header}>
          <Typography variant={'h1'}>Доска задач</Typography>
        </div>

        <div className={styles.content}>
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Открыта'}
            status_id={TaskStates.Open}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'В работе'}
            status_id={TaskStates.InWork}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Оценка'}
            status_id={TaskStates.Estimation}
            titlesCard={TitlesCard}
          />
        </div>
      </div>
    );
  }
}

TaskBoard.contextType = PendingContext;

export default TaskBoard;
