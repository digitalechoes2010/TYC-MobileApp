import createReducer from '../../lib/createReducer';
import * as types from '../ActionTypes/AuthenticationActiontypes';
import {IAuthenticationState} from '../Models/Reducers/Authenticate';
import {IAuthenticateAction} from '../Models/Actions/Authenticate';
const initialState: IAuthenticationState = {
  isLoggedIn: false,
  token: null,
  refreshToken: undefined,
};

export const AuthenticationReducer = createReducer(initialState, {
  [types.AUTHENTICATED](
    state: IAuthenticationState,
    action: IAuthenticateAction,
  ) {
    console.log(action);
    return {
      ...state,
      token: action.data.token,
      refreshToken: action.data?.refreshToken,
      isLoggedIn: true,
    };
  },
  [types.UNAUTHENTICATED](state: IAuthenticationState) {
    return {
      ...state,
      token: null,
      isLoggedIn: false,
    };
  },
  [types.RESET_STORE]() {
    return initialState;
  },
});
