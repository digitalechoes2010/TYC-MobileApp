import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Check from '../assets/images/check.png';

const RadioItem = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: selected ? 'orange' : 'black',
          marginVertical: 10,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioItem;
