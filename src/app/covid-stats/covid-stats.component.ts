
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Country } from '../core/models';
import { finalize } from 'rxjs/operators';
import { CovidStatisticsService } from '../core/services/covid-statistics.service';
import { Chart, ChartItem, registerables } from 'chart.js';
import { CHART_CONFIG } from './chart-config';
import { ChartService } from '../core/services/chart.service';
import { HistoricalChart } from '../core/models/historical-chart';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidStatsComponent implements AfterViewInit {
  public selectedCountry!: Country;
  public isSaving!: boolean;

  public confirmed!: number;
  public deaths!: number;
  public recovered!: number;
  public vaccinated!: number;

  public showStats!: boolean;
  public chart!: HistoricalChart;
  public ctx!: ChartItem;

  @ViewChild('historyChart') historyChart!: ElementRef<HTMLCanvasElement>;

  public getCountries = this._covidStatsService.getCountries();

  public constructor(
    private readonly _covidStatsService: CovidStatisticsService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _chartService: ChartService
    ) {
      Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.ctx = this.historyChart.nativeElement.getContext('2d') as ChartItem;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.chart = new Chart(this.ctx, CHART_CONFIG) as unknown as HistoricalChart;
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
      const { confirmed, deaths, recovered, vacinatedPercent, historical } = data;
      this.confirmed = confirmed;
      this.deaths = deaths;
      this.recovered = recovered;
      this.vaccinated = vacinatedPercent;

      this.showStats = true;

      console.log(historical);
      this._chartService.updateChartData(this.chart, historical);
    });
  }
}
