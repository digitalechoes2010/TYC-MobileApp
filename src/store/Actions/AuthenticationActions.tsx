import * as types from '../ActionTypes/AuthenticationActiontypes';
import {IAuthenticateAction} from '../Models/Actions/Authenticate';

export function authenticate(data: IAuthenticateAction['data']) {
  return {
    type: types.AUTHENTICATED,
    data,
  };
}

export function unAuthenticate() {
  return {
    type: types.UNAUTHENTICATED,
  };
}
export function unVerified(response: IAuthenticateAction['data']) {
  return {
    type: types.UNVERIFIED,
    response,
  };
}
export function resetStores() {
  return {
    type: types.RESET_STORE,
  };
}
