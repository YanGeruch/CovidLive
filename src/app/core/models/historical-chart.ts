
import { Chart } from 'chart.js';
import { DataPoint } from './covid-statistics';

export type HistoricalChart = Chart<'line', DataPoint[]>;
