export enum ViewModes {
  Creator,
  Viewer,
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
