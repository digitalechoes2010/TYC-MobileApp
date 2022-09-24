import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../config/themeConfig';

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={theme.colors.accent} />
    </View>
  );
};

export default Loader;
