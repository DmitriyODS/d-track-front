import IItemData from '../../models/item/ItemData';
import ILevelAccessData from '../../models/levelAccess/LevelAccessData';
import IEmployeeData from '../../models/employee/EmployeeData';

export type TFilters = {
  fio_filter?: string;
  is_archive?: string;
};

export function MakeEmployeeFilters(fio: string, isArchive: boolean): TFilters {
  return {
    fio_filter: fio,
    is_archive: isArchive.toString(),
  };
}

export type TEmployeeRequest = {
  id: number;
  fio: string;
  login: string;
  password: string;
  phone_number: string;
  email_address: string;
  address_of_residence: string;
  position: IItemData;
  level_access: {
    id: number;
    name: string;
    access?: string;
  };
  freedom_type: IItemData;
  date_appointments: number;
  date_of_dismissal: number;
};

export type TEmployeeResponse = {
  id: number;
  fio: string;
  login: string;
  password: string;
  phone_number: string;
  email_address: string;
  address_of_residence: string;
  position: IItemData;
  level_access: ILevelAccessData;
  freedom_type: IItemData;
  date_appointments: number;
  date_of_dismissal: number;
};

export function MakeDataFromResponse(r: TEmployeeResponse): IEmployeeData {
  return {
    id: r.id,
    fio: r.fio,
    login: r.login,
    password: '',
    phoneNumber: r.phone_number,
    emailAddress: r.email_address,
    addressOfResidence: r.address_of_residence,
    position: r.position,
    levelAccess: r.level_access,
    freedomType: r.freedom_type,
    dateAppointments: r.date_appointments,
    dateOfDismissal: r.date_of_dismissal,
  };
}

export function NewEmployeeRequest(employee: IEmployeeData): TEmployeeRequest {
  return {
    id: employee.id,
    fio: employee.fio,
    login: employee.login,
    password: employee.password,
    phone_number: employee.phoneNumber,
    email_address: employee.emailAddress,
    address_of_residence: employee.addressOfResidence,
    date_appointments: employee.dateAppointments,
    date_of_dismissal: employee.dateOfDismissal,
    position: { id: employee.position.id, value: employee.position.value },
    freedom_type: { id: employee.freedomType.id, value: employee.freedomType.value },
    level_access: {
      id: employee.levelAccess.id,
      name: employee.levelAccess.name,
      access: employee.levelAccess.access,
    },
  };
}
