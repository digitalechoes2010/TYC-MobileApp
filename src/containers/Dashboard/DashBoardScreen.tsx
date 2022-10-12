/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  LogBox,
  View,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Text,
  withTheme,
  Dialog,
  Button,
  Portal,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import dashboardStyles from './Styles/DashBoardStyles';
import profileStyles from './Styles/ProfileStyles';
import styles from './Styles/DashBoardStyles';
import {Dispatch} from 'redux';
import {
  setUserdata,
  userDirectToggleStart,
  userUpdateRequest,
} from '../../store/Actions/UserActions';
import theme from '../../config/themeConfig';
import {ProfileTypes} from '../../store/Models/Api/User';
import ProfileTabs from './Profile/ProfileTabs';
import TabComponent from '../../components/TabComponent';
import Header from '../../components/Header';
import RadioItem from '../../components/RadioItem';
import {ScrollView} from 'react-native-gesture-handler';
import metrics from '../../utils/metrics';
import {copyLink, makeLink, showTost} from '../../utils/helper';
import Loader from '../../components/Loader';
import {Formik} from 'formik';
import * as yup from 'yup';
import ApiConfig from '../../config/apiConfig';
import apiClient from '../../config/clients';
class DashBoardScreen extends Component<any, any> {
  private imageData: any = {};
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      profile: this.props.userData?.profileTabType ?? 'Both',
      isDirect: false,
      directId: this.props.userData.activeDirect,
      directUrl: null,
      showLinkInput: false,
      linkInput: '',
    };
  }
  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }
  routes = [
    {key: 'first', title: 'Social'},
    {key: 'second', title: 'Business'},
  ];

  scene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return (
          <ProfileTabs
            navigation={this.props.navigation}
            type={ProfileTypes.SOCIAL}
            itemSlected={this.itemSelected}
          />
        );
      case 'second':
        return (
          <ProfileTabs
            navigation={this.props.navigation}
            type={ProfileTypes.BUSINESS}
            itemSlected={this.itemSelected}
          />
        );
      default:
        return null;
    }
  };
  itemSelected = (item: any) => {
    console.log(item);
  };
  showProfileOptions = () => {
    if (this.props.userData.isDirect) {
      showTost('Please turn off the Direct');
      return;
    }
    this.setState({visible: true});
  };
  setProfileType = (type: boolean = false) => {
    this.setState({visible: !this.state.visible});
    if (type) {
      this.props.doUserTypeChange({
        profileTabType: this.state.profile ?? 'Both',
      });
    } else {
      this.setState({profile: this.props.userData?.profileTabType});
    }
  };

  setDirectUrl = (directId: string) => {
    this.setState({directId});
  };
  doDirect = () => {
    if (this.props.userData.isDirect) {
      console.log('jhjhk');

      this.props.doDirectToggle({activeDirect: this.state.directId ?? ''});
    } else if (this.props.userData.profileTabType != 'Both') {
      this.setState({isDirect: !this.state.isDirect});
    } else {
      showTost('Profile type should be Social/Business');
    }
  };
  directSubmit = () => {
    this.setState({isDirect: !this.state.isDirect});
    if (this.state.directId.length > 1) {
      this.props.doDirectToggle({activeDirect: this.state.directId});
    }
  };

  closeLinkInput = () => {
    this.setState({showLinkInput: false});
  };

  profileLinkUpdate = async (param: any) => {
    // this.setState({showLinkInput: false});
    console.log('param', param);

    // this.setState({showLinkInput: false});
    const check = await apiClient.post(ApiConfig.getByIdOrUsername, {
      query: param.linkInput,
    });

    if (check.data == null) {
      Alert.alert(
        'ALERT',
        'You can only change this link once. Are you sure you want to proceed?',
        [
          {
            text: 'NO',
            onPress: () => this.setState({showLinkInput: false}),
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              apiClient
                .post(ApiConfig.changeUserLink, {
                  username: param.linkInput,
                })
                .then((data: any) => {
                  console.log('linkUpdate', data);
                  if (data.data?.ack == 1) {
                    this.props.refreshUser({
                      link: param.linkInput,
                      username: param.linkInput,
                    });
                  }
                })
                .catch((error: any) => {
                  console.log(error);
                  Alert.alert(
                    'Error',
                    'Something Went Wrong. Please Try Again.',
                  );
                })
                .finally(() => {
                  this.setState({showLinkInput: false});
                });
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Error',
        'Link Already Taken. Please Choose Another.',
      );
    }
  };

  render() {
    const {userData, fileReducer} = this.props;
    return (
      <>
        <View style={dashboardStyles.dashboardContainer}>
          <Header />
          <View style={dashboardStyles.topContainer}>
            <View style={dashboardStyles.imageContainer}>
              <View style={dashboardStyles.imageHolder}>
                {fileReducer.pending ? (
                  <Loader />
                ) : (
                  (userData.profilePic.length > 2 && (
                    <Image
                      source={{uri: userData.profilePic}}
                      style={profileStyles.profileImg}
                    />
                  )) || (
                    <Icon
                      name={'camera'}
                      style={profileStyles.cameraIcon}
                      size={40}
                    />
                  )
                )}
              </View>
            </View>
            <View style={dashboardStyles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.showProfileOptions()}
                style={[
                  styles.dashBoardButtonContainer,
                  {backgroundColor: theme.colors.textDark},
                ]}>
                <Text style={styles.t1}>PROFILE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={userData.isLoading}
                onPress={() => this.doDirect()}
                style={[
                  styles.dashBoardButtonContainer,
                  {backgroundColor: theme.colors.textDark},
                ]}>
                <Text style={styles.t1}>
                  DIRECT {userData.isDirect ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileSetup')}
                style={[
                  styles.dashBoardButtonContainer,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text style={styles.t1}>EDIT PROFILE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={dashboardStyles.userInfo}>
            <Text style={dashboardStyles.userName}>
              {userData.name ? userData.name : userData.username}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {this.props.userData.link &&
              this.props.userData.link.length > 0 ? (
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    copyLink(makeLink(this.props.userData));
                    Share.share({
                      message: makeLink(this.props.userData),
                    });
                  }}>
                  <Text style={dashboardStyles.userLink}>
                    {makeLink(this.props.userData)}
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={{width: '70%'}}
                    onPress={() => {
                      copyLink(makeLink(this.props.userData));
                      Share.share({
                        message: makeLink(this.props.userData),
                      });
                    }}>
                    <Text style={dashboardStyles.userLink}>
                      {makeLink(this.props.userData)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({showLinkInput: true})}
                    style={[
                      styles.dashBoardButtonContainer,
                      {backgroundColor: theme.colors.primary},
                      {width: '30%', height: 45},
                    ]}>
                    <Text style={styles.t1}>Edit</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View style={dashboardStyles.bottomContainer}>
            {userData.profileTabType && (
              <TabComponent
                scenes={this.scene}
                routes={this.routes}
                profileTabType={this.props.userData?.profileTabType ?? 'Both'}
              />
            )}
          </View>
          <Dialog
            visible={this.state.visible}
            onDismiss={() => this.setState({visible: !this.state.visible})}
            style={{borderRadius: 50}}>
            {/* <Dialog.Title></Dialog.Title> */}
            <Dialog.Content>
              <RadioItem
                label="Social"
                selected={this.state.profile === 'Personal'}
                onPress={() => this.setState({profile: 'Personal'})}
              />
              <RadioItem
                label="Business"
                selected={this.state.profile === 'Business'}
                onPress={() => this.setState({profile: 'Business'})}
              />
              <RadioItem
                label="Both"
                selected={this.state.profile === 'Both'}
                onPress={() => this.setState({profile: 'Both'})}
              />
            </Dialog.Content>
            <Dialog.Content
              style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button onPress={() => this.setProfileType()} color="red">
                Cancel
              </Button>
              <Button onPress={() => this.setProfileType(true)} color="green">
                Done
              </Button>
            </Dialog.Content>
          </Dialog>

          <Dialog
            visible={this.state.isDirect}
            onDismiss={() => this.setState({visible: !this.state.isDirect})}
            style={{borderRadius: 50, marginTop: -metrics.moderateScale(10)}}>
            <Dialog.Title>Select any app</Dialog.Title>
            <Dialog.Content style={{maxHeight: metrics.moderateScale(390)}}>
              <ScrollView>
                {this.props.userData.profileTabType == 'Personal' && (
                  <Text>Social Profiles</Text>
                )}
                {this.props.userData.profileTabType == 'Personal' &&
                  userData.socialProfiles.map((e: any) => {
                    return (
                      <TouchableOpacity onPress={() => this.setDirectUrl(e.id)}>
                        <View style={styles.directContainer}>
                          <Image source={e.image} style={styles.directImg} />
                          <Text>{e.name} </Text>
                          <View style={{width: metrics.moderateScale(40)}}>
                            {this.state.directId == e.id && (
                              <Icon
                                name={'check'}
                                size={metrics.moderateScale(30)}
                                color={theme.colors.accent}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                {this.props.userData.profileTabType == 'Business' && (
                  <Text style={{marginTop: 20}}>Business Profiles</Text>
                )}
                {this.props.userData.profileTabType == 'Business' &&
                  userData.businessProfiles.map((e: any) => {
                    return (
                      <TouchableOpacity onPress={() => this.setDirectUrl(e.id)}>
                        <View style={styles.directContainer}>
                          <Image source={e.image} style={styles.directImg} />
                          <Text>{e.name} </Text>
                          <View style={{width: metrics.moderateScale(40)}}>
                            {this.state.directId == e.id && (
                              <Icon
                                name={'check'}
                                size={metrics.moderateScale(30)}
                                color={theme.colors.accent}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </Dialog.Content>
            <Dialog.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Button onPress={() => this.doDirect()} color="red">
                Cancel
              </Button>
              <Button onPress={() => this.directSubmit()} color="green">
                Done
              </Button>
            </Dialog.Content>
          </Dialog>

          <Portal>
            <Dialog
              visible={this.state.showLinkInput}
              // onDismiss={this.hideDialog}
              style={{
                maxWidth: metrics.moderateScale(400),
                width: metrics.screenWidth - metrics.moderateScale(30),
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <Dialog.Actions
                style={{
                  paddingHorizontal: 0,
                  position: 'absolute',
                  right: 0,
                }}>
                <Button
                  onPress={this.closeLinkInput}
                  icon={() => <MIcon name={'close-circle-outline'} size={35} />}
                />
              </Dialog.Actions>
              <Dialog.Title
                style={{
                  alignSelf: 'center',
                  marginTop: metrics.verticalScale(14),
                }}>
                ENTER YOUR NEW LINK
              </Dialog.Title>
              <Dialog.Content>
                <View
                  style={{
                    flexDirection: 'column',
                    // marginVertical: metrics.verticalScale(30),
                  }}>
                  <Formik
                    initialValues={{
                      linkInput:
                        this.props.userData.link &&
                        this.props.userData.link.length > 0
                          ? this.props.userData.link
                          : this.state.linkInput,
                    }}
                    onSubmit={param => this.profileLinkUpdate(param)}
                    validationSchema={yup.object().shape({
                      linkInput: yup.string().required(),
                    })}>
                    {({
                      values,
                      errors,
                      handleChange,
                      setFieldTouched,
                      touched,
                      isValid,
                      handleSubmit,
                    }) => (
                      <>
                        <View style={styles.formContainer}>
                          <View style={styles.inputContainerStyle}>
                            <TextInput
                              autoCapitalize="none"
                              label="Choose your link"
                              mode={'outlined'}
                              value={values.linkInput}
                              onBlur={() => setFieldTouched('linkInput')}
                              onChangeText={handleChange('linkInput')}
                              outlineColor={theme.colors.darkgray}
                              keyboardType={'default'}
                            />
                            {touched.linkInput && errors.linkInput && (
                              <Text style={styles.error}>
                                {errors.linkInput}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View style={styles.l1}>
                          <Button
                            mode={'contained'}
                            contentStyle={[styles.buttonContent]}
                            style={[{width: '45%'}]}
                            labelStyle={styles.buttonLabel}
                            onPress={() => this.closeLinkInput()}>
                            Cancel
                          </Button>
                          <Button
                            mode={'contained'}
                            contentStyle={styles.buttonContent}
                            style={[{width: '45%'}]}
                            labelStyle={styles.buttonLabel}
                            onPress={handleSubmit}>
                            Save
                          </Button>
                        </View>
                      </>
                    )}
                  </Formik>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userData: state.UserReducer,
    fileReducer: state.FilesManagerReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  doDirectToggle: (data: any) => dispatch(userDirectToggleStart(data)),
  doUserTypeChange: (data: string) => dispatch(userUpdateRequest(data)),
  refreshUser: (data: any) => dispatch(setUserdata(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(DashBoardScreen));
