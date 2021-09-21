import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EDevicesActions, GetDevicesAction, GetDevicesFailureAction, GetDevicesSuccessAction,} from './devices.action';
import {DeviceService} from "../../services/device.service";

@Injectable()
export class DevicesEffects {
  getDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetDevicesAction>(EDevicesActions.getDevices),
      mergeMap(() =>
        this.deviceService.getDevices().pipe(
          map((devices: any) => new GetDevicesSuccessAction(devices)),
          catchError(() =>
            of(new GetDevicesFailureAction())
          ),
        ),
      ),
    ),
  );


  constructor(
    private readonly actions$: Actions,
    private readonly deviceService: DeviceService,
  ) {
  }
}
