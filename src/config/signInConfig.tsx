const ApiConfig = {
  BASE_URL_p: 'http://192.168.1.5:3000',
  BASE_URL: 'https://tycapi.eu-gb.mybluemix.net',
  // BASE_URL: 'http://192.168.1.7:3000/',
  login: '/users/login',
  signup: '/users/signup',
  update: '/user/update',
  toggle: '/user/toggleDirect',
  profileUpdate: '/user/update/profiles/',
  profileItemUpdate: '/user/update/profiles/item/',
  profileItemDelete: '/user/profiles/item/',
  fileUpload: '/userImageUpload',
  nfcTags: '/getNfcPassword/',
  tagVerify: '/activateNfcTag/',
  getNfcUserDetails: '/scan-nfcs/',
  scanNfcContactDetails: '/scanNfcContactDetails',
};

export default ApiConfig;
