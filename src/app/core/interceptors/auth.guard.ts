import { APP_ROUTES } from './../app-routes';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

  canActivate(): Observable<boolean> {
    if (!this._authService.isLoggedIn) {
      return of(true);
    }
    this._router.navigate([APP_ROUTES.login]);
    return of(false);
  }
}
