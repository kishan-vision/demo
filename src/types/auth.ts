export interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  roles: string[];
  user_type: string[];
  brand_ids: string[];
  custom_role_types: string[];
  iat: number;
  exp: number;
}

export interface SSOMessage {
  type: "SSO_TOKEN";
  token: string;
}
