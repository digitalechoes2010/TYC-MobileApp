export interface IUserDetailRequest {
  token: string;
}

export interface IUserSignUpRequest {
  email: string;
  mobile?: string;
  password: string;
  countryCode?: string;
  callingCode?: string;
}
export interface IUserSignUpResponse {
  errors: object;
}
export interface IUserProfileItems {
  id?: string;
  image: string;
  name: string,
  uri: string;
  icon?: any;
}
export enum ProfileTypes {
  SOCIAL = 'SOCIAL',
  BUSINESS = 'BUSINESS',
}
export interface ProfileProfileImage {
  profilePic: string;
}
export interface IUserDetailResponse {
  id?: string;
  email?: string;
  mobile?: string;
  username?: string;
  name?: string;
  isDirect?: boolean;
  activeDirect?: string;
  profilePic?: string;
  socialProfile?: {
    id: string;
    image: string;
    uri: string;
  }[];
  businessProfile?: [
    {
      id: string;
      image: string;
      uri: string;
    },
  ];
  emailVerified?: boolean;
  mobileVerified?: boolean;
  verificationToken?: string;
  date?: string;
  link?: string | null;
  buisnessCard?: object[];
  medias?: object[];
  connectionCount?: number;
  isActive?: boolean;
}
