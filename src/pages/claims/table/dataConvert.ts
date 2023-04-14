import IClaimData from '../../../models/claim/ClaimData';
import { TDataTableItem } from '../../../components/table/Table';
import { TClaimDataTable } from './ClaimDataItem';
import dayjs from 'dayjs';

export function GetItemsFromData(data: IClaimData[]): TDataTableItem<TClaimDataTable>[] {
  return data.map((it) => ({
    id: it.id,
    value: {
      number: it.number,
      subject: it.subject,
      status: it.status.value,
      executor: it.executor.value,
      date_created: dayjs.unix(it.dateCreated).format('DD.MM.YYYY'),
      date_estimated_completion: dayjs.unix(it.dateEstimatedCompletion).format('DD.MM.YYYY'),
      date_completed: dayjs.unix(it.dateCompleted).format('DD.MM.YYYY'),
    },
  }));
}
