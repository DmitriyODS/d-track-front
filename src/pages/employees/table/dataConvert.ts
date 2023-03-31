import EmployeeData from '../../../models/employee/EmployeeData';
import { DataItem } from '../../../components/table/Table';
import { EmployeeDataItem } from './EmployeeDataItem';
import dayjs from 'dayjs';

export function GetItemsFromData(
  data: EmployeeData[]
): DataItem<EmployeeDataItem>[] {
  return data.map((it) => ({
    id: it.id,
    value: {
      login: it.login,
      fio: it.fio,
      position: it.position.value,
      freedom: it.freedom_type.value,
      date_appointments: dayjs.unix(it.date_appointments).format('DD.MM.YYYY'),
    },
  }));
}
