import ICustomerData from '../../../models/customer/CustomerData';
import { TDataTableItem } from '../../../components/table/Table';
import { TCustomerDataTable } from './CustomerDataItem';
import dayjs from 'dayjs';

export function GetItemsFromData(data: ICustomerData[]): TDataTableItem<TCustomerDataTable>[] {
  return data.map((it) => ({
    id: it.id,
    value: {
      fio: it.fio,
      phone: it.phone,
      email: it.email,
      date_created: dayjs.unix(it.dateCreated).format('DD.MM.YYYY'),
    },
  }));
}
