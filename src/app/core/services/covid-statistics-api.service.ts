import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, CaseStatisticsResponse, CovidHistoryRequest, VaccinationStatisticsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CovidStatisticsApiService {
  private readonly BASE_URL = 'https://covid-api.mmediagroup.fr/v1';
  constructor(private readonly _httpClient: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this._httpClient.get<Country[]>('assets/countries.json');
  }

  public getCases(country: Country): Observable<CaseStatisticsResponse> {
    let params = new HttpParams();
    params = params.append('country', country.name);

    return this._httpClient.get<CaseStatisticsResponse>(`${this.BASE_URL}/cases`, { params });
  }

  public getVaccination(country: Country): Observable<VaccinationStatisticsResponse> {
    let params = new HttpParams();
    params = params.append('country', country.name);

    return this._httpClient.get<VaccinationStatisticsResponse>(`${this.BASE_URL}/vaccines`, { params });
  }

  public getHistory(request: CovidHistoryRequest): Observable<CaseStatisticsResponse> {
    let params = new HttpParams();
    params = params.append('country', request.country.name);
    params = params.append('status', request.status);

    return this._httpClient.get<CaseStatisticsResponse>(`${this.BASE_URL}/history`, { params });
  }
}
