import {ILoginRequest, ILoginResponse, ILoginResponseError} from '../Api/Login';

export interface ILoginRequestState {
  type: String;
  request: ILoginRequest;
}
export interface ILoginResponseState {
  type: String;
  response: ILoginResponse;
}
export interface ILoginResponseErrorState {
  type: String;
  response: ILoginResponseError;
}
