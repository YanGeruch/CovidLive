import { APP_ROUTES } from './app-routes';
/* eslint-disable max-len */
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly _router: Router
  ) { }

  handleError(error: unknown): void {
    // eslint-disable-next-line no-console
    console.error('An error has occured in the application', error);

    // log error here

    // if 401 (Unauthorized) error code returned - navigate to login page
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this._router.navigateByUrl(APP_ROUTES.login);
    }
  }
}
