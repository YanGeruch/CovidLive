import { APP_ROUTES } from './app-routes';
/* eslint-disable max-len */
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly _router: Router,
    private readonly _zone: NgZone,
  ) { }

  handleError(error: unknown): void {
    // eslint-disable-next-line no-console
    console.error('An error has occured in the application', error);

    // log error here

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this._zone.run(() => this._router.navigateByUrl(APP_ROUTES.login));
    }
  }
}
