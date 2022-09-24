import {
  IUserDetailRequest,
  IUserDetailResponse,
  IUserSignUpRequest,
  IUserSignUpResponse,
} from '../Api/User';

export interface IUserDetailRequestState {
  type: String;
  request: IUserDetailRequest;
}
export interface IUserDetailResponseState {
  type: String;
  response: IUserDetailResponse | Partial<IUserDetailResponse>;
}

export interface IUserUpdateRequestState {
  type: String;
  profileType: string;
  request: Partial<IUserDetailResponse>;
}

export interface IUserUpdateProfileItemAction {
  type: String;
  profileType: string;
  request: Partial<IUserDetailResponse>;
}
export interface IUserUpdateProfileItemResponseAction {
  type: String;
  profileType: 'socialProfiles' | 'businessProfiles';
  response: Partial<IUserDetailResponse>;
}
export interface IUserdeleteProfileItemAction {
  type: String;
  profileType: 'socialProfiles' | 'businessProfiles';
  id: string;
}
export interface IUserDirectToggleResponseState {
  type: String;
  response: {status: boolean; activeDirect?: string};
}
export interface IUserErrorResponseState {
  type: String;
  response: {errors: any};
}
export interface IUserSignupRequestState {
  type: string;
  request: any;
}

export interface IUserSignupResponseState {
  type: string;
  response: IUserSignUpResponse;
}
