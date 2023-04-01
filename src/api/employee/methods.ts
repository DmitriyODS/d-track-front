import { ServerAPI } from '../base/methods';
import { MakeDataFromResponse, TEmployeeResponse, TFilters } from './types';
import IEmployeeData from '../../models/employee/EmployeeData';
import { GetJWTFromLocalStorage } from '../../globals/funcs';
import { TBaseResponse } from '../base/types';

export async function GetEmployees(filters: TFilters): Promise<IEmployeeData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.GetEmployeesLst}`;

  return new Promise<IEmployeeData[]>(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authentication: jwtKey,
        },
      });

      const result: TBaseResponse<TEmployeeResponse[]> = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data.map((it) => MakeDataFromResponse(it)));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function GetEmployeeByID(id: number): Promise<IEmployeeData> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.GetEmployeeByID}${id}`;

  return new Promise<IEmployeeData>(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authentication: jwtKey,
        },
      });

      const result: TBaseResponse<TEmployeeResponse> = await response.json();
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
