import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  getDevices(): Observable<{ data: number[] }> {
    return new Observable(subscriber => {
      subscriber.next({data: [1, 2, 3]});
      subscriber.next({data: [4, 5, 6]});
      subscriber.next({data: [7, 7, 7]});
      subscriber.complete();
    })}
}
