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

export function GetUserFromJWT(jwtStr: string): any {
  return jwtDecode(jwtStr);
}

export function GetLocalUser(): any {
  const jwt = GetJWTFromLocalStorage();
  if (jwt === null) {
    return undefined;
  }

  const tokenUserData = GetUserFromJWT(jwt);

  return {
    user_id: tokenUserData.user_id,
    login: tokenUserData.user_login,
    position_id: tokenUserData.position_id,
    level_access: tokenUserData.level_access,
  };
}
