/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Maps from '../containers/Dashboard/Analytics/Maps';
import PublicProfile from '../containers/Dashboard/PublicProfile/PublicProfile';
const MapsStack = createStackNavigator();
const MapsStackNavigation: React.FC<Props> = () => (
  <MapsStack.Navigator initialRouteName={'ContactsList'} headerMode={'screen'}>
    <MapsStack.Screen
      name="Maps"
      component={Maps}
      options={{headerShown: false, headerStatusBarHeight: 0}}
    />
    <MapsStack.Screen
      name="PublicProfile"
      component={PublicProfile}
      options={{
        headerShown: false,
        // headerShown: true,
        headerStatusBarHeight: 0,
      }}
    />
  </MapsStack.Navigator>
);

export default MapsStackNavigation;
