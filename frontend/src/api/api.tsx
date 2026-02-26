import axios from "axios";
import type { Token, UserData } from "@/api/types";
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
