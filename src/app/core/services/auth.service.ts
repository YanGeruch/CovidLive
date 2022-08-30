import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginToken } from '../models';
import { ENVIRONMENT } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token!: LoginToken | null;

  public get isLoggedIn(): boolean {
    return Boolean(this.token?.access_token);
  }

  constructor(private readonly _httpClient: HttpClient) {}

  public getCookieToken(): Observable<LoginToken> {
    return this._httpClient.get<LoginToken>(`${ENVIRONMENT.baseUrl}/api/session`);
  }

  public authenticate(code: string): Observable<string> {
    let params = new HttpParams();

    params = params.append('code', code);
    params = params.append('client_id', ENVIRONMENT.clientId);
    return this._httpClient.get<string>(`${ENVIRONMENT.baseUrl}/api/authenticate`, { params });
  }
}
