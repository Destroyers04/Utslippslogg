import axios from "axios";
import type { Token } from "./types";

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
  const response = await axios.post(`${API_URL}/auth/token`, params);
  const accessToken = response.data;
  return accessToken;
};
