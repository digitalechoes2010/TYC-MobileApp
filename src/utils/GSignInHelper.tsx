// import {ToastAndroid} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
//   webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: '', // [Android] specifies an account name on the device that should be used
//   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

// GoogleSignin.configure({
//   iosClientId:
//     '200805530561-ukvm0053geq1dbu5ef8idav4vgeq3r2s.apps.googleusercontent.com',
//   googleServicePlistPath: 'ios/GoogleService-info.plist',
// });
GoogleSignin.configure();

export const googleSignIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      resolve({
        socialId: userInfo.user.id,
        email: userInfo.user.email,
        accountType: 'google',
      });
    } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('statusCodes.SIGN_IN_CANCELLED', error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('statusCodes.IN_PROGRESS', error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('statusCodes.PLAY_SERVICES_NOT_AVAILABLE', error.code);
      } else {
        // some other error happened
        console.log(error);
      }
      reject();
    }
  });
};

export const googleGetCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    console.log('userInfo', userInfo);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
      console.log('SIGN_IN_REQUIRED', error.code);
    } else {
      // some other error
      console.log('error.code **', error.code);
    }
  }
};

export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
