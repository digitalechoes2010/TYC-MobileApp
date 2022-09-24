import apiClient from '../config/clients';
import ApiConfig from '../config/apiConfig';

import localStorage from 'redux-persist/es/storage';
import {IUserDetailResponse} from '../store/Models/Api/User';

export function userUpdateService(request: any) {
  return apiClient
    .patch(ApiConfig.update, request)
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}

export function userDirectToggleService(request: any) {
  return apiClient
    .post(ApiConfig.toggle, request)
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      return error.response;
    });
}
export function updateProfileService(
  type: string,
  request: Partial<IUserDetailResponse>,
) {
  const postData =
    type == 'BUSINESS'
      ? {
          businessProfiles: request,
        }
      : {
          socialProfiles: request,
        };

  return apiClient
    .patch(ApiConfig.profileUpdate + type, postData)
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}
export function updateProfileItemService(
  type: string,
  request: Partial<IUserDetailResponse>,
) {
  return apiClient
    .patch(ApiConfig.profileItemUpdate + type, {
      request,
    })
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}
export function deleteProfileItemService(type: string, id: string) {
  return apiClient
    .delete(ApiConfig.profileItemDelete + type + `/${id}`)
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}

export function deleteMedia(id: any) {
  return apiClient
    .delete(ApiConfig.media + id)
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      return error.response;
    });
}
