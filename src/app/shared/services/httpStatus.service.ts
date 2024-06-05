import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {
  private requestCount = 0;
  private requestInFlightSubject = new BehaviorSubject<boolean>(false);
  requestInFlight$ = this.requestInFlightSubject.asObservable();

  incrementRequestCount() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.requestInFlightSubject.next(true);
    }
  }

  decrementRequestCount() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.requestInFlightSubject.next(false);
    }
  }
}
