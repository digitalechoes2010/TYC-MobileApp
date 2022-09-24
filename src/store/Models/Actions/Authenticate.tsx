export interface IAuthenticateAction {
  type: string;
  data: {
    token: string;
    refreshToken?: string | undefined;
  };
}
