export interface ILoginRequest {
  email?: null | string;
  password: string;
  mobile?: null | string;
  accountType?: null | string;
}

export interface ISocialLoginRequest {
  socialId: string;
  email: string;
  accountType?: string;
  mobile?: string;
  otp?: string;
  callingCode?: any;
  countryCode?: any;
}

export interface ILoginResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}
export interface ILoginResponseError {
  errors: any;
}
