import IEmployeeData from '../../../models/employee/EmployeeData';
import { GetDayjsFromUnix, GetUnixFromDayjs } from '../../../globals/funcs';
import { Dayjs } from 'dayjs';

export type TEmployeeState = {
  id: number;
  fio: string;
  login: string;
  password: string;
  phoneNumber: string;
  emailAddress: string;
  addressOfResidence: string;
  position: string;
  levelAccess: string;
  freedomType: string;
  dateAppointments: Dayjs | null;
  dateOfDismissal: Dayjs | null;
};

export function GetEmployeeDataFromFields(fieldsData: TEmployeeState): IEmployeeData {
  return {
    id: fieldsData.id,
    fio: fieldsData.fio,
    login: fieldsData.login,
    password: fieldsData.password,
    phoneNumber: fieldsData.phoneNumber,
    emailAddress: fieldsData.emailAddress,
    addressOfResidence: fieldsData.addressOfResidence,
    position: { id: Number(fieldsData.position), value: '' },
    levelAccess: { id: Number(fieldsData.levelAccess), name: '' },
    freedomType: { id: Number(fieldsData.freedomType), value: '' },
    dateAppointments: GetUnixFromDayjs(fieldsData.dateAppointments),
    dateOfDismissal: GetUnixFromDayjs(fieldsData.dateOfDismissal),
  };
}

export function GetInitStateFieldsData(employee?: IEmployeeData): TEmployeeState {
  if (!employee) {
    return {
      id: 0,
      fio: '',
      login: '',
      password: '',
      phoneNumber: '',
      emailAddress: '',
      addressOfResidence: '',
      position: '',
      levelAccess: '',
      freedomType: '',
      dateAppointments: null,
      dateOfDismissal: null,
    };
  }

  return {
    id: employee.id,
    fio: employee.fio,
    login: employee.login,
    password: '',
    phoneNumber: employee.phoneNumber,
    emailAddress: employee.emailAddress,
    addressOfResidence: employee.addressOfResidence,
    position: `${employee.position.id}`,
    levelAccess: `${employee.levelAccess.id}`,
    freedomType: `${employee.freedomType.id}`,
    dateAppointments: GetDayjsFromUnix(employee.dateAppointments),
    dateOfDismissal: GetDayjsFromUnix(employee.dateOfDismissal),
  };
}
