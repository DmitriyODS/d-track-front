import { TColumnItem, TypeDataTable } from '../../../components/table/Table';

export const ColumnTable: TColumnItem[] = [
  {
    name: 'Номер',
    typeData: TypeDataTable.TextStr,
    indexKey: 'number',
  },
  {
    name: 'Предмет',
    typeData: TypeDataTable.TextStr,
    indexKey: 'subject',
  },
  {
    name: 'Статус',
    typeData: TypeDataTable.TextStr,
    indexKey: 'status',
  },
  {
    name: 'Исполнитель',
    typeData: TypeDataTable.TextStr,
    indexKey: 'executor',
  },
  {
    name: 'Дата создания',
    typeData: TypeDataTable.DateStr,
    indexKey: 'date_created',
  },
  {
    name: 'Ор. дата завершения',
    typeData: TypeDataTable.DateStr,
    indexKey: 'date_estimated_completion',
  },
];
