import { Dayjs } from 'dayjs';
import ICustomerData from '../../../models/customer/CustomerData';
import { GetDayjsFromUnix, GetUnixFromDayjs } from '../../../globals/funcs';

export type TCustomerState = {
  id: number;
  fio: string;
  phone: string;
  email: string;
  address: string;
  dateCreated: Dayjs | null;
};

export function GetCustomerDataFromFields(fieldsData: TCustomerState): ICustomerData {
  return {
    id: fieldsData.id,
    fio: fieldsData.fio,
    phone: fieldsData.phone,
    email: fieldsData.email,
    address: fieldsData.address,
    dateCreated: GetUnixFromDayjs(fieldsData.dateCreated),
  };
}

export function GetInitStateFieldsData(customer?: ICustomerData): TCustomerState {
  if (!customer) {
    return {
      id: 0,
      fio: '',
      phone: '',
      email: '',
      address: '',
      dateCreated: null,
    };
  }

  return {
    id: customer.id,
    fio: customer.fio,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    dateCreated: GetDayjsFromUnix(customer.dateCreated),
  };
}
