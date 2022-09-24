const ApiConfig = {
  BASE_URL_p: 'http://192.168.1.5:3000',
  BASE_URL: 'https://tycapi.eu-gb.mybluemix.net',
  // BASE_URL: 'http://192.168.0.110:3000',
  login: '/users/login',
  socialLogin: '/users/socialLogin',
  // verifyOTP: '/users/verifyOTP',
  verifymobileLogin: '/users/verifymobileLogin',
  // mobileLogin: '/users/mobileLogin',
  sendLoginMobileOtp: '/sendLoginMobileOtp',
  signup: '/users/signup',
  update: '/user/update',
  toggle: '/user/toggleDirect',
  profileUpdate: '/user/update/profiles/',
  profileItemUpdate: '/user/update/profiles/item/',
  profileItemDelete: '/user/profiles/item/',
  fileUpload: '/userImageUpload',
  nfcTags: '/getNfcPassword/',
  tagVerify: '/activateNfcTag/',
  getNfcUserDetails: '/getNfcUserDetails/',
  getContactsbyUserId: '/getContactsbyUserId/',
  analytics: '/scan-nfcsByUserCountWeekly',

  scanNFCbyUserId: '/scanNFCbyUserId',
  scanNFCbySerialNo: '/scanNFCbySerialNo',
  profilesCountOnScan: '/user/update/profilesCountOnScan/item/',
  usersByid: '/usersByid/',

  checkNfcStatusForTransfer: '/checkNfcStatusForTransfer/',
  verifyNfcPassword: '/verifyNfcPassword',
  activateForTransfer: '/activateForTransfer',
  activateNfcTagOnTransfer: '/activateNfcTagOnTransfer',
  getNfcDetailsBySerialNo: '/getNfcDetailsBySerialNo/',
  toggleProfileActivation: '/user/toggleProfileActivation',
  changeUserLink: '/user/changeUserName',
  buisnessCard: '/user/update/buisnessCard',

  uploadMedia: '/userMediaUpload/',
  getByIdOrUsername: '/user/getByIdOrUsername',
  media: '/medias/',
  sendSignUpOtp: '/sendSignUpOtp',
  signupEmail: '/users/signup/',
};

export default ApiConfig;
