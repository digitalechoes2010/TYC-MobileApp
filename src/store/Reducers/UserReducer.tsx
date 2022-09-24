import createReducer from '../../lib/createReducer';
import * as types from '../ActionTypes/UserActionTypes';
import {IUserState} from '../Models/Reducers/UserReducer';
import {
  IUserdeleteProfileItemAction,
  IUserDetailRequestState,
  IUserDetailResponseState,
  IUserDirectToggleResponseState,
  IUserErrorResponseState,
  IUserUpdateProfileItemResponseAction,
} from '../Models/Actions/User';
import {RESET_STORE} from '../ActionTypes';

const initialState: IUserState = {
  id: '',
  name: '',
  email: '',
  mobile: '',
  profileTabType: 'Both',
  socialProfiles: [],
  businessProfiles: [],
  username: '',
  profilePic: '',
  isDirect: false,
  isLoading: false,
  activeDirect: '',
  userBio: '',
  gender: '',
  activeProfile: 'socialProfiles',
  isFirstLogin: true,
  link: null,
  buisnessCard: [],
  medias: [],
  connectionCount: 0,
  isActive: true,
};

export const UserReducer = createReducer(initialState, {
  [types.USER_DETAIL_REQUEST](state: IUserState) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.UPDATE_USER_REQUEST](state: IUserState) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.UPDATE_USER_PP_REQUEST](state: IUserState) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.USER_PROFILE_IMAGE_UPDATE](state: IUserState, action: any) {
    return {
      ...state,
      isLoading: false,
      ...action.response,
    };
  },
  [types.USER_DETAIL_RESPONSE](
    state: IUserState,
    action: IUserDetailResponseState,
  ) {
    return {
      ...state,
      isLoading: false,
      ...action.response,
    };
  },
  [types.UPDATE_USER_RESPONSE](
    state: IUserState,
    action: IUserDetailResponseState,
  ) {
    return {
      ...state,
      isLoading: false,
      ...action.response,
    };
  },
  [types.USER_DIRECT_TOGGLE_START](state: IUserState) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.UPDATE_USER_P_ITEM_REQUEST](state: IUserState) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.UPDATE_USER_P_ITEM_RESPONSE](
    state: IUserState,
    action: IUserUpdateProfileItemResponseAction,
  ) {
    return {
      ...state,
      isLoading: false,
      [action.profileType]: [
        ...state[action.profileType].map(i =>
          i.id === action.response.id ? action.response : i,
        ),
      ],
    };
  },
  [types.USER_DIRECT_TOGGLE](
    state: IUserState,
    action: IUserDirectToggleResponseState,
  ) {
    return {
      ...state,
      isLoading: false,
      isDirect: action.response.status,
      activeDirect: action.response.activeDirect,
    };
  },
  [types.USER_ERROR_RESPONSE](
    state: IUserState,
    action: IUserErrorResponseState,
  ) {
    return {
      ...state,
      isLoading: false,
      errors: action.response.errors,
    };
  },
  [types.USER_P_ITEM_DELETE_REQUEST](state: IUserState) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.USER_P_ITEM_DELETE_RESPONSE](
    state: IUserState,
    action: IUserdeleteProfileItemAction,
  ) {
    return {
      ...state,
      isLoading: false,
      [action.profileType]: [
        ...state[action.profileType].filter((i: any) => i.id !== action.id),
      ],
    };
  },
  [types.USER_PROFILE_TAB_CHANGE](state: IUserState, action: any) {
    return {
      ...state,
      isLoading: false,
      profileTabType: action.response,
    };
  },
  [types.USER_FIRST_OPEN](state: IUserState) {
    return {
      ...state,
      isFirstLogin: false,
    };
  },
  [RESET_STORE]() {
    return {...initialState, isFirstLogin: false};
  },
});
