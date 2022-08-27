import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, CovidCasesResponse, CovidHistoryRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CovidStatisticsApiService {
  private readonly BASE_URL = 'https://covid-api.mmediagroup.fr/v1';
  constructor(private readonly _httpClient: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this._httpClient.get<Country[]>('assets/countries.json');
  }

  public getCases(country: Country): Observable<CovidCasesResponse> {
    const params = new HttpParams();
    if (country.name) {
      params.append('country', country.name);
    } else {
      params.append('ab', country.code);
    }

    return this._httpClient.get<CovidCasesResponse>(`${this.BASE_URL}/cases/`, { params });
  }

  public getHistory(request: CovidHistoryRequest): Observable<CovidCasesResponse> {
    const params = new HttpParams();
    if (request.country.name) {
      params.append('country', request.country.name);
    } else {
      params.append('ab', request.country.code);
    }
    params.append('status', request.status);
    return this._httpClient.get<CovidCasesResponse>(`${this.BASE_URL}/history/`, { params });
  }
}
