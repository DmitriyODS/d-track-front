import {
  TDataTimelineCard,
  TTitleTimelineCard,
} from '../../../components/itemCardTimeline/ItemCardTimeline';
import dayjs from 'dayjs';
import ITaskData from '../../../models/task/TaskData';

export const TitlesCard: TTitleTimelineCard[] = [
  {
    name: 'number',
    title: 'Номер',
  },
  {
    name: 'name',
    title: 'Заголовок',
  },
  {
    name: 'status',
    title: 'Статус',
  },
  {
    name: 'executor',
    title: 'Исполнитель',
  },
  {
    name: 'dateCreated',
    title: 'Дата открытия',
  },
];

export function GetDataTimelineCard(taskData: ITaskData[]): TDataTimelineCard[] {
  return taskData.map((it) => ({
    itemID: it.id,
    statusID: it.status.id.toString(),
    value: {
      number: it.number.toString(),
      name: it.name,
      status: it.status.value,
      executor: it.executor.value,
      dateCreated: dayjs.unix(it.dateCreated).format('DD.MM.YYYY'),
    },
  }));
}
