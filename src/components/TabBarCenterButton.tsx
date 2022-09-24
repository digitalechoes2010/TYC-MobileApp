import React from 'react';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TabBg} from './TabBg';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../assets/images/roundBottomPlane.svg';
import {SvgXml} from 'react-native-svg';
type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

export const TabBarCenterButton: React.FC<Props> = ({bgColor, ...props}) => (
  <View style={styles.container} pointerEvents="box-none">
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <SvgXml xml={Button} style={styles.buttonIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -28.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 35,
    elevation: 30,
  },
  buttonIcon: {
    width: 120,
    height: 120,
  },
});
