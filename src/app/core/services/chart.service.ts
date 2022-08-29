import { Injectable } from '@angular/core';
import { DataPoint } from '../models';
import { HistoricalChart } from '../models/historical-chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public updateChartData(chart: HistoricalChart, dataPoints: DataPoint[]): void {
    if (!chart) {
      return;
    }
    const labels = chart.data.labels ?? [];
    const data = chart.data.datasets[0].data;

    // clear old data
    labels.length = 0;
    data.length = 0;

    // set new data
    dataPoints.forEach(p => {
      data.push(p);
      labels.push(p.x);
    });

    chart.update();
  }

  public clearChart(chart: HistoricalChart): void {
    if (!chart) {
      return;
    }
    const labels = chart.data.labels ?? [];
    const data = chart.data.datasets[0].data;

    labels.length = 0;
    data.length = 0;

    chart.update();
  }
}
