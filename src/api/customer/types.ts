import ICustomerData from '../../models/customer/CustomerData';

export type TFilters = {
  fio_filter?: string;
  is_archive?: string;
  claim_id?: string;
};

export function MakeCustomerFilters(fio: string, isArchive: boolean, claim_id: number): TFilters {
  return {
    fio_filter: fio,
    is_archive: isArchive.toString(),
    claim_id: claim_id.toString(),
  };
}

export type TCustomerRequest = {
  id: number;
  fio: string;
  phone: string;
  email: string;
  address: string;
  date_created: number;
};

export type TCustomerResponse = {
  id: number;
  fio: string;
  phone: string;
  email: string;
  address: string;
  date_created: number;
};

export function MakeDataFromResponse(r: TCustomerResponse): ICustomerData {
  return {
    id: r.id,
    fio: r.fio,
    phone: r.phone,
    email: r.email,
    address: r.address,
    dateCreated: r.date_created,
  };
}

export function NewCustomerRequest(customer: ICustomerData): TCustomerRequest {
  return {
    id: customer.id,
    fio: customer.fio,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    date_created: customer.dateCreated,
  };
}
