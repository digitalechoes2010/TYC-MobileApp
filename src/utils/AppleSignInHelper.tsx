// import {ToastAndroid} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {Platform} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';

export const appleSignIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // performs login request
      const appleAuthRequestResponse: any = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      const {email}: any = jwt_decode(appleAuthRequestResponse.identityToken);

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        resolve({
          socialId: appleAuthRequestResponse.user,
          email: email,
          accountType: 'apple',
        });
      } else {
        reject();
      }
    } catch (error: any) {
      reject();
    }
  });
};
