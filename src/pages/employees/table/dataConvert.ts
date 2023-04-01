import EmployeeData from '../../../models/employee/EmployeeData';
import { TDataTableItem } from '../../../components/table/Table';
import dayjs from 'dayjs';
import { TEmployeeDataTable } from './EmployeeDataItem';

export function GetItemsFromData(data: EmployeeData[]): TDataTableItem<TEmployeeDataTable>[] {
  return data.map((it) => ({
    id: it.id,
    value: {
      login: it.login,
      fio: it.fio,
      position: it.position.value,
      freedom: it.freedomType.value,
      date_appointments: dayjs.unix(it.dateAppointments).format('DD.MM.YYYY'),
    },
  }));
}
