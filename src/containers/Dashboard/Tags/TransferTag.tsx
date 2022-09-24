import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../config/themeConfig';
import Header from '../../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import metrics from '../../../utils/metrics';
import Loader from '../../../components/Loader';
import CountDown from 'react-native-countdown-component';

const TransferTag = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [isLoading, setLoading] = useState(false);
  const [isActiveButton, setActiveButton] = useState(true);
  const [showCountDown, setshowCountDown] = useState(false);
  const [timeoutInSeconds, setTimeoutInSeconds] = useState(null);

  /**
   * transfer tag
   */
  const transferTag = async () => {
    setLoading(true);
    // setshowCountDown(true);
    apiClient
      .get(ApiConfig.activateForTransfer)
      .then((data: any) => {
        console.log(data);
        const res = data.data;

        if (res.ack == 1) {
          // setLoading(false);
          setTimeoutInSeconds(res.timeoutInSeconds);
          setshowCountDown(true);
        } else {
          Alert.alert('error', res.message);
        }
      })
      .catch((error: any) => {
        // setLoading(false);
        Alert.alert('error', 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };
  const activateTag = async () => {
    console.log('data');
  };

  const completeTimer = async () => {
    console.log('complete');
    setLoading(false);
    setshowCountDown(false);
  };

  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      {/* {showTag && <TagLoader />} */}
      <Header />
      <View style={styles.mainSuccess}>
        <View style={styles.informativeBox}>
          <Image
            source={require('../../../assets/images/transfer.png')}
            style={styles.image}
          />
        </View>
        {showCountDown && timeoutInSeconds != null ? (
          <>
            <Text
              style={{
                paddingHorizontal: 40,
                marginBottom: 30,
                marginTop: -40,
                fontSize: 17,
              }}>
              Let the new owner activate the tag to transfer ownership
            </Text>
            <CountDown
              until={timeoutInSeconds || 60}
              size={30}
              onFinish={() => completeTimer()}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: theme.colors.accentDark}}
              timeLabelStyle={{color: 'red', fontWeight: 'bold', fontSize: 14}}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'MM', s: 'SS'}}
            />
          </>
        ) : (
          <><LinearGradient
              colors={[theme.colors.accentDark, theme.colors.accent]}
              style={{
                backgroundColor: theme.colors.darkgray,
                paddingVertical: 10,
                width: '80%',
                borderRadius: 100,
                marginBottom: 5,
              }}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 0 }}>
              <TouchableOpacity
                style={{ paddingVertical: 5 }}
                onPress={() => transferTag()}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.activeTagText}>Transfer Tag</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            <Text style={{textAlign:"center",fontWeight:"bold",color:"purple",paddingTop: metrics.moderateScale(50)}}>The Transfer Tag feature allows you {'\n'}  to transfer ownership of a TYC tag
to another user.{'\n'} This will delete the current information stored on the TYC,{'\n'} and will allow another profile to activate.</Text>
            </>
        )}
      </View>
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
    height: metrics.moderateScale(262),
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

export default TransferTag;
