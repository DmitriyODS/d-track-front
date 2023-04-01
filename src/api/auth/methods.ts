import IUserData from '../../models/user/UserData';
import { ServerAPI } from '../base/methods';
import { MakeDataFromResponse, NewLoginRequest, TLoginRequest, TLoginResponse } from './types';
import { TBaseResponse } from '../base/types';

export async function Login(u: IUserData): Promise<IUserData> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.Login}`;
  const req: TLoginRequest = NewLoginRequest(u);

  return new Promise<IUserData>(async (resolve, reject) => {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(req),
      });

      const result: TBaseResponse<TLoginResponse> = await resp.json();
      if (result.ok && !!result.data) {
        resolve(MakeDataFromResponse(result.data));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}
