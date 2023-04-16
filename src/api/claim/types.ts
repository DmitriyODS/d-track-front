import IItemData from '../../models/item/ItemData';
import IClaimData from '../../models/claim/ClaimData';

export type TFilters = {
  number_filter?: string;
  is_archive?: string;
  customer_id?: string;
};

export function MakeClaimFilters(
  number: string,
  isArchive: boolean,
  customer_id: number
): TFilters {
  return {
    number_filter: number,
    is_archive: isArchive.toString(),
    customer_id: customer_id.toString(),
  };
}

export type TClaimRequest = {
  id: number;
  number: string;
  date_created: number;
  date_completed: number;
  date_estimated_completion: number;
  customer: IItemData;
  subject: string;
  service_type: IItemData;
  description: string;
  status: IItemData;
  executor: IItemData;
};

export type TClaimResponse = {
  id: number;
  number: string;
  date_created: number;
  date_completed: number;
  date_estimated_completion: number;
  customer: IItemData;
  subject: string;
  service_type: IItemData;
  description: string;
  status: IItemData;
  executor: IItemData;
};

export function MakeDataFromResponse(r: TClaimResponse): IClaimData {
  return {
    id: r.id,
    number: r.number,
    dateCreated: r.date_created,
    dateCompleted: r.date_completed,
    dateEstimatedCompletion: r.date_estimated_completion,
    customer: r.customer,
    subject: r.subject,
    serviceType: r.service_type,
    description: r.description,
    status: r.status,
    executor: r.executor,
  };
}

export function NewClaimRequest(claim: IClaimData): TClaimRequest {
  return {
    id: claim.id,
    number: claim.number,
    date_created: claim.dateCreated,
    date_completed: claim.dateCompleted,
    date_estimated_completion: claim.dateEstimatedCompletion,
    customer: claim.customer,
    subject: claim.subject,
    service_type: claim.serviceType,
    description: claim.description,
    status: claim.status,
    executor: claim.executor,
  };
}
