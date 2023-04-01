import { TColumnItem, TypeDataTable } from '../../../components/table/Table';

export const ColumnTable: TColumnItem[] = [
  { name: 'Логин', typeData: TypeDataTable.TextStr, indexKey: 'login' },
  { name: 'ФИО', typeData: TypeDataTable.TextStr, indexKey: 'fio' },
  { name: 'Должность', typeData: TypeDataTable.TextStr, indexKey: 'position' },
  { name: 'Доступность', typeData: TypeDataTable.TextStr, indexKey: 'freedom' },
  {
    name: 'Дата назначения',
    typeData: TypeDataTable.DateStr,
    indexKey: 'date_appointments',
  },
];
