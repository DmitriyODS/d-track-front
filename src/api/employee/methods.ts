import { ServerAPI } from '../base/methods';
import {
  MakeDataFromResponse,
  MakeEmployeeFilters,
  NewEmployeeRequest,
  TEmployeeResponse,
} from './types';
import IEmployeeData from '../../models/employee/EmployeeData';
import { GetJWTFromLocalStorage } from '../../globals/funcs';
import { TBaseResponse } from '../base/types';

export async function GetEmployees(
  fioFilter: string,
  isArchive: boolean
): Promise<IEmployeeData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const urlParams = new URLSearchParams(MakeEmployeeFilters(fioFilter, isArchive));
  const url = `http://${baseServer}${ServerAPI.GetEmployeesLst}?${urlParams}`;

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

export async function CreateEmployee(employee: IEmployeeData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreEmployee}`;
  const req = NewEmployeeRequest(employee);

  return new Promise<number>(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authentication: jwtKey,
        },
        body: JSON.stringify(req),
      });

      const result: TBaseResponse<number> = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}

export async function EditEmployee(employee: IEmployeeData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreEmployee}`;
  const req = NewEmployeeRequest(employee);

  return new Promise<number>(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (!jwtKey) {
      reject('Вы не авторизировованы');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authentication: jwtKey,
        },
        body: JSON.stringify(req),
      });

      const result: TBaseResponse<number> = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data);
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}
