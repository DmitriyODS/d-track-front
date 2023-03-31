import SelectList, { CreateEmptySelectList } from '../selectList/SelectList';
import LevelAccess, {
  CreateEmptyLevelAccess,
} from '../levelAccess/LevelAccess';

type Employee = {
  id: number;
  fio: string;
  login: string;
  password: string;
  phone_number: string;
  email_address: string;
  address_of_residence: string;
  position: SelectList;
  level_access: LevelAccess;
  freedom_type: SelectList;
  date_appointments: number;
  date_of_dismissal: number;
};

export function CreateEmptyEmployee(): Employee {
  return {
    id: 0,
    fio: '',
    login: '',
    password: '',
    phone_number: '',
    email_address: '',
    address_of_residence: '',
    position: CreateEmptySelectList(),
    level_access: CreateEmptyLevelAccess(),
    freedom_type: CreateEmptySelectList(),
    date_appointments: 0,
    date_of_dismissal: 0,
  };
}

export default Employee;
