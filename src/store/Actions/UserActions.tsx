import * as types from '../ActionTypes/UserActionTypes';
import {
  IUserDetailRequest,
  IUserDetailResponse,
  ProfileProfileImage,
} from '../Models/Api/User';

export function fetchUser(request: IUserDetailRequest) {
  return {
    type: types.USER_DETAIL_REQUEST,
    request,
  };
}

export function setUserImagedata(response: ProfileProfileImage) {
  return {
    type: types.USER_PROFILE_IMAGE_UPDATE,
    response,
  };
}

export function setUserdata(response: IUserDetailResponse) {
  return {
    type: types.USER_DETAIL_RESPONSE,
    response,
  };
}

export function userUpdateRequest(request: any) {
  return {
    type: types.UPDATE_USER_REQUEST,
    request,
  };
}

export function updateUserProfile(profileType: any, request: any) {
  return {
    type: types.UPDATE_USER_PP_REQUEST,
    profileType,
    request,
  };
}
export function setUserPublicProfileResponse(response: any) {
  return {
    type: types.UPDATE_USER_PP_RESPONSE,
    response,
  };
}

export function updateUserProfileItem(profileType: string, request: any) {
  return {
    type: types.UPDATE_USER_P_ITEM_REQUEST,
    profileType,
    request,
  };
}
export function updateUserProfileItemResponse(
  profileType: string,
  response: any,
) {
  return {
    type: types.UPDATE_USER_P_ITEM_RESPONSE,
    profileType,
    response,
  };
}
export function deleteUserProfileItem(profileType: string, id: any) {
  return {
    type: types.USER_P_ITEM_DELETE_REQUEST,
    profileType,
    id,
  };
}
export function deleteUserProfileItemResponse(profileType: string, id: string) {
  return {
    type: types.USER_P_ITEM_DELETE_RESPONSE,
    profileType,
    id,
  };
}
export function setUserBusinessProfile(request: any) {
  return {
    type: types.UPDATE_USER_BP_REQUEST,
    request,
  };
}

export function setUserBusinessProfileResponse(response: any) {
  return {
    type: types.UPDATE_USER_BP_RESPONSE,
    response,
  };
}
export function userDirectToggle(response: any) {
  return {
    type: types.USER_DIRECT_TOGGLE,
    response,
  };
}
export function userDirectToggleStart(request: any) {
  return {
    type: types.USER_DIRECT_TOGGLE_START,
    request,
  };
}
export function userErrorResponse(response: {errors: any}) {
  return {
    type: types.USER_ERROR_RESPONSE,
    response,
  };
}
export function userProfileTabChange(response: any) {
  return {
    type: types.USER_PROFILE_TAB_CHANGE,
    response,
  };
}

export function userFirstOpenApp() {
  return {
    type: types.USER_FIRST_OPEN,
  };
}
