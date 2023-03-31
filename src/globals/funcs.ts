import jwtDecode from 'jwt-decode';

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

  return undefined;
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

export function GetUserFromJWT(jwtStr: string): any {
  return jwtDecode(jwtStr);
}

export function GetLocalUser(): any {
  const jwt = GetJWTFromLocalStorage();
  if (jwt === undefined) {
    return undefined;
  }

  return GetUserFromJWT(jwt);
}
