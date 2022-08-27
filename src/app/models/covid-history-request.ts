import { Country } from './country';
export type CaseStatus = 'confirmed' | 'deaths';
export interface CovidHistoryRequest {
  country: Country;
  status: CaseStatus;
}
