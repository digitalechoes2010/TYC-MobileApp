import React, {Component, useState} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import GreenCheck from '../../../assets/images/success-check.png';

class NFCSCanSuccess extends Component {
  render() {
    return (
      <View style={styles.mainSuccess}>
        <View style={styles.successImgBox}>
          {/* <Image source={GreenCheck} style={styles.successImg} /> */}
          {/* <LottieView
            source={require('../../../assets/images/check-button.json')}
          /> */}
          <LottieView
            source={require('../../../assets/images/check-button.json')}
            colorFilters={[
              {
                keypath: 'button',
                color: '#F00000',
              },
              {
                keypath: 'Sending Loader',
                color: '#F00000',
              },
            ]}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.successText}>
          Successfully activated you TYC tag
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainSuccess: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  successImgBox: {
    width: 150,
    height: 140,
    padding: 10,
    position: 'relative',
  },
  successImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  successText: {
    marginTop: 15,
    fontSize: 20,
  },
});

export default NFCSCanSuccess;
