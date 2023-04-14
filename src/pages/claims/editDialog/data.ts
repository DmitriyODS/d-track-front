import IClaimData from '../../../models/claim/ClaimData';
import dayjs, { Dayjs } from 'dayjs';
import { GetDayjsFromUnix, GetUnixFromDayjs } from '../../../globals/funcs';

export type TClaimState = {
  id: number;
  number: string;
  dateCreated: Dayjs | null;
  dateCompleted: Dayjs | null;
  dateEstimatedCompletion: Dayjs | null;
  customer: string;
  subject: string;
  serviceType: string;
  description: string;
  status: string;
  executor: string;
};

export function GetClaimDataFromFields(fieldsData: TClaimState): IClaimData {
  return {
    id: fieldsData.id,
    number: fieldsData.number,
    dateCreated: GetUnixFromDayjs(fieldsData.dateCreated),
    dateCompleted: GetUnixFromDayjs(fieldsData.dateCompleted),
    dateEstimatedCompletion: GetUnixFromDayjs(fieldsData.dateEstimatedCompletion),
    customer: { id: Number(fieldsData.customer), value: '' },
    subject: fieldsData.subject,
    serviceType: { id: Number(fieldsData.serviceType), value: '' },
    description: fieldsData.description,
    status: { id: Number(fieldsData.status), value: '' },
    executor: { id: Number(fieldsData.executor), value: '' },
  };
}

export function GetInitStateFieldsData(claim?: IClaimData): TClaimState {
  if (!claim) {
    return {
      id: 0,
      number: `З-${dayjs().unix()}`,
      dateCreated: dayjs(),
      dateCompleted: null,
      dateEstimatedCompletion: null,
      customer: '',
      subject: '',
      serviceType: '',
      description: '',
      status: '1',
      executor: '',
    };
  }

  return {
    id: claim.id,
    number: claim.number,
    dateCreated: GetDayjsFromUnix(claim.dateCreated),
    dateCompleted: GetDayjsFromUnix(claim.dateCompleted),
    dateEstimatedCompletion: GetDayjsFromUnix(claim.dateEstimatedCompletion),
    customer: `${claim.customer.id}`,
    subject: claim.subject,
    serviceType: `${claim.serviceType.id}`,
    description: claim.description,
    status: `${claim.status.id}`,
    executor: `${claim.executor.id}`,
  };
}
