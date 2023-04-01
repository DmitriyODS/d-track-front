import { TEmployeeState } from './data';

export enum NameFields {
  init,
  id,
  fio,
  login,
  password,
  phoneNumber,
  emailAddress,
  addressOfResidence,
  position,
  levelAccess,
  freedomType,
  dateAppointments,
  dateOfDismissal,
}

type TAction = {
  type: NameFields;
  payload: any;
};

export function EditEmployeeReducer(state: TEmployeeState, action: TAction): TEmployeeState {
  switch (action.type) {
    case NameFields.init: {
      return action.payload;
    }
    case NameFields.id: {
      return { ...state, id: action.payload };
    }
    case NameFields.fio: {
      return { ...state, fio: action.payload };
    }
    case NameFields.login: {
      return { ...state, login: action.payload };
    }
    case NameFields.password: {
      return { ...state, password: action.payload };
    }
    case NameFields.phoneNumber: {
      return { ...state, phoneNumber: action.payload };
    }
    case NameFields.emailAddress: {
      return { ...state, emailAddress: action.payload };
    }
    case NameFields.addressOfResidence: {
      return { ...state, addressOfResidence: action.payload };
    }
    case NameFields.position: {
      return { ...state, position: action.payload };
    }
    case NameFields.levelAccess: {
      return { ...state, levelAccess: action.payload };
    }
    case NameFields.freedomType: {
      return { ...state, freedomType: action.payload };
    }
    case NameFields.dateAppointments: {
      return { ...state, dateAppointments: action.payload };
    }
    case NameFields.dateOfDismissal: {
      return { ...state, dateOfDismissal: action.payload };
    }
    default: {
      return state;
    }
  }
}
