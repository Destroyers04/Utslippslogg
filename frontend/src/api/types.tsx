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
};
