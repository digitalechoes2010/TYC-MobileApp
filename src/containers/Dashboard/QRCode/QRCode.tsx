import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Share,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import theme from '../../../config/themeConfig';
import QRCode from 'react-native-qrcode-svg';
import metrics from '../../../utils/metrics';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import {useSelector} from 'react-redux';
import {makeLink, showTost} from '../../../utils/helper';

const QRCodeScreen = () => {
  const insets = useSafeAreaInsets();
  let svg: any = null;
  const userData = useSelector((state: any) => state.UserReducer);
  const profileUrl = makeLink(userData);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const shareImage = () => {
    svg.toDataURL((data: any) => {
      const shareImageBase64 = {
        title: 'TYC Profile QR Code',
        message: profileUrl,
        url: `data:image/png;base64,${data}`,
      };
      console.log(shareImageBase64);
      Share.share(shareImageBase64);
    });
  };

  const saveImage = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    try {
      svg.toDataURL((data: any) => {
        const path = RNFS.DocumentDirectoryPath + '/my-qr-code.svg';
        RNFS.writeFile(path, data, 'base64')
          .then(success => {
            return CameraRoll.save(path, {type: 'photo'});
          })
          .then(() => {
            showTost('QR Code is saved to your gallery!');
          });
      });
    } catch (error) {
      console.log(error);
      showTost('error');
    }
  };

  return (
    <View style={{paddingTop: insets.top}}>
      <Header />
      <View style={styles.mainQRPage}>
        <Text style={styles.topQRtext}>My QR Code</Text>
        <View style={styles.qrBox}>
          <QRCode
            value={profileUrl}
            size={metrics.moderateScale(250)}
            getRef={c => (svg = c)}
          />
        </View>
        <View style={styles.saveShareQR}>
          <LinearGradient
            colors={[theme.colors.accentDark, theme.colors.accent]}
            style={{
              backgroundColor: theme.colors.darkgray,
              paddingVertical: 10,
              width: '80%',
              borderRadius: 100,
              marginBottom: 10,
            }}
            start={{x: 0, y: 0.5}}
            end={{x: 0, y: 0}}>
            <TouchableOpacity onPress={saveImage}>
              <Text style={styles.saveBtnText}>Save QR Code</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={[theme.colors.accentDark, theme.colors.accent]}
            style={{
              backgroundColor: theme.colors.darkgray,
              paddingVertical: 10,
              width: '80%',
              borderRadius: 100,
              marginBottom: 10,
            }}
            start={{x: 0, y: 0.5}}
            end={{x: 0, y: 0}}>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'center'}}
              onPress={shareImage}>
              <Icon
                name={'share'}
                size={18}
                color={'white'}
                style={{position: 'relative', top: 1}}
              />
              <Text style={[styles.saveBtnText, {marginLeft: 15}]}>Share</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainQRPage: {
    // flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginTop: '15%',
  },
  qrBox: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: '10%',
  },
  qrImg: {
    width: '100%',
    height: '100%',
  },
  topQRtext: {
    fontSize: 20,
    textAlign: 'center',
  },
  saveShareQR: {
    marginTop: 25,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  saveBtn: {
    backgroundColor: 'red',
    // alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default QRCodeScreen;
