/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import theme from '../config/themeConfig';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {IUserState} from '../store/Models/Reducers/UserReducer';
import SignupScreen from '../containers/AuthContainer/SignUp/SignupScreen';
import SigninScreen from '../containers/AuthContainer/SignIn/SigninScreen';
import AppIntroScreen from '../containers/AuthContainer/AppIntroScreen';
import OTPSigninScreen from '../containers/AuthContainer/OTP/OTPSigninScreen';
import OTPSigninScreenEmail from '../containers/AuthContainer/OTP/OTPSigninScreenEmail';

const Stack = createStackNavigator();

export const AuthenticateStack = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const userData: IUserState = useSelector((state: any) => state.UserReducer);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}>
      <Stack.Navigator
        initialRouteName={userData.isFirstLogin ? 'AppIntro' : 'SignIn'}
        // headerMode="screen"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#3e3e3e',
          },
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name="AppIntro" component={AppIntroScreen} />
        <Stack.Screen name="SignIn" component={SigninScreen} />
        <Stack.Screen
          name="OTPAuth"
          component={OTPSigninScreen}
          options={{headerShown: true, title: '', headerStatusBarHeight: 0}}
        />
        <Stack.Screen
          name="OTPAuthEmail"
          component={OTPSigninScreenEmail}
          options={{headerShown: true, title: '', headerStatusBarHeight: 0}}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </View>
  );
};
