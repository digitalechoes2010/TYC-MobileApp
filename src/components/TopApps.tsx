import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import metrics from '../utils/metrics';
import * as Icons from '../assets/images/icons/icon';

export const TopApps: React.FC<any> = ({item}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flex: 1}} onPress={() => {}}>
        <View style={styles.toAppImg}>
          <View style={styles.count}>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                fontWeight: 'bold',
              }}>
              {item?.count ?? 0}
            </Text>
          </View>
          <Image source={Icons[item.image]} style={styles.img} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  count: {
    position: 'absolute',
    zIndex: 9999,
    minHeight: 20,
    minWidth: 20,
    backgroundColor: 'red',
    top: -6,
    right: -6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  container: {
    // flex: 0.5,
    height: 100,
    width: 100,
    // backgroundColor: 'green',
    paddingVertical: metrics.moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  toAppImg: {
    width: 70,
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 5 : 10,
      height: Platform.OS === 'ios' ? 5 : 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
  },
  img: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
