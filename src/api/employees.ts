import ResponseData from '../models/responseData/responseData';
import Employee from '../models/employee/Employee';
import { ApiServer } from './apiServer';
import { GetJWTFromLocalStorage } from '../globals/funcs';

type EmployeeRequest = {};

export async function GetEmployees() {
  const baseServer = '127.0.0.1:8080';
  const url = `http://${baseServer}${ApiServer.GetEmployeesLst}`;

  return new Promise<ResponseData<Employee[]>>(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (jwtKey === null) {
      reject('Not JWT token!');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authentication: jwtKey,
        },
      });
      const result: ResponseData<Employee[]> = await response.json();
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}

export async function GetEmployeeByID(
  id: number
): Promise<ResponseData<Employee>> {
  const baseServer = '127.0.0.1:8080';
  const url = `http://${baseServer}${ApiServer.GetEmployeeByID}${id}`;

  return new Promise<ResponseData<Employee>>(async (resolve, reject) => {
    const jwtKey = GetJWTFromLocalStorage();
    if (jwtKey === null) {
      reject('Not JWT token!');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authentication: jwtKey,
        },
      });
      const result: ResponseData<Employee> = await response.json();
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}
