import {put, call, takeEvery} from 'redux-saga/effects';
import * as types from '../ActionTypes/SignupActionTypes';
import {IUserSignupRequestState} from '../Models/Actions/User';
import SignupUser, {SignupUserEmail} from '../../services/Signup.service';
import {setUserdata} from '../Actions/UserActions';
import {failureSignup, successSignup} from '../Actions/SignupActions';
import {authenticate} from '../Actions/AuthenticationActions';
import {showTost} from '../../utils/helper';

export function* processSignupRequest(action: IUserSignupRequestState) {
  console.log(action);
  try {
    const response = yield call(SignupUser, action.request);
    console.log('signup', response);

    if (response.status === 200) {
      const {data} = response;
      const {accessToken, refreshToken} = data;
      delete data.accessToken;
      delete data.refreshToken;
      yield put(setUserdata(data));
      yield put(successSignup());
      yield put(
        authenticate({
          token: accessToken,
          refreshToken: refreshToken,
        }),
      );
    } else {
      throw response.data.error;
    }
  } catch (err) {
    yield put(failureSignup({errors: err}));
  }
}
export function* processSignupRequestEmail(action: IUserSignupRequestState) {
  console.log(action);
  try {
    const response = yield call(SignupUserEmail, action.request);
    console.log('signup', response);

    if (response.status === 200) {
      const {data} = response;
      const {accessToken, refreshToken} = data;
      delete data.accessToken;
      delete data.refreshToken;
      yield put(setUserdata(data));
      yield put(successSignup());
      yield put(
        authenticate({
          token: accessToken,
          refreshToken: refreshToken,
        }),
      );
    } else {
      showTost(response.data.error?.message ?? 'Faild to verify OTP');
      throw response.data.error;
    }
  } catch (err) {
    yield put(failureSignup({errors: err}));
  }
}
export function* watchUserSignupAsync() {
  yield takeEvery(types.REGISTER_REQUEST, processSignupRequest);
  yield takeEvery(types.REGISTER_REQUEST_EMAIL, processSignupRequestEmail);
}
