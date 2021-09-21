import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from 'src/environments/environment';

// типизация
import {devicesNode, devicesReducer} from "./devices/devices.reducer";

// типизация

export interface State {
  [devicesNode]: any;
}

export const appReducers: ActionReducerMap<State, any> = {
  [devicesNode]: devicesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
