import React, {Component} from 'react';
import {Alert, Linking, StyleSheet, View, Animated, Text} from 'react-native';
import theme from '../../../config/themeConfig';
import {RNCamera} from 'react-native-camera';
import {showTost, validURL} from '../../../utils/helper';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import * as yup from 'yup';
import Loader from '../../../components/Loader';
import {getLocation} from '../../../utils/LocationHelper';
import {
  TabActions,
  CommonActions,
  NavigationAction,
  StackActions,
} from '@react-navigation/native';

let schema = yup.object().shape({
  url: yup.string().url(),
  urlValue: yup.string(),
});

export default class BarcodeScreen extends Component<any, any> {
  private camera: any;
  constructor(props: any) {
    super(props);
    this.state = {
      barcode: '',
      isScaned: false,
    };
  }

  readBarcode = async (barcode: any) => {
    try {
      const str = barcode.data;
      const strsplit = str.split('/');
      console.log('strsplit', strsplit);
      if (strsplit.length != 5) {
        throw 'Please scan a valid TYC QR Code';
      }
      const validateData = await schema.isValid({
        url: str,
        urlValue: strsplit[4],
      });

      if (!validateData) {
        throw 'Please scan a valid TYC QR Code';
      }

      const locationData: any = await getLocation();

      const findUser = {
        query: strsplit[4],
      };
      console.log('findUser', findUser);

      apiClient
        .post(ApiConfig.getByIdOrUsername, findUser)
        .then((res: any) => {
          console.log('res**', res);
          const postData = {
            userId: res.data.id,
            ...locationData,
          };
          console.log('postData', postData);

          apiClient
            .post(ApiConfig.scanNFCbyUserId, postData)
            .then((res: any) => {
              console.log('data ', res);
              const data = res.data;
              if (data?.ack == 0) {
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
              this.setState({isScaned: false});
            });
        })
        .catch((error: any) => {
          console.log('error', error);
          this.setState({isScaned: false});
          showTost('Something went wrong! Try Again');
        });
    } catch (error) {
      // console.log('err1', error);
      this.setState({isScaned: false});
      showTost('Please scan a valid TYC QR Code');
    }
  };

  componentWillUnmount = () => {
    this.setState({isScaned: false});
  };

  render() {
    if (this.state.isScaned) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            zIndex: 222,
          }}
        />
        {/* <TouchableOpacity onPress={() => this.readBarcode('barcode')}>
          <View style={{backgroundColor: '#fff', height: 400}}>
            <Text>hgjhgjh</Text>
          </View>
        </TouchableOpacity> */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={e => {
            if (this.state.isScaned) {
              return;
            }
            this.setState({isScaned: true}, () => {
              this.readBarcode(e);
            });
          }}
          onTouchStart={() => {
            Alert.alert('START');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: theme.colors.darkgray,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
