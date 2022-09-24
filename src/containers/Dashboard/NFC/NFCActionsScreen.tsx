import React, {Component} from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../../config/themeConfig';
import {Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SvgXml} from 'react-native-svg';
// @ts-ignore
import TycPlane from '../../../assets/images/whitePlane.svg';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import metrics from '../../../utils/metrics';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import {showTost, validURL} from '../../../utils/helper';
import {getLocation} from '../../../utils/LocationHelper';

class NFCActionsScreen extends Component<any, any> {
  private _unsubscribe: any;
  constructor(props: any) {
    super(props);

    this.state = {};
    let scan = '';
  }

  componentDidMount() {
    console.log('fdsfsd');
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.verifyTycTag();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  checkNfcAndEnable = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const isSupported = await NfcManager.isSupported();
        if (!isSupported) {
          throw 'No NFC Support';
        }
        const isEnabled = await NfcManager.isEnabled();
        if (!isEnabled) {
          if (Platform.OS === 'android') {
            Alert.alert(
              'NFC',
              'Plese enable NFC',
              [
                {
                  text: 'Go to settings',
                  onPress: async () => {
                    await NfcManager.goToNfcSetting();
                    resolve(true);
                  },
                },
                {
                  text: 'No',
                  onPress: () => {
                    reject('Plese enable NFC');
                  },
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            );
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  initNFC = () => {
    return new Promise((resolve, reject) => {
      NfcManager.start()
        .then(() => {
          console.log('resolved');
          this.cleanUp();
          resolve(true);
        })
        .catch(err => {
          console.log('not resolved', err.message);
          this.cleanUp();
          reject('No NFC Support');
        });
    });
  };

  cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };
  readNdef = () => {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        await this.checkNfcAndEnable();
        await this.initNFC();
        let tagFound: unknown = null;
        console.log('ready to scan');

        if (Platform.OS == 'ios') {
          await NfcManager.cancelTechnologyRequest();
          try {
            await NfcManager.requestTechnology(NfcTech.Ndef, {
              alertMessage: 'HOLD A TYC AGAINST THE TOP OF YOUR PHONE TO VIEW PROFILE!',
            });
          } catch (error) {
            throw false;
          }
          const tag: any = await NfcManager.getTag();
          console.log('tagIos', tag);
          NfcManager.cancelTechnologyRequest();
          resolve(tag.id);
        } else {
          NfcManager.setEventListener(
            NfcEvents.DiscoverTag,
            async (tag: any) => {
              tagFound = tag;
              NfcManager.setAlertMessage('NDEF tag found');
              NfcManager.unregisterTagEvent().catch(() => 0);
              resolve(tag.id);
            },
          );

          NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
            this.cleanUp();
            if (!tagFound) {
              reject('Tag not Found');
            }
          });

          NfcManager.registerTagEvent();
        }
      } catch (error) {
        console.log('error@', error);
        reject(error);
      }
    });
  };
  verifyTycTag = async () => {
    try {
      const serialNo: any = await this.readNdef();
      console.log('serialNo', serialNo);
      const locationData: any = await getLocation();
      const postData = {
        serialNo: serialNo,
        ...locationData,
      };
      console.log('postData', postData);

      apiClient
        .post(ApiConfig.scanNFCbySerialNo, postData)
        .then((res: any) => {
          console.log('res**', res);

          const data = res.data;
          if (data?.ack == 0) {
            this.props.navigation.goBack();
            showTost(data?.message);
          } else if (data?.isDirect) {
            const urlObj = data[data.activeProfile].filter(
              (e: any) => e.id == data.activeDirect,
            );
            Linking.openURL(validURL(urlObj[0].uri));
          } else {
            this.props.navigation.navigate('Contacts', {
              screen: 'PublicProfile',
              params: {
                userId: data.id,
              },
            });
          }
        })
        .catch((error: any) => {
          console.log('error api', error);
          showTost('Something went wrong! Try Again');
          this.props.navigation.goBack();
        });
    } catch (error) {
      console.log('error error', error);

      if (typeof error == 'string') {
        Alert.alert('error', error);
      } else if (error == false) {
      } else {
        Alert.alert('error', 'Unable to process! Try again.');
      }
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={nfcActionStyle.container}>
        {Platform.OS === 'android' && (
          <View style={[nfcActionStyle.bottomContainer]}>
            <Text style={nfcActionStyle.heading}>Ready to Scan</Text>
            <View style={nfcActionStyle.actionContainer}>
              <View
                style={nfcActionStyle.itemCenter}
                onTouchEnd={() => {
                  this.props.navigation.navigate('Tag', {
                    screen: 'NFSSuccess',
                  });
                }}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={nfcActionStyle.mobileCircle}>
                    <Icon
                      name="mobile"
                      size={100}
                      color={'red'}
                      style={nfcActionStyle.mobileIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={nfcActionStyle.bottomText}>
              HOLD A TYC AGAINST THE BOTTOM {'\n'}
              OF YOUR PHONE TO VIEW PROFILE.
            </Text>
            <Button
              onPress={() => this.props.navigation.navigate('Home')}
              mode={'contained'}
              style={nfcActionStyle.button}>
              Cancel
            </Button>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userData: state.UserReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(NFCActionsScreen);
const nfcActionStyle = StyleSheet.create({
  mobileCircle: {
    borderWidth: 5,
    borderColor: 'red',
    width: 150,
    height: 150,
    borderRadius: 75,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  mobileIcon: {
    alignSelf: 'center',
    marginBottom: -43,
    fontSize: 150,
  },
  container: {
    flex: 2,
    backgroundColor: theme.colors.darkgray,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flex: 0.6,
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
    marginHorizontal: metrics.moderateScale(10),
    marginBottom: metrics.verticalScale(2),
    borderRadius: 25,
    alignItems: 'center',
  },
  heading: {
    flex: 0.3,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: metrics.moderateScale(20),
    fontWeight: 'bold',
    paddingTop: metrics.verticalScale(20),
  },
  innerCircle: {
    position: 'absolute',
    paddingHorizontal: metrics.moderateScale(0),
  },
  circleO: {
    width: metrics.moderateScale(150),
    height: metrics.verticalScale(150),
    borderRadius: 75,
    borderWidth: metrics.moderateScale(2),
    borderColor: theme.colors.secondary,
    backgroundColor: 'transparent',
    padding: 0,
    alignSelf: 'center',
    position: 'relative',
  },
  actionContainer: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  itemCenter: {
    alignItems: 'center',
  },
  hintText: {
    fontSize: metrics.moderateScale(14),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: metrics.verticalScale(10),
  },
  verticalDivider: {
    width: 1,
    height: '50%',
    marginHorizontal: metrics.moderateScale(20),
  },
  bottomText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: metrics.moderateScale(14),
    bottom: metrics.moderateScale(30),
  },
  button: {
    alignSelf: 'center',
    borderRadius: 25,
    paddingHorizontal: metrics.verticalScale(20),
    paddingVertical: metrics.verticalScale(5),
    marginBottom: metrics.verticalScale(20),
  },
  planeStyle: {
    position: 'absolute',
    width: metrics.moderateScale(100),
    height: metrics.verticalScale(100),
    top: metrics.verticalScale(20),
    left: metrics.moderateScale(20),
  },
});
