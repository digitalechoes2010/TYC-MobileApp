/**
 * TYC mobileapp app landing
 * https://tapyourchip.com
 *
 * Generated with the TypeScript template
 * Author: Yashpal Kadam
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-lottie-splash-screen';
import {MainNavigation} from './navigation/MainNavigation';
import {Provider} from 'react-redux';
import configureStore from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './config/themeConfig';
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {LogBox, StatusBar, Linking, AppState} from 'react-native';
import pushnot from './services/push-notifications.service';
import {navigationRef, navigate} from './navigation/RootNavigation';
import {showTost} from './utils/helper';
import {readBarcode} from './utils/UserHelper';
import Loader from './components/Loader';

const {persistor, store} = configureStore();
LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
  pushnot();
  useEffect(() => {
    setTimeout(() => {  SplashScreen.hide(); }, 2200);
    AppState.addEventListener('change', data => {
      Linking.getInitialURL()
        .then(url => {
          linkHandeler(url);
        })
        .catch(err => {
          console.warn('Deeplinking error', err);
        });
    });

    const listener = Linking.addListener('url', e => {
      linkHandeler(e.url);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const linkHandeler = async (url: any) => {
    try {
     
      if (typeof url === 'string' && url.indexOf('/')) {
        await readBarcode(url);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={() => <Loader />}>
          <NavigationContainer
            theme={{...theme, ...NavigationDefaultTheme}}
            ref={navigationRef}>
            <MainNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};
export default App;
