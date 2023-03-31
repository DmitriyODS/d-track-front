import User from '../models/user/User';
import { ApiServer } from './apiServer';
import ResponseData from '../models/responseData/responseData';

type LoginRequest = {
  login: string;
  password: string;
};

export async function LoginUser(
  login: string,
  password: string
): Promise<ResponseData<User>> {
  // const baseServer = process.env['REACT_APP_SERVER'];
  const baseServer = '127.0.0.1:8080';
  const loginReq: LoginRequest = { login: login, password: password };
  const url = `http://${baseServer}${ApiServer.Login}`;

  return new Promise<ResponseData<User>>(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(loginReq),
      });

      const result: ResponseData<User> = await response.json();
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}
