import { CaseStatus } from './../models/covid-history-request';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Country, CaseStatisticsResponse, CovidStatistics } from '../models';
import { map } from 'rxjs/operators';
import { CovidStatisticsApiService } from './covid-statistics-api.service';

@Injectable({
  providedIn: 'root'
})
export class CovidStatisticsService {
  constructor(private readonly _covidStatisticsApiService: CovidStatisticsApiService) { }

  public getCountries(): Observable<Country[]> {
    return this._covidStatisticsApiService.getCountries();
  }

  public getStatistics(country: Country): Observable<CovidStatistics> {
    return forkJoin([
      this._covidStatisticsApiService.getCases(country),
      this._covidStatisticsApiService.getVaccination(country)
    ])
    .pipe(
      map(([cases, vaccination]) => ({
        confirmed: cases.All.confirmed,
        deaths: cases.All.deaths,
        recovered: cases.All.recovered,
        vacinatedPercent: 100 * vaccination.All.people_vaccinated / vaccination.All.population
      }))
    );
  }

  public getHistory(country: Country, status: CaseStatus): Observable<CaseStatisticsResponse> {
    return this._covidStatisticsApiService.getHistory({ country, status });
  }
}
