import * as React from 'react';
import {TabNavigation} from './TabNavigation';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ProfileSetupScreen from '../containers/Dashboard/Profile/ProfileSetupScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View, Platform, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../config/themeConfig';
import AddLinksComponent from '../components/AddLinksComponent';
import LinkSelectComponent from '../components/LinkSelectComponent';
import {ModalStackNavigator} from './ModalNavigation';
import {DrawerActions} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppNavigation = ({navigation, route}: any) => {
  const safeAreaInsets = useSafeAreaInsets();
  const {StatusBarManager} = NativeModules;

  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBarManager.HEIGHT;
  return (
    <SafeAreaProvider style={{paddingTop: STATUSBAR_HEIGHT}}>
      <Stack.Navigator
        initialRouteName={route.params?.screen ? route.params.screen : 'Home'}
        headerMode={'screen'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          safeAreaInsets: {
            top: 0,
          },
        }}>
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetupScreen}
          options={{
            title: 'Setup Profile',
            // headerLeft: () => null,
            headerTitleStyle: {fontWeight: 'bold', textTransform: 'uppercase'},
          }}
        />
        <Stack.Screen
          name="AddLinks"
          component={AddLinksComponent}
          options={{
            title: 'Add Link',
            headerTitleStyle: {
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: 28,
            },
          }}
        />
        <Stack.Screen
          name="LinkSelect"
          component={LinkSelectComponent}
          options={({route}) => ({
            title: route.params?.title ? route.params.title : 'Add Link',
            headerTitleStyle: {fontWeight: 'bold', textTransform: 'uppercase'},
          })}
        />
        <Stack.Screen
          name="Home"
          options={{
            title: '',
            headerShown: false,
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => console.log('notification')}
            //     // style={{marginRight: 10}}
            //   >
            //     <MaskedView
            //       // style={{flex: 1, flexDirection: 'row'}}
            //       maskElement={
            //         <Icon name={'comment'} size={50} color={'white'} />
            //       }>
            //       <LinearGradient
            //         colors={[theme.colors.accentDark, theme.colors.accent]}
            //         // style={{flex: 1}}
            //         start={{x: 0, y: 0.7}}
            //         end={{x: 0, y: 0}}>
            //         <Icon name={'comment'} size={50} color={'transparent'} />
            //         <Icon
            //           name={'bell-o'}
            //           size={18}
            //           color={'white'}
            //           style={{position: 'absolute', padding: 16}}
            //         />
            //       </LinearGradient>
            //     </MaskedView>
            //   </TouchableOpacity>
            // ),
            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPress={() =>
            //       navigation.dispatch(DrawerActions.toggleDrawer())
            //     }>
            //     <MaskedView
            //       // style={{flex: 1, flexDirection: 'row'}}
            //       maskElement={
            //         <Icon name={'th-large'} size={50} color={'white'} />
            //       }>
            //       <LinearGradient
            //         colors={[theme.colors.accentDark, theme.colors.accent]}
            //         // style={{flex: 1}}
            //         start={{x: 0, y: 0.5}}
            //         end={{x: 0, y: 0}}>
            //         <Icon name={'th-large'} size={50} color={'transparent'} />
            //       </LinearGradient>
            //     </MaskedView>
            //   </TouchableOpacity>
            // ),
            // headerLeftContainerStyle: {
            //   flex: 1,
            //   justifyContent: 'center',
            //   marginLeft: 40,
            //   marginTop: -20,
            // },
            // headerRightContainerStyle: {
            //   flex: 1,
            //   justifyContent: 'center',
            //   marginRight: 20,
            //   marginTop: -20,
            // },

            // headerTitleStyle: {fontWeight: 'bold', textTransform: 'uppercase'},
          }}>
          {props => <TabNavigation barColor={'transparent'} {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{headerShown: false}} name={'Modal'}>
          {props => <ModalStackNavigator {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};
