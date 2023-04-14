interface ICustomerData {
  id: number;
  fio: string;
  phone: string;
  email: string;
  address: string;
  dateCreated: number;
}

export function NewEmptyCustomerData(): ICustomerData {
  return {
    id: 0,
    fio: '',
    phone: '',
    email: '',
    address: '',
    dateCreated: 0,
  };
}

export default ICustomerData;
