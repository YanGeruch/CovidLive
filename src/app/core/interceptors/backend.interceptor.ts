import { LoginToken } from '../models/login-token';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../../environments/environment';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  authenticationUrl = `${ENVIRONMENT.baseUrl}/api/authenticate`;
  identityUrl = `${ENVIRONMENT.identityUrl}/access_token`;
  cookieTokenUrl = `${ENVIRONMENT.baseUrl}/api/session`;
  useProxy = ENVIRONMENT.useProxy;

  // This service emulates BE functionality for sending Oauth get token request and
  // storing retreived token in session storage
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url === this.authenticationUrl) {
      const request = req.clone({
        url: this.useProxy ? `https://cors-anywhere.herokuapp.com/${this.identityUrl}` : this.identityUrl,
        headers: req.headers.append('Accept', 'application/json'),
        params: req.params.append('client_secret', ENVIRONMENT.clientSecret)
      });

      return next.handle(request)
        .pipe(tap(event => this.handleAuthentication(event)));
    }

    if (req.url === this.cookieTokenUrl && req.method === 'GET') {
      const tokenJson = sessionStorage.getItem('access_token');
      const token = (tokenJson ? JSON.parse(tokenJson) : null) as LoginToken;
      return of(new HttpResponse({ status: 200, body: token }));
    }

     return next.handle(req)
     .pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        sessionStorage.removeItem('access_token');
      }
      return throwError(error);
    })
    );
    }

    handleAuthentication(event: HttpEvent<unknown>): void {
      if (event instanceof HttpResponse) {
        sessionStorage.setItem('access_token', JSON.stringify(event.body));
      }
    }
}
