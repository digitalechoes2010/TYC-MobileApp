import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigation} from './AppNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from './ContentOptions/CustomDrawer';
import SetupTag from '../containers/Dashboard/Tags/SetupTag';
import TransferTag from '../containers/Dashboard/Tags/TransferTag';
import QRCode from '../containers/Dashboard/QRCode/QRCode';
import NFCSCanSuccess from '../containers/Dashboard/NFCScanSuccess/NFCScanSuccess';
import {Text} from 'react-native';

const Drawer = createDrawerNavigator();
const NFCStack = createStackNavigator();

const NFCStackNavigation: React.FC<Props> = ({barColor}) => (
  <NFCStack.Navigator
    initialRouteName={'SetupTag'}
    headerMode={'screen'}
    screenOptions={{headerShown: false}}>
    <NFCStack.Screen
      name="SetupTag"
      component={SetupTag}
      options={{title: 'Activate Tag'}}
    />
    <NFCStack.Screen
      name="NFSSuccess"
      component={NFCSCanSuccess}
      options={{headerShown: false}}
    />
  </NFCStack.Navigator>
);
type Props = {
  barColor: string;
};

const customDrawerLabel = (focused: boolean, title: string) => {
  return <Text style={{color: focused ? '#7cc' : '#000'}}>{title}</Text>;
};
export const DrawerNavigation = ({navigation, route}: any) => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerPosition={'left'}
      drawerType={'back'}
      hideStatusBar={false}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={'Home'}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? '#7cc' : 'gray'}
            />
          ),
          drawerLabel: ({focused}) => customDrawerLabel(focused, 'Home'),
        }}>
        {props => {
          let prop = {
            ...props,
            route: {
              ...props.route,
              params: route.params,
            },
          };
          return <AppNavigation {...prop} />;
        }}
      </Drawer.Screen>
      <Drawer.Screen
        name={'Activate Tag'}
        component={NFCStackNavigation}
        options={{
          title: 'Activate Tag',
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="nfc"
              size={size}
              color={focused ? '#7cc' : 'gray'}
            />
          ),
          drawerLabel: ({focused}) =>
            customDrawerLabel(focused, 'Activate Tag'),
        }}
      />
      <Drawer.Screen
        name={'Transfer Tag'}
        component={TransferTag}
        options={{
          title: 'Transfer Tag',
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={size}
              color={focused ? '#7cc' : 'gray'}
            />
          ),
          drawerLabel: ({focused}) =>
            customDrawerLabel(focused, 'Transfer Tag'),
        }}
      />
      <Drawer.Screen
        name={'My QR Code'}
        component={QRCode}
        options={{
          title: 'My QR Code',
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="qr-code-outline"
              size={size}
              color={focused ? '#7cc' : 'gray'}
            />
          ),
          drawerLabel: ({focused}) => customDrawerLabel(focused, 'My QR Code'),
        }}
      />
    </Drawer.Navigator>
  );
};
