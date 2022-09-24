import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {Snackbar, Dialog, Button, TextInput} from 'react-native-paper';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
// import OTPInputView from '@twotalltotems/react-native-otp-input/dist';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../config/themeConfig';
import Header from '../../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import metrics from '../../../utils/metrics';
import {TagLoader} from '../../../components/TagLoader';
// import OtpInput from 'react-otp-input';

const SetupTag = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [isVisible, setVisible] = useState({status: false, message: ''});
  const [isLoading, setLoading] = useState({verify: false, activate: false});
  const [showTag, setShowTag] = useState(false);
  const [isActiveButton, setActiveButton] = useState(true);
  const [pin, setPin] = useState('');
  const [tagData, setTagData] = useState({id: null});
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const checkNfcAndEnable = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const isSupported = await NfcManager.isSupported();
        if (!isSupported) {
          throw 'No NFC Support';
        }
        const isEnabled = await NfcManager.isEnabled();
        console.log('isEnabled', isEnabled);

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

  const initNFC = () => {
    return new Promise((resolve, reject) => {
      NfcManager.start()
        .then(() => {
          console.log('resolved');
          cleanUp();
          resolve(true);
        })
        .catch(err => {
          console.log('not resolved', err.message);
          cleanUp();
          reject('No NFC Support');
        });
    });
  };

  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };
  const readNdef = async () => {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        await checkNfcAndEnable();
        await initNFC();
        let tagFound: unknown = null;
        console.log('ready to scan');

        if (Platform.OS == 'ios') {
          await NfcManager.cancelTechnologyRequest();
          try {
            await NfcManager.requestTechnology(NfcTech.Ndef, {
              alertMessage: 'HOLD A TYC AGAINST THE TOP OF YOUR PHONE TO ACTIVATE TAG!',
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
            cleanUp();
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

  /**
   * scan tag and check if serial no available for new reg.
   */
  const verifyTycTag = async () => {
    setLoading({...isLoading, verify: true});
    try {
      setShowTag(true);
      const serialNo: any = await readNdef();
      apiClient
        .get(ApiConfig.checkNfcStatusForTransfer + serialNo)
        .then((data: any) => {
          console.log(data);
          const res = data.data;
          setShowTag(false);
          if (res.status == 'NO_USER_EXISTS') {
            setShowPasswordDialog(true);
            setTagData(res);
          } else if (res.status == 'USER_TRANSFER_ON') {
            transferTag(serialNo);
          } else {
            Alert.alert('error', res.message);
          }
        })
        .catch((error: any) => {
          setLoading({...isLoading, verify: false});
          Alert.alert('error', 'Something went wrong');
        });
    } catch (error) {
      setLoading({...isLoading, verify: false});
      setShowTag(false);
      if (typeof error == 'string') {
        Alert.alert('error', error);
      } else if (error == false) {
      } else {
        Alert.alert('error', 'Unable to process! Try again.');
      }
    } finally {
      setShowTag(false);
    }
  };

  const activateTag = () => {
    apiClient
      .post(ApiConfig.verifyNfcPassword, {
        nfcId: tagData.id,
        password: pin.toString(),
      })
      .then((data: any) => {
        if (data.data.ack == 1) {
          setPin('');
          setShowPasswordDialog(false);
          console.log(data);
          Alert.alert('Success', data.data.message);
        } else {
          Alert.alert('error', data.data.message);
        }
      })
      .catch((error: any) => {
        console.log('error', error.message);
        Alert.alert('error', 'Something went wrong');
      });
  };

  const transferTag = (serialNo: string) => {
    apiClient
      .post(ApiConfig.activateNfcTagOnTransfer, {
        serialNo: serialNo,
      })
      .then((data: any) => {
        setShowTag(false);
        if (data.data.ack == 1) {
          setPin('');
          setShowPasswordDialog(false);
          console.log(data);
          Alert.alert('Success', data.data.message);
        } else {
          Alert.alert('error', data.data.message);
        }
      })
      .catch((error: any) => {
        setShowTag(false);
        console.log('error', error.message);
        Alert.alert('error', 'Something went wrong');
      });
  };

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      {Platform.OS === 'android' && showTag && <TagLoader />}
      <Header />
      <View style={styles.mainSuccess}>
        <View style={styles.informativeBox}>
          <Image
            source={require('../../../assets/images/nfc.png')}
            style={styles.image}
          />
        </View>
        <LinearGradient
          colors={[theme.colors.accentDark, theme.colors.accent]}
          style={{
            backgroundColor: theme.colors.darkgray,
            paddingVertical: 10,
            width: '80%',
            borderRadius: 100,
            marginBottom: 5,
          }}
          start={{x: 0, y: 0.5}}
          end={{x: 0, y: 0}}>
          <TouchableOpacity
            style={{paddingVertical: 5}}
            onPress={() => verifyTycTag()}
            disabled={isLoading.activate || !isActiveButton}>
            {isLoading.activate ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.activeTagText}>Activate Tag</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>
        {/* </View> */}
        <Snackbar
          visible={isVisible.status}
          duration={1000}
          onDismiss={() => setVisible({...isVisible, status: false})}
          action={{
            label: 'Done',
            onPress: () => {
              // Do something
            },
          }}>
          {isVisible.message}
        </Snackbar>
      </View>
      <Dialog
        visible={showPasswordDialog}
        // onDismiss={() => setShowPasswordDialog(false)}
        style={{borderRadius: 20}}>
        <Dialog.Title>Enter your Password</Dialog.Title>
        <Dialog.Content
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TextInput
            mode={'outlined'}
            label="Password"
            value={pin}
            onChangeText={text => setPin(text)}
            style={{width: '90%'}}
            dense
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowPasswordDialog(false)} color={'red'}>
            Cancel
          </Button>
          <Button
            disabled={!(pin.length == 6)}
            onPress={() => {
              activateTag();
            }}
            color={'green'}>
            Confirm
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  mainSuccess: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f1f1f1',
    marginTop: '20%',
    // backgroundColor: 'red',
  },
  activeTagBtn: {
    backgroundColor: 'red',
    width: '50%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  activeTagText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  informativeBox: {
    width: metrics.moderateScale(250),
    height: metrics.moderateScale(250),
    borderRadius: metrics.moderateScale(125),
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: metrics.moderateScale(125),
  },
  tagBtns: {
    padding: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default SetupTag;
