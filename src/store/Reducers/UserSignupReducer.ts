import createReducer from '../../lib/createReducer';
import * as types from '../ActionTypes/SignupActionTypes';

import {IUserSignUpState} from '../Models/Reducers/UserReducer';
import {
  IUserSignupRequestState,
  IUserSignupResponseState,
} from '../Models/Actions/User';
import {
  LOGIN_DISABLE_LOADER,
  LOGIN_ENABLE_LOADER,
  RESET_STORE,
} from '../ActionTypes';
import {ILoginState} from '../Models/Reducers/Login';

const initialState: IUserSignUpState = {
  email: '',
  mobile: '',
  password: '',
  countryCode: 'US',
  callingCode: '+1',
  isLoading: false,
  isSuccess: false,
  errors: {},
};

export const SignupReducer = createReducer(initialState, {
  [types.REGISTER_REQUEST](
    state: IUserSignUpState,
    action: IUserSignupRequestState,
  ) {
    return {
      ...state,
      email: action.request.email,
      mobile: action.request.mobile,
      password: action.request.password,
      countryCode: action.request.countryCode,
      callingCode: action.request.callingCode,
      isLoading: true,
      errors: {},
    };
  },
  [types.REGISTER_REQUEST_EMAIL](
    state: IUserSignUpState,
    action: IUserSignupRequestState,
  ) {
    return {
      ...state,
      email: action.request.email,
      mobile: action.request.mobile,
      password: action.request.password,
      countryCode: action.request.countryCode,
      callingCode: action.request.callingCode,
      isLoading: true,
      errors: {},
    };
  },
  [types.REGISTER_SAVE_DATA](
    state: IUserSignUpState,
    action: IUserSignupRequestState,
  ) {
    return {
      ...state,
      email: action.request.email,
      password: action.request.password,
      // isLoading: true,
    };
  },
  [types.REGISTER_DISABLE_LOADER](state: IUserSignUpState) {
    return {...state, isLoading: false};
  },
  [types.REGISTER_SUCCESS](state: IUserSignUpState) {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
    };
  },
  [LOGIN_ENABLE_LOADER](state: ILoginState) {
    return {...state, isLoading: true};
  },
  [LOGIN_DISABLE_LOADER](state: ILoginState) {
    return {...state, isLoading: false};
  },
  [types.REGISTER_FAILURE](
    state: IUserSignUpState,
    action: IUserSignupResponseState,
  ) {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      errors: action.response.errors,
    };
  },
  [types.REGISTER_STORE_CLEAR](state: IUserSignUpState) {
    return Object.assign({}, initialState);
  },
  [RESET_STORE]() {
    return initialState;
  },
});
