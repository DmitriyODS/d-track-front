import ITaskData from '../../models/task/TaskData';
import { MakeDataFromResponse, MakeTaskFilters, NewTaskRequest, TTaskResponse } from './types';
import { ServerAPI } from '../base/methods';
import { GetJWTFromLocalStorage } from '../../globals/funcs';
import { TBaseResponse } from '../base/types';

export async function GetTask(numberFilter: string, isArchive: boolean): Promise<ITaskData[]> {
  const baseServer = process.env.REACT_APP_SERVER;
  const urlParams = new URLSearchParams(MakeTaskFilters(numberFilter, isArchive));
  const url = `http://${baseServer}${ServerAPI.GetTasksLst}?${urlParams}`;

  return new Promise<ITaskData[]>(async (resolve, reject) => {
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

      const result: TBaseResponse<TTaskResponse[]> = await response.json();
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

export async function GetTaskByID(id: number): Promise<ITaskData> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.GetTaskByID}${id}`;

  return new Promise<ITaskData>(async (resolve, reject) => {
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

      const result: TBaseResponse<TTaskResponse> = await response.json();
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

export async function CreateTask(Task: ITaskData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreTask}`;
  const req = NewTaskRequest(Task);

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

export async function EditTask(Task: ITaskData): Promise<number> {
  const baseServer = process.env.REACT_APP_SERVER;
  const url = `http://${baseServer}${ServerAPI.StoreTask}`;
  const req = NewTaskRequest(Task);

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
