import apiClient from '../config/clients';
import ApiConfig from '../config/apiConfig';
import {IUserSignUpRequest} from '../store/Models/Api/User';

export function SignupUser(request: IUserSignUpRequest) {
  return apiClient
    .post(ApiConfig.signup, request)
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}
export function SignupUserEmail(request: any) {
  return apiClient
    .post(ApiConfig.signupEmail + request.otp, {
      email: request.email,
      password: request.password,
    })
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}

export function getOtpFromEmail(email: string) {
  return apiClient
    .post(ApiConfig.sendSignUpOtp, {email})
    .then((data: any) => data)
    .catch((error: any) => {
      return error.response;
    });
}
