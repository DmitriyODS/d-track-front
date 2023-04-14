import {
  MakeDataFromLAResponse,
  MakeDataFromResponse,
  TFilters,
  TListLevelAccessResponse,
  TListResponse,
} from './types';
import IItemData from '../../models/item/ItemData';
import { ServerAPI } from '../base/methods';
import { GetJWTFromLocalStorage } from '../../globals/funcs';
import { TBaseResponse } from '../base/types';

export async function GetList(filters: TFilters, listApi: string): Promise<IItemData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${listApi}`;

  return new Promise<IItemData[]>(async (resolve, reject) => {
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

      const result: TBaseResponse<TListResponse[]> = await response.json();
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

export async function GetListEmployees(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListEmployees);
}

export async function GetListCustomers(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListCustomers);
}

export async function GetListPositions(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListPositions);
}

export async function GetListFreedomTypes(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListFreedomTypes);
}

export async function GetListServices(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListServices);
}

export async function GetListClaimStates(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListClaimStates);
}

export async function GetListTaskStates(filters: TFilters): Promise<IItemData[]> {
  return GetList(filters, ServerAPI.GetListTaskStates);
}

export async function GetListLevelAccess(filters: TFilters): Promise<IItemData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.GetListLevelAccesses}`;

  return new Promise<IItemData[]>(async (resolve, reject) => {
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

      const result: TBaseResponse<TListLevelAccessResponse[]> = await response.json();
      if (result.ok && !!result.data) {
        resolve(result.data.map((it) => MakeDataFromLAResponse(it)));
      } else {
        reject(`Ошибка: ${result.description}`);
      }
    } catch (e) {
      reject('Сервер не доступен');
    }
  });
}
