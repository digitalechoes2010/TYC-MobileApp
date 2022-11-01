/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import theme from '../../config/themeConfig';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Modal,
  Animated,
  SafeAreaView
} from 'react-native';
import {Switch} from 'react-native-switch';
import {Card,Text} from 'react-native-paper';
import {SvgXml} from 'react-native-svg';
import {Logo} from '../../assets/images/TYCLogo.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from '../../utils/metrics';

import {logout} from '../../store/Actions/LoginActions';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {help} from '../../assets/images/icons/icon';
import {makeLink, profileLink} from '../../utils/helper';
import Loader from '../../components/Loader';
const width = Dimensions.get('window').width;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiClient from '../../config/clients';
import ApiConfig from '../../config/apiConfig';
import {setUserdata} from '../../store/Actions/UserActions';
import * as OpenAnything from 'react-native-openanything';

class CustomDrawer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dis: false,
      isSwitchOn: this.props.userData.isActive,
      visible: false,
    };
  }
  onToggleSwitch = () => {
    this.setState({ dis: true });
    let isSwitchOn = this.state.isSwitchOn;
    this.setState({isSwitchOn: !this.state.isSwitchOn}, () => {
      apiClient
        .get(ApiConfig.toggleProfileActivation)
        .then((data: any) => {
          if (data.data.ack == 1) {
            isSwitchOn = !isSwitchOn;
            this.setState({ dis: false });
          }
        })
        .catch((error: any) => {
          Alert.alert('Error', 'Something Went Wrong.');
          
        })
        .finally(() => {
          this.props.updateUserToggle({isActive: isSwitchOn});
          this.setState({isSwitchOn: isSwitchOn});
        });
    });
  };

  customDrawerLabel = (focused: boolean, title: string) => {
    return <Text style={{color: focused ? '#7cc' : '#000'}}>{title}</Text>;
  };

  ModalPopup = ({visible, children}:any) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
          <Animated.View
            style={[{width: '80%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10}, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  render() {
    const {props} = this;
    const {userData, fileReducer} = props;
    const emailReceiver = "info@tapyourchip.com";
    const emailSubject = "TYC Account Deletion";
    const emailBody = "Dear Admin," + '\n' + '\n' + 
      "Hope this email finds you well and safe." + '\n' + '\n' +
      "Kindly accept my request to delete this account as soon as possible." + '\n' + '\n' +
      "TYC Username: " + userData.username + '\n' + '\n' +
      "Best Regards.";

    const deleteAccount = () => {
      this.props.clearStore(); 
      setTimeout(function() {OpenAnything.Email(emailReceiver, emailSubject, emailBody)}, 500)
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        <DrawerContentScrollView
        {...props}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: Dimensions.get('window').height,
          }}>
          <View>
            <Card style={drawerStyles.userInfoContainer}>
              <Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {fileReducer.pending ? (
                    <Loader />
                  ) : (
                    <Image
                      source={{
                        uri: userData.profilePic.length > 2
                          ? userData.profilePic
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHe330tYy_U_3UN0DmUSbGoFbXigdIQglDAA&usqp=CAU',
                      }}
                      resizeMode={'cover'}
                      style={drawerStyles.userImage} />
                  )}
                  <View style={Platform.OS == 'android' ? drawerStyles.userDetail : drawerStyles.userDetailIos}>
                    <Text
                      style={drawerStyles.userName}
                      numberOfLines={1}
                      lineBreakMode={'tail'}>
                      {userData.name ? userData.name : userData.username}
                    </Text>
                    <View
                      style={{
                        marginTop: 10,
                        marginRight: 6,
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Switch
                        backgroundActive={'#FB8C1A'}
                        circleActiveColor={'#FB8C1A'}
                        value={this.state.isSwitchOn}
                        disabled={this.state.dis}
                        onValueChange={() => this.onToggleSwitch()} />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View style={{}}>
                    <Text style={drawerStyles.urlText}>{makeLink(userData)}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <DrawerItemList {...props} />
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                marginLeft: metrics.moderateScale(17.5),
                marginTop: metrics.moderateScale(15),
                marginBottom: metrics.moderateScale(20),
              }}
              onPress={() => Linking.openURL('https://www.tapyourchip.com/Support')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  source={require('../../assets/images/icons/help.png')}
                  resizeMode={'cover'}
                  style={{ width: 26, height: 26, tintColor: 'gray' }} />
                <Text
                  style={{
                    fontSize: metrics.moderateScale(14),
                    paddingLeft: metrics.moderateScale(30),
                    justifyContent: 'center',
                  }}>
                  Help
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                marginLeft: metrics.moderateScale(17.5),
                marginBottom: metrics.moderateScale(20),
              }}
              onPress={() => this.setState({ visible: true })}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <MaterialCommunityIcons name={'account-remove'} size={24} color={'gray'} />
                <Text
                  style={{
                    fontSize: metrics.moderateScale(14),
                    paddingLeft: metrics.moderateScale(30),
                    justifyContent: 'center',
                  }}>
                  Delete Account
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'column', marginLeft: 20 }}
              onPress={() => this.props.clearStore()}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={'sign-out'} size={24} color={'gray'}></Icon>
                <Text
                  style={{
                    fontSize: metrics.moderateScale(14),
                    paddingLeft: metrics.moderateScale(30),
                    justifyContent: 'center',
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginBottom: metrics.moderateScale(100),
            }}>
            <SvgXml xml={Logo} width={90} height={90} />
          </View>
        </View>
        </DrawerContentScrollView>
        <View>
          <this.ModalPopup visible={this.state.visible}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000000', alignSelf: 'center', textAlign: 'center'}}>Are You Sure You Want To Permanently Delete This Account?</Text>
            <TouchableOpacity
              style={{width: '100%', backgroundColor: '#FB8C1A', padding: 10, borderRadius: 30, alignItems: 'center', marginTop: 30}}
              onPress={() => deleteAccount()}>
              <Text style={{fontWeight: '500', fontSize: 14, color: '#FFFFFF' }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%', backgroundColor: '#CD06F7', padding: 10, borderRadius: 30, alignItems: 'center', marginTop: 30}}
              onPress={() => this.setState({ visible: false })}>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#FFFFFF' }}>Cancel</Text>
            </TouchableOpacity>
          </this.ModalPopup>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    props: ownProps,
    userData: state.UserReducer,
    fileReducer: state.FilesManagerReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearStore: () => dispatch(logout()),
  updateUserToggle: (param: any) => dispatch(setUserdata(param)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const drawerStyles = StyleSheet.create({
  userInfoContainer: {
    width: '100%',
    backgroundColor: '#aaaa',
    borderRadius: 0,
    marginBottom: 40,
    marginTop: -5,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  userDetail: {
    marginLeft: 10,
    width: '60%',
    // alignContent: 'flex-start',
    // backgroundColor: 'red',
  },
  userDetailIos: {
    marginLeft: 14,
    width: '60%',
    // alignContent: 'flex-start',
    // backgroundColor: 'red',
  },
  userName: {
    // color: theme.colors.background,
    fontSize: metrics.moderateScale(16),
    // alignSelf: 'flex-start',
    width: '100%',
  },
  urlText: {
    color: theme.colors.secondary,
    fontSize: width * 0.04,
    // alignSelf: 'flex-start',
  },
  onOff: {
    color: 'gray',
    fontSize: metrics.moderateScale(14),
  },
});
