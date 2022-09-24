import {ILoginRequest, ISocialLoginRequest} from '../store/Models/Api/Login';
import apiClient from '../config/clients';
import ApiConfig from '../config/apiConfig';

export function LoginUser(request: ILoginRequest) {
  /*  let formData = new FormData();
  // formData.append('email', request.email);
  // formData.append('password', request.password);*/

  return apiClient
    .post(ApiConfig.login, request)
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}

export function SocialLogin(request: ISocialLoginRequest) {
  /*  let formData = new FormData();
  // formData.append('email', request.email);
  // formData.append('password', request.password);*/

  return apiClient
    .post(ApiConfig.socialLogin, request)
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}

export function MobileLogin(request: ISocialLoginRequest) {
  return (
    apiClient
      // .post(ApiConfig.verifyOTP, {mobile: request.mobile, otp: request.otp})
      .post(ApiConfig.verifymobileLogin, {
        mobile: request.mobile,
        otp: request.otp,
        accountType: 'mobile',
        callingCode: request.callingCode,
        countryCode: request.countryCode,
      })
      .then((data: any) => data)
      .catch((error: any) => {
        return error.response;
      })
  );
}
