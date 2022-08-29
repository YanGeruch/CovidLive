/* eslint-disable @typescript-eslint/naming-convention */

interface StatsBase {
  country: string;
  population: number;
  sq_km_area: number;
  life_expectancy: number;
  elevation_in_meters: number;
  continent: string;
  abbreviation: string;
  location: string;
  iso: number;
  capital_city: string;
  lat: number;
  long: number;
  updated: Date;
}

export interface CaseStatisticsResponse {
  All: {
    confirmed: number;
    recovered: number;
    deaths: number;
  } & StatsBase;
}

export interface VaccinationStatisticsResponse {
  All: {
    administered: number;
    people_vaccinated: number;
    people_partially_vaccinated: number;
  } & StatsBase;
}

export interface HistoricalStatisticsResponse {
  All: {
    dates: Record<string, number>;
  } & StatsBase;
}
