import ItemData, { NewEmptyItemData } from '../item/ItemData';
import LevelAccessData, {
  NewEmptyLevelAccess,
} from '../levelAccess/LevelAccessData';

interface IEmployeeData {
  id: number;
  fio: string;
  login: string;
  password: string;
  phoneNumber: string;
  emailAddress: string;
  addressOfResidence: string;
  position: ItemData;
  levelAccess: LevelAccessData;
  freedomType: ItemData;
  dateAppointments: number;
  dateOfDismissal: number;
}

export function NewEmptyEmployeeData(): IEmployeeData {
  return {
    id: 0,
    fio: '',
    login: '',
    password: '',
    phoneNumber: '',
    emailAddress: '',
    addressOfResidence: '',
    position: NewEmptyItemData(),
    levelAccess: NewEmptyLevelAccess(),
    freedomType: NewEmptyItemData(),
    dateAppointments: 0,
    dateOfDismissal: 0,
  };
}

export default IEmployeeData;
