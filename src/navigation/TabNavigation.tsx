/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions, StyleSheet, View} from 'react-native';
import metrics from '../utils/metrics';
import {TabBarCenterButton} from '../components/TabBarCenterButton';
import theme from '../config/themeConfig';
import DashBoardScreen from '../containers/Dashboard/DashBoardScreen';
import {createStackNavigator} from '@react-navigation/stack';
import BarcodeScreen from '../containers/Dashboard/Barcode/BarcodeScreen';
import NFCActionsScreen from '../containers/Dashboard/NFC/NFCActionsScreen';
import Contacts from '../containers/AuthContainer/Contacts';
import AnalyticsNavigation from './AnalyticsNavigation';
import PublicProfile from '../containers/Dashboard/PublicProfile/PublicProfile';

const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const ProfileStackNavigation: React.FC<Props> = ({barColor}) => (
  <ProfileStack.Navigator initialRouteName={'Home'} headerMode={'screen'}>
    <ProfileStack.Screen
      name="Home"
      component={DashBoardScreen}
      options={{
        headerShown: false,
      }}
    />
  </ProfileStack.Navigator>
);

const ContactsStackNavigation: React.FC<Props> = ({barColor, navigation}) => (
  <ContactsStack.Navigator
    initialRouteName={'ContactsList'}
    headerMode={'screen'}>
    <ContactsStack.Screen
      name="ContactsList"
      component={Contacts}
      options={{headerShown: false, headerStatusBarHeight: 0}}
    />
    <ContactsStack.Screen
      name="PublicProfile"
      component={PublicProfile}
      options={{
        title: 'Public Profile',
        headerShown: false,
        // headerShown: true,
        headerStatusBarHeight: 0,
      }}
    />
  </ContactsStack.Navigator>
);
type Props = {
  barColor: string;
  navigation?: any;
};
export const TabNavigation: React.FC<Props> = ({barColor}) => {
  const tabBarListeners = (reuteName: any, {navigation, route}: any) => ({
    tabPress: () => navigation.navigate(reuteName),
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => (
        <View
          style={[
            styles.navigatorContainer,
            props.state.routeNames[props.state.index] == 'Scanqr' && {
              width: '97%',
              position: 'absolute',
            },
          ]}>
          <BottomTabBar {...props} />
          {metrics.IS_IPHONE_X() && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: barColor,
                },
              ]}
            />
          )}
        </View>
      )}
      tabBarOptions={{
        style: styles.navigator,
        tabStyle: {
          backgroundColor: barColor,
        },
        showLabel: false,
        activeTintColor: theme.colors.accent,
        inactiveTintColor: theme.colors.background,
      }}>
      <Tab.Screen
        name="DashBoardScreen"
        component={ProfileStackNavigation}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="UserAnalytics"
        component={AnalyticsNavigation}
        // component={AnalyticsNavigation}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="bar-chart" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TapChip"
        component={NFCActionsScreen}
        options={{
          tabBarButton: props => (
            <TabBarCenterButton bgColor={barColor} {...props} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Modal');
          },
        })}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsStackNavigation}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="address-book-o" size={30} color={color} />
          ),
        }}
        listeners={e => tabBarListeners('ContactsList', e)}
      />
      <Tab.Screen
        name="Scanqr"
        component={BarcodeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="qrcode" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    borderRadius: 35,
    bottom: 10,
    padding: 0,
    margin: 0,
    height: 60,
    marginBottom: Dimensions.get('window').height * 0.01,

    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: theme.colors.textDark,
  },
  navigator: {
    borderRadius: 35,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    backfaceVisibility: 'visible',
    justifyContent: 'center',
    elevation: 30,
    height: 54,
    zIndex: 2,
    borderColor: theme.colors.textDark,
    borderTopColor: theme.colors.textDark,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
