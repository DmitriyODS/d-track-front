import jwtDecode from 'jwt-decode';
import dayjs, { Dayjs } from 'dayjs';
import IUserData from '../models/user/UserData';
import { SectionPos, ViewModes } from './types';

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
  level_access: number;
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

export function GetDayjsFromUnix(date: number): Dayjs | null {
  if (date === 0) {
    return null;
  }

  return dayjs.unix(date);
}

export function GetUnixFromDayjs(date: Dayjs | null): number {
  if (date === null) {
    return 0;
  }

  return date.unix();
}

export function GetViewModeByLevelAccess(section: SectionPos): ViewModes {
  const localUser = GetLocalUser();
  if (localUser?.levelAccess === undefined) {
    return ViewModes.None;
  }

  if (((localUser.levelAccess >> section) & 3) === 3) {
    return ViewModes.Creator;
  }

  if (((localUser.levelAccess >> section) & 2) > 0) {
    return ViewModes.Updater;
  }

  if (((localUser.levelAccess >> section) & 3) > 0) {
    return ViewModes.Viewer;
  }

  return ViewModes.None;
}
