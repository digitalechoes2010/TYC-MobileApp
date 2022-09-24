import {ILoginState} from '../Models/Reducers/Login';
import createReducer from '../../lib/createReducer';
import * as types from '../ActionTypes/LoginActiontypes';
import {
  ILoginRequestState,
  ILoginResponseErrorState,
  ILoginResponseState,
} from '../Models/Actions/Login';
import {RESET_STORE} from '../ActionTypes';

const initialState: ILoginState = {
  isLoggedIn: false,
  email: '',
  mobile: null,
  password: null,
  errors: {},
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state: ILoginState, action: ILoginRequestState) {
    return {
      ...state,
      isLoggedIn: false,
      email: action.request.email,
      mobile: action.request.mobile,
      password: action.request.password,
      errors: {},
    };
  },
  [types.LOGIN_ENABLE_LOADER](state: ILoginState) {
    return {...state, isLoading: true};
  },
  [types.LOGIN_DISABLE_LOADER](state: ILoginState) {
    return {...state, isLoading: false};
  },
  [types.LOGIN_RESPONSE](state: ILoginState) {
    return {
      ...state,
      isLoggedIn: true,
      errors: {},
    };
  },
  [types.LOGIN_FAILED](
    state: ILoginState = initialState,
    action: ILoginResponseErrorState,
  ) {
    console.log(action);
    return {
      ...state,
      isLoggedIn: false,
      errors: action.response.errors,
      isLoading: false,
    };
  },

  [types.LOG_OUT]() {
    return Object.assign({}, initialState);
  },
  [RESET_STORE]() {
    return initialState;
  },
});
