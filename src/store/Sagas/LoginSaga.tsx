import {put, call, takeEvery} from 'redux-saga/effects';
import * as LoginActions from '../Actions/LoginActions';
import {disableLoader} from '../Actions/LoginActions';
import {ILoginRequestState} from '../Models/Actions/Login';
import * as types from '../ActionTypes';
import {
  LoginUser,
  MobileLogin,
  SocialLogin,
} from '../../services/Login.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  authenticate,
  unAuthenticate,
  resetStores,
} from '../Actions/AuthenticationActions';
import {setUserdata} from '../Actions/UserActions';

export function* loginAsync(action: ILoginRequestState) {
  yield put(LoginActions.enableLoader());
  try {
    let response;
    if (action.request.accountType == 'mobile') {
      response = yield call(MobileLogin, action.request);
      console.log('type response', response);
    } else if (
      action.request.accountType == 'google' ||
      action.request.accountType == 'facebook' ||
      action.request.accountType == 'apple'
    ) {
      response = yield call(SocialLogin, action.request);
      console.log('type response', response);
    } else {
      response = yield call(LoginUser, action.request);
    }
    if (response.status === 200) {
      const {data} = response;
      // console.log(typeof data);
      const {accessToken, refreshToken} = data;
      delete data.accessToken;
      delete data.refreshToken;
      yield put(LoginActions.onLoginResponse());
      yield put(setUserdata(data));
      yield put(
        authenticate({
          token: accessToken,
          refreshToken: refreshToken,
        }),
      );
      yield put(disableLoader());
    } else {
      throw response.data.error;
    }
  } catch (err) {
    console.log(err);
    yield put(LoginActions.loginFailed({errors: err}));
    yield put(LoginActions.disableLoader());
  }
}

export function* logout() {
  yield put(unAuthenticate());
  yield put(resetStores());
  AsyncStorage.removeItem('persistTyc');
  AsyncStorage.clear().then();
}
export function* watchLoginAsync() {
  yield takeEvery(types.LOGIN_REQUEST, loginAsync);
  yield takeEvery(types.LOG_OUT, logout);
}
