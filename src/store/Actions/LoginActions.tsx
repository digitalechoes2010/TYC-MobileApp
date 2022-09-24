import {
  ILoginRequest,
  ILoginResponse,
  ILoginResponseError,
} from '../Models/Api/Login';
import * as types from '../ActionTypes/LoginActiontypes';

export function requestLogin(request: ILoginRequest) {
  return {
    type: types.LOGIN_REQUEST,
    request,
  };
}

export function loginFailed(response: ILoginResponseError) {
  return {
    type: types.LOGIN_FAILED,
    response,
  };
}
export function onLoginResponse() {
  return {
    type: types.LOGIN_RESPONSE,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logout() {
  return {
    type: types.LOG_OUT,
  };
}
