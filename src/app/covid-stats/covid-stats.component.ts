
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Country } from '../core/models';
import { finalize } from 'rxjs/operators';
import { CovidStatisticsService } from '../core/services/covid-statistics.service';

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidStatsComponent {
  public countries!: Country[];
  public selectedCountry!: Country;
  public isSaving!: boolean;

  public confirmed!: number;
  public deaths!: number;
  public recovered!: number;
  public vaccinated!: number;

  public showStats!: boolean;

  public getCountries = this._covidStatsService.getCountries();

  public constructor(private readonly _covidStatsService: CovidStatisticsService, private readonly _cdr: ChangeDetectorRef) {
  }

  public onSubmit(): void {
    this.isSaving = true;
    this._covidStatsService.getStatistics(this.selectedCountry)
    .pipe(
      finalize(() => {
        this.isSaving = false;
        this._cdr.markForCheck();
      })
    )
    .subscribe(data => {
      const { confirmed, deaths, recovered, vacinatedPercent } = data;
      this.confirmed = confirmed;
      this.deaths = deaths;
      this.recovered = recovered;
      this.vaccinated = vacinatedPercent;

      this.showStats = true;
    });
  }
}
