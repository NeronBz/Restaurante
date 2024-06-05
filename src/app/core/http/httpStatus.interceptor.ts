import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpStatusService } from '../../shared/services/httpStatus.service';

@Injectable()
export class HttpStatusInterceptor implements HttpInterceptor {
  constructor(private httpStatusService: HttpStatusService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.httpStatusService.incrementRequestCount();
    return next.handle(req).pipe(
      finalize(() => {
        this.httpStatusService.decrementRequestCount();
      })
    );
  }
}
