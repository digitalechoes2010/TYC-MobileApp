export interface ILoginState {
  isLoggedIn: boolean;
  email?: null | string;
  mobile?: null | string;
  password: null | string;
  errors?: any;
}
