import IUserData from '../../models/user/UserData';

export type TLoginRequest = {
  login: string;
  password: string;
};

export type TLoginResponse = {
  user_id: number;
  login: string;
  jwt: string;
};

export function NewLoginRequest(u: IUserData): TLoginRequest {
  return { login: u.login, password: u.password ?? '' };
}

export function MakeDataFromResponse(r: TLoginResponse): IUserData {
  return {
    userId: r.user_id,
    login: r.login,
    jwt: r.jwt,
  };
}
