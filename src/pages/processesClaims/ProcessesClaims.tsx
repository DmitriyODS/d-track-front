import React from 'react';
import styles from './PrcessesClaims.module.css';
import { Typography } from '@mui/material';
import TimelineCards from '../../components/timelineCards/TimelineCards';
import { GetClaims } from '../../api/claim/methods';
import { enqueueSnackbar } from 'notistack';
import { TDataTimelineCard } from '../../components/itemCardTimeline/ItemCardTimeline';
import { PendingContext } from '../../providers/PendingProvider';
import { ClaimStates, EditModes, PendingStatuses } from '../../globals/types';
import { GetDataTimelineCard, TitlesCard } from './timeline/dataCard';
import ClaimEdit from '../claims/editDialog/ClaimEdit';

type TState = {
  curItemID: number;
  isOpenEditDialog: boolean;
  dataList: TDataTimelineCard[];
};

class ProcessesClaims extends React.Component<any, TState> {
  context!: React.ContextType<typeof PendingContext>;

  constructor(props: any) {
    super(props);

    this.state = {
      curItemID: 0,
      isOpenEditDialog: false,
      dataList: [],
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

    const result = GetClaims('', false, 0);
    result.then(
      (claims) => {
        this.setState((prev) => ({
          ...prev,
          curItemID: 0,
          dataList: GetDataTimelineCard(claims),
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
          <ClaimEdit
            onClose={this.onCloseEditDialogHandler}
            isOpen={this.state.isOpenEditDialog}
            editMode={EditModes.View}
            selectID={this.state.curItemID}
            isLoading={this.context.Status === PendingStatuses.Loading}
          />
        )}
        <div className={styles.header}>
          <Typography variant={'h1'}>Процессы заявок</Typography>
        </div>
        <div className={styles.content}>
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Выезд'}
            status_id={ClaimStates.Departure}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Приёмка'}
            status_id={ClaimStates.Acceptance}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Тестирование'}
            status_id={ClaimStates.Testing}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Ремонт'}
            status_id={ClaimStates.Repair}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Выдача'}
            status_id={ClaimStates.Extradition}
            titlesCard={TitlesCard}
          />
          <TimelineCards
            onSelect={this.onOpenEditDialogHandler}
            dataLst={this.state.dataList}
            title={'Закрыта'}
            status_id={ClaimStates.Close}
            titlesCard={TitlesCard}
          />
        </div>
      </div>
    );
  }
}

ProcessesClaims.contextType = PendingContext;

export default ProcessesClaims;
