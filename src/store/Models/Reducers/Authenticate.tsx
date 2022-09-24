export interface IAuthenticationState {
  isLoggedIn: boolean;
  token: string | null;
  refreshToken?: string | null;
}
