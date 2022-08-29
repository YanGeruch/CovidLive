import { Moment } from 'moment';

export interface CovidStatistics {
  confirmed: number;
  recovered: number;
  deaths: number;
  vacinatedPercent: number;
  historical: DataPoint[];
}

export interface DataPoint {
  x: Moment;
  y: number;
}
