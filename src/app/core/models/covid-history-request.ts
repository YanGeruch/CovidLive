import { Country } from './country';
export enum CaseStatus {
  Confirmed = 'confirmed',
  Deaths = 'deaths'
}
export interface CovidHistoryRequest {
  country: Country;
  status: CaseStatus;
}
