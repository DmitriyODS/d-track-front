import IClaimData from '../../../models/claim/ClaimData';
import {
  TDataTimelineCard,
  TTitleTimelineCard,
} from '../../../components/itemCardTimeline/ItemCardTimeline';
import dayjs from 'dayjs';

export const TitlesCard: TTitleTimelineCard[] = [
  {
    name: 'number',
    title: 'Номер',
  },
  {
    name: 'customer',
    title: 'Клиент',
  },
  {
    name: 'subject',
    title: 'Предмет',
  },
  {
    name: 'executor',
    title: 'Исполнитель',
  },
  {
    name: 'dateCreated',
    title: 'Дата создания',
  },
];

export function GetDataTimelineCard(claimData: IClaimData[]): TDataTimelineCard[] {
  return claimData.map((it) => ({
    itemID: it.id,
    statusID: it.status.id.toString(),
    value: {
      number: it.number.toString(),
      customer: it.customer.value,
      subject: it.subject,
      executor: it.executor.value,
      dateCreated: dayjs.unix(it.dateCreated).format('DD.MM.YYYY'),
    },
  }));
}
