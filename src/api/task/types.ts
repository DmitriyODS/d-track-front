import IItemData from '../../models/item/ItemData';
import IClaimData from '../../models/claim/ClaimData';
import ITaskData from '../../models/task/TaskData';

export type TFilters = {
  number_filter?: string;
  is_archive?: string;
};

export function MakeTaskFilters(number: string, isArchive: boolean): TFilters {
  return {
    number_filter: number,
    is_archive: isArchive.toString(),
  };
}

export type TTaskRequest = {
  id: number;
  number: string;
  date_created: number;
  date_completed: number;
  date_estimated_completion: number;
  name: string;
  description: string;
  status: IItemData;
  creator: IItemData;
  executor: IItemData;
};

export type TTaskResponse = {
  id: number;
  number: string;
  date_created: number;
  date_completed: number;
  date_estimated_completion: number;
  name: string;
  description: string;
  status: IItemData;
  creator: IItemData;
  executor: IItemData;
};

export function MakeDataFromResponse(r: TTaskResponse): ITaskData {
  return {
    id: r.id,
    number: r.number,
    dateCreated: r.date_created,
    dateCompleted: r.date_completed,
    dateEstimatedCompletion: r.date_estimated_completion,
    name: r.name,
    description: r.description,
    status: r.status,
    creator: r.creator,
    executor: r.executor,
  };
}

export function NewTaskRequest(task: ITaskData): TTaskRequest {
  return {
    id: task.id,
    number: task.number,
    date_created: task.dateCreated,
    date_completed: task.dateCompleted,
    date_estimated_completion: task.dateEstimatedCompletion,
    name: task.name,
    description: task.description,
    status: task.status,
    creator: task.creator,
    executor: task.executor,
  };
}
