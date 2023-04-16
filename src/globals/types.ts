export enum ViewModes {
  Creator = 3,
  Updater = 2,
  Viewer = 1,
  None = 0,
}

export enum EditModes {
  Create,
  Edit,
  View,
}

export enum PendingStatuses {
  Ready,
  Loading,
}

export enum FreedomTypes {
  NotSet = '0',
  Free = '1',
  Busy = '2',
  DayOff = '3',
  Vacation = '4',
  Fired = '5',
}

export enum ClaimStates {
  Acceptance = '1',
  Departure = '2',
  Repair = '3',
  Testing = '4',
  Extradition = '5',
  Close = '6',
}

export enum TaskStates {
  Open = '1',
  InWork = '2',
  Estimation = '3',
  Close = '4',
}

export enum SectionPos {
  Employees = 6,
  Customers = 4,
  Claims = 2,
  Tasks = 0,
}
