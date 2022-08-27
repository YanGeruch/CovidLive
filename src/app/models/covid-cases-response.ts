/* eslint-disable @typescript-eslint/naming-convention */
export interface CovidCasesResponse {
  All: {
    confirmed: number;
    recovered: number;
    deaths: number;
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
  };
  [key: string]: {
    lat: number;
    long: number;
    confirmed: number;
    recovered: number;
    deaths: number;
    updated: Date;
  };
}
