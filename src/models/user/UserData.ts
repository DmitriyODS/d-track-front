interface IUserData {
  userId: number;
  login: string;
  password?: string;
  jwt: string;
  positionId?: number;
  levelAccess?: number;
}

export function NewEmptyUser(): IUserData {
  return { userId: 0, login: '', password: '', jwt: '' };
}

export function NewLoginUser(login: string, password: string): IUserData {
  return { userId: 0, login: login, password: password, jwt: '' };
}

export default IUserData;
