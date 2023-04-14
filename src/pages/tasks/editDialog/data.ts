import { Dayjs } from 'dayjs';
import ITaskData from '../../../models/task/TaskData';
import { GetDayjsFromUnix, GetUnixFromDayjs } from '../../../globals/funcs';

export type TTaskState = {
  id: number;
  number: string;
  dateCreated: Dayjs | null;
  dateCompleted: Dayjs | null;
  dateEstimatedCompletion: Dayjs | null;
  name: string;
  description: string;
  status: string;
  creator: string;
  executor: string;
};

export function GetTaskDataFromFields(fieldsData: TTaskState): ITaskData {
  return {
    id: fieldsData.id,
    number: fieldsData.number,
    dateCreated: GetUnixFromDayjs(fieldsData.dateCreated),
    dateCompleted: GetUnixFromDayjs(fieldsData.dateCompleted),
    dateEstimatedCompletion: GetUnixFromDayjs(fieldsData.dateEstimatedCompletion),
    name: fieldsData.name,
    description: fieldsData.description,
    status: { id: Number(fieldsData.status), value: '' },
    creator: { id: Number(fieldsData.creator), value: '' },
    executor: { id: Number(fieldsData.executor), value: '' },
  };
}

export function GetInitStateFieldsData(task?: ITaskData): TTaskState {
  if (!task) {
    return {
      id: 0,
      number: '',
      dateCreated: null,
      dateCompleted: null,
      dateEstimatedCompletion: null,
      name: '',
      description: '',
      status: '',
      creator: '',
      executor: '',
    };
  }

  return {
    id: task.id,
    number: task.number,
    dateCreated: GetDayjsFromUnix(task.dateCreated),
    dateCompleted: GetDayjsFromUnix(task.dateCompleted),
    dateEstimatedCompletion: GetDayjsFromUnix(task.dateEstimatedCompletion),
    name: task.name,
    description: task.description,
    status: `${task.status.id}`,
    creator: `${task.creator.id}`,
    executor: `${task.executor.id}`,
  };
}
