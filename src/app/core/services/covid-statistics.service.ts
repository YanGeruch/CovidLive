import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Country, CovidStatistics } from '../models';
import { map } from 'rxjs/operators';
import { CovidStatisticsApiService } from './covid-statistics-api.service';
import * as moment from 'moment';

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
      this._covidStatisticsApiService.getVaccination(country),
      this._covidStatisticsApiService.getHistory({ country, status: 'confirmed' }),
    ])
    .pipe(
      map(([cases, vaccination, historical]) => ({
        // default value to 0 when api fails for testing purposes
        confirmed: cases.All?.confirmed ?? 0,
        deaths: cases.All?.deaths ?? 0,
        recovered: cases.All?.recovered ?? 0,
        vacinatedPercent: 100 * vaccination.All.people_vaccinated / vaccination.All.population,
        historical: Object.entries(historical.All.dates).map(([key, value]) => ({ x: moment(key, 'YYYY-MM-DD'), y: value }))
      }))
    );
  }
}
