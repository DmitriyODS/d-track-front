import ITaskData from '../../../models/task/TaskData';
import { TDataTableItem } from '../../../components/table/Table';
import { TTaskDataTable } from './TaskDataItem';
import dayjs from 'dayjs';

export function GetItemsFromData(data: ITaskData[]): TDataTableItem<TTaskDataTable>[] {
  return data.map((it) => ({
    id: it.id,
    value: {
      number: it.number,
      name: it.name,
      status: it.status.value,
      executor: it.executor.value,
      date_created: dayjs.unix(it.dateCreated).format('DD.MM.YYYY'),
      date_estimated_completion: dayjs.unix(it.dateEstimatedCompletion).format('DD.MM.YYYY'),
      date_completed: dayjs.unix(it.dateCompleted).format('DD.MM.YYYY'),
    },
  }));
}
