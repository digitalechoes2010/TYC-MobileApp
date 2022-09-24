/* eslint-disable no-shadow */
import {Platform} from 'react-native';
// import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';


export const fbSignIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      let resData: any = '';
      console.log(result);
      let data: any = '';
        const results: any = await AccessToken.getCurrentAccessToken();
        console.log(results);
        data = results;
      const response = await fetch(
        `https://graph.facebook.com/v2.3/${data.userID}?fields=name,email&access_token=${data.accessToken}`,
      );
     
      resData = await response.json();
      console.log('resData', resData);
      if (resData.email != null) {
          resolve({
            socialId: resData.id,
            email: resData.email,
            accountType: 'facebook',
          });
      } else {
        reject();
      }

      //     await FBLoginManager.setLoginBehavior(LoginBehavior[Platform.OS]); // defaults to Native
      //     FBLoginManager.logout(function (error: any, data: any) {
      //       if (!error) {
      //         FBLoginManager.loginWithPermissions(
      //           ['email', 'public_profile'],
      //           async function (error: any, data: any) {
      //             if (!error) {
      //               console.log('Login data: ', data);
      //               const response = await fetch(
      //                 `https://graph.facebook.com/v2.3/${data.credentials.userId}?fields=name,email&access_token=${data.credentials.token}`,
      //               );
      //               let resData = await response.json();
      //               if (resData.email != null) {
      //                 resolve({
      //                   socialId: resData.id,
      //                   email: resData.email,
      //                   accountType: 'facebook',
      //                 });
      //               }
      //             } else {
      //               console.log('Error: ', error);
      //               reject();
      //             }
      //           },
      //         );
      //       }
      //     });
    } catch (error) {
      console.log('Error**: ', error);
      reject();
    }
  });
};