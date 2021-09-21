import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {selectDevicesState} from "./store/devices/devices.selector";
import {select, Store} from "@ngrx/store";
import {GetDevicesAction} from "./store/devices/devices.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private readonly store$: Store<any>,
  ) {}

  title = 'frontend';
  devices = [];
  devicesState$: Observable<any> = this.store$.pipe(
    select(selectDevicesState),
  );

  ngOnInit() {
    this.store$.dispatch(new GetDevicesAction());

    this.devicesState$.subscribe((devicesState: any) => {
      this.devices = devicesState.devices;
      console.log(this.devices)
    });

  }
}
