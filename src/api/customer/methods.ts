import ICustomerData from '../../models/customer/CustomerData';
import {
  MakeCustomerFilters,
  MakeDataFromResponse,
  NewCustomerRequest,
  TCustomerResponse,
} from './types';
import { ServerAPI } from '../base/methods';
import { GetJWTFromLocalStorage } from '../../globals/funcs';
import { TBaseResponse } from '../base/types';

export async function GetCustomers(
  fioFilter: string,
  isArchive: boolean
): Promise<ICustomerData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const urlParams = new URLSearchParams(MakeCustomerFilters(fioFilter, isArchive));
  const url = `http://${baseServer}${ServerAPI.GetCustomersLst}?${urlParams}`;

  return new Promise<ICustomerData[]>(async (resolve, reject) => {
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

      const result: TBaseResponse<TCustomerResponse[]> = await response.json();
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

export async function GetCustomerByID(id: number): Promise<ICustomerData> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.GetCustomerByID}${id}`;

  return new Promise<ICustomerData>(async (resolve, reject) => {
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

      const result: TBaseResponse<TCustomerResponse> = await response.json();
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

export async function CreateCustomer(Customer: ICustomerData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreCustomer}`;
  const req = NewCustomerRequest(Customer);

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

export async function EditCustomer(Customer: ICustomerData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreCustomer}`;
  const req = NewCustomerRequest(Customer);

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
