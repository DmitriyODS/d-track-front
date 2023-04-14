import IItemData, { NewEmptyItemData } from '../item/ItemData';

interface IClaimData {
  id: number;
  number: string;
  dateCreated: number;
  dateCompleted: number;
  dateEstimatedCompletion: number;
  customer: IItemData;
  subject: string;
  serviceType: IItemData;
  description: string;
  status: IItemData;
  executor: IItemData;
}

export function NewEmptyClaimData(): IClaimData {
  return {
    id: 0,
    number: '',
    dateCreated: 0,
    dateCompleted: 0,
    dateEstimatedCompletion: 0,
    customer: NewEmptyItemData(),
    subject: '',
    serviceType: NewEmptyItemData(),
    description: '',
    status: NewEmptyItemData(),
    executor: NewEmptyItemData(),
  };
}

export default IClaimData;
