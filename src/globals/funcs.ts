import jwtDecode from 'jwt-decode';
import dayjs, { Dayjs } from 'dayjs';
import IUserData from '../models/user/UserData';

function storageAvailable(typeStorage: any) {
  try {
    const storage: any = window[typeStorage],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

const JWTKey = 'user_jwt_key';

export function GetJWTFromLocalStorage(): any {
  if (storageAvailable('localStorage')) {
    return localStorage.getItem(JWTKey);
  }

  return null;
}

export function SetJWTToLocalStorage(jwtStr: string) {
  if (storageAvailable('localStorage')) {
    localStorage.setItem(JWTKey, jwtStr);
  }
}

export function ResetLocalStorage() {
  if (storageAvailable('localStorage')) {
    return localStorage.clear();
  }
}

type TJwtPayload = {
  user_id: number;
  login: string;
  position_id?: number;
  level_access: string;
};

export function GetUserFromJWT(jwtStr: string): IUserData {
  const jwtPayload: TJwtPayload = jwtDecode(jwtStr);
  return {
    userId: jwtPayload.user_id,
    login: jwtPayload.login,
    positionId: jwtPayload.position_id,
    jwt: jwtStr,
    levelAccess: jwtPayload.level_access,
  };
}

export function GetLocalUser(): IUserData | undefined {
  const jwt = GetJWTFromLocalStorage();
  if (jwt === null) {
    return undefined;
  }

  return GetUserFromJWT(jwt);
}

export function GetDayjsFromUnix(date: number): Dayjs | undefined {
  if (date === 0) {
    return undefined;
  }

  return dayjs.unix(date);
}

export function GetUnixFromDayjs(date?: Dayjs): number {
  if (date === undefined) {
    return 0;
  }

  return date.unix();
}
