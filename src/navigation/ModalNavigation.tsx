import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import NFCActionsScreen from '../containers/Dashboard/NFC/NFCActionsScreen';

const ModalStack = createStackNavigator();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ModalStackNavigator = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ModalStack.Navigator
        initialRouteName="NfcModal"
        headerMode="none"
        mode={'modal'}
        screenOptions={{
          cardStyle: {
            backgroundColor: '#3e3e3e',
          },
          animationEnabled: false,
        }}>
        <ModalStack.Screen name="NfcModal" component={NFCActionsScreen} />
      </ModalStack.Navigator>
    </View>
  );
};
