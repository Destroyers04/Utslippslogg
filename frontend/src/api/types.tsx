import type { NumberFieldDecrement } from "@base-ui/react";

export type Token = {
  access_token: string;
  token_type: string;
};

export type UserData = {
  name: string;
  user_id: number;
  email: string;
};

export type SiteData = {
  site_id: number;
  name: string;
  location: string;
  station_count: number;
  stations: StationData[];
};

export type StationData = {
  station_id: number;
  name: string;
  location_description: string;
  site_id: number;
};

export type MeasurementData = {
  measurement_id: number;
  value: number;
  time: string;
  station_id: number;
  unit_id: number;
  type: string;
};

export type UnitData = {
  unit_id: number;
  unit: string;
  emission: string;
};
