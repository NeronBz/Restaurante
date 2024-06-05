import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpStatusService } from '../../services/httpStatus.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
})
export class SpinnerComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    private httpStatusService: HttpStatusService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.httpStatusService.requestInFlight$.subscribe(
      (inFlight) => {
        if (inFlight) {
          this.spinnerService.show();
        } else {
          this.spinnerService.hide();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
