import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../config/themeConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TagLoader = () => {
  return (
    <View
      style={{
        height: '35%',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 10,
        top: '30%',
        borderRadius: 20,
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="nfc"
        size={Dimensions.get('window').width * 0.14}
        color={'#404040'}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: '6%',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#404040',
        }}>
        Scan a TYC tag to activate it
      </Text>
    </View>
  );
};
