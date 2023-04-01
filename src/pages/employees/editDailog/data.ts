import { TSelectItem } from '../../../components/inputSelect/InputSelect';
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
  position: TSelectItem;
  levelAccess: TSelectItem;
  freedomType: TSelectItem;
  dateAppointments?: Dayjs;
  dateOfDismissal?: Dayjs;
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
    position: { id: fieldsData.position.id, value: fieldsData.position.value },
    levelAccess: { id: fieldsData.levelAccess.id, name: fieldsData.levelAccess.value },
    freedomType: { id: fieldsData.freedomType.id, value: fieldsData.freedomType.value },
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
      position: { id: 0, value: '', label: '' },
      levelAccess: { id: 0, value: '', label: '' },
      freedomType: { id: 0, value: '', label: '' },
      dateAppointments: undefined,
      dateOfDismissal: undefined,
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
    position: {
      id: employee.position.id,
      value: `${employee.position.id}`,
      label: employee.position.value,
    },
    levelAccess: {
      id: employee.levelAccess.id,
      value: `${employee.levelAccess.id}`,
      label: employee.levelAccess.name,
    },
    freedomType: {
      id: employee.freedomType.id,
      value: `${employee.freedomType.id}`,
      label: employee.freedomType.value,
    },
    dateAppointments: GetDayjsFromUnix(employee.dateAppointments),
    dateOfDismissal: GetDayjsFromUnix(employee.dateOfDismissal),
  };
}
