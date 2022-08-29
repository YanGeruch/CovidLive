import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginToken } from '../models';
import { ENVIRONMENT } from '../../../environments/environment';


const identityUrl = ENVIRONMENT.identityUrl;
const clientId = ENVIRONMENT.clientId;
const clientSecret = ENVIRONMENT.clientSecret;
const commonHeaders = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Access-Control-Allow-Origin': '*'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _state!: string;

  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private _token!: LoginToken;

  public get isLoggedIn(): boolean {
    return Boolean(this._token);
  }
  constructor(private readonly _httpClient: HttpClient) {}



  public login(code: string): Observable<string> {
    let params = new HttpParams();
    const headers = commonHeaders;

    // this._state = Math.random()
    // .toString(36)
    // .substring(2, 7);

    params = params.append('code', code);
    params = params.append('client_id', clientId);
    params = params.append('client_secret', clientSecret);
    // params = params.append('redirect_uri', ENVIRONMENT.baseUrl);
    return this._httpClient.get<string>(`https://cors-anywhere.herokuapp.com/${identityUrl}/access_token`, { headers, params });
  }
}
