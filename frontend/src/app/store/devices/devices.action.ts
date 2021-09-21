import {Action} from '@ngrx/store';

export enum EDevicesActions {
  getDevices = '[Devices] GET_DEVICES',
  getDevicesSuccess = '[Devices] GET_DEVICES SUCCESS',
  getDevicesFailure = '[Devices] GET_DEVICES FAILURE',
}

export class GetDevicesAction implements Action {
  readonly type = EDevicesActions.getDevices;
}

export class GetDevicesSuccessAction implements Action {
  readonly type = EDevicesActions.getDevicesSuccess;

  constructor(public payload: { data: number[] }) {}
}

export class GetDevicesFailureAction implements Action {
  readonly type = EDevicesActions.getDevicesFailure;
}

export type DevicesActions =
  | GetDevicesAction
  | GetDevicesFailureAction
  | GetDevicesSuccessAction;
