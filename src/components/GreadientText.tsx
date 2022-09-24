/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import theme from '../config/themeConfig';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GDText = ({text = '', style = {}, containerStyle = {}}) => {
  return (
    <GDTextIOS containerStyle={containerStyle} style={style}>
      {text}
    </GDTextIOS>
  );
};

const GDTextIOS = (props: any) => {
  return (
    <View
      style={[
        props.containerStyle,
        {
          width: '100%',
          alignItems: 'center',
        },
      ]}>
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          colors={[theme.colors.accent, theme.colors.accentDark]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text {...props} style={[props.style, {opacity: 0}]} />
        </LinearGradient>
      </MaskedView>
    </View>
  );
};

export default GDText;
