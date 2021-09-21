import {createFeatureSelector, createSelector} from '@ngrx/store';
import {devicesNode} from './devices.reducer';

export const selectDevicesState =
  createFeatureSelector<any>(devicesNode);

export const selectDevices = createSelector(
  selectDevicesState,
  (state: any): any[] => state.devices,
);
