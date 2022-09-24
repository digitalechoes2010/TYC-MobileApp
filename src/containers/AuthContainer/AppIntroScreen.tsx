import React, {Component} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Text, withTheme} from 'react-native-paper';
import {Dimensions, Image, Platform, StyleSheet, View} from 'react-native';
import theme from '../../config/themeConfig';
import {intro1} from '../../assets/images/intro1.svg';
import {intro2} from '../../assets/images/intro2.svg';
import {intro3} from '../../assets/images/intro3.svg';
import {intro4} from '../../assets/images/intro4-2.svg';
import {SvgXml} from 'react-native-svg';
import metrics from '../../utils/metrics';
import {Dispatch} from 'redux';
import {userFirstOpenApp} from '../../store/Actions/UserActions';
import {connect} from 'react-redux';

class AppIntroScreen extends Component<any, any> {
  slides = [
    {
      key: 1,
      title: 'Instantly Share What\n' + 'You Want',
      text:
        'From Social Media Handles, to Locations,\n' +
        'Business Information, & So Much More.',
      image: intro1,
      backgroundColor: '#22bcb5',
    },
    {
      key: 2,
      title: 'Keep Tags On Locations:',
      text:
        'Keep track of your taps in real time. \n' +
        'Keep a tag on your connections all around the world.\n' +
        'Recall where and who you tapped your chip with.',
      image: intro2,
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Track, Analyze & Know Your Audience',
      text:
        'Get real time stats on your data,\n' +
        'from amount of clicks,\n' +
        'to your most visited link.',
      image: intro3,
      backgroundColor: '#59b2ab',
    },
    {
      key: 4,
      image: intro4,
    },
  ];
  _renderItem = (item: any) => {
    return (
      <View style={styles.slide} key={item.key}>
        <View
          style={{
            flex: item.title ? 1 : 4,
            top: metrics.verticalScale(-10),
            aspectRatio: 1,
          }}>
          <SvgXml
            xml={item.image}
            style={[styles.image]}
            width={ (Platform.OS == 'ios') ? metrics.moderateScale(metrics.screenWidth -11) : metrics.moderateScale(metrics.screenWidth + 5)}
            height={(Platform.OS=='ios') ? metrics.verticalScale(metrics.screenHeight / (item.title ? 1.9 : 1.2)) : metrics.verticalScale(metrics.screenHeight / (item.title ? 1.7 : 1.2) )}
            preserveAspectRatio={'none'}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };
  _renderButton = (title: string) => {
    return (
      <View style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>{title}</Text>
      </View>
    );
  };
  _onDone = () => {
    this.props.firstOpenApp();
    this.props.navigation.navigate('SignIn');
  };
  render() {
    return (
      <>
        <AppIntroSlider
          renderItem={(item: any) => {
            return this._renderItem(item.item);
          }}
          data={this.slides}
          onDone={this._onDone}
          style={{
            backgroundColor: this.props.theme.colors.background,
          }}
          renderDoneButton={() => this._renderButton(`LET’S GET TAPPING`)}
          renderNextButton={() => this._renderButton('NEXT')}
          bottomButton
        />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  firstOpenApp: () => dispatch(userFirstOpenApp()),
});
export default connect(
  undefined,
  mapDispatchToProps,
)(withTheme(AppIntroScreen));
export const styles = StyleSheet.create({
  slide: {flex: 2, flexDirection: 'column'},
  image: {
    zIndex: 2,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    bottom: metrics.scale(120),
    zIndex: 1,
  },
  title: {
    ...theme.fonts.medium,
    fontSize: metrics.moderateScale(25),
    textAlign: 'center',
    color: theme.colors.textDark,
    paddingBottom: metrics.verticalScale(40),
  },
  text: {
    fontSize: metrics.moderateScale(16),
    fontWeight: 'bold',
    color: theme.colors.signinaccent,
    textAlign: 'center',
  },
  bottomButton: {
    alignSelf: 'center',
    backgroundColor: '#8da2af',
    paddingVertical: metrics.verticalScale(10),
    borderRadius: 30,
    width: '65%',
  },
  bottomButtonText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: theme.colors.background,
  },
});
// export default withTheme(AppIntroScreen);
