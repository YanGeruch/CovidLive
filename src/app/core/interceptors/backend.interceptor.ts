import { LoginToken } from '../models/login-token';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../../environments/environment';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  authenticationUrl = `${ENVIRONMENT.baseUrl}/api/authenticate`;
  identityUrl = `${ENVIRONMENT.identityUrl}/access_token`;
  cookieTokenUrl = `${ENVIRONMENT.baseUrl}/api/session`;

  // constructor(private readonly _httpClient: HttpClient) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url === this.authenticationUrl) {
      const request = req.clone({
        url: `https://cors-anywhere.herokuapp.com/${this.identityUrl}`,
        headers: req.headers.append('Accept', 'application/json'),
        params: req.params.append('client_secret', ENVIRONMENT.clientSecret)
      });

      return next.handle(request)
        .pipe(tap(event => this.handleAuthentication(event)));
    }

    if (req.url === this.cookieTokenUrl && req.method === 'GET') {
      const token = JSON.parse(localStorage.getItem('token') ?? '{}') as LoginToken;
      return of(new HttpResponse({ status: 200, body: token }));
    }

     return next.handle(req);
    }

    handleAuthentication(event: HttpEvent<unknown>): void {
      if (event instanceof HttpResponse) {
        localStorage.setItem('token', JSON.stringify(event.body));
      }
    }
}