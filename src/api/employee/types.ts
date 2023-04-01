import IItemData from '../../models/item/ItemData';
import ILevelAccessData from '../../models/levelAccess/LevelAccessData';
import IEmployeeData from '../../models/employee/EmployeeData';

export type TFilters = {
  fio?: string;
  is_archive?: boolean;
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
