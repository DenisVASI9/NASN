// типизация
import {DevicesActions, EDevicesActions,} from './devices.action';
// типизация

export const devicesNode = 'devices';

export const initialState: any = {
  devices: [],
  loading: false,
};

export const devicesReducer = (
  state: any = initialState,
  action: DevicesActions,
): any => {
  switch (action.type) {


    case EDevicesActions.getDevices:
      return {
        ...state,
        loading: true,
      };
    case EDevicesActions.getDevicesSuccess:
      return {
        ...state,
        devices: action.payload.data,
        loading: false,
      };

    case EDevicesActions.getDevicesFailure:
      return {
        ...state,
        loading: false,
      };


      
    default:
      return state;
  }
};
