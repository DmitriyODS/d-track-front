export enum ServerAPI {
  Login = '/v1/auth/login',

  GetEmployeesLst = '/v1/employees/getList',
  GetEmployeeByID = '/v1/employees/',
  StoreEmployee = '/v1/employees/store',

  GetListPositions = '/v1/lists/positions',
  GetListEmployees = '/v1/lists/employees',
  GetListFreedomTypes = '/v1/lists/freedomTypes',
  GetListLevelAccesses = '/v1/lists/levelAccesses',
}
