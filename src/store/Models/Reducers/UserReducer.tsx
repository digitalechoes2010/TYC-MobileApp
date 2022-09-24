export interface IUserState {
  id: string;
  name: string;
  email: string;
  mobile: undefined | string;
  profileTabType: string;
  socialProfiles: object[];
  businessProfiles: object[];
  activeDirect: '';
  username: string;
  profilePic: string;
  isDirect: boolean;
  isLoading: boolean;
  address?: string;
  userBio?: string;
  gender?: string,
  activeProfile?: string;
  isFirstLogin?: boolean;
  link?: string | null;
  buisnessCard?: object[];
  medias?: object[];
  connectionCount?: number;
  isActive?: boolean;
}

export interface IUserSignUpState {
  email: string;
  mobile: string;
  password: string;
  isLoading: boolean;
  errors: object;
  isSuccess: boolean;
  countryCode: string;
  callingCode: string;
}
