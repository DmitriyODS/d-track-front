import IItemData, { NewEmptyItemData } from '../item/ItemData';

interface ITaskData {
  id: number;
  number: string;
  dateCreated: number;
  dateCompleted: number;
  dateEstimatedCompletion: number;
  name: string;
  description: string;
  status: IItemData;
  creator: IItemData;
  executor: IItemData;
}

export function NewEmptyTaskData(): ITaskData {
  return {
    id: 0,
    number: '',
    dateCreated: 0,
    dateCompleted: 0,
    dateEstimatedCompletion: 0,
    name: '',
    description: '',
    status: NewEmptyItemData(),
    creator: NewEmptyItemData(),
    executor: NewEmptyItemData(),
  };
}

export default ITaskData;
