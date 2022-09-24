import React, {FC} from 'react';
import {StyleProp, View} from 'react-native';
import styles from '../containers/AuthContainer/SignIn/LoginStyle';
import {SvgXml} from 'react-native-svg';

// @ts-ignore
import {Logo} from '../assets/images/TYCLogo.svg';
import {Text} from 'react-native-paper';

interface IProps {
  title: string;
  style: StyleProp<any>;
}
const AuthTop: FC<IProps> = ({title, style}) => (
  <View style={style}>
    <View style={styles.imgLogo}>    
      <SvgXml xml={Logo} width={'100%'} height={'100%'} />
    </View>
    <Text style={styles.heading}>{title}</Text>
  </View>
);

export default AuthTop;
