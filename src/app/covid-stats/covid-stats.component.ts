
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Country } from '../models';
import { CovidStatisticsApiService } from '../services/covid-statistics-api.service';
import { tap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CovidStatsComponent {
  public isLoading = true;
  public countries!: Country[];
  public selectedCountry!: Country;

  public getCountries = this._covidStatsService.getCountries().pipe(tap(() => this.isLoading = false));

  public constructor(private readonly _covidStatsService: CovidStatisticsApiService) {
    interval(1000).subscribe(() => console.log(this.selectedCountry));

  }

  public onSubmit(): void {
    this._covidStatsService.getCases(this.selectedCountry);
  }
}
