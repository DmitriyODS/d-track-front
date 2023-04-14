import { TColumnItem, TypeDataTable } from '../../../components/table/Table';

export const ColumnTable: TColumnItem[] = [
  {
    name: 'ФИО',
    typeData: TypeDataTable.TextStr,
    indexKey: 'fio',
  },
  {
    name: 'Телефон',
    typeData: TypeDataTable.TextStr,
    indexKey: 'phone',
  },
  {
    name: 'Email',
    typeData: TypeDataTable.TextStr,
    indexKey: 'email',
  },
  {
    name: 'Дата создания',
    typeData: TypeDataTable.TextStr,
    indexKey: 'date_created',
  },
];
