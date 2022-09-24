import * as React from 'react';
import {AuthenticateStack} from './AuthenticateNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import theme from '../config/themeConfig';
import {DrawerNavigation} from './DrawerNavigation';
import {useSelector} from 'react-redux';
import {Dimensions, StatusBar, Platform} from 'react-native';
import metrics from '../utils/metrics';
import Loader from '../components/Loader';
const Stack = createStackNavigator();
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT - STATUS_BAR_HEIGHT;
export const MainNavigation = ({isUrl}: any) => {
  const auth = useSelector((state: any) => state.AuthenticationReducer);
  if (isUrl) {
    return <Loader />;
  }
  return (
    <Stack.Navigator
      initialRouteName={auth.isLoggedIn ? 'Home' : 'Auth'}
      headerMode="screen"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
        animationEnabled: false,
      }}>
      {auth.isLoggedIn ? (
        <Stack.Screen
          name={'Home'}
          component={DrawerNavigation}
          options={{
            headerShown: false,
            cardStyle: {
              marginBottom:
                Platform.OS === 'android'
                  ? parseInt(Math.round(NAVIGATION_BAR_HEIGHT)) === 0
                    ? 0
                    : metrics.verticalScale(52)
                  : 0,
            },
          }}
        />
      ) : (
        <Stack.Screen
          name={'Auth'}
          component={AuthenticateStack}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};
