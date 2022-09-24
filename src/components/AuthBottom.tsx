import React, {FC} from 'react';
import {Platform, View} from 'react-native';
import styles from '../containers/AuthContainer/SignIn/LoginStyle';
import {Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../config/themeConfig';
import {googleSignIn, googleSignOut} from '../utils/GSignInHelper';
import {showTost} from '../utils/helper';
import {fbSignIn} from '../utils/FBSignInHelper';
import {appleSignIn} from '../utils/AppleSignInHelper';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import metrics from '../utils/metrics';


interface IProps {
  seperatorText: string;
  handleSubmit: (params: any) => void;
}
const AuthBottom: FC<IProps> = ({seperatorText, handleSubmit}) => {
  const googleLogin = async () => {
    try {
      await googleSignOut();
      const userdata = await googleSignIn();
      console.log('userdata Response', userdata);
      handleSubmit(userdata);
    } catch (error) {
      showTost("Couldn't sign in on Gmail! Try again");
    }
  };
  const fbSignInLogin = async () => {
    try {
      // await googleSignOut();
      const userdata = await fbSignIn();
      console.log('userdata Response', userdata);
      handleSubmit(userdata);
    } catch (error) {
      showTost("Couldn't sign in on Facebook! Try again");
    }
  };
  const appleLogin = async () => {
    try {
      const userdata = await appleSignIn();
      console.log('userdata Response', userdata);
      handleSubmit(userdata);
    } catch (error) {
      showTost("Couldn't sign in on Apple! Try again");
    }
  };
  return (
    <View>
      <View style={{paddingHorizontal: Platform.OS === 'ios' ? 25 : 0 }} > 
          <Icon.Button
          name="facebook"
          backgroundColor="#3b5998"
          style={{alignSelf: 'center'}}
          onPress={() => {
            fbSignInLogin();
          }}>
          <Text style={styles.socialButtonLabel}>Facebook</Text>
        </Icon.Button>
        <View>
          <Text style={styles.textSeperator}>Buttons Seperator</Text>
        </View>

        <Icon.Button
          name="google"
          // backgroundColor={theme.colors.surface}
          // color="#4285F4"
          style={{alignSelf: 'center'}}
          onPress={() => googleLogin()}>
          <Text style={(styles.socialButtonLabel, {color: '#FFF'})}>
            Google
          </Text>  
        </Icon.Button>
        </View>
        {Platform.OS === 'ios' && (
          <>
             <View>
          <Text style={styles.textSeperator}>Buttons Seperator</Text>
        </View>

        <View style={{paddingHorizontal:25}}>
          <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: '100%', // You must specify a width
            height: 40, // You must specify a height
           
          }}
          onPress={() =>  appleLogin()}
        />
       
      </View>
      </>
      )}
      <View style={styles.version}>
          <Text>Version 1.6.7</Text>
      </View>
    </View>
  );
};

export default AuthBottom;
