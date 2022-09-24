import {put, call, takeEvery} from 'redux-saga/effects';

import {ILoginRequestState} from '../Models/Actions/Login';
import * as types from '../ActionTypes';

export function* Autheticate(action: ILoginRequestState) {}
export function* watchAuthenticationAsync() {
  yield takeEvery(types.LOGIN_REQUEST, Autheticate);
}
