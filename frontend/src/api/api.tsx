import axios from "axios";
import type {
  Token,
  UserData,
  SiteData,
  StationData,
  UnitData,
  MeasurementData,
} from "@/api/types";
// Check API.md or "http://127.0.0.1:8000/docs#" for more information on the API endpoints and expected responses.
const API_URL = "http://127.0.0.1:8000";

export const getLogInToken = async (
  email: string,
  password: string,
): Promise<string> => {
  // OAuth2 requires form data, not JSON
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const response = await axios.post<Token>(`${API_URL}/auth/token`, params);
  return response.data.access_token;
};

export const getUserData = async (token: string): Promise<UserData> => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return response.data;
};

export const getSiteData = async (token: string): Promise<SiteData[]> => {
  const response = await axios.get(`${API_URL}/get/site`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return response.data;
};

export const getSiteMeasurementsData = async (
  token: string,
  site_id: number,
  page: number = 0,
  limit: number = 10,
): Promise<MeasurementData[]> => {
  const response = await axios.get(
    `${API_URL}/get/site/${site_id}/measurements`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      params: { skip: page * limit, limit },
    },
  );
  return response.data;
};

export const getStationMeasurementsData = async (
  token: string,
  station_id: number,
  site_id: number,
  page: number = 0,
  limit: number = 10,
): Promise<MeasurementData[]> => {
  const response = await axios.get(
    `${API_URL}/get/site/${site_id}/station/${station_id}/measurements`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      params: { skip: page * limit, limit },
    },
  );
  return response.data;
};

export const getUnitsData = async (): Promise<UnitData[]> => {
  const response = await axios.get(`${API_URL}/get/units`);
  return response.data;
};

export const getSiteUnitsData = async (
  token: string,
  site_id: number,
  station_id?: number,
): Promise<UnitData[]> => {
  const response = await axios.get(
    `${API_URL}/get/site/${site_id}/measurements/units`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      params: { station_id: station_id },
    },
  );
  return response.data;
};
