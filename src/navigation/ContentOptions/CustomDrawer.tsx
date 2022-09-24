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

class CustomDrawer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dis: false,
      isSwitchOn: this.props.userData.isActive,
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
          Alert.alert('error', 'Something went wrong');
          
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

  render() {
    const {props} = this;
    const {userData, fileReducer} = props;
    return (
      <DrawerContentScrollView
        {...props}
        style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: Dimensions.get('window').height,
          }}>
          <View>
            <Card style={drawerStyles.userInfoContainer}>
              <Card.Content>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {fileReducer.pending ? (
                    <Loader />
                  ) : (
                    <Image
                      source={{
                        uri:
                          userData.profilePic.length > 2
                            ? userData.profilePic
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHe330tYy_U_3UN0DmUSbGoFbXigdIQglDAA&usqp=CAU',
                      }}
                      resizeMode={'cover'}
                      style={drawerStyles.userImage}
                    />
                  )}
                  <View style={Platform.OS=='android' ? drawerStyles.userDetail : drawerStyles.userDetailIos}>
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
                        onValueChange={() => this.onToggleSwitch()}
                      />
                      {/* <Text style={drawerStyles.onOff}>
                        {this.state.isSwitchOn ? 'On' : 'Off'}
                      </Text> */}
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
                    <Text style={drawerStyles.urlText}>
                      {makeLink(userData)}
                    </Text>
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
                  style={{width: 26, height: 26, tintColor: 'gray'}}
                />
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
              style={{flexDirection: 'column', marginLeft: 20}}
              onPress={() => {
                this.props.clearStore();
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
