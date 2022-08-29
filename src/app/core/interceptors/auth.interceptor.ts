import { LoginToken } from './../models/login-token';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authenticationUrl = `${ENVIRONMENT.baseUrl}/api/authenticate`;
  cookieTokenUrl = `${ENVIRONMENT.baseUrl}/api/session`;

  constructor(private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url === this.authenticationUrl) {
      return next.handle(req)
        .pipe(tap(event => this.handleAuthentication(event)));
    }

    if (req.url === this.cookieTokenUrl) {
      return next.handle(req);
    }

    return next.handle(this.addTokenToHeader(req))
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._authService.token = null;
        }

        return throwError(error);
      })
      );
  }

  addTokenToHeader(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this._authService.token;
    if (token) {
      return req.clone({
        headers: req.headers.set('Authorization', `${token.token_type} ${token.access_token}`)
      });
    }

    return req;
  }

  handleAuthentication(event: HttpEvent<unknown>): void {
    if (event instanceof HttpResponse) {
      this._authService.token = event.body as LoginToken;
    }
  }
}
