import { ServerAPI } from '../base/methods';
import { GetJWTFromLocalStorage } from '../../globals/funcs';
import { TBaseResponse } from '../base/types';
import IClaimData from '../../models/claim/ClaimData';
import { MakeClaimFilters, MakeDataFromResponse, NewClaimRequest, TClaimResponse } from './types';

export async function GetClaims(
  numberFilter: string,
  isArchive: boolean,
  customerID: number
): Promise<IClaimData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const urlParams = new URLSearchParams(MakeClaimFilters(numberFilter, isArchive, customerID));
  const url = `http://${baseServer}${ServerAPI.GetClaimsLst}?${urlParams}`;

  return new Promise<IClaimData[]>(async (resolve, reject) => {
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

      const result: TBaseResponse<TClaimResponse[]> = await response.json();
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

export async function GetClaimByID(id: number): Promise<IClaimData> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.GetClaimByID}${id}`;

  return new Promise<IClaimData>(async (resolve, reject) => {
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

      const result: TBaseResponse<TClaimResponse> = await response.json();
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

export async function CreateClaim(claim: IClaimData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreClaim}`;
  const req = NewClaimRequest(claim);

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

export async function EditClaim(claim: IClaimData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreClaim}`;
  const req = NewClaimRequest(claim);

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
