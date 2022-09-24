import * as types from '../ActionTypes/SignupActionTypes';
import {IUserSignUpRequest, IUserSignUpResponse} from '../Models/Api/User';

export function requestSignup(request: IUserSignUpRequest) {
  return {
    type: types.REGISTER_REQUEST,
    request,
  };
}

export function requestSignupEmail(request: IUserSignUpRequest) {
  return {
    type: types.REGISTER_REQUEST_EMAIL,
    request,
  };
}

export function successSignup() {
  return {
    type: types.REGISTER_SUCCESS,
  };
}

export function failureSignup(response: IUserSignUpResponse) {
  return {
    type: types.REGISTER_FAILURE,
    response,
  };
}

export function clearSignupStore() {
  return {
    type: types.REGISTER_STORE_CLEAR,
  };
}

export function disableRegLoader() {
  return {
    type: types.REGISTER_DISABLE_LOADER,
  };
}

export function saveRegData(request: IUserSignUpRequest) {
  return {
    type: types.REGISTER_SAVE_DATA,
    request,
  };
}
